import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, Product } from '../../services/data.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  product?: Product;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const productId = Number(params['product']);
      if (productId) {
        this.dataService.getProductById(productId).subscribe(product => {
          if (product) {
            this.product = product;
          } else {
            this.router.navigate(['/products']);
          }
          this.loading = false;
        });
      } else {
        this.router.navigate(['/products']);
      }
    });
  }

  goBack() {
    this.router.navigate(['/products']);
  }
}
