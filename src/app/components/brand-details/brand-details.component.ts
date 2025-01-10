import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, Product, Brand } from '../../services/data.service';

@Component({
  selector: 'app-brand-details',
  templateUrl: './brand-details.component.html',
  styleUrls: ['./brand-details.component.scss']
})
export class BrandDetailsComponent implements OnInit {
  brand?: Brand;
  products: Product[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const brandName = params['name'];
      
      // Get brand details
      this.dataService.getBrands().subscribe(brands => {
        this.brand = brands.find(b => b.name === brandName);
        
        // Get products for this brand
        if (this.brand) {
          this.dataService.getProductsByBrand(this.brand.name).subscribe(products => {
            this.products = products;
            this.loading = false;
          });
        }
      });
    });
  }

  goBack() {
    this.router.navigate(['/brands']);
  }
}
