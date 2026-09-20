import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {debounceTime, distinctUntilChanged, Observable, Subject, Subscription, tap} from 'rxjs';
import {Title} from '@angular/platform-browser';

import {GameContext} from '../../../shared/model/game-context.entity';
import {Page} from '../../../shared/model/page';
import {GameContextService} from '../../../shared/service/game-context.service';

@Component({
  selector: 'app-list-game-context',
  templateUrl: './list-game-context.component.html',
  styleUrls: ['./list-game-context.component.css']
})
export class ListGameContextComponent implements OnInit, OnDestroy {
  rows = 10;
  page$ = this.load();
  fake = [{}, {}, {}, {}, {}];
  searchText$ = new Subject<string>();
  subscription?: Subscription;
  loading = false;
  totalElements = 0;
  currentPage = 0;
  currentText = '';

  constructor(private service: GameContextService,
              private router: Router,
              private titleService: Title) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Game Contexts');
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

  load(page = 0, text = ''): Observable<Page<GameContext>> {
    this.loading = true;
    this.currentPage = page;
    this.currentText = text;
    return this.service.list(page, this.rows, text).pipe(tap({
      next: result => this.totalElements = result.totalElements,
      error: () => this.loading = false,
      complete: () => this.loading = false
    }));
  }

  refresh(text = this.currentText): void {
    this.page$ = this.load(this.currentPage, text);
  }

  paginate(event: {page?: number; rows?: number}): void {
    this.rows = event.rows ?? this.rows;
    this.page$ = this.load(event.page ?? 0, this.currentText);
  }

  navigateToDetail(context: GameContext): void {
    this.router.navigate(['game-context', context.id]);
  }

  newContext(): void {
    this.router.navigate(['game-context/new']);
  }

  getSeverity(status: GameContext['status']): 'success' | 'warning' | 'danger' {
    switch (status) {
      case 'ACTIVE':
        return 'success';
      case 'INACTIVE':
        return 'warning';
      case 'DISCONTINUED':
        return 'danger';
    }
  }
}
