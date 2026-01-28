import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, CheckCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Child {
  name: string;
  age: number;
}

interface RSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

const RSVPModal = ({ isOpen, onClose }: RSVPModalProps) => {
  const [step, setStep] = useState<"name" | "age" | "phone" | "ddd" | "number" | "has-children" | "children-count" | "children" | "stay" | "day" | "confirmation">("name");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Form data
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phoneDDD, setPhoneDDD] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [hasChildrenFlag, setHasChildrenFlag] = useState<boolean | null>(null);
  const [childrenCount, setChildrenCount] = useState(0);
  const [children, setChildren] = useState<Child[]>([]);
  const [currentChildIndex, setCurrentChildIndex] = useState(0);
  const [willStay, setWillStay] = useState<boolean | null>(null);
  const [arrivalDay, setArrivalDay] = useState<"friday" | "saturday" | "">("");
  const [guestId, setGuestId] = useState("");

  // Validações por step
  const isNameValid = name.trim().length >= 2;
  const isAgeValid = age && !isNaN(Number(age)) && Number(age) > 0 && Number(age) <= 120;
  const isDDDValid = phoneDDD.length === 2 && /^\d{2}$/.test(phoneDDD);
  const isPhoneValid = (phoneNumber.length === 8 || phoneNumber.length === 9) && /^\d{8,9}$/.test(phoneNumber);
  const isHasChildrenValid = hasChildrenFlag !== null;
  const isChildrenCountValid = childrenCount > 0;
  const isCurrentChildValid = currentChildIndex < children.length ? children[currentChildIndex]?.name?.trim() && children[currentChildIndex]?.age : true;
  const isStayValid = willStay !== null;
  const isDayValid = !willStay || (willStay && arrivalDay !== "");

  const phone = `(${phoneDDD})${phoneNumber}`;

  const handlePhoneNumberInput = (value: string) => {
    const digits = value.replace(/\D/g, "");
    setPhoneNumber(digits.slice(0, 9));
  };

  const handleChildChange = (index: number, field: string, value: any) => {
    const newChildren = [...children];
    newChildren[index] = { ...newChildren[index], [field]: value };
    setChildren(newChildren);
  };

  // Auto-advance quando responde has-children
  useEffect(() => {
    if (step === "has-children" && hasChildrenFlag !== null) {
      const timer = setTimeout(() => {
        if (hasChildrenFlag) {
          setChildrenCount(0);
          setStep("children-count");
        } else {
          setStep("confirmation");
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [step, hasChildrenFlag]);

  const handleNextStep = () => {
    setError("");

    if (step === "name") {
      if (!isNameValid) {
        setError("Nome deve ter pelo menos 2 caracteres");
        return;
      }
      setStep("age");
    } else if (step === "age") {
      if (!isAgeValid) {
        setError("Idade deve ser entre 1 e 120");
        return;
      }
      setStep("phone");
    } else if (step === "phone") {
      setStep("ddd");
    } else if (step === "ddd") {
      if (!isDDDValid) {
        setError("DDD deve ter 2 dígitos");
        return;
      }
      setStep("number");
    } else if (step === "number") {
      if (!isPhoneValid) {
        setError("Número deve ter 8 ou 9 dígitos");
        return;
      }
      setStep("stay");
    } else if (step === "stay") {
      if (!isStayValid) {
        setError("Selecione uma opção");
        return;
      }
      if (willStay) {
        setStep("day");
      } else {
        setStep("confirmation");
      }
    } else if (step === "day") {
      if (!isDayValid) {
        setError("Selecione o dia de chegada");
        return;
      }
      setStep("has-children");
    } else if (step === "children-count") {
      if (childrenCount > 0) {
        setChildren(Array.from({ length: childrenCount }, () => ({ name: "", age: 0 })));
        setCurrentChildIndex(0);
        setStep("children");
      } else {
        setStep("confirmation");
      }
    } else if (step === "children") {
      if (!isCurrentChildValid) {
        setError("Preencha o nome e idade da criança");
        return;
      }
      if (currentChildIndex < childrenCount - 1) {
        setCurrentChildIndex(currentChildIndex + 1);
      } else {
        setStep("confirmation");
      }
    }
  };

  const handlePreviousStep = () => {
    if (step === "children" && currentChildIndex > 0) {
      setCurrentChildIndex(currentChildIndex - 1);
    } else {
      const stepOrder: typeof step[] = [
        "name",
        "age",
        "phone",
        "ddd",
        "number",
        "stay",
        ...(willStay ? ["day", "has-children"] : []),
        ...(willStay && hasChildrenFlag ? ["children-count"] : []),
        ...(willStay && hasChildrenFlag && childrenCount > 0 ? ["children"] : []),
        "confirmation",
      ] as const;

      const currentIndex = stepOrder.indexOf(step);
      if (currentIndex > 0) {
        setStep(stepOrder[currentIndex - 1]);
      }
    }
    setError("");
  };

  const handleSubmit = async () => {
    if (isLoading) return;
    
    // Validações básicas
    if (!name || !age || !phone) {
      setError("Por favor preencha todos os campos obrigatórios");
      return;
    }
    
    if (hasChildrenFlag === null) {
      setError("Por favor responda se vai levar crianças");
      return;
    }
    
    if (willStay === null) {
      setError("Por favor responda se vai dormir");
      return;
    }
    
    if (willStay && !arrivalDay) {
      setError("Por favor selecione o dia de chegada");
      return;
    }
    
    if (hasChildrenFlag && children.length === 0) {
      setError("Por favor adicione os dados das crianças");
      return;
    }
    
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/guests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          age: Number(age),
          phone,
          hasChildren: hasChildrenFlag === true,
          children: hasChildrenFlag ? children : [],
          willStay: willStay === true,
          arrivalDay: willStay ? arrivalDay : undefined,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erro ao confirmar presença");
      }

      const data = await response.json();
      setGuestId(data.guest.id);
      setStep("confirmation");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsApp = () => {
    const phone = "+5531982000908";
    const message = "Acabei de confirmar presença no seu aniversário!";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleReset = () => {
    setName("");
    setAge("");
    setPhoneDDD("");
    setPhoneNumber("");
    setHasChildrenFlag(null);
    setChildrenCount(0);
    setChildren([]);
    setCurrentChildIndex(0);
    setWillStay(null);
    setArrivalDay("");
    setError("");
    setStep("name");
    setGuestId("");
    onClose();
  };

  const isStepComplete = () => {
    switch (step) {
      case "name":
        return isNameValid;
      case "age":
        return isAgeValid;
      case "phone":
        return true;
      case "ddd":
        return isDDDValid;
      case "number":
        return isPhoneValid;
      case "has-children":
        return isHasChildrenValid;
      case "children-count":
        return isChildrenCountValid;
      case "children":
        return isCurrentChildValid;
      case "stay":
        return isStayValid;
      case "day":
        return isDayValid;
      case "confirmation":
        return true;
      default:
        return false;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            {step !== "confirmation" && (
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 z-10"
              >
                <X className="w-6 h-6" />
              </button>
            )}

            <div className="p-8">
              {/* Progress Bar */}
              {step !== "confirmation" && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">Etapa</p>
                    <p className="text-sm font-semibold text-primary">
                      {step === "name" && "1/10"}
                      {step === "age" && "2/10"}
                      {step === "phone" && "3/10"}
                      {step === "ddd" && "4/10"}
                      {step === "number" && "5/10"}
                      {step === "has-children" && "6/10"}
                      {step === "children-count" && "7/10"}
                      {step === "children" && `7+${currentChildIndex + 1}/${childrenCount}`}
                      {step === "stay" && "8/10"}
                      {step === "day" && "9/10"}
                    </p>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      layoutId="progress"
                      className="h-full bg-gradient-to-r from-primary to-gold"
                      initial={{ width: "0%" }}
                      animate={{ width: `${((step === "children" ? 7 + (currentChildIndex + 1) / childrenCount : ["name", "age", "phone", "ddd", "number", "has-children", "children-count", "stay", "day"].indexOf(step) + 1) / 10) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              )}

              {/* Name Step */}
              {step === "name" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <h2 className="text-3xl font-display text-primary mb-2">Qual é seu nome?</h2>
                  <p className="text-muted-foreground mb-6">Vamos começar com o básico</p>
                  <Input
                    type="text"
                    placeholder="Seu nome completo"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setError("");
                    }}
                    className="border-2 focus:border-gold mb-4"
                    autoFocus
                  />
                  {error && <div className="text-destructive text-sm mb-4">{error}</div>}
                </motion.div>
              )}

              {/* Age Step */}
              {step === "age" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <h2 className="text-3xl font-display text-primary mb-2">Quantos anos você tem?</h2>
                  <p className="text-muted-foreground mb-6">Para manter nossos registros</p>
                  <Input
                    type="number"
                    placeholder="Sua idade"
                    value={age}
                    onChange={(e) => {
                      setAge(e.target.value);
                      setError("");
                    }}
                    min="1"
                    max="120"
                    className="border-2 focus:border-gold mb-4"
                    autoFocus
                  />
                  {error && <div className="text-destructive text-sm mb-4">{error}</div>}
                </motion.div>
              )}

              {/* Phone Explanation Step */}
              {step === "phone" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <h2 className="text-3xl font-display text-primary mb-2">Seu WhatsApp</h2>
                  <p className="text-muted-foreground mb-6">Precisamos do seu número para nos contato apenas caso realmente seja necessário. Será em duas partes!</p>
                  <div className="bg-primary/5 rounded-lg p-4 mb-4">
                    <p className="text-sm text-foreground">
                      <strong>Formato:</strong> (XX)XXXXX-XXXX
                    </p>
                    <p className="text-sm text-muted-foreground">Número com 8 ou 9 dígitos</p>
                  </div>
                </motion.div>
              )}

              {/* DDD Step */}
              {step === "ddd" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <h2 className="text-3xl font-display text-primary mb-2">DDD</h2>
                  <p className="text-muted-foreground mb-6">Qual é o DDD? (2 dígitos)</p>
                  <Input
                    type="number"
                    placeholder="Ex: 31"
                    value={phoneDDD}
                    onChange={(e) => {
                      const value = e.target.value.slice(0, 2);
                      setPhoneDDD(value);
                      setError("");
                    }}
                    maxLength={2}
                    className="border-2 focus:border-gold mb-4 text-center text-2xl font-bold"
                    autoFocus
                  />
                  {phoneDDD && !isDDDValid && (
                    <div className="text-destructive text-sm mb-4">DDD deve ter 2 dígitos</div>
                  )}
                </motion.div>
              )}

              {/* Phone Number Step */}
              {step === "number" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <h2 className="text-3xl font-display text-primary mb-2">Número</h2>
                  <p className="text-muted-foreground mb-6">8 ou 9 dígitos (sem traço)</p>
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-primary mb-4">
                      ({phoneDDD}){phoneNumber}
                    </div>
                    <Input
                      type="number"
                      placeholder="Ex: 999999999"
                      value={phoneNumber}
                      onChange={(e) => {
                        handlePhoneNumberInput(e.target.value);
                        setError("");
                      }}
                      className="border-2 focus:border-gold mb-4 text-center text-xl font-bold"
                      autoFocus
                    />
                  </div>
                  {phoneNumber && !isPhoneValid && (
                    <div className="text-destructive text-sm mb-4">
                      ⚠️ Número deve ter 8 ou 9 dígitos (você tem: {phoneNumber.length})
                    </div>
                  )}
                </motion.div>
              )}

              {/* Will Stay Step */}
              {step === "stay" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <h2 className="text-3xl font-display text-primary mb-2">Você vai dormir lá?</h2>
                  <p className="text-muted-foreground mb-6">Ficará hospedado?</p>
                  <div className="flex gap-4">
                    {[true, false].map((value) => (
                      <button
                        key={String(value)}
                        onClick={() => {
                          setWillStay(value);
                          setError("");
                        }}
                        className={`flex-1 py-4 px-4 rounded-lg border-2 font-semibold transition-all text-lg ${
                          willStay === value
                            ? "border-gold bg-gold/10 text-primary"
                            : "border-border text-muted-foreground hover:border-gold/50"
                        }`}
                      >
                        {value ? "Sim" : "Não"}
                      </button>
                    ))}
                  </div>
                  {error && <div className="text-destructive text-sm mt-4">{error}</div>}
                </motion.div>
              )}

              {/* Arrival Day Step */}
              {step === "day" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <h2 className="text-3xl font-display text-primary mb-2">Qual dia você chega?</h2>
                  <p className="text-muted-foreground mb-6">Quando você estará lá?</p>
                  <div className="space-y-3">
                    {(["friday", "saturday"] as const).map((day) => (
                      <button
                        key={day}
                        onClick={() => {
                          setArrivalDay(day);
                          setError("");
                        }}
                        className={`w-full py-4 px-4 rounded-lg border-2 font-semibold transition-all text-lg text-left ${
                          arrivalDay === day
                            ? "border-gold bg-gold/10 text-primary"
                            : "border-border text-muted-foreground hover:border-gold/50"
                        }`}
                      >
                        {day === "friday" ? "Sexta-feira (após as 17h)" : "Sábado (após as 07h)"}
                      </button>
                    ))}
                  </div>
                  {error && <div className="text-destructive text-sm mt-4">{error}</div>}
                </motion.div>
              )}

              {/* Has Children Step */}
              {step === "has-children" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <h2 className="text-3xl font-display text-primary mb-2">Você levará crianças?</h2>
                  <p className="text-muted-foreground mb-6">Trará alguma criança com você?</p>
                  <div className="flex gap-4">
                    {[true, false].map((value) => (
                      <button
                        key={String(value)}
                        onClick={() => {
                          setHasChildrenFlag(value);
                          if (!value) {
                            setChildrenCount(0);
                            setChildren([]);
                          }
                          setError("");
                        }}
                        className={`flex-1 py-4 px-4 rounded-lg border-2 font-semibold transition-all text-lg ${
                          hasChildrenFlag === value
                            ? "border-gold bg-gold/10 text-primary"
                            : "border-border text-muted-foreground hover:border-gold/50"
                        }`}
                      >
                        {value ? "Sim" : "Não"}
                      </button>
                    ))}
                  </div>
                  {error && <div className="text-destructive text-sm mt-4">{error}</div>}
                </motion.div>
              )}

              {/* Children Count Step */}
              {step === "children-count" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <h2 className="text-3xl font-display text-primary mb-2">Quantas crianças?</h2>
                  <p className="text-muted-foreground mb-6">Qual é o número de crianças?</p>
                  <Input
                    type="number"
                    placeholder="1"
                    value={childrenCount}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setChildrenCount(Math.max(1, Math.min(value, 10)));
                      setError("");
                    }}
                    min="1"
                    max="10"
                    className="border-2 focus:border-gold mb-4 text-center text-3xl font-bold"
                    autoFocus
                  />
                </motion.div>
              )}

              {/* Children Data Step */}
              {step === "children" && currentChildIndex < childrenCount && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <h2 className="text-3xl font-display text-primary mb-2">
                    Criança {currentChildIndex + 1} de {childrenCount}
                  </h2>
                  <p className="text-muted-foreground mb-6">Nome e idade</p>
                  <div className="space-y-3">
                    <Input
                      type="text"
                      placeholder="Nome da criança"
                      value={children[currentChildIndex]?.name || ""}
                      onChange={(e) => {
                        handleChildChange(currentChildIndex, "name", e.target.value);
                        setError("");
                      }}
                      className="border-2 focus:border-gold"
                      autoFocus
                    />
                    <Input
                      type="number"
                      placeholder="Idade"
                      value={children[currentChildIndex]?.age || ""}
                      onChange={(e) => {
                        handleChildChange(currentChildIndex, "age", Number(e.target.value));
                        setError("");
                      }}
                      min="0"
                      max="18"
                      className="border-2 focus:border-gold"
                    />
                  </div>
                  {error && <div className="text-destructive text-sm mt-4">{error}</div>}
                </motion.div>
              )}

              {/* Confirmation Step */}
              {step === "confirmation" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                  >
                    <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                  </motion.div>

                  <h2 className="text-3xl font-display text-primary mb-2">Presença Confirmada!</h2>
                  <p className="text-muted-foreground mb-6">Obrigado por confirmar sua presença! Nos vemos em breve!</p>

                  <div className="bg-primary/5 rounded-lg p-4 mb-6 text-left text-sm space-y-2">
                    <p><strong>Nome:</strong> {name}</p>
                    <p><strong>Idade:</strong> {age} anos</p>
                    <p><strong>WhatsApp:</strong> {phone}</p>
                    {childrenCount > 0 && <p><strong>Crianças:</strong> {childrenCount}</p>}
                    <p>
                      <strong>Hospedagem:</strong>{" "}
                      {willStay
                        ? `Sim - Chegando ${arrivalDay === "friday" ? "sexta" : "sábado"}`
                        : "Não"}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={handleReset}
                      className="flex-1 bg-gray-200 text-gray-800 hover:bg-gray-300 py-3"
                    >
                      Fechar
                    </Button>
                    <Button
                      onClick={handleWhatsApp}
                      className="flex-1 bg-green-500 text-white hover:bg-green-600 flex items-center justify-center gap-2 py-3"
                    >
                      <Send className="w-5 h-5" />
                      Avisar Gustavo
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              {step !== "confirmation" && step !== "phone" && (
                <div className="flex gap-3 mt-8">
                  {step !== "name" && (
                    <Button
                      onClick={handlePreviousStep}
                      className="flex-1 bg-gray-200 text-gray-800 hover:bg-gray-300 py-3"
                    >
                      Voltar
                    </Button>
                  )}
                  <Button
                    onClick={step === "day" || (step === "stay" && !willStay) ? handleSubmit : handleNextStep}
                    disabled={!isStepComplete() || isLoading}
                    className="flex-1 bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50 py-3 flex items-center justify-center gap-2"
                  >
                    {step === "day" || (step === "has-children" && !hasChildrenFlag) || (step === "children" && currentChildIndex === childrenCount - 1) ? (
                      <>
                        {isLoading ? "Confirmando..." : "Confirmar"}
                      </>
                    ) : (
                      <>
                        Próximo <ChevronRight className="w-5 h-5" />
                      </>
                    )}
                  </Button>
                </div>
              )}

              {step === "phone" && (
                <Button
                  onClick={handleNextStep}
                  className="w-full mt-8 bg-primary text-primary-foreground hover:opacity-90 py-3 flex items-center justify-center gap-2"
                >
                  Próximo <ChevronRight className="w-5 h-5" />
                </Button>
              )}

              {error && step !== "ddd" && step !== "number" && step !== "phone" && (
                <div className="mt-4 bg-destructive/10 border border-destructive/30 rounded-lg p-3 text-destructive text-sm">
                  {error}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default RSVPModal;
