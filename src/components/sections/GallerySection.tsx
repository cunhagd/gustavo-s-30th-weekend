import { motion, useInView } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bed, Sofa, Trees } from "lucide-react";

// Importar todas as imagens dinamicamente
const quartosImages = import.meta.glob("/src/assets/carrossel/quartos/*", { eager: true });
const salaImages = import.meta.glob("/src/assets/carrossel/sala-de-estar/*", { eager: true });
const areaExternaImages = import.meta.glob("/src/assets/carrossel/area-externa/*", { eager: true });

// Converter imports para array de URLs
const getImagesFromGlob = (globImages: Record<string, any>) => {
  return Object.entries(globImages)
    .sort(([keyA], [keyB]) => {
      const numA = parseInt(keyA.match(/\/(\d+)\./)?.[1] || "0");
      const numB = parseInt(keyB.match(/\/(\d+)\./)?.[1] || "0");
      return numA - numB;
    })
    .map(([_, module]) => (module as any).default || module);
};

const quartosArray = getImagesFromGlob(quartosImages);
const salaArray = getImagesFromGlob(salaImages);
const areaExternaArray = getImagesFromGlob(areaExternaImages);

const galleryData = [
  {
    id: "area-externa",
    title: "Área Externa",
    icon: Trees,
    description: "Piscina, mirante e áreas verdes",
    images: areaExternaArray,
  },
  {
    id: "sala-de-estar",
    title: "Sala de Estar",
    icon: Sofa,
    description: "Espaços aconchegantes para convivência e descanso",
    images: salaArray,
  },
  {
    id: "quartos",
    title: "Quartos",
    icon: Bed,
    description: "Suítes confortáveis com vista para a montanha",
    images: quartosArray,
  }
];

const GalleryImage = ({ src }: { src: string }) => {
  return (
    <img
      src={src}
      alt="Gallery image"
      className="w-full h-full object-cover rounded-lg"
    />
  );
};

const GallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState("area-externa");

  // Encontrar a seção ativa
  const activeSection = useMemo(
    () => galleryData.find(section => section.id === activeTab),
    [activeTab]
  );

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-slate-50 to-white">
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
            Conheça
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary mb-6">
            As Áreas da Casa
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore cada espaço do sítio com fotos das áreas de hospedagem, convivência e lazer
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-12">
              {galleryData.map((section) => {
                const Icon = section.icon;
                return (
                  <TabsTrigger key={section.id} value={section.id} className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{section.title}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {galleryData.map((section) => (
              <TabsContent key={section.id} value={section.id} className="mt-8">
                {/* Section Description */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center mb-8"
                >
                  <h3 className="text-2xl md:text-3xl font-display text-primary mb-2">
                    {section.title}
                  </h3>
                  <p className="text-muted-foreground">{section.description}</p>
                </motion.div>

                {/* Carousel */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-full"
                >
                  <Carousel className="w-full">
                    <CarouselContent>
                      {section.images.map((imageSrc, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                          <div className="aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <GalleryImage src={imageSrc} />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden md:flex" />
                    <CarouselNext className="hidden md:flex" />
                  </Carousel>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
};

export default GallerySection;
