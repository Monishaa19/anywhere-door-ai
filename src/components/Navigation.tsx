import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Home, Users, MapPin, PlaneTakeoff } from 'lucide-react';

type AppStep = 'hero' | 'userDetails' | 'destinations' | 'tripPlanner';

interface NavigationProps {
  currentStep: AppStep;
  onStepChange: (step: AppStep) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentStep, onStepChange }) => {
  const steps = [
    { key: 'hero', label: 'Home', icon: Home },
    { key: 'userDetails', label: 'Details', icon: Users },
    { key: 'destinations', label: 'Destinations', icon: MapPin },
    { key: 'tripPlanner', label: 'Planner', icon: PlaneTakeoff },
  ] as const;

  const currentStepIndex = steps.findIndex(step => step.key === currentStep);
  const canGoBack = currentStepIndex > 0;
  const previousStep = canGoBack ? steps[currentStepIndex - 1].key : null;

  if (currentStep === 'hero') return null;

  return (
    <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Back Button */}
          <div className="flex items-center gap-4">
            {canGoBack && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onStepChange(previousStep!)}
                className="flex items-center gap-2 hover:bg-accent/10"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>
            )}
          </div>

          {/* Progress Breadcrumbs */}
          <div className="flex items-center gap-2">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = step.key === currentStep;
              const isCompleted = index < currentStepIndex;
              const isAccessible = index <= currentStepIndex;

              return (
                <React.Fragment key={step.key}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    onClick={() => isAccessible && onStepChange(step.key)}
                    disabled={!isAccessible}
                    className={`flex items-center gap-2 transition-all ${
                      isActive 
                        ? 'bg-primary text-primary-foreground shadow-sm' 
                        : isCompleted 
                          ? 'text-primary hover:bg-primary/10' 
                          : 'text-muted-foreground'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{step.label}</span>
                  </Button>
                  
                  {/* Connector */}
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-0.5 transition-colors ${
                      index < currentStepIndex ? 'bg-primary' : 'bg-border'
                    }`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Brand */}
          <div className="flex items-center">
            <h1 className="font-montserrat text-lg font-semibold text-primary">
              Anywhere Door
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;