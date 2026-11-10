import {KeycloakService} from 'keycloak-angular';
import {CommonModule} from '@angular/common';
import {RouterTestingModule} from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('SidebarComponent', () => {
  let roles: string[] = [];
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule],
      providers: [{provide: KeycloakService, useValue: {getUserRoles: () => roles}}],
      declarations: [ SidebarComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => { roles = []; });

  it('hides administrative and sales navigation from buyers', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('a[href="/user"]')).toBeNull();
    expect(fixture.nativeElement.querySelector('a[href="/offer"]')).toBeNull();
  });

  it('shows sales tools for sellers without exposing administration', () => {
    roles = ['SELLER']; fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('a[href="/offer"]')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('a[href="/user"]')).toBeNull();
  });

  it('shows administration for admins with normalized role names', () => {
    roles = [' ADMIN ']; fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('a[href="/user"]')).not.toBeNull();
    expect(fixture.nativeElement.querySelector('a[href="/inventory"]')).not.toBeNull();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
