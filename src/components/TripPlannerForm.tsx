import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon, MapPin, Users, Clock, DollarSign, Heart } from 'lucide-react';

const TripPlannerForm: React.FC = () => {
  const [formData, setFormData] = useState({
    destination: '',
    currentCity: '',
    startDate: '',
    endDate: '',
    duration: [7],
    budget: 'mid-range',
    travelStyle: [],
    groupSize: '2',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Your personalized itinerary will be sent to your email shortly!');
    }, 3000);
  };

  const budgetOptions = [
    { value: 'budget', label: '$ Budget', description: 'Under $100/day' },
    { value: 'mid-range', label: '$$ Mid-Range', description: '$100-300/day' },
    { value: 'luxury', label: '$$$ Luxury', description: '$300+/day' },
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
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Where do you want to go?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paris">Paris, France</SelectItem>
                      <SelectItem value="tokyo">Tokyo, Japan</SelectItem>
                      <SelectItem value="new-york">New York, USA</SelectItem>
                      <SelectItem value="dubai">Dubai, UAE</SelectItem>
                      <SelectItem value="bali">Bali, Indonesia</SelectItem>
                      <SelectItem value="other">Other...</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentCity" className="flex items-center gap-2 font-medium">
                    <MapPin className="w-4 h-4" />
                    Current City
                  </Label>
                  <Input
                    id="currentCity"
                    placeholder="Where are you traveling from?"
                    value={formData.currentCity}
                    onChange={(e) => setFormData({...formData, currentCity: e.target.value})}
                  />
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
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
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
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
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
                  onValueChange={(value) => setFormData({...formData, duration: value})}
                  max={14}
                  min={3}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>3 days</span>
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

              {/* Group Size */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 font-medium">
                  <Users className="w-4 h-4" />
                  Group Size
                </Label>
                <Select value={formData.groupSize} onValueChange={(value) => setFormData({...formData, groupSize: value})}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Solo traveler</SelectItem>
                    <SelectItem value="2">Couple (2 people)</SelectItem>
                    <SelectItem value="3-4">Small group (3-4 people)</SelectItem>
                    <SelectItem value="5-8">Medium group (5-8 people)</SelectItem>
                    <SelectItem value="9+">Large group (9+ people)</SelectItem>
                  </SelectContent>
                </Select>
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
      </div>
    </section>
  );
};

export default TripPlannerForm;