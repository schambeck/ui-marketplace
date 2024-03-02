import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {ProductService} from 'src/app/shared/service/product.service';
import {Location} from '@angular/common';
import {Product} from "../../../shared/model/product.entity";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {
  productSubject$ = new BehaviorSubject<Product>({} as Product);
  product$?: Observable<Product>;
  saving = false;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private service: ProductService,
              private messageService: MessageService) {
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

  back(): void {
    this.location.back();
  }

  save(): void {
    this.saving = true;
    let payload = this.productSubject$.getValue();
    this.service.create(payload).subscribe({
      next: product => {
        this.messageService.add({severity: 'success', summary: 'Product Created', detail: JSON.stringify(product)});
        this.location.back();
      },
      error: () => this.saving = false,
      complete: () => this.saving = false
    });
  }

}
