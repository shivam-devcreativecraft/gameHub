import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, Product } from '../../services/data.service';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @ViewChild('searchInput') searchInput!: ElementRef;
  
  isSearchVisible = false;
  searchResults: Product[] = [];
  private searchSubscription?: Subscription;

  constructor(
    private dataService: DataService,
    private router: Router
  ) {
    this.dataService.getAllProducts().subscribe(products => {
      this.searchResults = products;
     });
  }
  ngOnInit() {

  }

  toggleSearch() {
    this.isSearchVisible = !this.isSearchVisible;
    if (this.isSearchVisible) {
      setTimeout(() => {
        this.searchInput.nativeElement.focus();
        this.setupSearchListener();
      });
    } else {
      this.searchResults = [];
      if (this.searchSubscription) {
        this.searchSubscription.unsubscribe();
      }
    }
  }

  private setupSearchListener() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }

    this.searchSubscription = fromEvent(this.searchInput.nativeElement, 'input')
      .pipe(
        map((event: any) => event.target.value),
        filter(text => text.length > 2),
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((searchTerm: string) => {
        this.performSearch(searchTerm);
      });
  }

  private performSearch(searchTerm: string) {
    this.dataService.getAllProducts().subscribe(products => {
      this.searchResults = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 5); // Limit to 5 results
    });
  }

  selectProduct(product: Product) {
    // Navigate to a new route to show the selected product
    this.router.navigate(['/search-results'], { 
      queryParams: { 
        product: product.id 
      }
    });
    this.closeSearch();
  }

  closeSearch() {
    this.isSearchVisible = false;
    this.searchResults = [];
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  @HostListener('document:keydown.escape')
  onEscapePressed() {
    this.closeSearch();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const searchContainer = document.querySelector('.search-container');
    if (searchContainer && !searchContainer.contains(event.target as Node)) {
      this.closeSearch();
    }
  }
}
