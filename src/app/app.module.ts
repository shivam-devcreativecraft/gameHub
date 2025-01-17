import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductsComponent } from './components/products/products.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductPreviewComponent } from './components/product-preview/product-preview.component';
import { BrandDetailsComponent } from './components/brand-details/brand-details.component';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';
import { SearchComponent } from './components/search/search.component';
import { FormsModule } from '@angular/forms';
import { register } from 'swiper/element/bundle';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ScrollTopComponent } from './components/scroll-top/scroll-top.component';

register(); // Register Swiper custom elements

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductsComponent,
    BrandsComponent,
    CategoriesComponent,
    ProductPreviewComponent,
    BrandDetailsComponent,
    CategoryDetailsComponent,
    SearchComponent,
    HomeComponent,
    FooterComponent,
    ScrollTopComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule
  ],
  providers: [DecimalPipe],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
