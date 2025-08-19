import React, { useState, useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import UserDetailsForm from '@/components/UserDetailsForm';
import DestinationGallery from '@/components/DestinationGallery';
import TripPlannerForm from '@/components/TripPlannerForm';
import HowItWorks from '@/components/HowItWorks';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';

type AppStep = 'hero' | 'userDetails' | 'destinations' | 'tripPlanner';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>('hero');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const { toast } = useToast();

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

  const handleStepChange = (step: AppStep) => {
    setCurrentStep(step);
  };

  // VAPI webhook handler for processing voice input
  const handleVapiTripRequest = async (tripData: any) => {
    try {
      // Format the data to match the TripPlannerForm structure
      const budgetMapping: { [key: string]: string } = {
        'budget': 'Under ₹8,000/day',
        'low': 'Under ₹8,000/day',
        'cheap': 'Under ₹8,000/day',
        'mid-range': '₹8,000-25,000/day',
        'medium': '₹8,000-25,000/day',
        'moderate': '₹8,000-25,000/day',
        'luxury': '₹25,000+/day',
        'expensive': '₹25,000+/day',
        'high': '₹25,000+/day'
      };

      const formattedData = {
        destination: tripData.destination || '',
        currentCity: tripData.currentCity || tripData.from || '',
        startDate: tripData.startDate || '',
        endDate: tripData.endDate || '',
        duration: tripData.duration ? [parseInt(tripData.duration)] : [7],
        budget: budgetMapping[tripData.budget?.toLowerCase()] || '₹8,000-25,000/day',
        travelStyle: tripData.travelStyle || [],
        groupSize: tripData.groupSize || '2',
        transportMode: tripData.transportMode || 'flight',
        name: tripData.name || userName || '',
        email: tripData.email || userEmail || ''
      };

      const response = await fetch('https://thenameismonisha.app.n8n.cloud/webhook-test/190ece94-13f5-4a98-a50a-c97ccd4459da', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData)
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Your personalized itinerary will be sent to your email shortly!",
        });
        return "Great! I've processed your trip request. Your personalized itinerary will be sent to your email shortly!";
      } else {
        throw new Error('Failed to submit trip request');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong processing your trip request. Please try again.",
        variant: "destructive"
      });
      return "I'm sorry, there was an error processing your trip request. Please try again or use the form on the website.";
    }
  };

  // Setup VAPI client tools
  useEffect(() => {
    // Setup global function for VAPI to call
    (window as any).handleTripPlanning = handleVapiTripRequest;
    
    // Check if VAPI script loaded
    const checkVapiLoad = () => {
      console.log('VAPI Widget Elements:', document.querySelectorAll('vapi-widget'));
      console.log('VAPI Script loaded:', typeof (window as any).Vapi);
    };
    
    // Check immediately and after a delay
    checkVapiLoad();
    setTimeout(checkVapiLoad, 2000);
  }, [userName, userEmail]);

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
      <Navigation currentStep={currentStep} onStepChange={handleStepChange} />
      {renderCurrentStep()}
      <Toaster />
      <vapi-widget assistant-id="f3e5e8d1-dc15-497f-b187-904279398508" public-key="a93b060a-e811-4d43-8ca2-23ad3a3d9e68"></vapi-widget>
    </div>
  );
};

export default Index;