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
import {ObjectStorageService} from "../../../shared/service/object-storage.service";
import {loadMercadoPago} from "@mercadopago/sdk-js";
import {environment} from "../../../../environments/environment";
import {OAuthTokenService} from "../../../shared/service/oauth-token.service";

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
  loadingToken = false;
  totalElements = 0;
  currentPage = 0;
  currentText = '';
  cartSubject$ = new BehaviorSubject<Cart>({} as Cart);
  cart$?: Observable<Cart>;
  tokenSubject$ = new BehaviorSubject<any>({} as any);
  token$?: Observable<any>;
  quantitySubscription?: Subscription;
  preferenceId?: string | null;
  mp: any;

  constructor(private cartService: CartService,
              private service: ShoppingCartService,
              private objectStorageService: ObjectStorageService,
              private router: Router,
              private titleService: Title,
              private route: ActivatedRoute,
              private oAuthTokenService: OAuthTokenService) {
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
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.quantitySubscription?.unsubscribe();
  }

  loadToken(userId: number) {
    this.loadingToken = true;
    this.tokenSubject$?.subscribe((token: any) => this.createWalletContainer(token));
    this.oAuthTokenService.getByUser(userId).subscribe({
      next: token => {
        console.log(`Token: ${token.accessToken}`);
        this.tokenSubject$.next(token);
        this.token$ = this.tokenSubject$.asObservable();
      },
      error: () => {
        this.loadingToken = false;
        this.back();
      },
      complete: () => this.loadingToken = false
    });
  }

  createWalletContainer(token: any) {
    if (token?.publicKey) {
      loadMercadoPago().then(() => {
        console.log(`Loading Mercado Pago for Public Key: ${token.publicKey}`);
        // @ts-ignore
        this.mp = new window.MercadoPago(token.publicKey, {
          locale: environment.mercadoPago.locale,
        });
        this.mp.bricks().create("wallet", "wallet_container", {
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
      });
    }
  }

  load(page = 0, text = ''): Observable<Page<CartItem>> {
    this.loading = true;
    this.currentPage = page;
    this.currentText = text;
    return this.service.search(page, 5, text).pipe(tap({
      next: page => {
        if (page.content.length > 0) {
          this.loadToken(page.content[0].product.user.id);
        }
        return this.totalElements = page.totalElements;
      },
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
      case 'NOSTOCK':
        return 'danger';
      default:
        return 'danger';
    }
  };

  back(): void {
    this.router.navigate(['shopping-cart']);
  }

  getImageUrl(objectId: string) {
    return this.objectStorageService.getImageUrl(objectId)
  }
}
