import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Phone, Mail, MapPin, Star } from "lucide-react";
import Logo from "@/components/Logo";
import { useSupabaseServices } from "@/hooks/useSupabaseServices";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ServiceDetails = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { services } = useSupabaseServices();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [bookingForm, setBookingForm] = useState({
    customerName: '',
    phone: '',
    address: '',
    description: ''
  });
  const [isBooking, setIsBooking] = useState(false);

  const service = services.find(s => s.id === serviceId);

  if (!service) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">Service Not Found</h2>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Card>
      </div>
    );
  }

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to book a service",
        variant: "destructive"
      });
      navigate('/auth');
      return;
    }

    if (!bookingForm.customerName || !bookingForm.phone || !bookingForm.address) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsBooking(true);
    
    try {
      const { error } = await supabase
        .from('bookings')
        .insert({
          user_id: user.id,
          service_id: service.id,
          customer_name: bookingForm.customerName,
          phone: bookingForm.phone,
          address: bookingForm.address,
          payment_amount: parseFloat(service.visitors.replace(/[^0-9.-]/g, '')) || 0,
          status: 'pending',
          payment_status: 'pending'
        });

      if (error) {
        toast({
          title: "Booking Failed",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Booking Successful!",
          description: "Your service has been booked. We'll contact you soon.",
          variant: "default"
        });
        setBookingForm({ customerName: '', phone: '', address: '', description: '' });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to book service. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-primary/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            <Button variant="outline" onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Service Info */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-0">
                <div className="relative">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-lg" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-white">
                        {service.icon}
                      </div>
                      <h1 className="text-2xl font-bold text-white">{service.title}</h1>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="text-sm text-muted-foreground ml-2">(4.9)</span>
                    </div>
                    <div className="text-2xl font-bold text-primary">₹{service.visitors}</div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold">Service Description</h3>
                    <p className="text-muted-foreground">
                      Professional {service.title.toLowerCase()} repair and maintenance services. 
                      Our expert technicians provide reliable solutions for all your industrial equipment needs.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-primary" />
                        <span className="text-sm">24/7 Support</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="text-sm">On-site Service</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Book This Service
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBooking} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Customer Name *</label>
                    <Input
                      value={bookingForm.customerName}
                      onChange={(e) => setBookingForm({...bookingForm, customerName: e.target.value})}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Phone Number *</label>
                    <Input
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                      placeholder="Enter your phone number"
                      type="tel"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Service Address *</label>
                    <Textarea
                      value={bookingForm.address}
                      onChange={(e) => setBookingForm({...bookingForm, address: e.target.value})}
                      placeholder="Enter complete address where service is needed"
                      rows={3}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Additional Details</label>
                    <Textarea
                      value={bookingForm.description}
                      onChange={(e) => setBookingForm({...bookingForm, description: e.target.value})}
                      placeholder="Describe the issue or specific requirements"
                      rows={3}
                    />
                  </div>
                  
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Service Price:</span>
                      <span className="text-xl font-bold text-primary">₹{service.visitors}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Final price may vary based on service requirements
                    </p>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isBooking}
                  >
                    {isBooking ? "Booking..." : "Book Service Now"}
                  </Button>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      <span>Emergency: fastsmart16@gmail.com</span>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;