import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const GoogleLocationMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const { toast } = useToast();

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(location);
          toast({
            title: "Location Found!",
            description: "We've located your position for faster service.",
          });
        },
        (error) => {
          toast({
            title: "Location Access Denied",
            description: "Please allow location access for better service experience.",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Geolocation Not Supported",
        description: "Your browser doesn't support geolocation.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    // Initialize map with default location (Mumbai, India)
    const defaultLocation = { lat: 19.0760, lng: 72.8777 };
    
    if (mapRef.current) {
      // Create a simple map placeholder
      mapRef.current.innerHTML = `
        <div class="w-full h-48 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center border border-primary/20">
          <div class="text-center">
            <div class="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <p class="text-foreground font-medium">Service Area Map</p>
            <p class="text-muted-foreground text-sm">Mumbai & Surrounding Areas</p>
          </div>
        </div>
      `;
    }
  }, []);

  return (
    <Card className="border-primary/20">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Service Location
          </h3>
          <Button 
            variant="outline" 
            size="sm"
            onClick={getCurrentLocation}
            className="flex items-center gap-2"
          >
            <Navigation className="w-4 h-4" />
            Get My Location
          </Button>
        </div>
        
        <div ref={mapRef} className="mb-4"></div>
        
        {userLocation && (
          <div className="bg-primary/10 rounded-lg p-3 text-center">
            <p className="text-sm text-foreground">
              <strong>Your Location:</strong> {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              We'll use this to provide you with the fastest service possible!
            </p>
          </div>
        )}
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-background border border-primary/20 rounded-lg p-3">
            <p className="font-semibold text-foreground">Mumbai</p>
            <p className="text-sm text-muted-foreground">Main Service Area</p>
          </div>
          <div className="bg-background border border-primary/20 rounded-lg p-3">
            <p className="font-semibold text-foreground">Navi Mumbai</p>
            <p className="text-sm text-muted-foreground">Extended Coverage</p>
          </div>
          <div className="bg-background border border-primary/20 rounded-lg p-3">
            <p className="font-semibold text-foreground">Thane</p>
            <p className="text-sm text-muted-foreground">Available on Request</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoogleLocationMap;