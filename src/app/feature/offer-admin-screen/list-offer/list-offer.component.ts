import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {debounceTime, distinctUntilChanged, Observable, Subject, Subscription, tap} from 'rxjs';
import {Title} from '@angular/platform-browser';

import {Offer, OfferStatus} from '../../../shared/model/offer.entity';
import {Page} from '../../../shared/model/page';
import {OfferService} from '../../../shared/service/offer.service';

@Component({
  selector: 'app-list-offer',
  templateUrl: './list-offer.component.html',
  styleUrls: ['./list-offer.component.css']
})
export class ListOfferComponent implements OnInit, OnDestroy {
  rows = 25;
  page$ = this.load();
  fake = [{}, {}, {}, {}, {}];
  loading = false;
  totalElements = 0;
  currentPage = 0;
  currentText = '';
  selectedStatus = '';
  searchText$ = new Subject<string>();
  subscription?: Subscription;
  statuses: Array<{label: string; value: string}> = [
    {label: 'All statuses', value: ''},
    {label: 'Draft', value: 'DRAFT'},
    {label: 'Published', value: 'PUBLISHED'},
    {label: 'Paused', value: 'PAUSED'},
    {label: 'Retired', value: 'RETIRED'}
  ];

  constructor(private service: OfferService, private router: Router, private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('Offers');
    this.subscription = this.searchText$.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(text => this.refresh(text));
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  search(text: string): void {
    this.searchText$.next(text);
  }

  load(page = 0, text = this.currentText): Observable<Page<Offer>> {
    this.loading = true;
    this.currentPage = page;
    this.currentText = text;
    return this.service.searchOwned(page, this.rows, this.selectedStatus, text).pipe(tap({
      next: result => this.totalElements = result.totalElements,
      error: () => this.loading = false,
      complete: () => this.loading = false
    }));
  }

  refresh(text = this.currentText): void {
    this.page$ = this.load(this.currentPage, text);
  }

  statusChanged(): void {
    this.page$ = this.load(0, this.currentText);
  }

  paginate(event: {page?: number; rows?: number}): void {
    this.rows = event.rows ?? this.rows;
    this.page$ = this.load(event.page ?? 0, this.currentText);
  }

  navigateToDetail(offer: Offer): void {
    this.router.navigate(['offer', offer.id]);
  }

  getSeverity(status: OfferStatus): 'success' | 'warning' | 'danger' | 'info' {
    switch (status) {
      case 'PUBLISHED': return 'success';
      case 'PAUSED': return 'warning';
      case 'RETIRED': return 'danger';
      default: return 'info';
    }
  }
}
