import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Construction, 
  Zap, 
  Cpu, 
  Activity 
} from "lucide-react";

// Import service images
import hoistServiceImage from "@/assets/hoist-service.jpg";
import craneServiceImage from "@/assets/crane-service.jpg";
import panelServiceImage from "@/assets/panel-service.jpg";
import ppmPanelServiceImage from "@/assets/ppm-panel-service.jpg";
import hoistCraneTPAServiceImage from "@/assets/hoist-crane-tpq-service.jpg";
import plcServiceImage from "@/assets/plc-service.jpg";
import vfdServiceImage from "@/assets/vfd-service.jpg";

interface AdminService {
  id: string;
  title: string;
  price: string;
  description: string;
  icon: string;
  image?: string;
}

interface DisplayService {
  id: string;
  icon: JSX.Element;
  title: string;
  visitors: string;
  image: string;
}

// Icon mapping
const iconMap = {
  Settings: Settings,
  Construction: Construction,
  Zap: Zap,
  Cpu: Cpu,
  Activity: Activity,
};

// Image mapping
const imageMap: Record<string, string> = {
  'hoist': hoistServiceImage,
  'crane': craneServiceImage,
  'panel': panelServiceImage,
  'ppm-panel': ppmPanelServiceImage,
  'hoist-crane-tpa': hoistCraneTPAServiceImage,
  'plc': plcServiceImage,
  'vfd': vfdServiceImage,
};

export const useAdminServices = () => {
  const [services, setServices] = useState<DisplayService[]>([]);

  useEffect(() => {
    const loadServices = () => {
      const savedServices = localStorage.getItem('adminServices');
      let adminServices: AdminService[] = [];

      if (savedServices) {
        adminServices = JSON.parse(savedServices);
      } else {
        // Default services
        adminServices = [
          { id: "hoist", title: "Hoist Machine", price: "₹3,000", description: "Professional hoist machine repair and maintenance", icon: "Settings" },
          { id: "crane", title: "Crane Service", price: "₹5,000", description: "Expert crane repair and maintenance services", icon: "Construction" },
          { id: "panel", title: "Panel Service", price: "₹2,000", description: "Electrical panel repair and installation", icon: "Zap" },
          { id: "ppm-panel", title: "PPM Panel", price: "₹2,500", description: "Preventive maintenance for panels", icon: "Zap" },
          { id: "hoist-crane-tpa", title: "Hoist Crane TPA", price: "₹4,000", description: "Third party audit for hoist crane", icon: "Construction" },
          { id: "plc", title: "PLC Systems", price: "₹2,500", description: "PLC programming and repair services", icon: "Cpu" },
          { id: "vfd", title: "VFD Systems", price: "₹2,000", description: "Variable frequency drive services", icon: "Activity" },
        ];
      }

      // Convert admin services to display services
      const displayServices: DisplayService[] = adminServices.map(service => {
        const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Settings;
        const image = imageMap[service.id] || hoistServiceImage;

        return {
          id: service.id,
          icon: React.createElement(IconComponent, { className: "w-5 h-5" }),
          title: service.title,
          visitors: service.price,
          image: image
        };
      });

      setServices(displayServices);
    };

    loadServices();

    // Listen for storage changes to update services in real-time
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'adminServices') {
        loadServices();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return services;
};