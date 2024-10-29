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
  @Output() openCloseCartEventEmitter: EventEmitter<number> = new EventEmitter();
  
  openCloseCart():void {
    this.openCloseCartEventEmitter.emit();
  }
}
