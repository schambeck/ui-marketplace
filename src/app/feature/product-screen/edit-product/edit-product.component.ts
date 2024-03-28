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
import {Image} from "../../../shared/model/image.entity";
import {ImageService} from "../../../shared/service/image.service";
import {ObjectStorageService} from "../../../shared/service/object-storage.service";
import {environment} from "../../../../environments/environment";

export interface FileUploadResponse {
  objectId: string;
  fileName: string;
  contentType: string;
  size: number;
}

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productSubject$ = new BehaviorSubject<Product>({} as Product);
  product$?: Observable<Product>;
  imagesSubject$ = new BehaviorSubject<Image[]>({} as Image[]);
  images$?: Observable<Image[]>;
  images: Image[] = [];
  saving = false;
  uploadedFiles: FileUploadResponse[] = [];
  responsiveOptions: any[] = [];

  constructor(private route: ActivatedRoute,
              private location: Location,
              private service: ProductService,
              private imageService: ImageService,
              private objectStorageService: ObjectStorageService,
              private messageService: MessageService,
              private titleService: Title) {
  }

  ngOnInit(): void {
    this.titleService.setTitle("Product");
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

  back(): void {
    this.location.back();
  }

  save(): void {
    this.saving = true;
    let payload = this.productSubject$.getValue();
    if (payload.id) {
      this.service.update(payload.id, payload).subscribe({
        next: product => {
          for (const file of this.uploadedFiles) {
            const newImage: Image = {
              product: product,
              objectId: file.objectId,
              fileName: file.fileName,
              contentType: file.contentType,
              size: file.size,
              version: 0
            };
            this.imageService.create(newImage).subscribe({
              next: created => this.messageService.add({severity: 'success', summary: 'Image Created', detail: JSON.stringify(created)}),
              error: () => this.saving = false,
              complete: () => this.saving = false
            });
          }
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
    let uploadedFile = originalEvent.body;
    if (!uploadedFile) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'File upload response body cannot be empty.' });
      return;
    }
    this.uploadedFiles.push(uploadedFile);
    let image: Image = {
      product: product,
      objectId: uploadedFile.objectId,
      fileName: uploadedFile.fileName,
      contentType: uploadedFile.contentType,
      size: uploadedFile.size,
      version: 0
    }
    this.images = [...this.images, image];
    this.imagesSubject$.next(this.images);
    product.objectId = uploadedFile.objectId;
    product.image = uploadedFile.fileName;
    this.messageService.add({ severity: 'info', summary: 'Success', detail: `Images Uploaded: ${event.files.map(file => file.name)}` });
  }

  getImageUrl(objectId: string) {
    return this.objectStorageService.getImageUrl(objectId)
  }

  protected readonly environment = environment;
}
