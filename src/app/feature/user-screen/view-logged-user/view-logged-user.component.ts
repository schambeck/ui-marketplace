import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserService} from 'src/app/shared/service/user.service';
import {Location} from '@angular/common';
import {User} from "../../../shared/model/user.entity";
import {MessageService} from "primeng/api";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-view-logged-user',
  templateUrl: './view-logged-user.component.html',
  styleUrls: ['./view-logged-user.component.css']
})
export class ViewLoggedUserComponent implements OnInit {
  userSubject$ = new BehaviorSubject<User>({} as User);
  user$?: Observable<User>;
  saving = false;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private service: UserService,
              private messageService: MessageService,
              private titleService: Title) {
    this.service.findLoggedUser().subscribe(value => {
      this.userSubject$.next(value);
      this.user$ = this.userSubject$.asObservable();
    });
  }

  ngOnInit(): void {
    this.titleService.setTitle("Usuário");
  }

  back(): void {
    this.location.back();
  }
}
