import React from 'react';
import { Settings, Wand2, Mail } from 'lucide-react';

const steps = [
  {
    icon: Settings,
    title: 'Enter Preferences',
    description: 'Tell us about your dream destination, budget, travel style, and group preferences.',
  },
  {
    icon: Wand2,
    title: 'AI Crafts Your Plan',
    description: 'Our advanced AI analyzes millions of travel data points to create your perfect itinerary.',
  },
  {
    icon: Mail,
    title: 'Receive via Email',
    description: 'Get a detailed, personalized travel plan delivered straight to your inbox within minutes.',
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-montserrat text-4xl md:text-5xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Planning your perfect trip has never been easier. Just three simple steps to your dream vacation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div
                key={index}
                className="text-center group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Icon Circle */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-accent rounded-full flex items-center justify-center shadow-elegant group-hover:shadow-soft hover-lift transition-smooth">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Step Number */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-blue text-white rounded-full flex items-center justify-center text-sm font-bold font-montserrat">
                    {index + 1}
                  </div>
                  
                  {/* Connecting Line (except for last item) */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-taupe to-taupe-dark transform -translate-y-1/2" />
                  )}
                </div>

                {/* Content */}
                <h3 className="font-montserrat text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Trust Badge */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-sage-light rounded-full">
            <Wand2 className="w-5 h-5 text-sage-dark" />
            <span className="text-sage-dark font-medium">Powered by Advanced AI Technology</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;