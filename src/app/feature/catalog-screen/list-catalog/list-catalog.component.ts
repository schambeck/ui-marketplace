import {Component, OnDestroy, OnInit} from '@angular/core';
import {debounceTime, distinctUntilChanged, Observable, Subject, Subscription, tap} from "rxjs";
import {Page} from 'src/app/shared/model/page';
import {Router} from '@angular/router';
import {Product} from "../../../shared/model/product.entity";
import {ShoppingCartService} from "../../../shared/service/shopping-cart.service";
import {MessageService} from "primeng/api";
import {Title} from "@angular/platform-browser";
import {AuthorizationService} from "../../../shared/service/authorization.service";
import {CatalogService} from "../../../shared/service/catalog.service";
import {ObjectStorageService} from "../../../shared/service/object-storage.service";

@Component({
  selector: 'app-list-catalog',
  templateUrl: './list-catalog.component.html',
  styleUrls: ['./list-catalog.component.css']
})
export class ListCatalogComponent implements OnInit, OnDestroy {
  rows = 25;
  searchText$ = new Subject<string>();
  subscription?: Subscription;
  page$ = this.load();
  fake = [{}, {}, {}, {}, {}];
  loading = false;
  saving = false;
  totalElements = 0;
  currentPage = 0;
  currentText = '';

  constructor(private service: CatalogService,
              private shoppingCartService: ShoppingCartService,
              private messageService: MessageService,
              private router: Router,
              private titleService: Title,
              private authService: AuthorizationService,
              private objectStorageService: ObjectStorageService) {
  }

  ngOnInit(): void {
    this.titleService.setTitle("Catalog");
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

  load(page = 0, text = ''): Observable<Page<Product>> {
    this.loading = true;
    this.currentPage = page;
    this.currentText = text;
    return this.service.list(page, this.rows, text).pipe(tap({
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

  addCartItem(product: Product) {
    if (!this.authService.isLoggedIn()) {
      // let redirectUri = `${window.location.origin}/shopping-cart/${product.id}`;
      this.authService.login();
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

  getImageUrl(objectId: string) {
    return this.objectStorageService.getImageUrl(objectId)
  }
}
