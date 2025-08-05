import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Settings, 
  Construction, 
  Zap, 
  Cpu, 
  Activity,
  Wrench,
  Home,
  Cable,
  Mail,
  MapPin
} from "lucide-react";
import Logo from "@/components/Logo";
import ServiceCard from "@/components/ServiceCard";
import ServiceOption from "@/components/ServiceOption";
import LocationSearch from "@/components/LocationSearch";
import EmergencyContact from "@/components/EmergencyContact";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const { toast } = useToast();

  const services = [
    { id: "hoist", icon: <Settings className="w-5 h-5" />, title: "Hoist Machine", visitors: "₹3,000" },
    { id: "crane", icon: <Construction className="w-5 h-5" />, title: "Crane Service", visitors: "₹5,000" },
    { id: "panel", icon: <Zap className="w-5 h-5" />, title: "Panel Service", visitors: "₹2,000" },
    { id: "plc", icon: <Cpu className="w-5 h-5" />, title: "PLC Systems", visitors: "₹2,500" },
    { id: "vfd", icon: <Activity className="w-5 h-5" />, title: "VFD Systems", visitors: "₹2,000" },
  ];

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

  const handleServiceExpand = (serviceId: string) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
    toast({
      title: "Service Details",
      description: `Viewing details for ${services.find(s => s.id === serviceId)?.title}`,
    });
  };

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

      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Hero Section */}
        <div className="text-center py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Industrial Equipment Repair Services
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional repair and maintenance services for all types of industrial machinery
          </p>
        </div>

        {/* Location Search */}
        <LocationSearch />

        {/* Services Grid */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Our Services</h2>
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              icon={service.icon}
              title={service.title}
              visitors={service.visitors}
              onExpand={() => handleServiceExpand(service.id)}
            />
          ))}
        </div>

        {/* Expanded Service Details */}
        {expandedService === "hoist" && (
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-4">Hoist Machine Services</h3>
              <p className="text-muted-foreground mb-6">
                Choose from our repair services or purchase options
              </p>
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <Wrench className="w-4 h-4" />
                  Repair & Service Options
                </h4>
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
            </CardContent>
          </Card>
        )}

        {/* Emergency Services */}
        <EmergencyContact />

        {/* Customer Location Info */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <MapPin className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-bold text-foreground">Customer Location Tracking</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              We track customer locations to provide faster service and better support. 
              Hello to all our customers! 😊
            </p>
            <Button variant="expand" onClick={() => toast({
              title: "Location Services Active",
              description: "We can see your service area and will reach you quickly!",
            })}>
              <MapPin className="w-4 h-4 mr-2" />
              View Service Areas
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
