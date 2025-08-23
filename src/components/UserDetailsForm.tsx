import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, User, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UserDetailsFormProps {
  onUserDetailsSubmit: (name: string, email: string) => void;
}

const UserDetailsForm: React.FC<UserDetailsFormProps> = ({ onUserDetailsSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in both your name and email address.",
        variant: "destructive",
      });
      return;
    }

    if (!email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Send POST request to the specified URL
      const response = await fetch(
        'https://thenameismonisha.app.n8n.cloud/webhook/190ece94-13f5-4a98-a50a-c97ccd4459da',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            [`${name}`]: email, // Add "name: email" in the JSON body
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to send data');
      }

      toast({
        title: "Welcome aboard!",
        description: `Hi ${name}, let's plan your perfect trip!`,
      });

      // Pass the name and email to the parent component
      onUserDetailsSubmit(name, email);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <Card className="w-full max-w-md shadow-elegant">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="font-montserrat text-2xl font-bold text-foreground">
            Welcome to Anywhere Door
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Let's get to know you before we plan your perfect trip
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="transition-smooth focus:shadow-soft"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="transition-smooth focus:shadow-soft"
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              variant="hero"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                "Setting up your journey...Please check for mail for further details"
              ) : (
                <>
                  Continue to Destinations
                  <ArrowRight className="ml-2 w-4 h-4" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDetailsForm;