import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary py-12">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Logo */}
          <div className="mb-6">
            <span className="font-display text-4xl text-primary-foreground">Gustavo </span>
            <span className="font-display text-4xl text-gradient-gold">30tou</span>
          </div>

          {/* Dates */}
          <p className="font-body text-primary-foreground/80 text-sm tracking-widest mb-4">
            13, 14 e 15 de Março de 2026
          </p>

          {/* Location */}
          <p className="font-body text-gold-soft text-sm tracking-wider mb-8">
            Sítio Montanha do Coiote • Caeté, MG
          </p>

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="h-px w-20 bg-primary-foreground/20" />
            <Heart className="w-4 h-4 text-gold" fill="currentColor" />
            <span className="h-px w-20 bg-primary-foreground/20" />
          </div>

          {/* Anniversary Note */}
          <div className="mb-8">
            <p className="font-display text-lg text-primary-foreground/70 italic">
              Celebrando também os 39 anos de
            </p>
            <p className="font-display text-xl text-gold-soft">
              Henrique & Soraia
            </p>
          </div>

          {/* Copyright */}
          <p className="font-body text-xs text-primary-foreground/40">
            Com carinho, Gustavo!
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
