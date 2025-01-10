import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Brand {
  id: number;
  name: string;
  shortName?: string;
  icon?: string;
}

export interface Product {
  id: number;
  name: string;
  brand: string;
  badge: string;
  image: string;
  description: string;
  rating: number;
  reviewCount: number;
  currentPrice: number;
  originalPrice: number;
  amazonLink: string;
  category: string;
}

export interface Statistic {
  value: string;
  label: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private brands: Brand[] = [
    { id: 1, name: 'Xbox', icon: 'bi bi-xbox' },
    { id: 2, name: 'PlayStation', icon: 'bi bi-playstation', shortName: 'PS' },
    { id: 3, name: 'Cosmic Byte', shortName: 'CB' },
    { id: 4, name: 'Redgear', shortName: 'RG' },
    { id: 5, name: 'PowerA', shortName: 'PA' },
    { id: 6, name: 'Logitech', shortName: 'LG' },
    { id: 7, name: 'Razer', shortName: 'RZ' },
    { id: 8, name: 'EKSA', shortName: 'EK' },
    { id: 9, name: 'SteelSeries', shortName: 'SS' },
    { id: 10, name: 'Nintendo', icon: 'bi bi-nintendo-switch', shortName: 'NS' },
    { id: 11, name: 'PDP', shortName: 'PDP' },
    { id: 12, name: '8BitDo', shortName: '8BD' }
  ];

  private statistics: Statistic[] = [
    { value: '200+', label: 'Controllers Compared' },
    { value: '20K+', label: 'Happy Gamers' },
    { value: '4.5+', label: 'Average Rating' }
  ];

  private features: Feature[] = [
    {
      icon: 'bi bi-patch-check',
      title: 'Expert Reviews',
      description: 'In-depth analysis across all price ranges and brands'
    },
    {
      icon: 'bi bi-graph-up',
      title: 'Price Tracking',
      description: 'Real-time price comparisons for best value'
    },
    {
      icon: 'bi bi-people',
      title: 'Community Tested',
      description: 'Real feedback from Indian gamers'
    },
    {
      icon: 'bi bi-shield-check',
      title: 'Trusted Links',
      description: 'Direct links to authorized Indian sellers'
    }
  ];

  private products: Product[] = [
    // Xbox Controllers
    {
      id: 1,
      name: 'Xbox Wireless Controller',
      brand: 'Xbox',
      badge: 'Best Seller',
      image: 'assets/controllers/xbox-wireless-controller.png',
      description: 'Latest Xbox Series X|S controller with share button and USB-C',
      rating: 4.7,
      reviewCount: 3500,
      currentPrice: 5399,
      originalPrice: 5999,
      amazonLink: 'https://www.amazon.in/Xbox-Wireless-Controller-Carbon-Black/dp/B08DF26P48',
      category: 'Xbox Series'
    },
    {
      id: 2,
      name: 'Xbox Elite Controller Series 2',
      brand: 'Xbox',
      badge: 'Premium',
      image: 'assets/controllers/xbox-elite-controller.png',
      description: 'Professional-grade controller with adjustable tension thumbsticks',
      rating: 4.6,
      reviewCount: 2800,
      currentPrice: 15990,
      originalPrice: 17999,
      amazonLink: 'https://www.amazon.in/Xbox-Elite-Wireless-Controller-Series/dp/B07SFKTLZM',
      category: 'Xbox Series'
    },

    // PlayStation Controllers
    {
      id: 3,
      name: 'PS5 DualSense Controller',
      brand: 'PlayStation',
      badge: 'New',
      image: 'assets/controllers/ps5-dualsense.png',
      description: 'Next-gen controller with haptic feedback and adaptive triggers',
      rating: 4.8,
      reviewCount: 4200,
      currentPrice: 5999,
      originalPrice: 6499,
      amazonLink: 'https://www.amazon.in/PlayStation-DualSense-Wireless-Controller-White/dp/B08H99BPJN',
      category: 'PlayStation'
    },
    {
      id: 4,
      name: 'PS4 DualShock 4',
      brand: 'PlayStation',
      badge: 'Classic',
      image: 'assets/controllers/ps4-dualshock.png',
      description: 'Classic PlayStation controller with touchpad and share button',
      rating: 4.7,
      reviewCount: 5100,
      currentPrice: 4499,
      originalPrice: 4999,
      amazonLink: '#',
      category: 'PlayStation'
    },

    // Cosmic Byte Controllers
    {
      id: 5,
      name: 'Cosmic Byte C3070W',
      brand: 'Cosmic Byte',
      badge: 'Best Value',
      image: 'assets/controllers/cosmic-byte-c3070w.png',
      description: 'Wireless controller with excellent build quality and vibration',
      rating: 4.2,
      reviewCount: 1800,
      currentPrice: 1499,
      originalPrice: 1999,
      amazonLink: '#',
      category: 'Budget Wireless'
    },
    {
      id: 6,
      name: 'Cosmic Byte Nebula',
      brand: 'Cosmic Byte',
      badge: 'RGB',
      image: 'assets/controllers/cosmic-byte-nebula.png',
      description: 'RGB gaming controller with programmable buttons',
      rating: 4.1,
      reviewCount: 1200,
      currentPrice: 1299,
      originalPrice: 1599,
      amazonLink: '#',
      category: 'Budget Wired'
    },

    // Redgear Controllers
    {
      id: 7,
      name: 'Redgear Pro Wireless',
      brand: 'Redgear',
      badge: 'Popular',
      image: 'assets/controllers/redgear-pro-wireless.png',
      description: 'Best-selling wireless controller with instant response',
      rating: 4.3,
      reviewCount: 3200,
      currentPrice: 1299,
      originalPrice: 1799,
      amazonLink: '#',
      category: 'Budget Wireless'
    },
    {
      id: 8,
      name: 'Redgear Elite Pro',
      brand: 'Redgear',
      badge: 'Premium Budget',
      image: 'assets/controllers/redgear-elite-pro.png',
      description: 'Premium build quality with illuminated buttons',
      rating: 4.2,
      reviewCount: 2400,
      currentPrice: 1599,
      originalPrice: 1999,
      amazonLink: '#',
      category: 'Budget Wired'
    },

    // PowerA Controllers
    {
      id: 9,
      name: 'PowerA Enhanced Wired Controller',
      brand: 'PowerA',
      badge: 'Licensed',
      image: 'assets/controllers/powera-enhanced.png',
      description: 'Official Xbox licensed controller with advanced gaming buttons',
      rating: 4.4,
      reviewCount: 1900,
      currentPrice: 2499,
      originalPrice: 2999,
      amazonLink: '#',
      category: 'Mid-Range'
    },
    {
      id: 10,
      name: 'PowerA FUSION Pro 2',
      brand: 'PowerA',
      badge: 'Pro Gaming',
      image: 'assets/controllers/powera-fusion-pro.png',
      description: 'Professional controller with swappable parts',
      rating: 4.5,
      reviewCount: 1500,
      currentPrice: 5999,
      originalPrice: 6999,
      amazonLink: '#',
      category: 'Premium'
    },

    // Logitech Controllers
    {
      id: 11,
      name: 'Logitech F310',
      brand: 'Logitech',
      badge: 'Classic',
      image: 'assets/controllers/logitech-f310.png',
      description: 'Classic wired gamepad with familiar layout',
      rating: 4.3,
      reviewCount: 2800,
      currentPrice: 1299,
      originalPrice: 1499,
      amazonLink: '#',
      category: 'Budget Wired'
    },
    {
      id: 12,
      name: 'Logitech F710',
      brand: 'Logitech',
      badge: 'Wireless',
      image: 'assets/controllers/logitech-f710.png',
      description: 'Wireless gamepad with 2.4GHz reliability',
      rating: 4.4,
      reviewCount: 2100,
      currentPrice: 2999,
      originalPrice: 3499,
      amazonLink: '#',
      category: 'Mid-Range'
    },

    // Razer Controllers
    {
      id: 13,
      name: 'Razer Wolverine V2',
      brand: 'Razer',
      badge: 'Premium',
      image: 'assets/controllers/razer-wolverine-v2.png',
      description: 'Premium controller with mecha-tactile buttons',
      rating: 4.6,
      reviewCount: 1700,
      currentPrice: 8999,
      originalPrice: 9999,
      amazonLink: '#',
      category: 'Premium'
    },
    {
      id: 14,
      name: 'Razer Raion',
      brand: 'Razer',
      badge: 'Fighting',
      image: 'assets/controllers/razer-raion.png',
      description: 'Fightpad with mechanical switches',
      rating: 4.5,
      reviewCount: 1200,
      currentPrice: 6999,
      originalPrice: 7999,
      amazonLink: '#',
      category: 'Specialty'
    },

    // EKSA Controllers
    {
      id: 15,
      name: 'EKSA E-S101',
      brand: 'EKSA',
      badge: 'New Entry',
      image: 'assets/controllers/eksa-e101.png',
      description: 'Ergonomic design with programmable back buttons',
      rating: 4.1,
      reviewCount: 800,
      currentPrice: 1799,
      originalPrice: 2299,
      amazonLink: '#',
      category: 'Budget Wired'
    },
    {
      id: 16,
      name: 'EKSA E-S102W',
      brand: 'EKSA',
      badge: 'Wireless',
      image: 'assets/controllers/eksa-e102w.png',
      description: 'Wireless gaming controller with low latency',
      rating: 4.2,
      reviewCount: 650,
      currentPrice: 2299,
      originalPrice: 2799,
      amazonLink: '#',
      category: 'Budget Wireless'
    },

    // New PlayStation Controllers
    {
      id: 18,
      name: 'PS5 DualSense Edge',
      brand: 'PlayStation',
      badge: 'Pro Gaming',
      image: 'assets/controllers/ps5-dualsense-edge.png',
      description: 'Pro controller with customizable buttons and stick modules',
      rating: 4.9,
      reviewCount: 890,
      currentPrice: 16999,
      originalPrice: 18999,
      amazonLink: '#',
      category: 'Premium'
    },

    // New SteelSeries Controllers
    {
      id: 19,
      name: 'SteelSeries Stratus Duo',
      brand: 'SteelSeries',
      badge: 'Versatile',
      image: 'assets/controllers/steelseries-stratus-duo.png',
      description: 'Dual wireless connectivity for PC and Android gaming',
      rating: 4.5,
      reviewCount: 1500,
      currentPrice: 4999,
      originalPrice: 5999,
      amazonLink: '#',
      category: 'Mid-Range'
    },
    {
      id: 20,
      name: 'SteelSeries Nimbus+',
      brand: 'SteelSeries',
      badge: 'Apple Certified',
      image: 'assets/controllers/steelseries-nimbus-plus.png',
      description: 'Premium controller for Apple devices with 50-hour battery',
      rating: 4.6,
      reviewCount: 1200,
      currentPrice: 5999,
      originalPrice: 6999,
      amazonLink: '#',
      category: 'Premium'
    },

    // Nintendo Controllers
    {
      id: 21,
      name: 'Nintendo Switch Pro Controller',
      brand: 'Nintendo',
      badge: 'Official',
      image: 'assets/controllers/nintendo-switch-pro.png',
      description: 'Official Switch Pro controller with HD rumble and amiibo support',
      rating: 4.8,
      reviewCount: 3500,
      currentPrice: 5499,
      originalPrice: 5999,
      amazonLink: '#',
      category: 'Premium'
    },
    {
      id: 22,
      name: 'Nintendo Joy-Con Pair',
      brand: 'Nintendo',
      badge: 'Versatile',
      image: 'assets/controllers/nintendo-joycon.png',
      description: 'Versatile Joy-Con pair with multiple play styles',
      rating: 4.7,
      reviewCount: 4200,
      currentPrice: 5999,
      originalPrice: 6499,
      amazonLink: '#',
      category: 'Nintendo Switch'
    },

    // PDP Controllers
    {
      id: 23,
      name: 'PDP Victrix Pro BFG',
      brand: 'PDP',
      badge: 'Modular',
      image: 'assets/controllers/pdp-victrix-pro.png',
      description: 'Modular pro controller with swappable parts',
      rating: 4.7,
      reviewCount: 450,
      currentPrice: 17999,
      originalPrice: 19999,
      amazonLink: '#',
      category: 'Premium'
    },
    {
      id: 24,
      name: 'PDP Afterglow Deluxe+',
      brand: 'PDP',
      badge: 'LED',
      image: 'assets/controllers/pdp-afterglow-deluxe.png',
      description: 'Illuminated controller with prismatic LED lighting',
      rating: 4.3,
      reviewCount: 890,
      currentPrice: 2999,
      originalPrice: 3499,
      amazonLink: '#',
      category: 'Mid-Range'
    },

    // 8BitDo Controllers
    {
      id: 25,
      name: '8BitDo Pro 2',
      brand: '8BitDo',
      badge: 'Retro Modern',
      image: 'assets/controllers/8bitdo-pro-2.png',
      description: 'Advanced controller with classic design and modern features',
      rating: 4.7,
      reviewCount: 2100,
      currentPrice: 3999,
      originalPrice: 4499,
      amazonLink: '#',
      category: 'Mid-Range'
    },
    {
      id: 26,
      name: '8BitDo Ultimate',
      brand: '8BitDo',
      badge: 'Premium',
      image: 'assets/controllers/8bitdo-ultimate.png',
      description: 'Ultimate wireless controller with charging dock',
      rating: 4.8,
      reviewCount: 780,
      currentPrice: 6999,
      originalPrice: 7999,
      amazonLink: '#',
      category: 'Premium'
    },

    // Additional Cosmic Byte Controller
    {
      id: 27,
      name: 'Cosmic Byte Supernova',
      brand: 'Cosmic Byte',
      badge: 'New Launch',
      image: 'assets/controllers/cosmic-byte-supernova.png',
      description: 'Premium budget controller with macro buttons',
      rating: 4.3,
      reviewCount: 450,
      currentPrice: 1799,
      originalPrice: 2299,
      amazonLink: '#',
      category: 'Budget Wired'
    },

    // Additional Razer Controller
    {
      id: 28,
      name: 'Razer Wolverine V2 Chroma',
      brand: 'Razer',
      badge: 'RGB Pro',
      image: 'assets/controllers/razer-wolverine-v2-chroma.png',
      description: 'Pro controller with Chroma RGB and extra buttons',
      rating: 4.7,
      reviewCount: 890,
      currentPrice: 14999,
      originalPrice: 16999,
      amazonLink: '#',
      category: 'Premium'
    },

    // New Xbox Controllers
    {
      id: 17,
      name: 'Xbox Wireless Controller - Stellar Shift',
      brand: 'Xbox',
      badge: 'Special Edition',
      image: 'assets/controllers/xbox-wireless-stellar-shift.png',
      description: 'Color-shifting finish with textured grip and share button',
      rating: 4.8,
      reviewCount: 1200,
      currentPrice: 6299,
      originalPrice: 6999,
      amazonLink: '#',
      category: 'Xbox Series'
    }
  ];

  constructor() { }

  // Brand Methods
  getBrands(): Observable<Brand[]> {
    return of(this.brands);
  }

  getBrandById(id: number): Observable<Brand | undefined> {
    return of(this.brands.find(brand => brand.id === id));
  }

  // Statistics Methods
  getStatistics(): Observable<Statistic[]> {
    return of(this.statistics);
  }

  // Feature Methods
  getFeatures(): Observable<Feature[]> {
    return of(this.features);
  }

  // Product Methods
  getAllProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProductById(id: number): Observable<Product | undefined> {
    return of(this.products.find(product => product.id === id));
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return of(this.products.filter(product => product.category === category));
  }

  getProductsByBrand(brand: string): Observable<Product[]> {
    return of(this.products.filter(product => product.brand === brand));
  }

  // Helper Methods
  getCategories(): Observable<string[]> {
    const categories = [...new Set(this.products.map(product => product.category))];
    return of(categories);
  }

  getBrandNames(): Observable<string[]> {
    const brandNames = [...new Set(this.products.map(product => product.brand))];
    return of(brandNames);
  }
} 