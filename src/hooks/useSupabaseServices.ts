import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
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

interface SupabaseService {
  id: string;
  title: string;
  description: string | null;
  price: string;
  icon: string | null;
  image_url: string | null;
  created_at: string | null;
  updated_at: string | null;
}

interface DisplayService {
  id: string;
  icon: React.ReactElement;
  title: string;
  visitors: string;
  image: string;
  description: string;
}

// Icon mapping
const iconMap = {
  Settings: Settings,
  Construction: Construction,
  Zap: Zap,
  Cpu: Cpu,
  Activity: Activity,
};

// Image mapping for fallbacks
const imageMap: Record<string, string> = {
  'hoist': hoistServiceImage,
  'crane': craneServiceImage,
  'panel': panelServiceImage,
  'ppm-panel': ppmPanelServiceImage,
  'hoist-crane-tpa': hoistCraneTPAServiceImage,
  'plc': plcServiceImage,
  'vfd': vfdServiceImage,
};

const getImageForService = (title: string, image_url: string | null): string => {
  if (image_url && !image_url.startsWith('/src/')) {
    return image_url;
  }
  
  const titleLower = title.toLowerCase();
  if (titleLower.includes('hoist') && titleLower.includes('crane')) {
    return hoistCraneTPAServiceImage;
  } else if (titleLower.includes('hoist')) {
    return hoistServiceImage;
  } else if (titleLower.includes('crane')) {
    return craneServiceImage;
  } else if (titleLower.includes('ppm') && titleLower.includes('panel')) {
    return ppmPanelServiceImage;
  } else if (titleLower.includes('panel')) {
    return panelServiceImage;
  } else if (titleLower.includes('plc')) {
    return plcServiceImage;
  } else if (titleLower.includes('vfd')) {
    return vfdServiceImage;
  }
  
  return hoistServiceImage; // Default fallback
};

export const useSupabaseServices = () => {
  const [services, setServices] = useState<DisplayService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const convertToDisplayServices = (supabaseServices: SupabaseService[]): DisplayService[] => {
    return supabaseServices.map(service => {
      const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Settings;
      const image = getImageForService(service.title, service.image_url);

      return {
        id: service.id,
        icon: React.createElement(IconComponent, { className: "w-5 h-5" }),
        title: service.title,
        visitors: service.price,
        image: image,
        description: service.description || ''
      };
    });
  };

  const fetchServices = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching services:', error);
        setError(error.message);
        return;
      }

      setServices(convertToDisplayServices(data || []));
      setError(null);
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addService = async (serviceData: {
    title: string;
    description: string;
    price: string;
    icon: string;
    image_url?: string;
  }) => {
    try {
      const { error } = await supabase
        .from('services')
        .insert([serviceData]);

      if (error) {
        console.error('Error adding service:', error);
        throw error;
      }

      await fetchServices(); // Refresh the list
    } catch (err) {
      console.error('Error in addService:', err);
      throw err;
    }
  };

  const updateService = async (id: string, serviceData: Partial<{
    title: string;
    description: string;
    price: string;
    icon: string;
    image_url: string;
  }>) => {
    try {
      const { error } = await supabase
        .from('services')
        .update(serviceData)
        .eq('id', id);

      if (error) {
        console.error('Error updating service:', error);
        throw error;
      }

      await fetchServices(); // Refresh the list
    } catch (err) {
      console.error('Error in updateService:', err);
      throw err;
    }
  };

  const deleteService = async (id: string) => {
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting service:', error);
        throw error;
      }

      await fetchServices(); // Refresh the list
    } catch (err) {
      console.error('Error in deleteService:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchServices();

    // Set up real-time subscription
    const channel = supabase
      .channel('services-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'services'
        },
        () => {
          fetchServices();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { 
    services, 
    loading, 
    error, 
    addService, 
    updateService, 
    deleteService, 
    refreshServices: fetchServices 
  };
};