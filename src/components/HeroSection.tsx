import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Globe, Camera, MapPin } from 'lucide-react';

interface HeroSectionProps {
  onPlanTripClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onPlanTripClick }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-magical">
      {/* Doraemon Dimensional Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-magical"></div>
        {/* Floating stars/sparkles */}
        <div className="absolute top-20 left-20 animate-sparkle" style={{ animationDelay: '0s' }}>
          <div className="w-2 h-2 bg-doraemon-yellow rounded-full"></div>
        </div>
        <div className="absolute top-40 right-32 animate-sparkle" style={{ animationDelay: '1s' }}>
          <div className="w-3 h-3 bg-doraemon-white rounded-full"></div>
        </div>
        <div className="absolute bottom-32 left-1/4 animate-sparkle" style={{ animationDelay: '2s' }}>
          <div className="w-2 h-2 bg-doraemon-red rounded-full"></div>
        </div>
      </div>
      
      {/* Floating Doraemon Gadgets */}
      <div className="absolute top-16 right-16 animate-gadget-float opacity-60" style={{ animationDelay: '0s' }}>
        <div className="w-12 h-12 bg-doraemon-red rounded-lg flex items-center justify-center">
          <Zap className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="absolute top-32 left-16 animate-gadget-float opacity-60" style={{ animationDelay: '1s' }}>
        <div className="w-10 h-10 bg-doraemon-yellow rounded-full flex items-center justify-center">
          <Globe className="w-5 h-5 text-doraemon-blue" />
        </div>
      </div>
      <div className="absolute bottom-32 right-20 animate-gadget-float opacity-60" style={{ animationDelay: '2s' }}>
        <div className="w-14 h-14 bg-doraemon-white rounded-lg flex items-center justify-center shadow-lg">
          <Camera className="w-7 h-7 text-doraemon-blue" />
        </div>
      </div>
      <div className="absolute bottom-40 left-20 animate-gadget-float opacity-60" style={{ animationDelay: '1.5s' }}>
        <div className="w-11 h-11 bg-door-pink rounded-full flex items-center justify-center">
          <MapPin className="w-5 h-5 text-white" />
        </div>
      </div>
      
      {/* Main Door Frame */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Door Frame */}
          <div className="w-80 h-96 bg-door-brown rounded-t-full border-8 border-door-brown shadow-2xl">
            {/* Portal/Swirling Effect */}
            <div className="w-full h-full rounded-t-full overflow-hidden bg-gradient-portal animate-portal-swirl opacity-80">
              <div className="absolute inset-4 rounded-t-full bg-gradient-to-b from-portal-purple/20 to-doraemon-blue/30 animate-portal-swirl" style={{ animationDirection: 'reverse', animationDuration: '12s' }}></div>
            </div>
            {/* Door Handle */}
            <div className="absolute right-4 top-1/2 w-6 h-6 bg-doraemon-yellow rounded-full shadow-lg border-2 border-door-brown"></div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <h1 className="font-montserrat text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up drop-shadow-lg">
          Anywhere Door
        </h1>
        
        <p className="text-2xl md:text-3xl text-doraemon-white mb-4 animate-fade-in-up drop-shadow-md" style={{ animationDelay: '0.2s' }}>
          Step through to your dream destination
        </p>
        
        <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto animate-fade-in-up drop-shadow-sm" style={{ animationDelay: '0.4s' }}>
          Just like Doraemon's magical door, let AI create the perfect adventure tailored to your dreams and budget.
        </p>
        
        <Button 
          variant="hero" 
          size="lg" 
          className="text-lg px-8 py-4 animate-fade-in-up bg-doraemon-red hover:bg-doraemon-red/90 text-white font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          style={{ animationDelay: '0.6s' }}
          onClick={onPlanTripClick}
        >
          Open the Door
          <ArrowRight className="ml-2" />
        </Button>
      </div>
      
    </section>
  );
};

export default HeroSection;