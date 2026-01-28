import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { UtensilsCrossed, Wine, Beer, GlassWater } from "lucide-react";
import churrascoImage from "@/assets/churrasco.jpg";

const meals = [
  { label: "Café da Manhã", description: "Pão de queijo, quitandas mineiras, bolos, frios e sucos" },
  { label: "Sexta (Jantar)", description: "Strogonoff clássico com batata palha artesanal" },
  { label: "Sábado (O Churrasco)", description: "Costelão, Picanha (Bovina e Suína), Contra Filé, Linguiça, Coraçãozinho • Queijo coalho, Pão de alho" },
  { label: "Domingo (Almoço)", description: "Franguinho ensopado com a famosa macarronese" }
];

const drinks = [
  { icon: Beer, label: "Cerveja", items: "Heineken (Original)" },
  { icon: Wine, label: "Vinhos", items: "Tinto Tarapacá Cosecha & Rosé Casal Mendes" },
  { icon: GlassWater, label: "Destilados", items: "Whisky Jack Daniel's & Gin Tanqueray" },
  { icon: GlassWater, label: "Refresh", items: "Coca-Cola, Guaraná (Normal/Zero), Água Tônica e Sucos" }
];

const GastronomySection = () => {
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
            Gastronomia
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary mb-4">
            Menu Exclusivo
          </h2>
          <p className="font-body text-muted-foreground text-lg flex items-center justify-center gap-2">
            <UtensilsCrossed className="w-5 h-5 text-gold" />
            Sob o comando dos Chefs Henrique e Andrea
            <UtensilsCrossed className="w-5 h-5 text-gold" />
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Food Section */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative mb-8">
              <img
                src={churrascoImage}
                alt="Churrasco"
                className="w-full h-64 object-cover rounded-lg shadow-elevated"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-earth/40 to-transparent rounded-lg" />
              <div className="absolute bottom-4 left-4">
                <span className="bg-gold text-earth px-4 py-2 rounded-full font-body text-sm font-semibold">
                  Open Food
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {meals.map((meal, index) => (
                <motion.div
                  key={meal.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="p-4 bg-card rounded-lg border border-border hover:border-gold/20 transition-colors"
                >
                  <h4 className="font-display text-lg text-foreground mb-1">
                    {meal.label}
                  </h4>
                  <p className="font-body text-sm text-muted-foreground">
                    {meal.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Drinks Section */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-primary/5 rounded-xl p-8 border border-primary/10">
              <div className="flex items-center justify-center gap-3 mb-8">
                <Wine className="w-8 h-8 text-gold" />
                <h3 className="font-display text-3xl text-foreground">
                  Premium Open Bar
                </h3>
              </div>

              <div className="space-y-6">
                {drinks.map((drink, index) => (
                  <motion.div
                    key={drink.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center shrink-0">
                      <drink.icon className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h4 className="font-body font-semibold text-foreground mb-1">
                        {drink.label}
                      </h4>
                      <p className="font-body text-sm text-muted-foreground">
                        {drink.items}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Decorative */}
              <div className="mt-8 pt-6 border-t border-primary/10 text-center">
                <p className="font-display text-lg text-muted-foreground italic">
                  "Bebida gelada, comida de qualidade e boa companhia"
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GastronomySection;
