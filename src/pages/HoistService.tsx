import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Settings, Wrench, Home, Cable, Phone, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import ServiceOption from "@/components/ServiceOption";
import EmergencyContact from "@/components/EmergencyContact";
import { useToast } from "@/hooks/use-toast";
import LocationSearch from "@/components/LocationSearch";
import GoogleLocationMap from "@/components/GoogleLocationMap";
import ServicePhotos from "@/components/ServicePhotos";
import hoistServiceImage from "@/assets/hoist-service.jpg";

const HoistService = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const hoistServices = [
    {
      icon: <Wrench className="w-5 h-5" />,
      title: "Hoist Repair Service",
      description: "Complete hoist mechanism repair and maintenance",
      price: "₹5,000 - ₹15,000",
      type: "repair" as const,
    },
    {
      icon: <Home className="w-5 h-5" />,
      title: "Hoist Rental",
      description: "Daily rental service for hoist machines",
      price: "₹2,000/day",
      type: "rental" as const,
    },
    {
      icon: <Cable className="w-5 h-5" />,
      title: "Chain & Wire Rope Service",
      description: "Chain and wire rope replacement service",
      price: "₹1,500 - ₹8,000",
      type: "service" as const,
    },
  ];

  const handleBookService = (serviceName: string) => {
    toast({
      title: "Booking Confirmed!",
      description: `Your booking for ${serviceName} has been submitted. We'll contact you shortly.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-primary/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="w-4 h-4" />
              <span>fastsmart16@gmail.com</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Services
        </Button>

        {/* Service Header */}
        <Card className="mb-8 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center">
                <Settings className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Hoist Machine Services</h1>
                <p className="text-lg text-muted-foreground">Site visiting: ₹3,000</p>
              </div>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professional hoist machine repair, rental, and maintenance services. 
              Our expert technicians ensure your equipment operates safely and efficiently.
            </p>
          </CardContent>
        </Card>

        {/* Photos */}
        <ServicePhotos images={[{ src: hoistServiceImage, alt: "Hoist machine repair, rental and maintenance photo" }]} />

        {/* Location & Map */}
        <div className="space-y-6 mb-8">
          <LocationSearch />
          <GoogleLocationMap />
        </div>

        {/* Service Options */}
        <div className="space-y-6 mb-8">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Wrench className="w-6 h-6 text-primary" />
            Available Services
          </h2>
          
          <div className="space-y-4">
            {hoistServices.map((service, index) => (
              <ServiceOption
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                price={service.price}
                type={service.type}
                onBook={() => handleBookService(service.title)}
              />
            ))}
          </div>
        </div>

        {/* Detailed Information */}
        <Card className="mb-8 border-primary/20">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-foreground mb-4">Why Choose Our Hoist Services?</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Expert Technicians</h4>
                <p className="text-muted-foreground">Certified professionals with years of experience in hoist maintenance and repair.</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Quality Parts</h4>
                <p className="text-muted-foreground">We use only genuine and high-quality replacement parts for all repairs.</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">24/7 Support</h4>
                <p className="text-muted-foreground">Emergency repair services available round the clock for critical situations.</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Warranty</h4>
                <p className="text-muted-foreground">All our repair services come with comprehensive warranty coverage.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <EmergencyContact />
      </div>
    </div>
  );
};

export default HoistService;