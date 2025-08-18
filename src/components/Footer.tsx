import React from 'react';
import { Instagram, Camera, Wand2 } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-blue-dark text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="font-montserrat text-2xl font-bold mb-3">
              Anywhere Door
            </h3>
            <p className="text-slate-blue-light leading-relaxed">
              AI-powered travel planning that turns your wanderlust into perfectly crafted adventures.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="font-montserrat font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#planner" className="text-slate-blue-light hover:text-white transition-smooth">
                  Plan Your Trip
                </a>
              </li>
              <li>
                <a href="#destinations" className="text-slate-blue-light hover:text-white transition-smooth">
                  Destinations
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-slate-blue-light hover:text-white transition-smooth">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#contact" className="text-slate-blue-light hover:text-white transition-smooth">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Trust */}
          <div className="text-center md:text-right">
            <h4 className="font-montserrat font-semibold mb-4">Follow Our Journey</h4>
            <div className="flex justify-center md:justify-end space-x-4 mb-4">
              <a
                href="#"
                className="w-10 h-10 bg-slate-blue rounded-full flex items-center justify-center hover:bg-gold hover-lift transition-smooth"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-slate-blue rounded-full flex items-center justify-center hover:bg-gold hover-lift transition-smooth"
                aria-label="Pinterest"
              >
                <Camera className="w-5 h-5" />
              </a>
            </div>
            
            {/* AI Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/20 rounded-full">
              <Wand2 className="w-4 h-4 text-gold" />
              <span className="text-sm text-gold">Powered by AI</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-blue pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-blue-light text-sm mb-4 md:mb-0">
            © 2024 Anywhere Door. Crafted with ❤️ for travelers everywhere.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-slate-blue-light hover:text-white transition-smooth">
              Privacy Policy
            </a>
            <a href="#" className="text-slate-blue-light hover:text-white transition-smooth">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;