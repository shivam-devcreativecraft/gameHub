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
  allProducts: Product[] = [];
  private searchSubscription?: Subscription;

  constructor(
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit() {
    // Load all products once
    this.dataService.getAllProducts().subscribe(products => {
      this.allProducts = products;
    });
  }

  toggleSearch() {
    this.isSearchVisible = !this.isSearchVisible;
    if (this.isSearchVisible) {
      setTimeout(() => {
        this.searchInput.nativeElement.focus();
        this.setupSearchListener();
        // Show all products initially
        this.searchResults = [...this.allProducts];
      });
    } else {
      this.searchResults = [];
      if (this.searchSubscription) {
        this.searchSubscription.unsubscribe();
      }
    }
  }

  clearSearch() {
    if (this.searchInput) {
      this.searchInput.nativeElement.value = '';
      this.searchResults = [...this.allProducts];
    }
  }

  private setupSearchListener() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }

    this.searchSubscription = fromEvent(this.searchInput.nativeElement, 'input')
      .pipe(
        map((event: any) => event.target.value),
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((searchTerm: string) => {
        if (searchTerm.length === 0) {
          // Show all products when search is empty
          this.searchResults = [...this.allProducts];
        } else {
          this.performSearch(searchTerm);
        }
      });
  }

  private performSearch(searchTerm: string) {
    this.searchResults = this.allProducts.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 5); // Limit to 5 results
  }

  selectProduct(product: Product) {
    // Convert product name to URL-friendly format
    const urlFriendlyName = product.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric chars with hyphens
      .replace(/(^-|-$)/g, ''); // Remove leading/trailing hyphens

    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.router.navigate(['/preview', product.id, urlFriendlyName]);
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
