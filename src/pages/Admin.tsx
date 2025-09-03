import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Settings, 
  Construction, 
  Zap, 
  Cpu, 
  Activity,
  Plus,
  Edit,
  Trash2,
  Save,
  ArrowLeft
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Logo from "@/components/Logo";

// Define service type
interface Service {
  id: string;
  title: string;
  price: string;
  description: string;
  icon: string;
  image?: string;
}

// Icon options for services
const iconOptions = [
  { name: "Settings", component: Settings, value: "Settings" },
  { name: "Construction", component: Construction, value: "Construction" },
  { name: "Zap", component: Zap, value: "Zap" },
  { name: "Cpu", component: Cpu, value: "Cpu" },
  { name: "Activity", component: Activity, value: "Activity" },
];

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    icon: "Settings"
  });

  // Load services from localStorage on component mount
  useEffect(() => {
    const savedServices = localStorage.getItem('adminServices');
    if (savedServices) {
      setServices(JSON.parse(savedServices));
    } else {
      // Initialize with default services
      const defaultServices: Service[] = [
        { id: "hoist", title: "Hoist Machine", price: "₹3,000", description: "Professional hoist machine repair and maintenance", icon: "Settings" },
        { id: "crane", title: "Crane Service", price: "₹5,000", description: "Expert crane repair and maintenance services", icon: "Construction" },
        { id: "panel", title: "Panel Service", price: "₹2,000", description: "Electrical panel repair and installation", icon: "Zap" },
        { id: "ppm-panel", title: "PPM Panel", price: "₹2,500", description: "Preventive maintenance for panels", icon: "Zap" },
        { id: "hoist-crane-tpa", title: "Hoist Crane TPA", price: "₹4,000", description: "Third party audit for hoist crane", icon: "Construction" },
        { id: "plc", title: "PLC Systems", price: "₹2,500", description: "PLC programming and repair services", icon: "Cpu" },
        { id: "vfd", title: "VFD Systems", price: "₹2,000", description: "Variable frequency drive services", icon: "Activity" },
      ];
      setServices(defaultServices);
      localStorage.setItem('adminServices', JSON.stringify(defaultServices));
    }
  }, []);

  // Save services to localStorage whenever services change
  useEffect(() => {
    localStorage.setItem('adminServices', JSON.stringify(services));
  }, [services]);

  const handleAddService = () => {
    if (!formData.title.trim() || !formData.price.trim()) {
      toast({
        title: "Error",
        description: "Please fill in required fields (Title and Price)",
        variant: "destructive"
      });
      return;
    }

    const newService: Service = {
      id: formData.title.toLowerCase().replace(/\s+/g, '-'),
      title: formData.title,
      price: formData.price,
      description: formData.description,
      icon: formData.icon
    };

    setServices(prev => [...prev, newService]);
    setFormData({ title: "", price: "", description: "", icon: "Settings" });
    
    toast({
      title: "Success",
      description: "Service added successfully!"
    });
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      price: service.price,
      description: service.description,
      icon: service.icon
    });
  };

  const handleUpdateService = () => {
    if (!editingService) return;

    setServices(prev => prev.map(service => 
      service.id === editingService.id 
        ? { ...service, title: formData.title, price: formData.price, description: formData.description, icon: formData.icon }
        : service
    ));

    setEditingService(null);
    setFormData({ title: "", price: "", description: "", icon: "Settings" });
    
    toast({
      title: "Success",
      description: "Service updated successfully!"
    });
  };

  const handleDeleteService = (serviceId: string) => {
    setServices(prev => prev.filter(service => service.id !== serviceId));
    toast({
      title: "Success",
      description: "Service deleted successfully!"
    });
  };

  const getIconComponent = (iconName: string) => {
    const icon = iconOptions.find(opt => opt.value === iconName);
    return icon ? icon.component : Settings;
  };

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
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Admin Header */}
        <div className="text-center py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Admin Panel
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Manage all services from here
          </p>
        </div>

        {/* Add/Edit Service Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              {editingService ? "Edit Service" : "Add New Service"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Service Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter service title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  placeholder="e.g., ₹3,000"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter service description"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="icon">Icon</Label>
              <select
                id="icon"
                value={formData.icon}
                onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                className="w-full p-2 border border-input rounded-md bg-background"
              >
                {iconOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-4">
              {editingService ? (
                <>
                  <Button onClick={handleUpdateService} className="flex-1">
                    <Save className="w-4 h-4 mr-2" />
                    Update Service
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setEditingService(null);
                      setFormData({ title: "", price: "", description: "", icon: "Settings" });
                    }}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button onClick={handleAddService} className="flex-1">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Service
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Services List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Current Services ({services.length})</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const IconComponent = getIconComponent(service.icon);
              return (
                <Card key={service.id} className="relative group">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <IconComponent className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{service.title}</h3>
                        <p className="text-sm text-muted-foreground">{service.price}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditService(service)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteService(service.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;