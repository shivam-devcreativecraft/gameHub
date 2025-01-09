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
    { id: 2, name: 'PS', icon: 'bi bi-playstation' },
    { id: 3, name: 'Cosmic Byte', shortName: 'CB' },
    { id: 4, name: 'Redgear', shortName: 'RG' }
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
    {
      id: 1,
      name: 'Xbox Elite Controller',
      brand: 'Xbox',
      badge: 'Premium Pick',
      image: 'assets/swiper/swiper1.png',
      description: 'Professional gaming controller with customizable buttons',
      rating: 4.5,
      reviewCount: 2500,
      currentPrice: 18999,
      originalPrice: 19999,
      amazonLink: '#',
      category: 'Xbox Series'
    },
    {
      id: 2,
      name: 'Cosmic Byte C3070W',
      brand: 'Cosmic Byte',
      badge: 'Best Value',
      image: 'assets/swiper/swiper2.png',
      description: 'Wireless controller with excellent build quality',
      rating: 4.0,
      reviewCount: 1800,
      currentPrice: 1999,
      originalPrice: 2499,
      amazonLink: '#',
      category: 'Budget'
    },
    {
      id: 3,
      name: 'Redgear Pro Wireless',
      brand: 'Redgear',
      badge: 'Budget Pick',
      image: 'assets/swiper/swiper3.png',
      description: 'Best budget wireless gaming controller',
      rating: 4.5,
      reviewCount: 3200,
      currentPrice: 1499,
      originalPrice: 1799,
      amazonLink: '#',
      category: 'Budget'
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