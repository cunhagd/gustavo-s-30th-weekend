import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Início", href: "#" },
  { label: "O Conceito", href: "#conceito" },
  { label: "Local", href: "#local" },
  { label: "Programação", href: "#programacao" },
  { label: "Menu", href: "#gastronomia" },
  { label: "Como Chegar", href: "#localizacao" },
  { label: "RSVP", href: "#rsvp" }
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-cream/95 backdrop-blur-md shadow-soft py-3"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="font-display text-2xl">
              <span className={isScrolled ? "text-primary" : "text-cream"}>G</span>
              <span className={`text-gold ${isScrolled ? "" : "text-gold-soft"}`}>30</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`font-body text-sm tracking-wider transition-colors hover:text-gold ${
                    isScrolled ? "text-foreground" : "text-cream/80"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 ${isScrolled ? "text-foreground" : "text-cream"}`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          pointerEvents: isMobileMenuOpen ? "auto" : "none"
        }}
        className="fixed inset-0 z-40 lg:hidden"
      >
        <div 
          className="absolute inset-0 bg-earth/90 backdrop-blur-md"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: isMobileMenuOpen ? 0 : "100%" }}
          transition={{ type: "tween", duration: 0.3 }}
          className="absolute right-0 top-0 bottom-0 w-3/4 max-w-sm bg-cream p-8 pt-24 shadow-elevated"
        >
          <div className="space-y-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block font-display text-2xl text-foreground hover:text-gold transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Navigation;
