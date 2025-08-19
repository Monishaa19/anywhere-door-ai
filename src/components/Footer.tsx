import React from 'react';
import { Instagram, Camera, Wand2, MapPin, Mail, Phone, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer: React.FC = () => {
  return (
    <footer className="relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-foreground/10 to-slate-900"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-gold to-sage"></div>
      
      <div className="relative z-10 py-16 px-4 text-white">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand & Description */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h3 className="font-montserrat text-3xl font-bold mb-4 bg-gradient-to-r from-gold to-sage bg-clip-text text-transparent">
                  Anywhere Door
                </h3>
                <p className="text-white/80 leading-relaxed text-lg mb-6">
                  Transform your travel dreams into reality with AI-powered itineraries. 
                  From hidden gems to iconic landmarks, we craft personalized adventures 
                  that match your style and budget.
                </p>
                
                {/* Trust Indicators */}
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                    <Wand2 className="w-4 h-4 text-gold" />
                    <span className="text-sm font-medium">AI-Powered</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                    <Globe className="w-4 h-4 text-sage" />
                    <span className="text-sm font-medium">190+ Countries</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                    <MapPin className="w-4 h-4 text-gold" />
                    <span className="text-sm font-medium">10K+ Destinations</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-montserrat font-semibold text-lg mb-6 text-white">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#planner" className="text-white/70 hover:text-gold transition-smooth hover:translate-x-1 transform inline-block">
                    Plan Your Trip
                  </a>
                </li>
                <li>
                  <a href="#destinations" className="text-white/70 hover:text-gold transition-smooth hover:translate-x-1 transform inline-block">
                    Popular Destinations
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="text-white/70 hover:text-gold transition-smooth hover:translate-x-1 transform inline-block">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="text-white/70 hover:text-gold transition-smooth hover:translate-x-1 transform inline-block">
                    Testimonials
                  </a>
                </li>
                <li>
                  <a href="#blog" className="text-white/70 hover:text-gold transition-smooth hover:translate-x-1 transform inline-block">
                    Travel Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact & Social */}
            <div>
              <h4 className="font-montserrat font-semibold text-lg mb-6 text-white">Connect</h4>
              
              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-white/70">
                  <Mail className="w-4 h-4 text-gold" />
                  <span className="text-sm">hello@anywherefoor.ai</span>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <Phone className="w-4 h-4 text-sage" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-3 mb-6">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-10 h-10 p-0 rounded-full bg-white/10 hover:bg-gold hover:scale-110 transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-10 h-10 p-0 rounded-full bg-white/10 hover:bg-sage hover:scale-110 transition-all duration-300"
                  aria-label="Pinterest"
                >
                  <Camera className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-10 h-10 p-0 rounded-full bg-white/10 hover:bg-gold hover:scale-110 transition-all duration-300"
                  aria-label="Twitter"
                >
                  <Globe className="w-4 h-4" />
                </Button>
              </div>

              {/* Newsletter */}
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4">
                <h5 className="font-medium mb-2 text-white">Stay Updated</h5>
                <p className="text-sm text-white/70 mb-3">Get travel tips & exclusive deals</p>
                <Button variant="outline" size="sm" className="w-full bg-transparent border-white/30 text-white hover:bg-white hover:text-primary">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-white/60 text-sm">
                © 2024 Anywhere Door. Crafted with ❤️ for adventurous souls worldwide.
              </p>
              <div className="flex flex-wrap gap-6 text-sm">
                <a href="#privacy" className="text-white/60 hover:text-gold transition-smooth">
                  Privacy Policy
                </a>
                <a href="#terms" className="text-white/60 hover:text-gold transition-smooth">
                  Terms of Service
                </a>
                <a href="#cookies" className="text-white/60 hover:text-gold transition-smooth">
                  Cookie Policy
                </a>
                <a href="#accessibility" className="text-white/60 hover:text-gold transition-smooth">
                  Accessibility
                </a>
              </div>
            </div>
            
            {/* Additional Info */}
            <div className="mt-6 pt-6 border-t border-white/10 text-center">
              <p className="text-white/50 text-xs">
                Powered by cutting-edge AI technology to make your travel dreams come true
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;