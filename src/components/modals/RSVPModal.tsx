import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface RSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

const STEP_EMOJIS: Record<string, string> = {
  name: "👤",
  age: "🎂",
  ddd: "📱",
  number: "🔢",
  stay: "🏨",
  day: "📅",
  confirmation: "🎉",
};

const RSVPModal = ({ isOpen, onClose }: RSVPModalProps) => {
  const [step, setStep] = useState<"name" | "age" | "ddd" | "number" | "stay" | "day" | "confirmation">("name");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Form data
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phoneDDD, setPhoneDDD] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [willStay, setWillStay] = useState<boolean | null>(null);
  const [arrivalDay, setArrivalDay] = useState<"friday" | "saturday" | "">("");
  const [guestId, setGuestId] = useState("");

  // Validações por step
  const isNameValid = name.trim().length >= 2;
  const isAgeValid = age && !isNaN(Number(age)) && Number(age) > 0 && Number(age) <= 120;
  const isDDDValid = phoneDDD.length === 2 && /^\d{2}$/.test(phoneDDD);
  const isPhoneValid = (phoneNumber.length === 8 || phoneNumber.length === 9) && /^\d{8,9}$/.test(phoneNumber);
  const isStayValid = willStay !== null;
  const isDayValid = !willStay || (willStay && arrivalDay !== "");

  const phone = `(${phoneDDD})${phoneNumber}`;

  const handlePhoneNumberInput = (value: string) => {
    const cleanedValue = value.replace(/\D/g, "");
    if (cleanedValue.length <= 9) {
      setPhoneNumber(cleanedValue);
    }
  };

  const handleDDDInput = (value: string) => {
    const cleanedValue = value.replace(/\D/g, "");
    if (cleanedValue.length <= 2) {
      setPhoneDDD(cleanedValue);
    }
  };

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
      setStep("confirmation");
    }
  };

  const handlePreviousStep = () => {
    if (step === "day") {
      setStep("stay");
    } else if (step === "number") {
      setStep("ddd");
    } else if (step === "ddd") {
      setStep("age");
    } else if (step === "age") {
      setStep("name");
    }
    setError("");
  };

  const handleSubmit = async () => {
    if (isLoading) return;

    // Validações finais
    if (!name || !age || !phone) {
      setError("Por favor preencha todos os campos obrigatórios");
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
          hasChildren: false,
          children: [],
          willStay: willStay === true,
          arrivalDay: willStay ? arrivalDay : null,
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
    setWillStay(null);
    setArrivalDay("");
    setGuestId("");
    setStep("name");
    setError("");
  };

  const isStepComplete = () => {
    switch (step) {
      case "name":
        return isNameValid;
      case "age":
        return isAgeValid;
      case "ddd":
        return isDDDValid;
      case "number":
        return isPhoneValid;
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

  // Calcular progresso
  const steps: typeof step[] = ["name", "age", "ddd", "number", "stay"];
  if (willStay) {
    steps.push("day");
  }
  const currentStepIndex = steps.indexOf(step as any);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Step indicator com emoji */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <motion.div
                  className="text-4xl"
                  key={step}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", damping: 10, stiffness: 100 }}
                >
                  {STEP_EMOJIS[step]}
                </motion.div>
                <div className="text-sm font-semibold text-gray-600">
                  {steps.indexOf(step as any) + 1}/{steps.length}
                </div>
              </div>
              <motion.div
                className="w-full h-2 bg-gray-200 rounded-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-gold to-amber-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ type: "spring", damping: 20, stiffness: 100 }}
                />
              </motion.div>
            </div>

            {/* Content */}
            <div className="min-h-64 flex flex-col justify-between">
              <AnimatePresence mode="wait">
                {/* Name Step */}
                {step === "name" && (
                  <motion.div
                    key="name"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-3xl font-display text-primary mb-2">Qual é o seu nome?</h2>
                    <p className="text-muted-foreground mb-6">Vamos começar com o básico</p>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Digite seu nome"
                      className="py-3 text-lg"
                      onKeyPress={(e) => e.key === "Enter" && isStepComplete() && handleNextStep()}
                      autoFocus
                    />
                  </motion.div>
                )}

                {/* Age Step */}
                {step === "age" && (
                  <motion.div
                    key="age"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-3xl font-display text-primary mb-2">Quantos anos você tem?</h2>
                    <p className="text-muted-foreground mb-6">Só para confirmar</p>
                    <Input
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="Idade"
                      type="number"
                      className="py-3 text-lg"
                      onKeyPress={(e) => e.key === "Enter" && isStepComplete() && handleNextStep()}
                      autoFocus
                    />
                  </motion.div>
                )}

                {/* DDD Step */}
                {step === "ddd" && (
                  <motion.div
                    key="ddd"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-3xl font-display text-primary mb-2">Qual é seu WhatsApp?</h2>
                    <p className="text-muted-foreground mb-6">
                      No formato (XX)XXXXX-XXXX (8 ou 9 dígitos)<br />
                      <span className="text-sm">Só entrarei em contato caso realmente seja necessário</span>
                    </p>
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-muted-foreground mb-4 text-sm">Digite o DDD (2 dígitos):</p>
                    <Input
                      value={phoneDDD}
                      onChange={(e) => handleDDDInput(e.target.value)}
                      placeholder="Ex: 31"
                      maxLength={2}
                      className="py-3 text-lg text-center text-2xl font-bold"
                      onKeyPress={(e) => e.key === "Enter" && isDDDValid && handleNextStep()}
                      autoFocus
                    />
                    </div>
                  </motion.div>
                )}

                {/* Phone Number Step */}
                {step === "number" && (
                  <motion.div
                    key="number"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-3xl font-display text-primary mb-2">Número</h2>
                    <p className="text-muted-foreground mb-6">8 ou 9 dígitos</p>
                    <div className="flex gap-3 items-center">
                      <span className="text-2xl font-bold text-primary">({phoneDDD})</span>
                      <Input
                        value={phoneNumber}
                        onChange={(e) => handlePhoneNumberInput(e.target.value)}
                        placeholder="Digite o número"
                        maxLength={9}
                        className="py-3 text-lg text-2xl font-bold"
                        onKeyPress={(e) => e.key === "Enter" && isPhoneValid && handleNextStep()}
                        autoFocus
                      />
                    </div>
                  </motion.div>
                )}

                {/* Stay Step */}
                {step === "stay" && (
                  <motion.div
                    key="stay"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-3xl font-display text-primary mb-2">Vai dormir por lá?</h2>
                    <p className="text-muted-foreground mb-6">Preciso saber para o planejamento</p>
                    <div className="flex gap-4">
                      {[true, false].map((value) => (
                        <motion.button
                          key={String(value)}
                          onClick={() => {
                            setWillStay(value);
                            setError("");
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`flex-1 py-4 px-4 rounded-lg border-2 font-semibold transition-all text-lg ${
                            willStay === value
                              ? "border-gold bg-gold/10 text-primary"
                              : "border-border text-muted-foreground hover:border-gold/50"
                          }`}
                        >
                          {value ? "Sim 🛏️" : "Não 🚗"}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Day Step */}
                {step === "day" && willStay && (
                  <motion.div
                    key="day"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-3xl font-display text-primary mb-2">Qual dia você chega?</h2>
                    <p className="text-muted-foreground mb-6">Sexta ou sábado?</p>
                    <div className="flex gap-4">
                      {[
                        { value: "friday", label: "Sexta 🌙", emoji: "😴" },
                        { value: "saturday", label: "Sábado ☀️", emoji: "⛅" },
                      ].map(({ value, label }) => (
                        <motion.button
                          key={value}
                          onClick={() => {
                            setArrivalDay(value as "friday" | "saturday");
                            setError("");
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`flex-1 py-4 px-4 rounded-lg border-2 font-semibold transition-all text-lg ${
                            arrivalDay === value
                              ? "border-gold bg-gold/10 text-primary"
                              : "border-border text-muted-foreground hover:border-gold/50"
                          }`}
                        >
                          {label}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Confirmation Step */}
                {step === "confirmation" && (
                  <motion.div
                    key="confirmation"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="text-center"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", damping: 10, stiffness: 100, delay: 0.2 }}
                      className="mb-4"
                    >
                      <CheckCircle className="w-16 h-16 text-gold mx-auto" />
                    </motion.div>
                    <h2 className="text-3xl font-display text-primary mb-2">Presença Confirmada! 🎉</h2>
                    <p className="text-muted-foreground mb-6">
                      Obrigado, {name}! Sua presença foi registrada com sucesso.
                    </p>
                    <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left text-sm">
                      <p className="mb-2"><strong>Nome:</strong> {name}</p>
                      <p className="mb-2"><strong>Idade:</strong> {age}</p>
                      <p className="mb-2"><strong>WhatsApp:</strong> {phone}</p>
                      <p className="mb-2"><strong>Vai dormir:</strong> {willStay ? "Sim" : "Não"}</p>
                      {willStay && <p><strong>Chegada:</strong> {arrivalDay === "friday" ? "Sexta-feira" : "Sábado"}</p>}
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">
                      Em breve entrarei em contato via WhatsApp para confirmar os detalhes.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {error && step !== "ddd" && step !== "number" && step !== "phone" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 bg-destructive/10 border border-destructive/30 rounded-lg p-3 text-destructive text-sm"
                >
                  {error}
                </motion.div>
              )}
            </div>

            {/* Navigation Buttons */}
            {step !== "confirmation" && (
              <div className="flex gap-3 mt-8">
                {step !== "name" && (
                  <Button
                    onClick={handlePreviousStep}
                    className="flex-1 bg-gray-200 text-gray-800 hover:bg-gray-300 py-3"
                  >
                    ← Voltar
                  </Button>
                )}
                <Button
                  onClick={step === "day" ? handleSubmit : handleNextStep}
                  disabled={!isStepComplete() || isLoading}
                  className="flex-1 bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50 py-3 flex items-center justify-center gap-2"
                >
                  {step === "day" ? (
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

            {/* Confirmation Actions */}
            {step === "confirmation" && (
              <div className="flex gap-3 mt-8">
                <Button
                  onClick={handleReset}
                  className="flex-1 bg-gray-200 text-gray-800 hover:bg-gray-300 py-3"
                >
                  Confirmar Outro Convidado
                </Button>
                <Button
                  onClick={handleWhatsApp}
                  className="flex-1 bg-green-500 text-white hover:bg-green-600 py-3 flex items-center justify-center gap-2"
                >
                  Enviar Mensagem 💬
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default RSVPModal;
