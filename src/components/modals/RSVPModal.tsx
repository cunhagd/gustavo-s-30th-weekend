import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, CheckCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Child {
  name: string;
  age: number;
  willStay: boolean;
  arrivalDay: "friday" | "saturday" | "";
}

interface RSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

const RSVPModal = ({ isOpen, onClose }: RSVPModalProps) => {
  const [step, setStep] = useState<"form" | "children" | "confirmation">("form");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Form data
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [hasChildren, setHasChildren] = useState(false);
  const [childrenCount, setChildrenCount] = useState(0);
  const [children, setChildren] = useState<Child[]>([]);
  const [willStay, setWillStay] = useState(false);
  const [arrivalDay, setArrivalDay] = useState<"friday" | "saturday">("");

  const [guestId, setGuestId] = useState("");

  // Validações
  const isFormValid = name.trim() && age && !isNaN(Number(age));
  const areChildrenValid =
    !hasChildren ||
    (children.length === childrenCount &&
      children.every((c) => c.name && c.age && (c.willStay ? c.arrivalDay : true)));
  const isFinalValid =
    isFormValid && areChildrenValid && (willStay ? arrivalDay : true);

  const handleFormSubmit = () => {
    if (!isFormValid) {
      setError("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    if (hasChildren && childrenCount > 0) {
      setChildren(
        Array.from({ length: childrenCount }, (_, i) => children[i] || {
          name: "",
          age: 0,
          willStay: false,
          arrivalDay: "",
        })
      );
      setStep("children");
    } else {
      setStep("confirmation");
    }
  };

  const handleChildChange = (index: number, field: string, value: any) => {
    const newChildren = [...children];
    newChildren[index] = { ...newChildren[index], [field]: value };
    setChildren(newChildren);
  };

  const handleChildrenSubmit = () => {
    if (!areChildrenValid) {
      setError("Por favor, preencha os dados de todos os filhos");
      return;
    }
    setStep("confirmation");
  };

  const handleSubmit = async () => {
    if (!isFinalValid) {
      setError("Por favor, complete todas as informações");
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
          hasChildren,
          children: hasChildren ? children : [],
          willStay,
          arrivalDay: willStay ? arrivalDay : undefined,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erro ao confirmar presença");
      }

      const data = await response.json();
      setGuestId(data.guest._id);
      setStep("confirmation");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsApp = () => {
    const phone = "+5531982000908";
    const message =
      "Acabei de confirmar presença no seu aniversário!";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleReset = () => {
    setName("");
    setAge("");
    setHasChildren(false);
    setChildrenCount(0);
    setChildren([]);
    setWillStay(false);
    setArrivalDay("");
    setError("");
    setStep("form");
    setGuestId("");
    onClose();
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
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
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
              {/* Form Step */}
              {step === "form" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h2 className="text-3xl font-display text-primary mb-2">
                    Confirme sua Presença
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Preencha os dados para confirmar sua participação no aniversário
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Nome *
                      </label>
                      <Input
                        type="text"
                        placeholder="Seu nome completo"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          setError("");
                        }}
                        className="border-2 focus:border-gold"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Idade *
                      </label>
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
                        className="border-2 focus:border-gold"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-3">
                        Você possui filhos? *
                      </label>
                      <div className="flex gap-4">
                        {[true, false].map((value) => (
                          <button
                            key={String(value)}
                            onClick={() => {
                              setHasChildren(value);
                              if (!value) setChildrenCount(0);
                              setError("");
                            }}
                            className={`flex-1 py-3 px-4 rounded-lg border-2 font-semibold transition-colors ${
                              hasChildren === value
                                ? "border-gold bg-gold/10 text-primary"
                                : "border-border text-muted-foreground hover:border-gold/50"
                            }`}
                          >
                            {value ? "Sim" : "Não"}
                          </button>
                        ))}
                      </div>
                    </div>

                    {hasChildren && (
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Quantos filhos? *
                        </label>
                        <Input
                          type="number"
                          placeholder="Quantidade"
                          value={childrenCount}
                          onChange={(e) => {
                            const value = Number(e.target.value);
                            setChildrenCount(Math.min(value, 5)); // máx 5 filhos
                            setError("");
                          }}
                          min="1"
                          max="5"
                          className="border-2 focus:border-gold"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-3">
                        Você vai dormir lá? *
                      </label>
                      <div className="flex gap-4">
                        {[true, false].map((value) => (
                          <button
                            key={String(value)}
                            onClick={() => {
                              setWillStay(value);
                              if (!value) setArrivalDay("");
                              setError("");
                            }}
                            className={`flex-1 py-3 px-4 rounded-lg border-2 font-semibold transition-colors ${
                              willStay === value
                                ? "border-gold bg-gold/10 text-primary"
                                : "border-border text-muted-foreground hover:border-gold/50"
                            }`}
                          >
                            {value ? "Sim" : "Não"}
                          </button>
                        ))}
                      </div>
                    </div>

                    {willStay && (
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-3">
                          Qual dia você chega? *
                        </label>
                        <div className="space-y-2">
                          {(["friday", "saturday"] as const).map((day) => (
                            <button
                              key={day}
                              onClick={() => {
                                setArrivalDay(day);
                                setError("");
                              }}
                              className={`w-full py-3 px-4 rounded-lg border-2 font-semibold transition-colors text-left ${
                                arrivalDay === day
                                  ? "border-gold bg-gold/10 text-primary"
                                  : "border-border text-muted-foreground hover:border-gold/50"
                              }`}
                            >
                              {day === "friday"
                                ? "Sexta-feira (após as 17h)"
                                : "Sábado (após as 07h)"}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {error && (
                      <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 text-destructive text-sm">
                        {error}
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={handleFormSubmit}
                    disabled={!isFormValid}
                    className="w-full mt-8 bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    Próximo Passo <ChevronRight className="w-5 h-5" />
                  </Button>
                </motion.div>
              )}

              {/* Children Step */}
              {step === "children" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h2 className="text-3xl font-display text-primary mb-2">
                    Dados dos Filhos
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Preencha as informações de cada filho
                  </p>

                  <div className="space-y-6 max-h-96 overflow-y-auto">
                    {children.map((child, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border-2 border-border rounded-lg p-4"
                      >
                        <h3 className="font-semibold text-foreground mb-4">
                          Filho #{index + 1}
                        </h3>

                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-semibold mb-1">
                              Nome *
                            </label>
                            <Input
                              type="text"
                              placeholder="Nome do filho"
                              value={child.name || ""}
                              onChange={(e) =>
                                handleChildChange(index, "name", e.target.value)
                              }
                              className="border-2"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold mb-1">
                              Idade *
                            </label>
                            <Input
                              type="number"
                              placeholder="Idade"
                              value={child.age || ""}
                              onChange={(e) =>
                                handleChildChange(index, "age", Number(e.target.value))
                              }
                              min="1"
                              max="18"
                              className="border-2"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold mb-3">
                              {child.name || "Este filho"} vai dormir? *
                            </label>
                            <div className="flex gap-3">
                              {[true, false].map((value) => (
                                <button
                                  key={String(value)}
                                  onClick={() =>
                                    handleChildChange(index, "willStay", value)
                                  }
                                  className={`flex-1 py-2 px-3 rounded-lg border-2 text-sm font-semibold transition-colors ${
                                    child.willStay === value
                                      ? "border-gold bg-gold/10 text-primary"
                                      : "border-border text-muted-foreground"
                                  }`}
                                >
                                  {value ? "Sim" : "Não"}
                                </button>
                              ))}
                            </div>
                          </div>

                          {child.willStay && (
                            <div>
                              <label className="block text-sm font-semibold mb-3">
                                Qual dia chega? *
                              </label>
                              <div className="space-y-2">
                                {(["friday", "saturday"] as const).map((day) => (
                                  <button
                                    key={day}
                                    onClick={() =>
                                      handleChildChange(index, "arrivalDay", day)
                                    }
                                    className={`w-full py-2 px-3 rounded-lg border-2 text-sm font-semibold transition-colors text-left ${
                                      child.arrivalDay === day
                                        ? "border-gold bg-gold/10 text-primary"
                                        : "border-border text-muted-foreground"
                                    }`}
                                  >
                                    {day === "friday"
                                      ? "Sexta-feira (17h+)"
                                      : "Sábado (07h+)"}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {error && (
                    <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 text-destructive text-sm mt-4">
                      {error}
                    </div>
                  )}

                  <div className="flex gap-3 mt-8">
                    <Button
                      onClick={() => setStep("form")}
                      className="flex-1 bg-gray-200 text-gray-800 hover:bg-gray-300"
                    >
                      Voltar
                    </Button>
                    <Button
                      onClick={handleChildrenSubmit}
                      disabled={!areChildrenValid}
                      className="flex-1 bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      Próximo <ChevronRight className="w-5 h-5" />
                    </Button>
                  </div>
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

                  <h2 className="text-3xl font-display text-primary mb-2">
                    Presença Confirmada!
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Obrigado por confirmar sua presença no aniversário. Nos vemos em breve!
                  </p>

                  <div className="bg-primary/5 rounded-lg p-4 mb-6 text-left">
                    <p className="text-sm text-muted-foreground mb-1">
                      <strong>Nome:</strong> {name}
                    </p>
                    <p className="text-sm text-muted-foreground mb-1">
                      <strong>Idade:</strong> {age} anos
                    </p>
                    {hasChildren && children.length > 0 && (
                      <p className="text-sm text-muted-foreground mb-1">
                        <strong>Filhos:</strong> {children.length}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground">
                      <strong>Hospedagem:</strong>{" "}
                      {willStay
                        ? `Sim - Chegando ${arrivalDay === "friday" ? "sexta" : "sábado"}`
                        : "Não"}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={handleReset}
                      className="flex-1 bg-gray-200 text-gray-800 hover:bg-gray-300"
                    >
                      Fechar
                    </Button>
                    <Button
                      onClick={handleWhatsApp}
                      className="flex-1 bg-green-500 text-white hover:bg-green-600 flex items-center justify-center gap-2"
                    >
                      <Send className="w-5 h-5" />
                      Avisar Gustavo via WhatsApp
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default RSVPModal;
