import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  private navigationSource: string = '';

  constructor(private router: Router) {
    // Subscribe to navigation events to track source
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const navigation = this.router.getCurrentNavigation();
      if (navigation?.extras.state) {
        this.navigationSource = navigation.extras.state['from'];
      } else if (this.router.url === '/products') {
        this.navigationSource = 'products';
      }
    });
  }

  isBrandsActive(): boolean {
    return this.router.url === '/brands' || 
           this.router.url.includes('/brand/') ||
           (this.router.url.includes('/preview/') && this.navigationSource === 'brand');
  }

  isCategoriesActive(): boolean {
    return this.router.url === '/categories' || 
           this.router.url.includes('/category/') ||
           (this.router.url.includes('/preview/') && this.navigationSource === 'category');
  }

  isProductsActive(): boolean {
    return this.router.url === '/products' || 
           (this.router.url.includes('/preview/') && 
            (this.navigationSource === 'products' || !this.navigationSource));
  }
}
