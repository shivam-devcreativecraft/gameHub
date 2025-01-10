import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, Product, Brand } from '../../services/data.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  brands: Brand[] = [];
  brandProducts: { [key: string]: Product[] } = {};

  constructor(
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit() {
    // Get all brands
    this.dataService.getBrands().subscribe(brands => {
      this.brands = brands;
      
      // Load preview products for each brand
      this.brands.forEach(brand => {
        this.dataService.getProductsByBrand(brand.name).subscribe(products => {
          this.brandProducts[brand.name] = products;
        });
      });
    });
  }

  // Get preview products for a brand (limit to 1 product)
  getPreviewProduct(brandName: string): Product | undefined {
    return this.brandProducts[brandName]?.[0];
  }

  // Get product count for a brand
  getProductCount(brandName: string): number {
    return this.brandProducts[brandName]?.length || 0;
  }

  // Navigate to brand details page
  viewBrand(brand: Brand) {
    this.router.navigate(['/brand', brand.name]);
  }
} 