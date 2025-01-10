import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, Product } from '../../services/data.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: string[] = [];
  categoryProducts: { [key: string]: Product[] } = {};

  constructor(
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit() {
    // Get all categories except 'All'
    this.dataService.getCategories().subscribe(categories => {
      this.categories = categories;
      
      // Load preview products for each category
      this.categories.forEach(category => {
        this.dataService.getProductsByCategory(category).subscribe(products => {
          this.categoryProducts[category] = products;
        });
      });
    });
  }

  // Get preview products for a category (limit to 1 product)
  getPreviewProduct(category: string): Product | undefined {
    return this.categoryProducts[category]?.[0];
  }

  // Get product count for a category
  getProductCount(category: string): number {
    return this.categoryProducts[category]?.length || 0;
  }

  // Navigate to category details page
  viewCategory(category: string) {
    this.router.navigate(['/category', category]);
  }
} 