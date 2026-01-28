import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Zap, Wrench, Settings, Shield, Phone, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import ServiceOption from "@/components/ServiceOption";
import EmergencyContact from "@/components/EmergencyContact";
import { useToast } from "@/hooks/use-toast";
import ServicePhotos from "@/components/ServicePhotos";
import panelServiceImage from "@/assets/panel-service.jpg";

const PanelService = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const panelServices = [
    {
      icon: <Wrench className="w-5 h-5" />,
      title: "Panel Repair & Troubleshooting",
      description: "Electrical panel diagnosis, repair, and component replacement",
      price: "₹3,000 - ₹12,000",
      type: "repair" as const,
    },
    {
      icon: <Settings className="w-5 h-5" />,
      title: "Panel Installation",
      description: "New electrical panel installation and commissioning",
      price: "₹8,000 - ₹20,000",
      type: "service" as const,
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Panel Upgrade & Modernization",
      description: "Upgrade old panels with modern components and safety features",
      price: "₹5,000 - ₹15,000",
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
              <span>surajvishwa23@gmail.com</span>
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
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Panel Services</h1>
                <p className="text-lg text-muted-foreground">Site visiting: ₹2,000</p>
              </div>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Expert electrical panel services including installation, repair, and modernization. 
              Ensuring safe and reliable electrical distribution for your facility.
            </p>
          </CardContent>
        </Card>

        {/* Photos */}
        <ServicePhotos images={[{ src: panelServiceImage, alt: "Electrical panel installation and repair service photo" }]} />

        {/* Service Options */}
        <div className="space-y-6 mb-8">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Zap className="w-6 h-6 text-primary" />
            Available Services
          </h2>
          
          <div className="space-y-4">
            {panelServices.map((service, index) => (
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
            <h3 className="text-xl font-bold text-foreground mb-4">Why Choose Our Panel Services?</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Licensed Electricians</h4>
                <p className="text-muted-foreground">Certified electrical technicians with expertise in industrial panel systems.</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Safety Compliance</h4>
                <p className="text-muted-foreground">All work complies with electrical safety standards and local regulations.</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Quality Components</h4>
                <p className="text-muted-foreground">We use only branded and certified electrical components for reliability.</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Testing & Commissioning</h4>
                <p className="text-muted-foreground">Thorough testing and commissioning to ensure optimal panel performance.</p>
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

export default PanelService;