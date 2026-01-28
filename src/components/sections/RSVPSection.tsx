import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, Shirt, BedDouble, CheckCircle } from "lucide-react";

const checklist = [
  {
    icon: Shirt,
    title: "Traje",
    description: "Leve roupa de banho! A festa de sábado acontece ao redor da piscina. Para a noite, leve um agasalho leve (climinha de montanha)."
  },
  {
    icon: BedDouble,
    title: "Levar na Necessaire",
    description: "Estaremos em amebiente de mata, é importante não esquecer do repelente e o protetor solar para a piscina."
  }
];

const RSVPSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 lg:py-32 bg-gradient-section">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-body text-gold text-sm tracking-[0.3em] uppercase mb-4">
            Confirmação
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary">
            Dicas Finais & RSVP
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Checklist */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <h3 className="font-display text-2xl text-foreground text-center mb-8 flex items-center justify-center gap-3">
              <CheckCircle className="w-6 h-6 text-gold" />
              Checklist do Convidado
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {checklist.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="bg-card p-6 rounded-xl shadow-soft border border-border"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-display text-xl text-foreground mb-2">
                        {item.title}
                      </h4>
                      <p className="font-body text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RSVP Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative bg-gradient-to-br from-primary/10 via-gold/5 to-terracotta/10 rounded-2xl p-8 md:p-12 border-2 border-gold/30 shadow-gold overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative text-center">
              <h3 className="font-display text-3xl md:text-4xl text-foreground mb-4">
                Confirmação de Presença
              </h3>
              <p className="font-body text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                Para organizarmos as suítes e o buffet com perfeição, confirme sua presença até <strong className="text-foreground">15 de Fevereiro de 2026</strong>.
              </p>

              <motion.a
                href="https://wa.me/5531999999999?text=Olá!%20Quero%20confirmar%20minha%20presença%20no%20aniversário%20do%20Gustavo!"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 bg-[#25D366] text-white py-4 px-8 rounded-full font-body font-semibold text-lg hover:bg-[#128C7E] transition-colors shadow-elevated"
              >
                <MessageCircle className="w-6 h-6" />
                Confirmar no WhatsApp
              </motion.a>
            </div>
          </motion.div>

          {/* Closing Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-center mt-16"
          >
            <p className="font-display text-3xl md:text-4xl text-foreground italic mb-4">
              Ficarei muito feliz se você for!
            </p>
            <div className="flex items-center justify-center gap-4 mt-8">
              <span className="h-px w-16 bg-gold" />
              <span className="h-px w-16 bg-gold" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RSVPSection;
