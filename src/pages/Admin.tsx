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
  ArrowLeft,
  Download,
  Upload,
  Search,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Logo from "@/components/Logo";
import { serviceManager, ServiceData } from "@/utils/serviceManager";

// Define service type alias
type Service = ServiceData;

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
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    icon: "Settings"
  });

  // Load services and subscribe to changes
  useEffect(() => {
    setServices(serviceManager.getServices());
    
    const unsubscribe = serviceManager.subscribe((updatedServices) => {
      setServices(updatedServices);
    });

    return unsubscribe;
  }, []);

  const handleAddService = () => {
    if (!formData.title.trim() || !formData.price.trim()) {
      toast({
        title: "Error",
        description: "Please fill in required fields (Title and Price)",
        variant: "destructive"
      });
      return;
    }

    const success = serviceManager.addService({
      title: formData.title,
      price: formData.price,
      description: formData.description,
      icon: formData.icon
    });

    if (!success) {
      toast({
        title: "Error",
        description: "A service with this name already exists. Please choose a different name.",
        variant: "destructive"
      });
      return;
    }

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

    const success = serviceManager.updateService(editingService.id, {
      title: formData.title,
      price: formData.price,
      description: formData.description,
      icon: formData.icon
    });

    if (success) {
      setEditingService(null);
      setFormData({ title: "", price: "", description: "", icon: "Settings" });
      
      toast({
        title: "Success",
        description: "Service updated successfully!"
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to update service",
        variant: "destructive"
      });
    }
  };

  const handleDeleteService = (serviceId: string) => {
    if (window.confirm("Are you sure you want to delete this service? This action cannot be undone.")) {
      const success = serviceManager.deleteService(serviceId);
      
      if (success) {
        toast({
          title: "Success",
          description: "Service deleted successfully!"
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to delete service",
          variant: "destructive"
        });
      }
    }
  };

  const handleExportServices = () => {
    const dataStr = serviceManager.exportServices();
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'services-backup.json';
    link.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Success",
      description: "Services exported successfully!"
    });
  };

  const handleImportServices = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const success = serviceManager.importServices(content);
        
        if (success) {
          toast({
            title: "Success",
            description: "Services imported successfully!"
          });
        } else {
          throw new Error("Invalid file format");
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to import services. Please check the file format.",
          variant: "destructive"
        });
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const getIconComponent = (iconName: string) => {
    const icon = iconOptions.find(opt => opt.value === iconName);
    return icon ? icon.component : Settings;
  };

  const filteredServices = services.filter(service => 
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.price.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

        {/* Services Management */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Current Services ({services.length})</h2>
            
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              
              <Button variant="outline" size="sm" onClick={handleExportServices}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              
              <div className="relative">
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportServices}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  id="import-services"
                />
                <Button variant="outline" size="sm" asChild>
                  <label htmlFor="import-services" className="cursor-pointer flex items-center">
                    <Upload className="w-4 h-4 mr-2" />
                    Import
                  </label>
                </Button>
              </div>
            </div>
          </div>

          {filteredServices.length === 0 ? (
            <Card className="p-8 text-center">
              <AlertCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {searchQuery ? "No services found" : "No services available"}
              </h3>
              <p className="text-muted-foreground">
                {searchQuery 
                  ? "Try adjusting your search terms" 
                  : "Add your first service using the form above"
                }
              </p>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => {
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;