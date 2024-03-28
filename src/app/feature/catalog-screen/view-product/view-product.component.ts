import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {ProductService} from 'src/app/shared/service/product.service';
import {Product} from "../../../shared/model/product.entity";
import {MessageService} from "primeng/api";
import {Title} from "@angular/platform-browser";
import {ShoppingCartService} from "../../../shared/service/shopping-cart.service";
import {AuthorizationService} from "../../../shared/service/authorization.service";
import {ObjectStorageService} from "../../../shared/service/object-storage.service";
import {Image} from "../../../shared/model/image.entity";
import {ImageService} from "../../../shared/service/image.service";

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
  imagesSubject$ = new BehaviorSubject<Image[]>({} as Image[]);
  images$?: Observable<Image[]>;
  images: Image[] = [];
  responsiveOptions: any[] = [];

  constructor(private route: ActivatedRoute,
              private service: ProductService,
              private objectStorageService: ObjectStorageService,
              private messageService: MessageService,
              private titleService: Title,
              private router: Router,
              private shoppingCartService: ShoppingCartService,
              private authService: AuthorizationService,
              private imageService: ImageService) {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.get(id).subscribe(value => {
        this.productSubject$.next(value);
        this.product$ = this.productSubject$.asObservable();
      });
      this.imageService.listByProduct(Number(id)).subscribe(value => {
        this.imagesSubject$.next(value);
        this.images$ = this.imagesSubject$.asObservable();
        this.images = value;
      });
    } else {
      this.product$ = this.productSubject$.asObservable();
      this.images$ = this.imagesSubject$.asObservable();
      this.images = [];
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
