import React from 'react';
import { Button } from '@/components/ui/button';
import burjKhalifa from '@/assets/destinations/burj-khalifa.jpg';
import twinTowers from '@/assets/destinations/twin-towers.jpg';
import tajMahal from '@/assets/destinations/taj-mahal.jpg';
import pisaTower from '@/assets/destinations/pisa-tower.jpg';
import eiffelTower from '@/assets/destinations/eiffel-tower.jpg';
import santorini from '@/assets/destinations/santorini.jpg';
import greatWall from '@/assets/destinations/great-wall.jpg';
import machuPicchu from '@/assets/destinations/machu-picchu.jpg';
import sydneyOpera from '@/assets/destinations/sydney-opera.jpg';
import angkorWat from '@/assets/destinations/angkor-wat.jpg';
import neuschwanstein from '@/assets/destinations/neuschwanstein.jpg';
import christRedeemer from '@/assets/destinations/christ-redeemer.jpg';

const destinations = [
  { name: 'Burj Khalifa', location: 'Dubai', image: burjKhalifa },
  { name: 'Twin Towers', location: 'Kuala Lumpur', image: twinTowers },
  { name: 'Taj Mahal', location: 'India', image: tajMahal },
  { name: 'Leaning Tower', location: 'Pisa, Italy', image: pisaTower },
  { name: 'Eiffel Tower', location: 'Paris', image: eiffelTower },
  { name: 'Santorini', location: 'Greece', image: santorini },
  { name: 'Great Wall', location: 'China', image: greatWall },
  { name: 'Machu Picchu', location: 'Peru', image: machuPicchu },
  { name: 'Sydney Opera House', location: 'Australia', image: sydneyOpera },
  { name: 'Angkor Wat', location: 'Cambodia', image: angkorWat },
  { name: 'Neuschwanstein Castle', location: 'Bavaria, Germany', image: neuschwanstein },
  { name: 'Christ the Redeemer', location: 'Rio de Janeiro, Brazil', image: christRedeemer },
];

interface DestinationGalleryProps {
  onDestinationClick: () => void;
}

const DestinationGallery: React.FC<DestinationGalleryProps> = ({ onDestinationClick }) => {
    
    // Dynamically load the VAPI widget script
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@vapi-ai/client-sdk-react/dist/embed/widget.umd.js';
    script.async = true;
    script.type = 'text/javascript';
    document.body.appendChild(script);

    // Dynamically load the VAPI widget styles
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/@vapi-ai/client-sdk-react/dist/embed/styles.css';
    document.head.appendChild(link);

   


return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-montserrat text-4xl md:text-5xl font-bold text-foreground mb-4">
            Discover Amazing Destinations
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore world-class landmarks and hidden gems. Let our AI craft the perfect journey for you.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {destinations.map((destination, index) => (
            <div
              key={destination.name}
              className="group relative aspect-video rounded-lg overflow-hidden shadow-card hover:shadow-elegant transition-smooth hover-lift cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={onDestinationClick}
            >
              <img
                src={destination.image}
                alt={`${destination.name} - ${destination.location}`}
                className="w-full h-full object-cover transition-smooth group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-overlay opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center">
                <div className="text-center text-white p-4">
                  <h3 className="font-montserrat font-semibold text-xl mb-2">
                    {destination.name}
                  </h3>
                  <p className="text-white/80 mb-4">{destination.location}</p>
                  <Button variant="outline" size="sm" className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30">
                    Explore This Destination
                  </Button>
                </div>
              </div>
              
              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <h3 className="font-montserrat font-semibold text-white text-lg">
                  {destination.name}
                </h3>
                <p className="text-white/80 text-sm">{destination.location}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            Ready to plan your next adventure?
          </p>
          <Button variant="elegant" size="lg" onClick={onDestinationClick}>
            Start Planning Now
          </Button>
        </div>
      </div>

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

<script src="https://unpkg.com/@vapi-ai/client-sdk-react/dist/embed/widget.umd.js" async type="text/javascript"></script>
    </section>
  );
};

export default DestinationGallery;