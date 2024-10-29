import { Component, OnInit } from '@angular/core';
import { CartItem } from '../models/cartItem';
import { Product } from '../models/product';
import { CartItemService } from '../services/cart-item.service';
import { ProductService } from '../services/product.service';
import { CartModalComponent } from './cart-modal/cart-modal.component';
import { CatalogComponent } from './catalog/catalog.component';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [CatalogComponent, NavbarComponent, CartModalComponent],
  templateUrl: './cart-app.component.html',
  styleUrl: './cart-app.component.css'
})
export class CartAppComponent implements OnInit {

  products: Product[] = [];
  items: CartItem[] = [];
  total: number = 0;
  showCart: boolean = false;

  constructor(private productService: ProductService, private cartItemService: CartItemService) { }

  ngOnInit(): void {
    this.products = this.productService.findAll();
    this.items = JSON.parse(sessionStorage.getItem('cart')  || '[]');
    this.total = this.cartItemService.calculateTotal(this.items);
  }

  onAddCart(product: Product): void {
    this.items = this.cartItemService.addProduct(this.items, product);
    this.total = this.cartItemService.calculateTotal(this.items);
    this.saveSession();
  }

  onDeleteCart(id: number): void {
    this.items = this.cartItemService.removeProduct(this.items, id);
    this.total = this.cartItemService.calculateTotal(this.items);
    this.saveSession();
    if (this.items.length == 0) {
      sessionStorage.removeItem('cart');
    }
  }

  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }

  openCloseCart(): void {
    this.showCart = !this.showCart;
  }

}
