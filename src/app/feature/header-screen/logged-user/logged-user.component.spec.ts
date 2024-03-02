import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoggedUserComponent } from './logged-user.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('LoggedUserComponent', () => {
  let component: LoggedUserComponent;
  let fixture: ComponentFixture<LoggedUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoggedUserComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
