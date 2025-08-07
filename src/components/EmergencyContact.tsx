import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Calendar, FileText, Clock, MessageCircle, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EmergencyContact = () => {
  const { toast } = useToast();

  const handleEmergencyCall = () => {
    window.open('tel:+918097634086');
    toast({
      title: "📞 Calling Emergency Service",
      description: "Connecting to +91 8097634086 - Our expert technician will assist you!",
    });
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent("🚨 EMERGENCY: I need immediate industrial equipment repair service. Please contact me urgently!");
    window.open(`https://wa.me/918097634086?text=${message}`, '_blank');
    toast({
      title: "📱 WhatsApp Emergency",
      description: "Opening WhatsApp for immediate assistance",
    });
  };

  const handleScheduleVisit = () => {
    const message = encodeURIComponent("I want to schedule a site visit for industrial equipment service. Please contact me to arrange a convenient time.");
    window.open(`https://wa.me/918097634086?text=${message}`, '_blank');
    toast({
      title: "📅 Visit Scheduled",
      description: "We'll contact you to confirm the appointment time.",
    });
  };

  const handleQuote = () => {
    const message = encodeURIComponent("I need a price quote for industrial equipment repair/maintenance service. Please send me detailed pricing information.");
    window.open(`https://wa.me/918097634086?text=${message}`, '_blank');
    toast({
      title: "💰 Quote Request Submitted",
      description: "We'll send you a detailed quote within 24 hours.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Need Immediate Service */}
      <Card className="bg-gradient-to-r from-primary to-primary/80 text-white">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold mb-2">Need Immediate Service?</h3>
          <div className="flex gap-2 justify-center flex-wrap">
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
              onClick={handleWhatsApp}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>
            <Button 
              variant="outline" 
              className="bg-white/10 text-white border-white/30 hover:bg-white/20"
              onClick={handleScheduleVisit}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Visit
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
          <div className="flex gap-2 justify-center flex-wrap">
            <Button variant="urgent" onClick={handleEmergencyCall}>
              <Phone className="w-4 h-4 mr-2" />
              Emergency: +91 8097634086
            </Button>
            <Button variant="success" onClick={handleWhatsApp}>
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp Emergency
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
          <div className="flex gap-2 justify-center flex-wrap">
            <Button variant="urgent" className="animate-pulse" onClick={handleEmergencyCall}>
              <Phone className="w-4 h-4 mr-2" />
              URGENT - Fast Service
            </Button>
            <Button variant="success" onClick={handleWhatsApp}>
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp: +91 8097634086
            </Button>
            <Button variant="outline" onClick={() => window.open('https://goo.gl/maps/your-location', '_blank')}>
              <MapPin className="w-4 h-4 mr-2" />
              Find Us on Map
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencyContact;