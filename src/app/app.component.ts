import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'UI Template';
  loading: boolean = false;

  constructor(private titleService: Title, private router: Router) {
    this.router.events
      .pipe(filter((e: Event): e is RouterEvent => e instanceof RouterEvent))
      .subscribe((e: RouterEvent) => this.navigationInterceptor(e));
  }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loading = true
    }
    if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
      this.loading = false
    }
  }
}
