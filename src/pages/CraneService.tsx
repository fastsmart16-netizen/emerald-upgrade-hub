import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Construction, Wrench, Home, Settings, Phone, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import ServiceOption from "@/components/ServiceOption";
import EmergencyContact from "@/components/EmergencyContact";
import { useToast } from "@/hooks/use-toast";

const CraneService = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const craneServices = [
    {
      icon: <Wrench className="w-5 h-5" />,
      title: "Crane Repair & Maintenance",
      description: "Complete crane mechanism repair and preventive maintenance",
      price: "₹8,000 - ₹25,000",
      type: "repair" as const,
    },
    {
      icon: <Home className="w-5 h-5" />,
      title: "Crane Rental Service",
      description: "Daily and monthly crane rental for construction projects",
      price: "₹3,500/day",
      type: "rental" as const,
    },
    {
      icon: <Settings className="w-5 h-5" />,
      title: "Crane Installation",
      description: "Professional crane installation and setup service",
      price: "₹15,000 - ₹50,000",
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
                <Construction className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Crane Services</h1>
                <p className="text-lg text-muted-foreground">Site visiting: ₹5,000</p>
              </div>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive crane services including repair, maintenance, rental, and installation. 
              Trusted by construction companies and industrial facilities.
            </p>
          </CardContent>
        </Card>

        {/* Service Options */}
        <div className="space-y-6 mb-8">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Construction className="w-6 h-6 text-primary" />
            Available Services
          </h2>
          
          <div className="space-y-4">
            {craneServices.map((service, index) => (
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
            <h3 className="text-xl font-bold text-foreground mb-4">Our Crane Service Expertise</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-foreground mb-2">All Crane Types</h4>
                <p className="text-muted-foreground">Tower cranes, mobile cranes, overhead cranes, and jib cranes servicing.</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Safety Certified</h4>
                <p className="text-muted-foreground">All our technicians are safety certified and follow strict safety protocols.</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Emergency Response</h4>
                <p className="text-muted-foreground">Quick response for crane breakdowns and emergency repair situations.</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Preventive Maintenance</h4>
                <p className="text-muted-foreground">Regular maintenance programs to prevent costly breakdowns and extend equipment life.</p>
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

export default CraneService;