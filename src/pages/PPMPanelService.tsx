import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Zap, Wrench, Settings, CheckCircle, Phone, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import ServiceOption from "@/components/ServiceOption";
import EmergencyContact from "@/components/EmergencyContact";
import { useToast } from "@/hooks/use-toast";
import ServicePhotos from "@/components/ServicePhotos";
import ppmPanelServiceImage from "@/assets/ppm-panel-service.jpg";

const PPMPanelService = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const ppmServices = [
    {
      icon: <CheckCircle className="w-5 h-5" />,
      title: "Preventive Maintenance (PPM)",
      description: "Scheduled preventive maintenance for electrical panels and control systems",
      price: "₹3,000 - ₹12,000",
      type: "service" as const,
    },
    {
      icon: <Wrench className="w-5 h-5" />,
      title: "Panel Health Check",
      description: "Comprehensive inspection and testing of electrical panels",
      price: "₹2,000 - ₹8,000",
      type: "service" as const,
    },
    {
      icon: <Settings className="w-5 h-5" />,
      title: "Panel Upgrades & Retrofitting",
      description: "Modernization and upgrade of existing electrical control panels",
      price: "₹8,000 - ₹25,000",
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
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">PPM Panel Services</h1>
                <p className="text-lg text-muted-foreground">Site visiting: ₹2,500</p>
              </div>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professional Preventive Maintenance (PPM) services for electrical panels and control systems. 
              Keep your equipment running efficiently with scheduled maintenance and health checks.
            </p>
          </CardContent>
        </Card>

        {/* Photos */}
        <ServicePhotos images={[{ src: ppmPanelServiceImage, alt: "PPM panel preventive maintenance service photo" }]} />

        {/* Service Options */}
        <div className="space-y-6 mb-8">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Zap className="w-6 h-6 text-primary" />
            Available Services
          </h2>
          
          <div className="space-y-4">
            {ppmServices.map((service, index) => (
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
            <h3 className="text-xl font-bold text-foreground mb-4">Our PPM Panel Expertise</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Scheduled Maintenance</h4>
                <p className="text-muted-foreground">Regular maintenance schedules to prevent breakdowns and ensure optimal performance.</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Safety Compliance</h4>
                <p className="text-muted-foreground">Ensure your electrical panels meet all safety standards and regulations.</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Cost Reduction</h4>
                <p className="text-muted-foreground">Preventive maintenance reduces unexpected repair costs and equipment downtime.</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Expert Technicians</h4>
                <p className="text-muted-foreground">Certified electrical technicians with extensive panel maintenance experience.</p>
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

export default PPMPanelService;