// Centralized service management utility
export interface ServiceData {
  id: string;
  title: string;
  price: string;
  description: string;
  icon: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

const STORAGE_KEY = 'adminServices';

export class ServiceManager {
  private static instance: ServiceManager;
  private listeners: Array<(services: ServiceData[]) => void> = [];

  private constructor() {}

  static getInstance(): ServiceManager {
    if (!ServiceManager.instance) {
      ServiceManager.instance = new ServiceManager();
    }
    return ServiceManager.instance;
  }

  // Get all services
  getServices(): ServiceData[] {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : this.getDefaultServices();
    } catch (error) {
      console.error('Error loading services:', error);
      return this.getDefaultServices();
    }
  }

  // Save services to localStorage
  private saveServices(services: ServiceData[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
      this.notifyListeners(services);
    } catch (error) {
      console.error('Error saving services:', error);
    }
  }

  // Add a new service
  addService(service: Omit<ServiceData, 'id' | 'createdAt' | 'updatedAt'>): boolean {
    const services = this.getServices();
    const id = service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    // Check for duplicate
    if (services.some(s => s.id === id)) {
      return false;
    }

    const newService: ServiceData = {
      ...service,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    services.push(newService);
    this.saveServices(services);
    return true;
  }

  // Update an existing service
  updateService(id: string, updates: Partial<ServiceData>): boolean {
    const services = this.getServices();
    const index = services.findIndex(s => s.id === id);
    
    if (index === -1) return false;

    services[index] = {
      ...services[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    this.saveServices(services);
    return true;
  }

  // Delete a service
  deleteService(id: string): boolean {
    const services = this.getServices();
    const filtered = services.filter(s => s.id !== id);
    
    if (filtered.length === services.length) return false;

    this.saveServices(filtered);
    return true;
  }

  // Get service by ID
  getServiceById(id: string): ServiceData | null {
    return this.getServices().find(s => s.id === id) || null;
  }

  // Subscribe to service changes
  subscribe(listener: (services: ServiceData[]) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners(services: ServiceData[]): void {
    this.listeners.forEach(listener => listener(services));
  }

  private getDefaultServices(): ServiceData[] {
    return [
      { id: "hoist", title: "Hoist Machine", price: "₹3,000", description: "Professional hoist machine repair and maintenance", icon: "Settings" },
      { id: "crane", title: "Crane Service", price: "₹5,000", description: "Expert crane repair and maintenance services", icon: "Construction" },
      { id: "tower-crane", title: "Tower Crane", price: "₹3,000 To ₹15,000", description: "Tower crane installation, repair and maintenance services", icon: "Construction" },
      { id: "panel", title: "Panel Service", price: "₹2,000", description: "Electrical panel repair and installation", icon: "Zap" },
      { id: "ppm-panel", title: "PPM Panel", price: "₹2,500", description: "Preventive maintenance for panels", icon: "Zap" },
      { id: "hoist-crane-tpa", title: "Hoist Crane TPA", price: "₹4,000", description: "Third party audit for hoist crane", icon: "Construction" },
      { id: "plc", title: "PLC Systems", price: "₹2,500", description: "PLC programming and repair services", icon: "Cpu" },
      { id: "vfd", title: "VFD Systems", price: "₹2,000", description: "Variable frequency drive services", icon: "Activity" },
      { id: "wiring-connection", title: "Wiring Connection", price: "₹4,500", description: "Professional electrical wiring and connection services", icon: "Zap" },
    ];
  }

  // Export services as JSON
  exportServices(): string {
    return JSON.stringify(this.getServices(), null, 2);
  }

  // Import services from JSON
  importServices(jsonData: string): boolean {
    try {
      const services = JSON.parse(jsonData) as ServiceData[];
      
      // Validate structure
      if (!Array.isArray(services) || !services.every(this.isValidService)) {
        return false;
      }

      this.saveServices(services);
      return true;
    } catch {
      return false;
    }
  }

  private isValidService(service: any): service is ServiceData {
    return service && 
           typeof service.id === 'string' &&
           typeof service.title === 'string' &&
           typeof service.price === 'string' &&
           typeof service.description === 'string' &&
           typeof service.icon === 'string';
  }
}

export const serviceManager = ServiceManager.getInstance();