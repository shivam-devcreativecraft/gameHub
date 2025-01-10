import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../../../services/data.service';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss']
})
export class ProductModalComponent {
  @Input() products: Product[] = [];
  @Input() title: string = '';
  @Input() subtitle: string = '';
  
  currentPage: number = 1;
  itemsPerPage: number = 8;

  constructor(public activeModal: NgbActiveModal) {}

  getPaginatedProducts(): Product[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.products.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.products.length / this.itemsPerPage);
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getPageNumbers(): number[] {
    const totalPages = this.totalPages;
    const current = this.currentPage;
    
    if (totalPages <= 5) {
      return Array.from({length: totalPages}, (_, i) => i + 1);
    }
    
    if (current <= 3) {
      return [1, 2, 3, 4, 5];
    }
    
    if (current >= totalPages - 2) {
      return Array.from({length: 5}, (_, i) => totalPages - 4 + i);
    }
    
    return [current - 2, current - 1, current, current + 1, current + 2];
  }

  getStars(rating: number): number[] {
    const stars: number[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(1);
    }
    if (hasHalfStar) {
      stars.push(0.5);
    }
    while (stars.length < 5) {
      stars.push(0);
    }
    return stars;
  }

  formatPrice(price: number): string {
    return `₹${price.toLocaleString('en-IN')}`;
  }
} 