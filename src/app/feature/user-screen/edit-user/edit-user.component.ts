import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserService} from 'src/app/shared/service/user.service';
import {Location} from '@angular/common';
import {User} from "../../../shared/model/user.entity";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  userSubject$ = new BehaviorSubject<User>({} as User);
  user$?: Observable<User>;
  saving = false;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private service: UserService,
              private messageService: MessageService) {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.get(id).subscribe(value => {
        this.userSubject$.next(value);
        this.user$ = this.userSubject$.asObservable();
      });
    } else {
      this.user$ = this.userSubject$.asObservable();
    }
  }

  back(): void {
    this.location.back();
  }

  save(): void {
    this.saving = true;
    let payload = this.userSubject$.getValue();
    this.service.create(payload).subscribe({
      next: user => {
        this.messageService.add({severity: 'success', summary: 'User Created', detail: JSON.stringify(user)});
        this.location.back();
      },
      error: () => this.saving = false,
      complete: () => this.saving = false
    });
  }

}
