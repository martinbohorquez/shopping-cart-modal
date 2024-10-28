import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  
  @Input() items: CartItem[] = [];
  @Output() openCartEventEmitter: EventEmitter<number> = new EventEmitter();
  

  openCart():void {
    this.openCartEventEmitter.emit();
  }
}
