import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, MessageCircle, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ServiceOptionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  price: string;
  type?: "repair" | "rental" | "service";
  onBook: () => void;
}

const ServiceOption = ({ icon, title, description, price, type = "service", onBook }: ServiceOptionProps) => {
  const { toast } = useToast();
  
  const getButtonVariant = () => {
    switch (type) {
      case "repair":
        return "success";
      case "rental":
        return "secondary";
      default:
        return "default";
    }
  };

  const handleBookNow = () => {
    // First show booking confirmation
    onBook();
    
    // Then show admin notification
    setTimeout(() => {
      toast({
        title: "📱 Admin Notified!",
        description: `New booking received for: ${title}. Customer will be contacted shortly.`,
      });
    }, 1500);
  };

  const handleWhatsAppBook = () => {
    const message = encodeURIComponent(`Hi! I want to book "${title}" service. Price: ${price}. Please contact me for appointment.`);
    window.open(`https://wa.me/918097634086?text=${message}`, '_blank');
    
    toast({
      title: "WhatsApp Booking",
      description: `Opening WhatsApp to book: ${title}`,
    });
  };

  const handleCallBook = () => {
    window.open('tel:+918097634086');
    toast({
      title: "Calling for Booking",
      description: `Calling to book: ${title}`,
    });
  };

  const handleEmailBook = () => {
    const subject = encodeURIComponent(`Service Booking Request: ${title}`);
    const body = encodeURIComponent(`Hi,

I would like to book the following service:

Service: ${title}
Description: ${description}
Price: ${price}

Please contact me to schedule an appointment.

Thank you!`);
    
    window.open(`mailto:fastsmart16@gmail.com?subject=${subject}&body=${body}`, '_blank');
    
    toast({
      title: "Email Booking",
      description: `Opening email to book: ${title}`,
    });
  };

  return (
    <Card className="mb-4 border-primary/20 hover:border-primary/40 transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
              {icon}
            </div>
            <div>
              <h4 className="font-semibold text-foreground">{title}</h4>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-primary mb-3">{price}</div>
            <div className="flex gap-2 flex-col">
              <Button variant={getButtonVariant()} size="sm" onClick={handleBookNow}>
                Book Now
              </Button>
              <div className="flex gap-1">
                <Button variant="success" size="sm" onClick={handleWhatsAppBook}>
                  <MessageCircle className="w-3 h-3" />
                </Button>
                <Button variant="secondary" size="sm" onClick={handleEmailBook}>
                  <Mail className="w-3 h-3" />
                </Button>
                <Button variant="urgent" size="sm" onClick={handleCallBook}>
                  <Phone className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceOption;