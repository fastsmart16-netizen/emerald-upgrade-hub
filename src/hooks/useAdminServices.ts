import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Construction, 
  Zap, 
  Cpu, 
  Activity 
} from "lucide-react";
import { serviceManager, ServiceData } from "@/utils/serviceManager";

// Import service images
import hoistServiceImage from "@/assets/hoist-service.jpg";
import craneServiceImage from "@/assets/crane-service.jpg";
import panelServiceImage from "@/assets/panel-service.jpg";
import ppmPanelServiceImage from "@/assets/ppm-panel-service.jpg";
import hoistCraneTPAServiceImage from "@/assets/hoist-crane-tpq-service.jpg";
import plcServiceImage from "@/assets/plc-service.jpg";
import vfdServiceImage from "@/assets/vfd-service.jpg";

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
    const convertToDisplayServices = (adminServices: ServiceData[]): DisplayService[] => {
      return adminServices.map(service => {
        const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Settings;
        // Use specific image if available, otherwise use default from mapping or fallback
        const image = service.image || imageMap[service.id] || hoistServiceImage;

        return {
          id: service.id,
          icon: React.createElement(IconComponent, { className: "w-5 h-5" }),
          title: service.title,
          visitors: service.price,
          image: image
        };
      });
    };

    // Initial load
    setServices(convertToDisplayServices(serviceManager.getServices()));
    
    // Subscribe to changes
    const unsubscribe = serviceManager.subscribe((updatedServices) => {
      setServices(convertToDisplayServices(updatedServices));
    });

    return unsubscribe;
  }, []);

  return services;
};