import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LocationSearch = () => {
  const [location, setLocation] = useState("");
  const { toast } = useToast();

  const handleSearch = () => {
    if (location.trim()) {
      toast({
        title: "Location Found!",
        description: `Searching for services in ${location}`,
      });
      // Here you would typically integrate with a location service
    } else {
      toast({
        title: "Please enter a location",
        description: "Enter your area or pincode to find services",
        variant: "destructive",
      });
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
        
        <div className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Enter your area or pincode"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={handleSearch} className="px-6">
            <Search className="w-4 h-4 mr-2" />
            Find Services
          </Button>
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