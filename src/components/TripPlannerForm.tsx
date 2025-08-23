import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { CalendarIcon, MapPin, Users, Clock, DollarSign, Heart } from 'lucide-react';

interface TripPlannerFormProps {
  userName?: string;
  userEmail?: string;
}

const TripPlannerForm: React.FC<TripPlannerFormProps> = ({ userName, userEmail }) => {
  const [formData, setFormData] = useState({
    destination: '',
    currentCity: '',
    startDate: '',
    endDate: '',
    duration: [7],
    budget: 'mid-range',
    travelStyle: [],
    groupSize: '2',
    transportMode: 'flight',
  });

  // Auto-sync dates and duration
  const handleStartDateChange = (date: string) => {
    const newFormData = { ...formData, startDate: date };
    
    if (date && formData.endDate) {
      // Calculate duration when both dates are set
      const start = new Date(date);
      const end = new Date(formData.endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      newFormData.duration = [Math.max(1, diffDays)];
    } else if (date && formData.duration[0]) {
      // Calculate end date when start date and duration are set
      const start = new Date(date);
      const end = new Date(start);
      end.setDate(start.getDate() + formData.duration[0]);
      newFormData.endDate = end.toISOString().split('T')[0];
    }
    
    setFormData(newFormData);
  };

  const handleEndDateChange = (date: string) => {
    const newFormData = { ...formData, endDate: date };
    
    if (formData.startDate && date) {
      // Calculate duration when both dates are set
      const start = new Date(formData.startDate);
      const end = new Date(date);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      newFormData.duration = [Math.max(1, diffDays)];
    }
    
    setFormData(newFormData);
  };

  const handleDurationChange = (duration: number[]) => {
    const newFormData = { ...formData, duration };
    
    if (formData.startDate && duration[0]) {
      // Calculate end date when start date and duration are set
      const start = new Date(formData.startDate);
      const end = new Date(start);
      end.setDate(start.getDate() + duration[0]);
      newFormData.endDate = end.toISOString().split('T')[0];
    }
    
    setFormData(newFormData);
  };

  const [locationRequested, setLocationRequested] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const requestLocation = () => {
    if (navigator.geolocation && !locationRequested) {
      setLocationRequested(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
            );
            const data = await response.json();
            setFormData({...formData, currentCity: data.city || data.locality || 'Unknown'});
          } catch (error) {
            console.error('Error getting location:', error);
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
        }
      );
    }
  };

  React.useEffect(() => {
    requestLocation();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate mandatory fields (all except startDate, endDate, travelStyle)
    const mandatoryFields = [
      { field: 'destination', label: 'Destination' },
      { field: 'currentCity', label: 'Current City' },
      { field: 'groupSize', label: 'Group Size' },
      { field: 'transportMode', label: 'Mode of Transport' }
    ];

    // Check for missing mandatory fields
    const missingFields = mandatoryFields.filter(({ field }) => 
      !formData[field as keyof typeof formData] || formData[field as keyof typeof formData] === ''
    );

    if (missingFields.length > 0) {
      toast({
        title: "Missing Required Fields",
        description: `Please fill in: ${missingFields.map(f => f.label).join(', ')}`,
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Prepare form data with budget description
      const budgetDescription = budgetOptions.find(b => b.value === formData.budget)?.description || formData.budget;
      const submitData = {
        ...formData,
        budget: budgetDescription,
        name: userName || '',
        email: userEmail || ''
      };

      const response = await fetch(import.meta.env.VITE_GENERATE_LOCATION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData)
      });

      if (response.ok) {
        toast({
          title: "Voila!",
          description: "Please check your email shortly",
        });
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Workflow is dormant. Backend error",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const budgetOptions = [
    { value: 'budget', label: '₹ Budget', description: 'Under ₹8,000/day' },
    { value: 'mid-range', label: '₹₹ Mid-Range', description: '₹8,000-25,000/day' },
    { value: 'luxury', label: '₹₹₹ Luxury', description: '₹25,000+/day' },
  ];

  const transportOptions = [
    { value: 'flight', label: 'Flight' },
    { value: 'train', label: 'Train' },
    { value: 'ship', label: 'Ship' },
    { value: 'bus', label: 'Bus' },
  ];

  const travelStyles = [
    'Adventure',
    'Relaxation',
    'Cultural',
    'Food & Dining',
    'Nightlife',
    'Nature & Wildlife',
    'Photography',
    'Shopping',
  ];

  return (
    <section id="planner" className="py-20 px-4 bg-slate-blue-light/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-montserrat text-4xl md:text-5xl font-bold text-foreground mb-4">
            AI Trip Planner
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tell us your preferences and let our AI create the perfect itinerary for you.
          </p>
        </div>

        <Card className="shadow-elegant">
          <CardHeader className="bg-gradient-card">
            <CardTitle className="font-montserrat text-2xl text-center">
              Plan Your Dream Trip
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Destination & Current City */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="destination" className="flex items-center gap-2 font-medium">
                    <MapPin className="w-4 h-4" />
                    Destination
                  </Label>
                  <Input
                    id="destination"
                    placeholder="Where do you want to go? (e.g., Paris, Tokyo, Dubai)"
                    value={formData.destination}
                    onChange={(e) => setFormData({...formData, destination: e.target.value})}
                    list="popular-destinations"
                  />
                  <datalist id="popular-destinations">
                    <option value="Paris, France" />
                    <option value="Tokyo, Japan" />
                    <option value="New York, USA" />
                    <option value="Dubai, UAE" />
                    <option value="Bali, Indonesia" />
                    <option value="London, UK" />
                    <option value="Rome, Italy" />
                    <option value="Bangkok, Thailand" />
                  </datalist>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentCity" className="flex items-center gap-2 font-medium">
                    <MapPin className="w-4 h-4" />
                    Current City
                  </Label>
                  <div className="relative">
                    <Input
                      id="currentCity"
                      placeholder="Where are you traveling from?"
                      value={formData.currentCity}
                      onChange={(e) => setFormData({...formData, currentCity: e.target.value})}
                    />
                    {!formData.currentCity && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={requestLocation}
                      >
                        Use Current Location
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 font-medium">
                    <CalendarIcon className="w-4 h-4" />
                    Start Date
                  </Label>
                  <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleStartDateChange(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2 font-medium">
                    <CalendarIcon className="w-4 h-4" />
                    End Date
                  </Label>
                  <Input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleEndDateChange(e.target.value)}
                  />
                </div>
              </div>

              {/* Duration Slider */}
              <div className="space-y-4">
                <Label className="flex items-center gap-2 font-medium">
                  <Clock className="w-4 h-4" />
                  Trip Duration: {formData.duration[0]} days
                </Label>
                <Slider
                  value={formData.duration}
                  onValueChange={handleDurationChange}
                  max={14}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>1 day</span>
                  <span>14 days</span>
                </div>
              </div>

              {/* Budget */}
              <div className="space-y-4">
                <Label className="flex items-center gap-2 font-medium">
                  <DollarSign className="w-4 h-4" />
                  Budget Range
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {budgetOptions.map((option) => (
                    <div
                      key={option.value}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-smooth hover:shadow-card ${
                        formData.budget === option.value
                          ? 'border-gold bg-gold/10'
                          : 'border-border hover:border-gold/50'
                      }`}
                      onClick={() => setFormData({...formData, budget: option.value})}
                    >
                      <div className="text-center">
                        <div className="font-semibold text-foreground">{option.label}</div>
                        <div className="text-sm text-muted-foreground">{option.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Travel Style */}
              <div className="space-y-4">
                <Label className="flex items-center gap-2 font-medium">
                  <Heart className="w-4 h-4" />
                  Travel Style (Select all that apply)
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {travelStyles.map((style) => (
                    <div key={style} className="flex items-center space-x-2">
                      <Checkbox
                        id={style}
                        checked={formData.travelStyle.includes(style)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFormData({
                              ...formData,
                              travelStyle: [...formData.travelStyle, style]
                            });
                          } else {
                            setFormData({
                              ...formData,
                              travelStyle: formData.travelStyle.filter(s => s !== style)
                            });
                          }
                        }}
                      />
                      <Label htmlFor={style} className="text-sm font-normal cursor-pointer">
                        {style}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Group Size & Transport Mode */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="groupSize" className="flex items-center gap-2 font-medium">
                    <Users className="w-4 h-4" />
                    Group Size
                  </Label>
                  <Input
                    id="groupSize"
                    type="number"
                    min="1"
                    max="50"
                    placeholder="How many people?"
                    value={formData.groupSize}
                    onChange={(e) => setFormData({...formData, groupSize: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2 font-medium">
                    <MapPin className="w-4 h-4" />
                    Mode of Transport
                  </Label>
                  <Select value={formData.transportMode} onValueChange={(value) => setFormData({...formData, transportMode: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {transportOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full text-lg py-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Crafting Your Perfect Itinerary...
                    </>
                  ) : (
                    'Generate My Itinerary'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

              <vapi-widget
              public-key={import.meta.env.VITE_VAPI_PUBLIC_KEY}
              assistant-id={import.meta.env.VITE_VAPI_ASSISTANT_ID}
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
    </section>
  );
};

export default TripPlannerForm;