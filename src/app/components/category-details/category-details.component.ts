import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, Product } from '../../services/data.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit {
  categoryName: string = '';
  products: Product[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.categoryName = params['name'];
      
      // Get products for this category
      this.dataService.getProductsByCategory(this.categoryName).subscribe(products => {
        this.products = products;
        this.loading = false;
      });
    });
  }

  goBack() {
    this.router.navigate(['/categories']);
  }
}
