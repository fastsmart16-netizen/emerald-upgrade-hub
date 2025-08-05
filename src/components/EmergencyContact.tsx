import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Calendar, FileText, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EmergencyContact = () => {
  const { toast } = useToast();

  const handleEmergencyCall = () => {
    toast({
      title: "Connecting to Emergency Service",
      description: "Our expert technician will be with you shortly!",
    });
  };

  const handleScheduleVisit = () => {
    toast({
      title: "Visit Scheduled",
      description: "We'll contact you to confirm the appointment time.",
    });
  };

  const handleQuote = () => {
    toast({
      title: "Quote Request Submitted",
      description: "We'll send you a detailed quote within 24 hours.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Need Immediate Service */}
      <Card className="bg-gradient-to-r from-primary to-primary/80 text-white">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold mb-2">Need Immediate Service?</h3>
          <div className="flex gap-3 justify-center">
            <Button 
              variant="success" 
              className="bg-white/20 text-white border-white/30 hover:bg-white/30"
              onClick={handleEmergencyCall}
            >
              <Phone className="w-4 h-4 mr-2" />
              Call: +91 8097634086
            </Button>
            <Button 
              variant="outline" 
              className="bg-white/10 text-white border-white/30 hover:bg-white/20"
              onClick={handleScheduleVisit}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Site Visit
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 24/7 Emergency Repair Service */}
      <Card className="border-urgent/20">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold mb-2">24/7 Emergency Repair Service</h3>
          <p className="text-muted-foreground mb-4">
            Industrial equipment breakdown? Our expert technicians are available round the clock
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="urgent" onClick={handleEmergencyCall}>
              <Phone className="w-4 h-4 mr-2" />
              Emergency: +91 8097634086
            </Button>
            <Button variant="outline" onClick={handleQuote}>
              <FileText className="w-4 h-4 mr-2" />
              Get Price Quote
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Fast Service Available */}
      <Card className="bg-success/10 border-success/20">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Clock className="w-6 h-6 text-success" />
            <h3 className="text-xl font-bold text-success">Fast Service Available</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Equipment emergency? Get immediate technical support with our fast response services
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="urgent" className="animate-pulse">
              URGENT - Fast Service
            </Button>
            <Button variant="success">
              <Phone className="w-4 h-4 mr-2" />
              Call Now: +91 8097634086
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencyContact;