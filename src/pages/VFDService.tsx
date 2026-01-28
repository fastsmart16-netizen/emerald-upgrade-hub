import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Activity, Wrench, Settings, Gauge, Phone, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import ServiceOption from "@/components/ServiceOption";
import EmergencyContact from "@/components/EmergencyContact";
import { useToast } from "@/hooks/use-toast";
import LocationSearch from "@/components/LocationSearch";
import GoogleLocationMap from "@/components/GoogleLocationMap";
import ServicePhotos from "@/components/ServicePhotos";
import vfdServiceImage from "@/assets/vfd-service.jpg";

const VFDService = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const vfdServices = [
    {
      icon: <Wrench className="w-5 h-5" />,
      title: "VFD Repair & Maintenance",
      description: "Variable Frequency Drive repair, component replacement, and preventive maintenance",
      price: "₹3,500 - ₹15,000",
      type: "repair" as const,
    },
    {
      icon: <Settings className="w-5 h-5" />,
      title: "VFD Installation & Setup",
      description: "New VFD installation, configuration, and parameter setting",
      price: "₹5,000 - ₹20,000",
      type: "service" as const,
    },
    {
      icon: <Gauge className="w-5 h-5" />,
      title: "VFD Programming & Tuning",
      description: "Custom programming, parameter optimization, and performance tuning",
      price: "₹2,500 - ₹8,000",
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
            <img
              src={vfdServiceImage}
              alt="Variable Frequency Drive (VFD) services - installation, repair, programming"
              className="w-full h-56 object-cover rounded-lg mb-6"
              loading="eager"
            />
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center">
                <Activity className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">VFD Systems</h1>
                <p className="text-lg text-muted-foreground">Site visiting: ₹2,000</p>
              </div>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professional Variable Frequency Drive (VFD) services including installation, repair, programming, and optimization for energy-efficient motor control.
            </p>
          </CardContent>
        </Card>

        {/* Photos */}
        <ServicePhotos images={[{ src: vfdServiceImage, alt: "Variable Frequency Drive (VFD) systems photo" }]} />

        {/* Location & Map */}
        <div className="space-y-6 mb-8">
          <LocationSearch />
          <GoogleLocationMap />
        </div>

        {/* Service Options */}
        <div className="space-y-6 mb-8">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Activity className="w-6 h-6 text-primary" />
            Available Services
          </h2>
          
          <div className="space-y-4">
            {vfdServices.map((service, index) => (
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
            <h3 className="text-xl font-bold text-foreground mb-4">Why Choose Our VFD Services?</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Energy Efficiency</h4>
                <p className="text-muted-foreground">Optimize motor performance and reduce energy consumption by up to 50%.</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">All Major Brands</h4>
                <p className="text-muted-foreground">ABB, Schneider, Siemens, Danfoss, and other leading VFD manufacturers.</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Custom Solutions</h4>
                <p className="text-muted-foreground">Tailored VFD solutions for specific applications and industry requirements.</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Preventive Maintenance</h4>
                <p className="text-muted-foreground">Regular maintenance programs to ensure optimal VFD performance and longevity.</p>
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

export default VFDService;