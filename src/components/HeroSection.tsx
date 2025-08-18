import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

interface HeroSectionProps {
  onPlanTripClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onPlanTripClick }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Travel Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-overlay"></div>
      </div>
      
      {/* Floating Globe Animation */}
      <div className="absolute top-20 right-20 animate-float opacity-40">
        <div className="w-32 h-32 rounded-full bg-gradient-accent animate-pulse-glow animate-rotate-globe"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="font-montserrat text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up">
          Anywhere Door
        </h1>
        
        <p className="text-2xl md:text-3xl text-slate-blue-light mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Your dream trip, planned in seconds.
        </p>
        
        <p className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          AI-powered travel planning that creates personalized itineraries tailored to your preferences, budget, and style.
        </p>
        
        <Button 
          variant="hero" 
          size="lg" 
          className="text-lg px-8 py-4 animate-fade-in-up"
          style={{ animationDelay: '0.6s' }}
          onClick={onPlanTripClick}
        >
          Plan My Trip
          <ArrowRight className="ml-2" />
        </Button>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/50 animate-bounce">
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;