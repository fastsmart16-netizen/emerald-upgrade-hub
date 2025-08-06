import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Settings, 
  Construction, 
  Zap, 
  Cpu, 
  Activity,
  Mail,
  MapPin
} from "lucide-react";
import Logo from "@/components/Logo";
import ServiceCard from "@/components/ServiceCard";
import LocationSearch from "@/components/LocationSearch";
import GoogleLocationMap from "@/components/GoogleLocationMap";
import EmergencyContact from "@/components/EmergencyContact";
import { useToast } from "@/hooks/use-toast";

// Import service images
import hoistServiceImage from "@/assets/hoist-service.jpg";
import craneServiceImage from "@/assets/crane-service.jpg";
import panelServiceImage from "@/assets/panel-service.jpg";
import ppmPanelServiceImage from "@/assets/ppm-panel-service.jpg";
import hoistCraneTPQServiceImage from "@/assets/hoist-crane-tpq-service.jpg";
import plcServiceImage from "@/assets/plc-service.jpg";
import vfdServiceImage from "@/assets/vfd-service.jpg";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const services = [
    { id: "hoist", icon: <Settings className="w-5 h-5" />, title: "Hoist Machine", visitors: "₹3,000", image: hoistServiceImage },
    { id: "crane", icon: <Construction className="w-5 h-5" />, title: "Crane Service", visitors: "₹5,000", image: craneServiceImage },
    { id: "panel", icon: <Zap className="w-5 h-5" />, title: "Panel Service", visitors: "₹2,000", image: panelServiceImage },
    { id: "ppm-panel", icon: <Zap className="w-5 h-5" />, title: "PPM Panel", visitors: "₹2,500", image: ppmPanelServiceImage },
    { id: "hoist-crane-tpq", icon: <Construction className="w-5 h-5" />, title: "Hoist Crane TPQ", visitors: "₹4,000", image: hoistCraneTPQServiceImage },
    { id: "plc", icon: <Cpu className="w-5 h-5" />, title: "PLC Systems", visitors: "₹2,500", image: plcServiceImage },
    { id: "vfd", icon: <Activity className="w-5 h-5" />, title: "VFD Systems", visitors: "₹2,000", image: vfdServiceImage },
  ];

  const serviceRoutes = {
    hoist: "/hoist-service",
    crane: "/crane-service", 
    panel: "/panel-service",
    "ppm-panel": "/ppm-panel-service",
    "hoist-crane-tpq": "/hoist-crane-tpq-service",
    plc: "/plc-service",
    vfd: "/vfd-service"
  };

  const handleServiceExpand = (serviceId: string) => {
    const route = serviceRoutes[serviceId as keyof typeof serviceRoutes];
    if (route) {
      navigate(route);
    }
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                icon={service.icon}
                title={service.title}
                visitors={service.visitors}
                image={service.image}
                onExpand={() => handleServiceExpand(service.id)}
              />
            ))}
          </div>
        </div>

        {/* Google Location Map */}
        <GoogleLocationMap />

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
