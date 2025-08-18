import React, { useRef } from 'react';
import HeroSection from '@/components/HeroSection';
import DestinationGallery from '@/components/DestinationGallery';
import TripPlannerForm from '@/components/TripPlannerForm';
import HowItWorks from '@/components/HowItWorks';
import Footer from '@/components/Footer';

const Index = () => {
  const plannerRef = useRef<HTMLDivElement>(null);

  const scrollToPlanner = () => {
    plannerRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection onPlanTripClick={scrollToPlanner} />
      
      {/* Destination Gallery */}
      <div id="destinations">
        <DestinationGallery onDestinationClick={scrollToPlanner} />
      </div>
      
      {/* Trip Planner Form */}
      <div ref={plannerRef}>
        <TripPlannerForm />
      </div>
      
      {/* How It Works */}
      <div id="how-it-works">
        <HowItWorks />
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;