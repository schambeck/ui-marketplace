import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ShoppingCartService} from "../../../shared/service/shopping-cart.service";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styles: [],
})
export class ShoppingCartComponent implements OnInit {
  quantity: string | undefined;

  constructor(private router: Router,
              private service: ShoppingCartService) {
  }

  ngOnInit(): void {
    this.service.count$.subscribe({
      next: count => this.quantity = count.toString()
    });
    this.service.count();
  }

  navigateToCart() {
    this.router.navigate(['shopping-cart']);
  }
}
