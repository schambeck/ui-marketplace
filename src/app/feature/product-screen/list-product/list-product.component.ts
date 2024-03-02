import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from 'src/app/shared/service/product.service';
import {debounceTime, distinctUntilChanged, Observable, Subject, Subscription, tap} from "rxjs";
import {Page} from 'src/app/shared/model/page';
import {Router} from '@angular/router';
import {Product} from "../../../shared/model/product.entity";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit, OnDestroy {
  rows = 5;
  searchText$ = new Subject<string>();
  subscription?: Subscription;
  page$ = this.load();
  fake = [{}, {}, {}, {}, {}];
  loading = false;
  removing = false;
  totalElements = 0;
  currentPage = 0;
  currentText = '';

  constructor(private service: ProductService,
              private router: Router,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
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
    this.router.navigate(['product', product.id]);
  }

  newProduct(): void {
    this.router.navigate(['product']);
  }

  remove(id: string): void {
    this.removing = true;
    this.service.delete(id).subscribe({
      next: () => {
        this.messageService.add({severity: 'success', summary: 'Product Deleted', detail: `Id: ${id}`});
        this.refresh();
      },
      error: () => this.removing = false,
      complete: () => this.removing = false
    });
  }

}
