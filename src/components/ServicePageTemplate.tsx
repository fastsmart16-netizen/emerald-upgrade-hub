import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Construction, Wrench, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import ServiceOption from "@/components/ServiceOption";
import EmergencyContact from "@/components/EmergencyContact";
import { useToast } from "@/hooks/use-toast";

interface ServicePageTemplateProps {
  title: string;
  description: string;
  price: string;
  icon: React.ReactNode;
}

const ServicePageTemplate = ({ title, description, price, icon }: ServicePageTemplateProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleBook = () => {
    toast({
      title: "Booking Request Received",
      description: "Our team will contact you within 24 hours to confirm your booking.",
      variant: "default"
    });
  };

  const services = [
    {
      icon: icon,
      title: title,
      description: description,
      price: price,
      type: "service"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-primary/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => navigate("/")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Hero Section */}
        <div className="text-center py-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-primary/20 rounded-full">
              {icon}
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* Service Options */}
        <section aria-labelledby="services-heading" className="space-y-6">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            <h2 id="services-heading" className="text-2xl font-bold text-foreground">
              Service Options
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ServiceOption
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                price={service.price}
                type={service.type as "repair" | "rental" | "service"}
                onBook={handleBook}
              />
            ))}
          </div>
        </section>

        {/* Emergency Contact */}
        <EmergencyContact />
      </div>
    </div>
  );
};

export default ServicePageTemplate;