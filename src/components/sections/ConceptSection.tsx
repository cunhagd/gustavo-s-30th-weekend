import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import poolImage from "@/assets/pool.jpg";

const ConceptSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="conceito" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-lg shadow-elevated">
              <img
                src={poolImage}
                alt="Piscina com vista para montanhas"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-earth/20 to-transparent" />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-gold/30 rounded-lg -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:pl-8"
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary mb-8 line-decoration">
              3 Dias. Natureza. Amigos.
            </h2>
            
            <div className="space-y-6 text-muted-foreground font-body text-lg leading-relaxed">
              <p>
                Para celebrar meus 30 anos, escolhi um refúgio cercado pela mata atlântica. 
                Quero compartilhar com vocês um final de semana de <span className="text-foreground font-medium">desconexão da rotina</span> e 
                <span className="text-foreground font-medium"> conexão com o que importa</span>: boa música, gastronomia de primeira e nossa amizade.
              </p>
              
              <p>
                Prepare-se para dias de sol, piscina e um céu estrelado incrível.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10 p-6 bg-card rounded-lg border border-gold/20 shadow-soft"
            >
              <p className="font-display text-2xl text-primary italic text-center">
                "Você é meu convidado especial."
              </p>
              <p className="text-center mt-3 font-body text-gold text-sm tracking-widest uppercase">
                — Gustavo
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ConceptSection;
