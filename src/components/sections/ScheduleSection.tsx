import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, PartyPopper, Sun } from "lucide-react";

const days = [
  {
    day: "SEXTA-FEIRA",
    date: "13.03",
    theme: "Welcome",
    icon: Heart,
    highlight: true,
    events: [
      { time: "17h", title: "Início da Hospedagem & Check-in" },
      { 
        time: "21h", 
        title: "🍷🔥 Jantar Especial - Noite de Strogonoff & Vinhos ",
        special: true,
        specialNote: "🥂 Celebração dos 39 anos de casamento de Henrique & Soraia"
      }
    ]
  },
  {
    day: "SÁBADO",
    date: "14.03",
    theme: "Aniversário",
    subtitle: "Pool Party",
    icon: PartyPopper,
    events: [
      { time: "07h", title: "☕ Café da Manhã" },
      { time: "11h", title: "🍖🏊🏻Início do Churrasco na Piscina" },
      { time: "12h às 15h", title: "🎶 Show Sertanejo Ao Vivo" },
      { time: "18h em diante", title: "🎤 Karaokê Liberado" },
      { time: "22h", title: "🍽️ Jantar Anti-Ressaca" }
    ]
  },
  {
    day: "DOMINGO",
    date: "15.03",
    theme: "Relaxamento & Despedida",
    icon: Sun,
    events: [
      { time: "07h", title: "☕ Café da Manhã" },
      { time: "12h", title: "🥘 Almoço de Despedida" },
      { time: "17h", title: "⏳ Encerramento e Check-out" }
    ]
  }
];

const ScheduleSection = () => {
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
            Programação
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary">
            3 Dias Inesquecíveis
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          {days.map((day, dayIndex) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + dayIndex * 0.15 }}
              className="relative mb-12 last:mb-0"
            >
              {/* Connecting line */}
              {dayIndex < days.length - 1 && (
                <div className="absolute left-6 top-20 bottom-0 w-px bg-gradient-to-b from-gold/50 to-border hidden md:block" />
              )}

              {/* Day Header */}
              <div className={`flex items-start gap-6 mb-6 ${day.highlight ? 'relative' : ''}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                  day.highlight 
                    ? 'bg-gradient-to-br from-gold to-gold-soft shadow-gold' 
                    : 'bg-primary/10'
                }`}>
                  <day.icon className={`w-6 h-6 ${day.highlight ? 'text-earth' : 'text-primary'}`} />
                </div>
                <div>
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <h3 className="font-display text-2xl md:text-3xl text-foreground">
                      {day.day}
                    </h3>
                    <span className="font-body text-gold font-medium">
                      | {day.date}
                    </span>
                  </div>
                  <p className="font-display text-xl text-muted-foreground italic">
                    {day.theme} {day.subtitle && <span className="text-gold">({day.subtitle})</span>}
                  </p>
                </div>
              </div>

              {/* Events */}
              <div className="ml-0 md:ml-18 space-y-4 md:pl-18">
                {day.events.map((event, eventIndex) => (
                  <motion.div
                    key={event.time}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + dayIndex * 0.15 + eventIndex * 0.05 }}
                    className={`flex gap-4 md:gap-6 p-4 rounded-lg transition-colors ${
                      event.special 
                        ? 'bg-gradient-to-r from-gold/10 to-terracotta/10 border border-gold/30' 
                        : 'bg-card hover:bg-muted/50'
                    }`}
                  >
                    <span className="font-body text-sm text-gold font-semibold w-24 shrink-0">
                      {event.time}
                    </span>
                    <div>
                      <p className="font-body text-foreground">
                        {event.title}
                      </p>
                      {event.special && event.specialNote && (
                        <p className="font-display text-lg text-terracotta mt-2 italic">
                          {event.specialNote}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Special Anniversary Card for Friday */}
              {day.highlight && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="mt-8 ml-0 md:ml-18 md:pl-18"
                >
                  <div className="relative p-8 bg-gradient-to-br from-gold/5 via-terracotta/5 to-primary/5 rounded-xl border-2 border-gold/40 shadow-gold overflow-hidden">
                    {/* Decorative hearts */}
                    <div className="absolute top-4 right-4 opacity-20">
                      <Heart className="w-16 h-16 text-gold" fill="currentColor" />
                    </div>
                    <div className="absolute bottom-4 left-4 opacity-10">
                      <Heart className="w-10 h-10 text-terracotta" fill="currentColor" />
                    </div>
                    
                    <div className="relative text-center">
                      <p className="font-body text-gold text-sm tracking-[0.2em] uppercase mb-3">
                        Celebração Especial
                      </p>
                      <h4 className="font-display text-3xl md:text-4xl text-foreground mb-2">
                        Henrique & Soraia
                      </h4>
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="h-px w-8 bg-gold" />
                        <span className="font-display text-5xl text-gradient-gold font-semibold">39</span>
                        <span className="h-px w-8 bg-gold" />
                      </div>
                      <p className="font-display text-xl text-muted-foreground italic">
                        Anos de Casamento
                      </p>
                      <p className="font-body text-sm text-terracotta mt-4">
                        Uma história de amor que inspira toda a família 💕
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;
