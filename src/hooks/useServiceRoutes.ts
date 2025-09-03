import React, { useMemo } from 'react';
import { useAdminServices } from './useAdminServices';
import ServicePageTemplate from '../components/ServicePageTemplate';

interface ServiceRoute {
  path: string;
  element: React.ComponentType;
}

export const useServiceRoutes = (): ServiceRoute[] => {
  const services = useAdminServices();

  return useMemo(() => {
    return services.map(service => ({
      path: `/${service.id}-service`,
      element: () => React.createElement(ServicePageTemplate, {
        title: service.title,
        description: `Professional ${service.title.toLowerCase()} repair and maintenance services`,
        price: service.visitors,
        icon: service.icon
      })
    }));
  }, [services]);
};