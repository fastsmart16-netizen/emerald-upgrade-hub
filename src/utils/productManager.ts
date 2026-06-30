// Products manager - localStorage based product catalog
export interface ProductData {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  mrp?: number;
  rating?: number;
  reviews?: number;
  brand?: string;
  image?: string;
  inStock: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const STORAGE_KEY = 'adminProducts_v2';

const img = (q: string) =>
  `https://source.unsplash.com/400x400/?${encodeURIComponent(q)}`;

const DEFAULT_PRODUCTS: ProductData[] = [
  // Cranes, Hoists & Passenger Hoists
  { id: 'mobile-crane', name: 'Mobile Crane', category: 'Cranes & Hoists', brand: 'LIEBHERR', description: 'Heavy duty mobile crane for construction sites', price: 2500000, mrp: 2800000, rating: 4.5, reviews: 124, inStock: true, image: img('mobile crane construction') },
  { id: 'tower-crane', name: 'Tower Crane', category: 'Cranes & Hoists', brand: 'POTAIN', description: 'High rise tower crane for skyscraper construction', price: 4500000, mrp: 5000000, rating: 4.7, reviews: 89, inStock: true, image: img('tower crane') },
  { id: 'chain-hoist', name: 'Chain Hoist 2 Ton', category: 'Cranes & Hoists', brand: 'ACE', description: 'Manual chain hoist with 2 ton lifting capacity', price: 18500, mrp: 22000, rating: 4.3, reviews: 256, inStock: true, image: img('chain hoist') },
  { id: 'jib-crane', name: 'Jib Crane', category: 'Cranes & Hoists', brand: 'ZOOMLION', description: 'Wall mounted jib crane for workshops', price: 125000, mrp: 145000, rating: 4.4, reviews: 67, inStock: true, image: img('jib crane workshop') },
  { id: 'passenger-hoist', name: 'Passenger Hoist', category: 'Cranes & Hoists', brand: 'ALIMAK HEK', description: 'Construction passenger and material hoist', price: 850000, mrp: 950000, rating: 4.6, reviews: 45, inStock: true, image: img('construction passenger lift') },
  { id: 'electric-hoist', name: 'Electric Hoist 2 Ton', category: 'Cranes & Hoists', brand: 'XCMG', description: 'Electric wire rope hoist 2 ton capacity', price: 32500, mrp: 38000, rating: 4.5, reviews: 178, inStock: true, image: img('electric hoist motor') },

  // Panels & Control Systems
  { id: 'control-panel', name: 'Control Panel', category: 'Panels', brand: 'SIEMENS', description: 'Industrial control panel with PLC integration', price: 45000, mrp: 52000, rating: 4.6, reviews: 134, inStock: true, image: img('industrial control panel') },
  { id: 'power-panel', name: 'Power Distribution Panel', category: 'Panels', brand: 'ABB', description: 'Heavy duty power distribution panel', price: 65000, mrp: 75000, rating: 4.5, reviews: 98, inStock: true, image: img('power distribution panel') },
  { id: 'automation-panel', name: 'Automation Panel', category: 'Panels', brand: 'Schneider Electric', description: 'Fully automated control panel for industries', price: 85000, mrp: 95000, rating: 4.7, reviews: 76, inStock: true, image: img('automation panel') },
  { id: 'mcc-panel', name: 'Motor Control Center (MCC)', category: 'Panels', brand: 'Allen-Bradley', description: 'Motor Control Center for industrial motors', price: 125000, mrp: 145000, rating: 4.6, reviews: 54, inStock: true, image: img('motor control center') },
  { id: 'vfd-panel', name: 'VFD Panel', category: 'Panels', brand: 'SIEMENS', description: 'Variable Frequency Drive panel', price: 55000, mrp: 65000, rating: 4.5, reviews: 87, inStock: true, image: img('vfd panel electrical') },
  { id: 'custom-panel', name: 'Custom Built Panel', category: 'Panels', brand: 'XCMG', description: 'Custom built electrical panel as per requirement', price: 95000, mrp: 110000, rating: 4.4, reviews: 32, inStock: true, image: img('custom electrical panel') },

  // PLC, VFD, HMI & Automation
  { id: 'plc-siemens', name: 'PLC Siemens S7-1200', category: 'PLC', brand: 'SIEMENS', description: 'Programmable Logic Controller S7-1200 series', price: 28500, mrp: 32000, rating: 4.8, reviews: 234, inStock: true, image: img('siemens plc') },
  { id: 'vfd-drive-5hp', name: 'VFD Drive 5 HP', category: 'VFD', brand: 'Delta', description: 'Variable Frequency Drive 5HP 3-phase', price: 12500, mrp: 15000, rating: 4.6, reviews: 312, inStock: true, image: img('vfd drive') },
  { id: 'vfd-drive-10hp', name: 'VFD Drive 10 HP', category: 'VFD', brand: 'INVT', description: 'Variable Frequency Drive 10HP 3-phase', price: 22000, mrp: 26000, rating: 4.5, reviews: 198, inStock: true, image: img('ac drive inverter') },
  { id: 'hmi-touch', name: 'HMI Touch Panel 7"', category: 'HMI', brand: 'Mitsubishi Electric', description: '7 inch HMI touch screen panel', price: 18500, mrp: 22000, rating: 4.7, reviews: 156, inStock: true, image: img('hmi touch screen') },
  { id: 'hmi-omron', name: 'HMI Panel Omron', category: 'HMI', brand: 'OMRON', description: 'Omron HMI panel 10 inch display', price: 24500, mrp: 28000, rating: 4.6, reviews: 89, inStock: true, image: img('omron hmi panel') },
  { id: 'servo-drive', name: 'Servo Drive & Motor', category: 'Automation', brand: 'Schneider Electric', description: 'High precision servo drive with motor', price: 45000, mrp: 52000, rating: 4.7, reviews: 67, inStock: true, image: img('servo motor drive') },

  // Additional Products
  { id: 'anemometer', name: 'Anemometer', category: 'Sensors', brand: 'Generic', description: 'Wind speed measurement device for cranes', price: 8500, mrp: 10000, rating: 4.3, reviews: 78, inStock: true, image: img('anemometer wind sensor') },
  { id: 'electromagnetic-brake', name: 'Electromagnetic Brake', category: 'Brakes', brand: 'Generic', description: 'Heavy duty electromagnetic brake', price: 12500, mrp: 15000, rating: 4.5, reviews: 145, inStock: true, image: img('electromagnetic brake') },
  { id: 'linear-actuator', name: 'Linear Actuator', category: 'Linear Motion', brand: 'Generic', description: 'Industrial linear actuator with high precision', price: 9500, mrp: 11500, rating: 4.4, reviews: 92, inStock: true, image: img('linear actuator') },
  { id: 'linear-guide', name: 'Linear Guide', category: 'Linear Motion', brand: 'Generic', description: 'Precision linear motion guide rail', price: 5500, mrp: 6500, rating: 4.5, reviews: 167, inStock: true, image: img('linear guide rail') },
  { id: 'braking-resistor', name: 'Dynamic Braking Resistor', category: 'Resistance', brand: 'Generic', description: 'High wattage dynamic braking resistor for VFD', price: 4500, mrp: 5500, rating: 4.4, reviews: 123, inStock: true, image: img('braking resistor') },
  { id: 'rotary-switch', name: 'Aluminium Rotary Switch', category: 'Switches', brand: 'Generic', description: 'Heavy duty aluminium rotary cam switch', price: 1850, mrp: 2200, rating: 4.3, reviews: 234, inStock: true, image: img('rotary switch industrial') },
  { id: 'limit-switch', name: 'Aluminium Limit Switch', category: 'Switches', brand: 'Generic', description: 'Industrial aluminium limit switch', price: 1450, mrp: 1800, rating: 4.4, reviews: 189, inStock: true, image: img('limit switch') },
  { id: 'push-button-station', name: 'Aluminium Push Button Station', category: 'Switches', brand: 'Generic', description: 'Multi-button push button control station', price: 2850, mrp: 3500, rating: 4.5, reviews: 145, inStock: true, image: img('push button station') },
  { id: 'junction-box', name: 'Aluminium Junction Box', category: 'Enclosures', brand: 'Generic', description: 'Waterproof aluminium junction box', price: 1250, mrp: 1500, rating: 4.4, reviews: 198, inStock: true, image: img('junction box electrical') },
  { id: 'industrial-relay', name: 'Industrial Relay', category: 'Relays', brand: 'OMRON', description: 'Heavy duty industrial control relay', price: 850, mrp: 1100, rating: 4.6, reviews: 287, inStock: true, image: img('industrial relay') },
  { id: 'plug-in-relay', name: 'Plug-in Relay', category: 'Relays', brand: 'Schneider Electric', description: 'Plug-in style control relay', price: 650, mrp: 850, rating: 4.5, reviews: 312, inStock: true, image: img('plug in relay') },
  { id: 'ssr-relay', name: 'Solid State Relay (SSR)', category: 'Relays', brand: 'OMRON', description: 'Solid state relay for switching applications', price: 1250, mrp: 1500, rating: 4.6, reviews: 178, inStock: true, image: img('solid state relay') },
  { id: 'industrial-connector', name: 'Industrial Connectors', category: 'Connectors', brand: 'Generic', description: 'Heavy duty industrial multi-pin connectors', price: 950, mrp: 1200, rating: 4.4, reviews: 156, inStock: true, image: img('industrial connector') },
  { id: 'pendant-station', name: 'Pendant Station', category: 'Controllers', brand: 'Generic', description: 'Crane pendant control station', price: 4500, mrp: 5500, rating: 4.5, reviews: 98, inStock: true, image: img('crane pendant control') },
  { id: 'load-cell', name: 'Load Cell', category: 'Sensors', brand: 'Generic', description: 'Industrial load cell for weighing', price: 6500, mrp: 8000, rating: 4.5, reviews: 134, inStock: true, image: img('load cell sensor') },
  { id: 'slip-ring', name: 'Slip Ring', category: 'Motors', brand: 'Generic', description: 'Electrical slip ring assembly', price: 8500, mrp: 10500, rating: 4.4, reviews: 76, inStock: true, image: img('slip ring assembly') },
  { id: 'encoder', name: 'Encoder', category: 'Sensors', brand: 'OMRON', description: 'Rotary encoder for position feedback', price: 5500, mrp: 6800, rating: 4.6, reviews: 145, inStock: true, image: img('rotary encoder') },
  { id: 'tachometer', name: 'Tachometer', category: 'Sensors', brand: 'Generic', description: 'Digital tachometer for RPM measurement', price: 3500, mrp: 4500, rating: 4.4, reviews: 112, inStock: true, image: img('tachometer rpm') },
  { id: 'pressure-switch', name: 'Pressure Switch', category: 'Sensors', brand: 'Generic', description: 'Industrial pressure switch', price: 2250, mrp: 2800, rating: 4.5, reviews: 167, inStock: true, image: img('pressure switch') },
  { id: 'temperature-controller', name: 'Temperature Controller', category: 'Controllers', brand: 'OMRON', description: 'Digital PID temperature controller', price: 4250, mrp: 5200, rating: 4.6, reviews: 203, inStock: true, image: img('temperature controller pid') },
  { id: 'smps-power-supply', name: 'Power Supply (SMPS)', category: 'Power', brand: 'Mean Well', description: 'Switching mode power supply 24V', price: 3850, mrp: 4500, rating: 4.6, reviews: 287, inStock: true, image: img('smps power supply') },
  { id: 'ventilation-fan', name: 'Ventilation Fan', category: 'Cooling', brand: 'Generic', description: 'Panel ventilation fan with filter', price: 1850, mrp: 2300, rating: 4.4, reviews: 189, inStock: true, image: img('ventilation fan industrial') },
];

class ProductManagerClass {
  private listeners: Array<(p: ProductData[]) => void> = [];

  getProducts(): ProductData[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        this.save(DEFAULT_PRODUCTS);
        return DEFAULT_PRODUCTS;
      }
      return JSON.parse(raw);
    } catch {
      return DEFAULT_PRODUCTS;
    }
  }

  private save(products: ProductData[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    this.listeners.forEach((l) => l(products));
  }

  addProduct(p: Omit<ProductData, 'id' | 'createdAt' | 'updatedAt'>): ProductData {
    const products = this.getProducts();
    const newProduct: ProductData = {
      ...p,
      id: `p_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.save([newProduct, ...products]);
    return newProduct;
  }

  updateProduct(id: string, updates: Partial<ProductData>) {
    const products = this.getProducts().map((p) =>
      p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
    );
    this.save(products);
  }

  deleteProduct(id: string) {
    this.save(this.getProducts().filter((p) => p.id !== id));
  }

  subscribe(fn: (p: ProductData[]) => void) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn);
    };
  }
}

export const ProductManager = new ProductManagerClass();
