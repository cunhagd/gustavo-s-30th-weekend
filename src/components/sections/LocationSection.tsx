import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, AlertTriangle, Navigation, ExternalLink } from "lucide-react";

const directions = [
  "Pegue a BR-381 por aprox. 45km",
  "Vire à esquerda na estrada para Taquaraçu de Minas (percorra 3km)",
  "Vire à direita e siga por 2km em estrada de terra (acesso super tranquilo)"
];

const LocationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 lg:py-32 bg-background">
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
            Localização
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary mb-4">
            Como Chegar
          </h2>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <MapPin className="w-5 h-5 text-terracotta" />
            <p className="font-body text-lg">
              Sítio Montanha do Coiote • Estrada para Roças Novas, Área Rural - Caeté/MG
            </p>
          </div>
        </motion.div>

        {/* Warning Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="bg-destructive/10 border-2 border-destructive/40 rounded-xl p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-destructive/20 rounded-full flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <h3 className="font-display text-2xl text-destructive mb-2">
                  ⚠️ Aviso Importante de GPS
                </h3>
                <p className="font-body text-foreground text-lg">
                  Utilize <strong className="text-destructive">APENAS o Google Maps</strong>. 
                  O Waze não identifica o local corretamente e pode te levar para o caminho errado.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* Directions */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-card rounded-xl p-8 shadow-soft border border-border h-full">
              <div className="flex items-center gap-3 mb-6">
                <Navigation className="w-6 h-6 text-primary" />
                <h3 className="font-display text-2xl text-foreground">
                  O Trajeto <span className="text-muted-foreground text-lg">(50km de BH)</span>
                </h3>
              </div>

              <div className="space-y-4">
                {directions.map((direction, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shrink-0 text-primary-foreground font-body font-semibold text-sm">
                      {index + 1}
                    </div>
                    <p className="font-body text-foreground pt-1">
                      {direction}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.a
                href="https://maps.google.com/?q=-19.7291781,-43.6495772"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-8 w-full flex items-center justify-center gap-3 bg-primary text-primary-foreground py-4 px-6 rounded-lg font-body font-semibold hover:opacity-90 transition-opacity"
              >
                <MapPin className="w-5 h-5" />
                Abrir no Google Maps
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            </div>
          </motion.div>

          {/* Map Embed */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-full min-h-[400px]"
          >
            <div className="bg-muted rounded-xl overflow-hidden shadow-elevated h-full relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.8433422288766!2d-43.65215210000001!3d-19.7291781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa5d380e6a357c9%3A0xa7facf75d6ed185a!2sSítio%20Montanhas%20do%20Coiote!5e0!3m2!1spt-BR!2sbr!4v1704067200"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização do Sítio Montanha do Coiote"
              />
              {/* Overlay with info */}
              <div className="absolute bottom-4 left-4 right-4 bg-cream/95 backdrop-blur-sm rounded-lg p-3 shadow-soft">
                <p className="font-body text-sm text-center text-foreground">
                  📍 Região de Roças Novas, Caeté - MG
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
