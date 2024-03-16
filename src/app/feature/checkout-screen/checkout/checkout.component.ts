import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, debounceTime, distinctUntilChanged, Observable, Subject, Subscription, tap} from "rxjs";
import {Page} from 'src/app/shared/model/page';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from "../../../shared/model/product.entity";
import {ShoppingCartService} from "../../../shared/service/shopping-cart.service";
import {CartItem} from "../../../shared/model/cart-item.entity";
import {CartService} from "../../../shared/service/cart.service";
import {Cart} from "../../../shared/model/cart.entity";
import {Title} from "@angular/platform-browser";
import {ProductService} from "../../../shared/service/product.service";
import { loadMercadoPago } from "@mercadopago/sdk-js";

let mp: any;
loadMercadoPago().then(() => {
  // @ts-ignore
  mp = new window.MercadoPago("", {
    locale: "pt-BR",
  });
});

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  rows = 25;
  searchText$ = new Subject<string>();
  subscription?: Subscription;
  page$ = new Observable<Page<CartItem>>();
  fake = [{}, {}, {}, {}, {}];
  loading = false;
  creating = false;
  totalElements = 0;
  currentPage = 0;
  currentText = '';
  cartSubject$ = new BehaviorSubject<Cart>({} as Cart);
  cart$?: Observable<Cart>;
  quantitySubscription?: Subscription;
  preferenceId?: string | null;

  constructor(private cartService: CartService,
              private service: ShoppingCartService,
              private productService: ProductService,
              private router: Router,
              private titleService: Title,
              private route: ActivatedRoute) {
    this.preferenceId = this.route.snapshot.paramMap.get('id');
    this.refreshCart();
    this.refresh();
  }

  refreshCart() {
    this.loading = true;
    this.cartService.getByUser().subscribe({
      next: cart => {
        this.cartSubject$.next(cart);
        this.cart$ = this.cartSubject$.asObservable();
      },
      error: () => {
        this.loading = false;
        this.back();
      },
      complete: () => this.loading = false
    });
  }

  ngOnInit() {
    this.titleService.setTitle("Checkout");
    this.subscription = this.searchText$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe(text => this.refresh(text))

    if (this.preferenceId) {
      console.log(`PreferenceId: ${this.preferenceId}`);
      mp.bricks().create("wallet", "wallet_container", {
        initialization: {
          preferenceId: this.preferenceId
        },
        customization: {
          texts: {
            valueProp: 'smart_option'
          }
        },
        callbacks: {
          onReady: () => console.log('onReady'),
          onSubmit: () => console.log('onSubmit')
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.quantitySubscription?.unsubscribe();
  }

  load(page = 0, text = ''): Observable<Page<CartItem>> {
    this.loading = true;
    this.currentPage = page;
    this.currentText = text;
    return this.service.search(page, 5, text).pipe(tap({
      next: page => this.totalElements = page.totalElements,
      error: () => this.loading = false,
      complete: () => this.loading = false
    }));
  }

  refresh(text = ''): void {
    this.page$ = this.load(this.currentPage, text);
  }

  paginate(event: any) {
    this.rows = event.rows;
    this.page$ = this.load(event.page);
  }

  navigateToDetail(product: Product): void {
    this.router.navigate(['catalog', product.id]);
  }

  getSeverity(product: Product) {
    switch (product.inventoryStatus) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return 'danger';
    }
  };

  back(): void {
    this.router.navigate(['shopping-cart']);
  }

  getImageUrl(objectId: string) {
    return this.productService.getImage(objectId)
  }
}
