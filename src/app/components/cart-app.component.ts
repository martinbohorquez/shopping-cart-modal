import { Component, OnInit } from '@angular/core';
import { CartItem } from '../models/cartItem';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { CartComponent } from './cart/cart.component';
import { CatalogComponent } from './catalog/catalog.component';

@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [CatalogComponent, CartComponent],
  templateUrl: './cart-app.component.html',
  styleUrl: './cart-app.component.css'
})
export class CartAppComponent implements OnInit {

  products: Product[] = [];
  items: CartItem[] = [];
  total: number = 0;
  showCart: boolean = false;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.products = this.productService.findAll();
    this.items = JSON.parse(sessionStorage.getItem('cart')!) || [];
    this.total = this.calculateTotal();
  }

  onAddCart(product: Product): void {
    const hasItem = this.items.find(item => item.product.id === product.id);
    if (hasItem) {
      this.items = this.items.map(item => {
        if (item.product.id === product.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    } else {
      this.items = [... this.items, { product: { ...product }, quantity: 1 }];
    }
    this.setTotalAndSaveSession();
  }

  onDeleteCart(id: number): void {
    this.items = this.items.filter(item => item.product.id != id);
    this.setTotalAndSaveSession();
  }

  calculateTotal(): number {
    return this.items.reduce((accumulator, item) => {
      return accumulator + (item.quantity * item.product.price);
    }, 0);
  }

  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }

  setTotalAndSaveSession():void {
    this.total = this.calculateTotal();
    this.saveSession();
  }

  openCart(): void {
    this.showCart = !this.showCart;
  }

}
