import {Component, OnDestroy, OnInit} from '@angular/core';
import {debounceTime, distinctUntilChanged, Observable, Subject, Subscription, tap} from "rxjs";
import {Page} from 'src/app/shared/model/page';
import {Router} from '@angular/router';
import {Offer} from '../../../shared/model/offer.entity';
import {ShoppingCartService} from "../../../shared/service/shopping-cart.service";
import {MessageService} from "primeng/api";
import {Title} from "@angular/platform-browser";
import {AuthService} from "../../../shared/service/auth.service";
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
              private authService: AuthService,
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

  load(page = 0, text = ''): Observable<Page<Offer>> {
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

  navigateToDetail(offer: Offer): void {
    this.router.navigate(['catalog', offer.id]);
  }

  getSeverity(offer: Offer) {
    switch (offer.availabilityStatus) {
      case 'AVAILABLE':
        return 'success';
      case 'UNAVAILABLE':
        return 'danger';
      default:
        return 'danger';
    }
  };

  canPurchase(offer: Offer): boolean {
    return offer.status === 'PUBLISHED' && offer.availabilityStatus === 'AVAILABLE' && offer.context.status !== 'INACTIVE' && offer.context.status !== 'DISCONTINUED';
  }

  addCartItem(offer: Offer) {
    if (!this.authService.isLoggedIn()) {
      const redirectUri = `${window.location.origin}/shopping-cart/${offer.id}`;
      this.authService.login({redirectUri});
      return;
    }
    this.saving = true;
    this.shoppingCartService.create({offerId: offer.id, productId: offer.productId, quantity: 1}).subscribe({
      next: cartItem => {
        this.messageService.add({severity: 'success', summary: 'Offer added to cart', detail: `Cart: ${cartItem.cart.id} - Item: ${cartItem.id}`});
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
