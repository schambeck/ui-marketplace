import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, debounceTime, distinctUntilChanged, Observable, Subject, Subscription, tap} from "rxjs";
import {Page} from 'src/app/shared/model/page';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from "../../../shared/model/product.entity";
import {ShoppingCartService} from "../../../shared/service/shopping-cart.service";
import {CartItem} from "../../../shared/model/cart-item.entity";
import {Location} from "@angular/common";
import {CartService} from "../../../shared/service/cart.service";
import {Cart} from "../../../shared/model/cart.entity";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-list-shopping-cart-item',
  templateUrl: './list-shopping-cart-item.component.html',
  styleUrls: ['./list-shopping-cart-item.component.css']
})
export class ListShoppingCartItemComponent implements OnInit, OnDestroy {
  rows = 25;
  searchText$ = new Subject<string>();
  subscription?: Subscription;
  page$ = this.load();
  fake = [{}, {}, {}, {}, {}];
  loading = false;
  saving = false;
  removing = false;
  totalElements = 0;
  currentPage = 0;
  currentText = '';
  cartId?: number;
  cartSubject$ = new BehaviorSubject<Cart>({} as Cart);
  cart$?: Observable<Cart>;

  constructor(private route: ActivatedRoute,
              private cartService: CartService,
              private service: ShoppingCartService,
              private location: Location,
              private messageService: MessageService,
              private router: Router) {
    let cartId = this.route.snapshot.paramMap.get('id');
    if (cartId) {
      this.cartId = Number(cartId);
      this.refreshCart();
      this.refresh();
    } else {
      this.cart$ = this.cartSubject$.asObservable();
    }
  }

  private refreshCart() {
    if (this.cartId) {
      this.loading = true;
      this.cartService.get(this.cartId).subscribe({
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
  }

  ngOnInit(): void {
    this.subscription = this.searchText$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe(text => this.refresh(text))
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  search(text: string) {
    this.searchText$.next(text);
  }

  load(page = 0, text = ''): Observable<Page<CartItem>> {
    if (!this.cartId) {
      return new Observable<Page<CartItem>>();
    }
    this.loading = true;
    this.currentPage = page;
    this.currentText = text;
    return this.service.search(this.cartId, page, 5, text).pipe(tap({
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
    this.location.back();
  }

  remove(id: string): void {
    this.removing = true;
    this.service.delete(id).subscribe({
      next: () => {
        this.messageService.add({severity: 'success', summary: 'Item removed from cart', detail: `Id: ${id}`});
        this.refreshCart();
        this.refresh();
      },
      error: () => this.removing = false,
      complete: () => this.removing = false
    });
  }
}
