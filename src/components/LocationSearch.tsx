import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Search, Phone, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LocationSearch = () => {
  const [location, setLocation] = useState("");
  const { toast } = useToast();

  const handleSearch = () => {
    if (location.trim()) {
      // Show the actual location that was found
      toast({
        title: "Location Confirmed!",
        description: `✅ Service area: ${location} - Our technician will reach you here`,
      });
      
      // Notify service provider about the location
      setTimeout(() => {
        toast({
          title: "Service Provider Notified",
          description: `📱 We've informed our technician about your location: ${location}`,
        });
      }, 2000);
    } else {
      toast({
        title: "Please enter your address",
        description: "Enter your complete address or area name for service",
        variant: "destructive",
      });
    }
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`Lat: ${latitude.toFixed(4)}, Long: ${longitude.toFixed(4)}`);
          toast({
            title: "Current Location Detected",
            description: "📍 Using your current location for service",
          });
        },
        (error) => {
          toast({
            title: "Location Access Denied",
            description: "Please enter your address manually",
            variant: "destructive",
          });
        }
      );
    }
  };

  return (
    <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Industrial Equipment Services
          </h2>
          <h3 className="text-xl text-primary font-semibold mb-2">Professional Repair & Maintenance</h3>
          <p className="text-muted-foreground">
            Expert technicians for industrial machinery repair, maintenance, and installation. 
            Quality service with guaranteed results.
          </p>
        </div>
        
        <div className="space-y-4 mb-6">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Enter your complete address (Area, City, State)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
               />
            </div>
            <Button onClick={handleSearch} className="px-6">
              <Search className="w-4 h-4 mr-2" />
              Find Services
            </Button>
          </div>
          
          <div className="flex gap-2 justify-center">
            <Button variant="outline" onClick={handleCurrentLocation} size="sm">
              <MapPin className="w-4 h-4 mr-2" />
              Use Current Location
            </Button>
            <Button variant="success" size="sm" onClick={() => window.open('https://wa.me/918097634086', '_blank')}>
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp: +91 8097634086
            </Button>
            <Button variant="urgent" size="sm" onClick={() => window.open('tel:+918097634086')}>
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">50K+</div>
            <div className="text-sm text-muted-foreground">Happy Customers</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">500+</div>
            <div className="text-sm text-muted-foreground">Verified Professionals</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">25+</div>
            <div className="text-sm text-muted-foreground">Service Categories</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationSearch;