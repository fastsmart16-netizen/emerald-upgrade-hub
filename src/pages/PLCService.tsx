import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Cpu, Wrench, Settings, Code, Phone, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import ServiceOption from "@/components/ServiceOption";
import EmergencyContact from "@/components/EmergencyContact";
import { useToast } from "@/hooks/use-toast";
import ServicePhotos from "@/components/ServicePhotos";
import plcServiceImage from "@/assets/plc-service.jpg";

const PLCService = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const plcServices = [
    {
      icon: <Wrench className="w-5 h-5" />,
      title: "PLC Repair & Troubleshooting",
      description: "PLC hardware repair, module replacement, and system troubleshooting",
      price: "₹4,000 - ₹18,000",
      type: "repair" as const,
    },
    {
      icon: <Code className="w-5 h-5" />,
      title: "PLC Programming",
      description: "Custom PLC programming, modification, and optimization",
      price: "₹6,000 - ₹25,000",
      type: "service" as const,
    },
    {
      icon: <Settings className="w-5 h-5" />,
      title: "PLC Installation & Commissioning",
      description: "New PLC system installation and commissioning",
      price: "₹10,000 - ₹35,000",
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
                <Cpu className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">PLC Systems</h1>
                <p className="text-lg text-muted-foreground">Site visiting: ₹2,500</p>
              </div>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Complete PLC (Programmable Logic Controller) services including programming, repair, 
              installation, and system optimization for industrial automation.
            </p>
          </CardContent>
        </Card>

        {/* Photos */}
        <ServicePhotos images={[{ src: plcServiceImage, alt: "PLC programming, repair and installation service photo" }]} />

        {/* Service Options */}
        <div className="space-y-6 mb-8">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Cpu className="w-6 h-6 text-primary" />
            Available Services
          </h2>
          
          <div className="space-y-4">
            {plcServices.map((service, index) => (
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
            <h3 className="text-xl font-bold text-foreground mb-4">Our PLC System Expertise</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Multiple Brands</h4>
                <p className="text-muted-foreground">Siemens, Allen Bradley, Schneider, Mitsubishi, and other major PLC brands.</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Custom Programming</h4>
                <p className="text-muted-foreground">Tailored PLC programs designed for your specific automation requirements.</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">SCADA Integration</h4>
                <p className="text-muted-foreground">Integration with SCADA systems for complete monitoring and control.</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Remote Support</h4>
                <p className="text-muted-foreground">Remote diagnostics and programming support to minimize downtime.</p>
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

export default PLCService;