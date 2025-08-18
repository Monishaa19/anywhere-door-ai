import React, { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import UserDetailsForm from '@/components/UserDetailsForm';
import DestinationGallery from '@/components/DestinationGallery';
import TripPlannerForm from '@/components/TripPlannerForm';
import HowItWorks from '@/components/HowItWorks';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';

type AppStep = 'hero' | 'userDetails' | 'destinations' | 'tripPlanner';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>('hero');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const handlePlanTripClick = () => {
    setCurrentStep('userDetails');
  };

  const handleUserDetailsSubmit = (name: string, email: string) => {
    setUserName(name);
    setUserEmail(email);
    setCurrentStep('destinations');
  };

  const handleDestinationClick = () => {
    setCurrentStep('tripPlanner');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'hero':
        return <HeroSection onPlanTripClick={handlePlanTripClick} />;
      
      case 'userDetails':
        return <UserDetailsForm onUserDetailsSubmit={handleUserDetailsSubmit} />;
      
      case 'destinations':
        return <DestinationGallery onDestinationClick={handleDestinationClick} />;
      
      case 'tripPlanner':
        return (
          <div className="min-h-screen bg-background">
            <TripPlannerForm userName={userName} userEmail={userEmail} />
            <div className="py-20">
              <HowItWorks />
            </div>
            <Footer />
          </div>
        );
      
      default:
        return <HeroSection onPlanTripClick={handlePlanTripClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderCurrentStep()}
      <Toaster />
    </div>
  );
};

export default Index;