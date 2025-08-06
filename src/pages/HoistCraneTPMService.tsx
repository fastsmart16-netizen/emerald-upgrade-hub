import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Construction, Wrench, Settings, Shield, Phone, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import ServiceOption from "@/components/ServiceOption";
import EmergencyContact from "@/components/EmergencyContact";
import { useToast } from "@/hooks/use-toast";

const HoistCraneTPMService = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const tpmServices = [
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Total Productive Maintenance (TPM)",
      description: "Comprehensive TPM program for hoists and crane systems to maximize efficiency",
      price: "₹5,000 - ₹20,000",
      type: "service" as const,
    },
    {
      icon: <Wrench className="w-5 h-5" />,
      title: "Hoist & Crane Overhaul",
      description: "Complete overhaul and restoration of hoist and crane equipment",
      price: "₹15,000 - ₹50,000",
      type: "repair" as const,
    },
    {
      icon: <Settings className="w-5 h-5" />,
      title: "Performance Optimization",
      description: "System optimization to improve operational efficiency and reduce downtime",
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
                <Construction className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Hoist Crane TPM</h1>
                <p className="text-lg text-muted-foreground">Site visiting: ₹4,000</p>
              </div>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Total Productive Maintenance (TPM) for hoist and crane systems. Maximize equipment 
              effectiveness, reduce breakdowns, and improve operational efficiency.
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
            {tpmServices.map((service, index) => (
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
            <h3 className="text-xl font-bold text-foreground mb-4">Our TPM Methodology</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Equipment Effectiveness</h4>
                <p className="text-muted-foreground">Maximize Overall Equipment Effectiveness (OEE) through systematic maintenance approaches.</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Autonomous Maintenance</h4>
                <p className="text-muted-foreground">Train operators for basic maintenance tasks to ensure continuous equipment care.</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Predictive Analysis</h4>
                <p className="text-muted-foreground">Use data analysis and monitoring to predict and prevent equipment failures.</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Quality Maintenance</h4>
                <p className="text-muted-foreground">Maintain equipment in conditions that ensure consistent product quality.</p>
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

export default HoistCraneTPMService;