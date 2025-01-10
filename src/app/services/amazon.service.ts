import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError, map } from 'rxjs';
import { environment } from '../../environments/environment';

export interface AmazonProduct {
  price: {
    current_price: number;
    previous_price?: number;
  };
  rating: number;
  ratings_total: number;
  title: string;
  link: string;
}

@Injectable({
  providedIn: 'root'
})
export class AmazonService {
  private readonly API_URL = 'https://api.rainforestapi.com/request';
  private cache: Map<string, { data: AmazonProduct; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 3600000; // 1 hour in milliseconds

  constructor(private http: HttpClient) {}

  getProductData(asin: string): Observable<AmazonProduct | null> {
    // Check cache first
    const cached = this.cache.get(asin);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return of(cached.data);
    }

    // If not in cache or expired, fetch from API
    return this.http.get<any>(this.API_URL, {
      params: {
        api_key: environment.rainforestApiKey,
        type: 'product',
        amazon_domain: 'amazon.in',
        asin: asin
      }
    }).pipe(
      map(response => {
        const product: AmazonProduct = {
          price: {
            current_price: response.product.buybox_winner.price.value,
            previous_price: response.product.price_history?.[0]?.price
          },
          rating: response.product.rating,
          ratings_total: response.product.ratings_total,
          title: response.product.title,
          link: response.product.link
        };

        // Cache the result
        this.cache.set(asin, {
          data: product,
          timestamp: Date.now()
        });

        return product;
      }),
      catchError(error => {
        console.error('Error fetching Amazon product data:', error);
        return of(null);
      })
    );
  }
} 