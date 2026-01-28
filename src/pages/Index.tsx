import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ConceptSection from "@/components/sections/ConceptSection";
import VenueSection from "@/components/sections/VenueSection";
import GallerySection from "@/components/sections/GallerySection";
import ScheduleSection from "@/components/sections/ScheduleSection";
import GastronomySection from "@/components/sections/GastronomySection";
import LocationSection from "@/components/sections/LocationSection";
import RSVPSection from "@/components/sections/RSVPSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main>
        <HeroSection />
        
        <div id="conceito">
          <ConceptSection />
        </div>
        
        <div id="local">
          <VenueSection />
        </div>
        
        <div id="galeria">
          <GallerySection />
        </div>
        
        <div id="programacao">
          <ScheduleSection />
        </div>
        
        <div id="gastronomia">
          <GastronomySection />
        </div>
        
        <div id="localizacao">
          <LocationSection />
        </div>
        
        <div id="rsvp">
          <RSVPSection />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
