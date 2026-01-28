import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mountain, Eye, Bed, Clock } from "lucide-react";
import suiteImage from "@/assets/suite.jpg";

const features = [
  {
    icon: Bed,
    title: "Suítes Confortáveis",
    description: "Quartos arejados com vista para a montanha nos Prédios das Aves e Elementos da Natureza."
  },
  {
    icon: Eye,
    title: "Privacidade Total",
    description: "As suítes ficam distantes da área de lazer, garantindo silêncio e descanso quando precisar."
  },
  {
    icon: Mountain,
    title: "Área de Lazer",
    description: "Piscina, mirante com vista panorâmica e amplo campo gramado."
  },
  {
    icon: Clock,
    title: "Check-in & Check-out",
    description: "Sexta, 17h às Domingo, 17h."
  }
];

const VenueSection = () => {
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
            O Local
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary mb-6">
            Sítio Montanha do Coiote
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
            Um espaço de natureza exuberante e visual de tirar o fôlego na região de Roças Novas.
          </p>
        </motion.div>

        {/* Image and Features Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <img
              src={suiteImage}
              alt="Suíte com vista para montanhas"
              className="w-full h-[400px] lg:h-[500px] object-cover rounded-lg shadow-elevated"
            />
            {/* Overlay badge */}
            <div className="absolute bottom-6 left-6 right-6 bg-cream/95 backdrop-blur-sm rounded-lg p-4 shadow-soft">
              <p className="font-display text-lg text-primary text-center">
                Infraestrutura completa para seu conforto
              </p>
            </div>
          </motion.div>

          {/* Features */}
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="bg-card p-6 rounded-lg shadow-soft border border-border hover:border-gold/30 transition-colors"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-xl text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VenueSection;
