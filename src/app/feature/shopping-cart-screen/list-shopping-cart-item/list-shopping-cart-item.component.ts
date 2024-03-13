import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, debounceTime, distinctUntilChanged, Observable, Subject, Subscription, tap} from "rxjs";
import {Page} from 'src/app/shared/model/page';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from "../../../shared/model/product.entity";
import {ShoppingCartService} from "../../../shared/service/shopping-cart.service";
import {CartItem} from "../../../shared/model/cart-item.entity";
import {CartService} from "../../../shared/service/cart.service";
import {Cart} from "../../../shared/model/cart.entity";
import {MessageService} from "primeng/api";
import {CartItemQuantity} from "./cart-item-quantity.entity";
import {Title} from "@angular/platform-browser";
import {ProductService} from "../../../shared/service/product.service";

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
  productId?: string | null;

  constructor(private cartService: CartService,
              private service: ShoppingCartService,
              private productService: ProductService,
              private messageService: MessageService,
              private router: Router,
              private titleService: Title,
              private route: ActivatedRoute) {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (!this.productId) {
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

  ngOnInit(): void {
    this.titleService.setTitle("Cart");
    this.subscription = this.searchText$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe(text => this.refresh(text))

    this.quantitySubscription = this.quantity$.pipe(
      distinctUntilChanged((prev, curr) => prev.id === curr.id && prev.quantity === curr.quantity),
    ).subscribe(cartItemQuantity => this.updateQuantity(cartItemQuantity))

    if (this.productId) {
      this.addCartItemIfAbsent(Number(this.productId));
    }
  }

  addCartItemIfAbsent(productId: number) {
    this.creating = true;
    let payload = {
      productId: productId,
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
      error: () => this.creating = false,
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
      error: () => this.updating = false,
      complete: () => this.updating = false
    });
  }

  getImageUrl(objectId: string) {
    return this.productService.getImage(objectId)
  }
}
