import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {ProductService} from 'src/app/shared/service/product.service';
import {Location} from '@angular/common';
import {Product} from "../../../shared/model/product.entity";
import {MessageService} from "primeng/api";
import {Title} from "@angular/platform-browser";

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
              private location: Location,
              private service: ProductService,
              private messageService: MessageService,
              private titleService: Title) {
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
    this.location.back();
  }

  addToCart(): void {
    this.messageService.add({severity: 'success', summary: 'Product added to cart'});
    this.location.back();
  }

}
