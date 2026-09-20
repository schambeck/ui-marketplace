import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {MessageService} from 'primeng/api';
import {Title} from '@angular/platform-browser';

import {Offer} from '../../../shared/model/offer.entity';
import {Image} from '../../../shared/model/image.entity';
import {ShoppingCartService} from '../../../shared/service/shopping-cart.service';
import {AuthService} from '../../../shared/service/auth.service';
import {ObjectStorageService} from '../../../shared/service/object-storage.service';
import {ImageService} from '../../../shared/service/image.service';
import {CatalogService} from '../../../shared/service/catalog.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  offerSubject$ = new BehaviorSubject<Offer>({} as Offer);
  offer$ = this.offerSubject$.asObservable();
  currentOffer?: Offer;
  saving = false;
  quantity = 1;
  imagesSubject$ = new BehaviorSubject<Image[]>([]);
  images$ = this.imagesSubject$.asObservable();
  responsiveOptions: any[] = [];

  constructor(private route: ActivatedRoute,
              private service: CatalogService,
              private objectStorageService: ObjectStorageService,
              private messageService: MessageService,
              private titleService: Title,
              private router: Router,
              private shoppingCartService: ShoppingCartService,
              private authService: AuthService,
              private imageService: ImageService) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.get(id).subscribe(offer => {
        this.currentOffer = offer;
        this.offerSubject$.next(offer);
        this.imageService.listByProduct(offer.productId).subscribe(images => this.imagesSubject$.next(images));
      });
    }
  }

  ngOnInit(): void {
    this.titleService.setTitle('Offer');
  }

  back(): void {
    this.router.navigate(['catalog']);
  }

  canPurchase(offer: Offer): boolean {
    return offer.status === 'PUBLISHED' && offer.availabilityStatus === 'AVAILABLE' && offer.context.status !== 'INACTIVE' && offer.context.status !== 'DISCONTINUED';
  }

  addCartItem(): void {
    const offer = this.currentOffer;
    if (offer) {
      this.addCartOffer(offer);
    }
  }

  private addCartOffer(offer: Offer): void {
    if (!this.canPurchase(offer)) {
      return;
    }
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

  getImageUrl(objectId: string): string {
    return this.objectStorageService.getImageUrl(objectId);
  }
}
