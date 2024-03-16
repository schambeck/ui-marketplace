import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {ProductService} from 'src/app/shared/service/product.service';
import {Location} from '@angular/common';
import {Product} from "../../../shared/model/product.entity";
import {MessageService} from "primeng/api";
import {Title} from "@angular/platform-browser";
import {FileUploadEvent} from "primeng/fileupload";
import {HttpResponse} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productSubject$ = new BehaviorSubject<Product>({} as Product);
  product$?: Observable<Product>;
  saving = false;
  uploadedFile: any = {};

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

  save(): void {
    this.saving = true;
    let payload = this.productSubject$.getValue();
    if (payload.id) {
      this.service.update(payload.id, payload).subscribe({
        next: product => {
          this.messageService.add({severity: 'success', summary: 'Product Updated', detail: JSON.stringify(product)});
          this.location.back();
        },
        error: () => this.saving = false,
        complete: () => this.saving = false
      });
    } else {
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

  onUpload(event: FileUploadEvent, product: Product) {
    let originalEvent = event.originalEvent as HttpResponse<any>;
    product.objectId = originalEvent.body.objectId;
    this.uploadedFile = event.files.at(0);
    product.image = this.uploadedFile.name;
    this.messageService.add({ severity: 'info', summary: 'Success', detail: `File Uploaded: ${event.files[0].name}` });
  }

  getImageUrl(objectId: string) {
    return this.service.getImage(objectId)
  }

  protected readonly environment = environment;
}
