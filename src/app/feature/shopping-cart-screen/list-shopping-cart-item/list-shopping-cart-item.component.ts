import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, debounceTime, distinctUntilChanged, Observable, Subject, Subscription, tap} from "rxjs";
import {Page} from 'src/app/shared/model/page';
import {ActivatedRoute, Router} from '@angular/router';
import {ShoppingCartService} from "../../../shared/service/shopping-cart.service";
import {CartItem} from "../../../shared/model/cart-item.entity";
import {CartService} from "../../../shared/service/cart.service";
import {Cart} from "../../../shared/model/cart.entity";
import {MessageService} from "primeng/api";
import {CartItemQuantity} from "./cart-item-quantity.entity";
import {Title} from "@angular/platform-browser";
import {ObjectStorageService} from "../../../shared/service/object-storage.service";
import {PreferenceService} from "../../../shared/service/preference.service";
import {offerErrorMessage} from '../../../shared/util/offer.util';

@Component({
  selector: 'app-list-shopping-cart-item',
  templateUrl: './list-shopping-cart-item.component.html',
  styleUrls: ['./list-shopping-cart-item.component.css']
})
export class ListShoppingCartItemComponent implements OnInit, OnDestroy {
  rows = 25;
  searchText$ = new Subject<string>();
  subscription?: Subscription;
  page$ = new Observable<Page<CartItem>>();
  fake = [{}, {}, {}, {}, {}];
  loading = false;
  creating = false;
  updating = false;
  removing = false;
  totalElements = 0;
  currentPage = 0;
  currentText = '';
  cartSubject$ = new BehaviorSubject<Cart>({} as Cart);
  cart$?: Observable<Cart>;
  quantity$ = new Subject<CartItemQuantity>();
  quantitySubscription?: Subscription;
  offerId?: string | null;
  checkingOut = false;

  constructor(private cartService: CartService,
              private service: ShoppingCartService,
              private objectStorageService: ObjectStorageService,
              private messageService: MessageService,
              private router: Router,
              private titleService: Title,
              private route: ActivatedRoute,
              private preferenceService: PreferenceService) {
    this.offerId = this.route.snapshot.paramMap.get('id');
    if (!this.offerId) {
      this.refreshCart();
      this.refresh();
    }
  }

  private refreshCart() {
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
    this.titleService.setTitle("Cart");
    this.subscription = this.searchText$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe(text => this.refresh(text))

    this.quantitySubscription = this.quantity$.pipe(
      distinctUntilChanged((prev, curr) => prev.id === curr.id && prev.quantity === curr.quantity),
    ).subscribe(cartItemQuantity => this.updateQuantity(cartItemQuantity))

    if (this.offerId) {
      this.addCartItemIfAbsent(Number(this.offerId));
    }
  }

  addCartItemIfAbsent(offerId: number) {
    this.creating = true;
    let payload = {
      offerId,
      quantity: 1
    };
    this.service.createIfAbsent(payload).subscribe({
      next: response => {
        if (response.created) {
          this.messageService.add({
            severity: 'success',
            summary: 'Product added to cart',
            detail: `Cart: ${response.cartItem.cart.id} - Item: ${response.cartItem.id}`});
        }
        this.refreshCart();
        this.refresh();
      },
      error: error => {
        this.creating = false;
        this.messageService.add({severity: 'warn', summary: 'Offer changed', detail: offerErrorMessage(error)});
      },
      complete: () => this.creating = false
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.quantitySubscription?.unsubscribe();
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  search(text: string) {
    this.searchText$.next(text);
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

  navigateToDetail(offerId?: number): void {
    if (offerId) {
      this.router.navigate(['catalog', offerId]);
    }
  }


  back(): void {
    this.router.navigate(['catalog']);
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

  onModelChange(cartItemId: number, quantity: any) {
    let cartItemQuantity = {
      id: cartItemId,
      quantity: Number(quantity)
    };
    this.quantity$.next(cartItemQuantity);
  }

  updateQuantity(cartItemQuantity: CartItemQuantity) {
    this.updating = true;
    let payload = {
      quantity: cartItemQuantity.quantity
    }
    this.service.update(cartItemQuantity.id, payload).subscribe({
      next: cartItem => {
        this.refreshCart();
        this.messageService.add({severity: 'success', summary: 'Quantity updated', detail: `Id: ${cartItem.id} Quantity: ${cartItem.quantity}`})
      },
      error: error => {
        this.updating = false;
        this.messageService.add({severity: 'warn', summary: 'Offer changed', detail: offerErrorMessage(error)});
      },
      complete: () => this.updating = false
    });
  }

  getImageUrl(objectId: string) {
    return this.objectStorageService.getImageUrl(objectId)
  }

  checkout() {
    this.checkingOut = true;
    this.preferenceService.create().subscribe({
      next: preference => this.router.navigate(['checkout', preference.id]),
      error: error => {
        this.checkingOut = false;
        this.messageService.add({severity: 'warn', summary: 'Checkout unavailable', detail: offerErrorMessage(error)});
      },
      complete: () => this.checkingOut = false
    });
  }
}
