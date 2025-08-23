import React, { useState, useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import UserDetailsForm from '@/components/UserDetailsForm';
import DestinationGallery from '@/components/DestinationGallery';
import TripPlannerForm from '@/components/TripPlannerForm';
import HowItWorks from '@/components/HowItWorks';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import { Toaster } from '@/components/ui/toaster';

type AppStep = 'hero' | 'userDetails' | 'destinations' | 'tripPlanner';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>('hero');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  // VAPI data collection and webhook integration
  useEffect(() => {
    const handleVapiMessage = async (event: any) => {
      if (event.detail && event.detail.message) {
        const message = event.detail.message;
        
        // Check if this is a function call or contains travel data
        if (message.type === 'function-call' || 
            (message.role === 'assistant' && message.content && 
             (message.content.includes('destination') || 
              message.content.includes('travel') || 
              message.content.includes('trip')))) {
          
          try {
            // Extract travel information from the conversation
            const travelData = {
              destination: extractFromMessage(message.content, 'destination'),
              currentCity: extractFromMessage(message.content, 'current city') || extractFromMessage(message.content, 'from'),
              startDate: extractFromMessage(message.content, 'start date') || extractFromMessage(message.content, 'departure'),
              endDate: extractFromMessage(message.content, 'end date') || extractFromMessage(message.content, 'return'),
              budget: mapBudgetFromMessage(message.content),
              groupSize: extractFromMessage(message.content, 'group size') || extractFromMessage(message.content, 'people') || '2',
              transportMode: extractFromMessage(message.content, 'transport') || extractFromMessage(message.content, 'travel by') || 'flight',
              travelStyle: extractTravelStyles(message.content),
              duration: calculateDuration(extractFromMessage(message.content, 'start date'), extractFromMessage(message.content, 'end date')) || [7],
              name: userName || '',
              email: userEmail || '',
              source: 'vapi-voice'
            };

            // Only send if we have meaningful travel data
            if (travelData.destination || travelData.currentCity) {
              const response = await fetch('https://thenameismonisha.app.n8n.cloud/webhook-test/190ece94-13f5-4a98-a50a-c97ccd4459da', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(travelData)
              });

              if (!response.ok) {
                console.error('Failed to send VAPI data to webhook');
              }
            }
          } catch (error) {
            console.error('Error processing VAPI message:', error);
          }
        }
      }
    };

    // Listen for VAPI messages
    window.addEventListener('vapi-message', handleVapiMessage);
    
    return () => {
      window.removeEventListener('vapi-message', handleVapiMessage);
    };
  }, [userName, userEmail]);

  // Helper functions for data extraction
  const extractFromMessage = (content: string, field: string): string => {
    const regex = new RegExp(`${field}[:\\s]+([^,\\.\\n]+)`, 'i');
    const match = content.match(regex);
    return match ? match[1].trim() : '';
  };

  const mapBudgetFromMessage = (content: string): string => {
    const lowerContent = content.toLowerCase();
    if (lowerContent.includes('budget') || lowerContent.includes('cheap') || lowerContent.includes('affordable')) {
      return 'Under ₹8,000/day';
    } else if (lowerContent.includes('luxury') || lowerContent.includes('premium') || lowerContent.includes('expensive')) {
      return '₹25,000+/day';
    }
    return '₹8,000-25,000/day'; // default mid-range
  };

  const extractTravelStyles = (content: string): string[] => {
    const styles = ['Adventure', 'Relaxation', 'Cultural', 'Food & Dining', 'Nightlife', 'Nature & Wildlife', 'Photography', 'Shopping'];
    const foundStyles: string[] = [];
    const lowerContent = content.toLowerCase();
    
    styles.forEach(style => {
      if (lowerContent.includes(style.toLowerCase())) {
        foundStyles.push(style);
      }
    });
    
    return foundStyles;
  };

  const calculateDuration = (startDate: string, endDate: string): number[] | null => {
    if (!startDate || !endDate) return null;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return [Math.max(1, diffDays)];
  };

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
      <vapi-widget
              public-key="a93b060a-e811-4d43-8ca2-23ad3a3d9e68"
              assistant-id="f3e5e8d1-dc15-497f-b187-904279398508"
              mode="voice"
              theme="dark"
              base-bg-color="#000000"
              accent-color="#14B8A6"
              cta-button-color="#000000"
              cta-button-text-color="#ffffff"
              border-radius="large"
              size="full"
              position="bottom-right"
              title="TALK WITH DORA"
              start-button-text="Start"
              end-button-text="End Call"
              cta-subtitle="voice enabled input support"
              chat-first-message="Hey, How can I help you today?"
              chat-placeholder="Type your message..."
              voice-show-transcript="true"
              consent-required="true"
              consent-title="Terms and conditions"
              consent-content="By clicking Agree, and each time I interact with this AI agent, I consent to the recording, storage, and sharing of my communications with third-party service providers, and as otherwise described in our Terms of Service."
              consent-storage-key="vapi_widget_consent"
            ></vapi-widget>
    </div>
  );
};

export default Index;