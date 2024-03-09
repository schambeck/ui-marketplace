import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {ProductService} from 'src/app/shared/service/product.service';
import {Product} from "../../../shared/model/product.entity";
import {MessageService} from "primeng/api";
import {Title} from "@angular/platform-browser";
import {ShoppingCartService} from "../../../shared/service/shopping-cart.service";
import {AuthService} from "../../../shared/service/auth.service";

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  productSubject$ = new BehaviorSubject<Product>({} as Product);
  product$?: Observable<Product>;
  saving = false;
  quantity: number = 1;

  constructor(private route: ActivatedRoute,
              private service: ProductService,
              private messageService: MessageService,
              private titleService: Title,
              private router: Router,
              private shoppingCartService: ShoppingCartService,
              private authService: AuthService) {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.get(id).subscribe(value => {
        this.productSubject$.next(value);
        this.product$ = this.productSubject$.asObservable();
      });
    } else {
      this.product$ = this.productSubject$.asObservable();
    }
  }

  ngOnInit(): void {
    this.titleService.setTitle("Product");
  }

  back(): void {
    this.router.navigate(['catalog']);
  }

  addCartItem() {
    this.product$?.subscribe(product => this.addCartProduct(product));
  }

  addCartProduct(product: Product) {
    if (!this.authService.isLoggedIn()) {
      let redirectUri = `${window.location.origin}/shopping-cart/${product.id}`;
      this.authService.login({redirectUri: redirectUri});
      return;
    }
    this.saving = true;
    let payload = {
      productId: product.id,
      quantity: 1
    };
    this.shoppingCartService.create(payload).subscribe({
      next: cartItem => {
        this.messageService.add({
          severity: 'success',
          summary: 'Product added to cart',
          detail: `Cart: ${cartItem.cart.id} - Item: ${cartItem.id}`});
        this.router.navigate(['shopping-cart']);
      },
      error: () => this.saving = false,
      complete: () => this.saving = false
    });
  }

}
