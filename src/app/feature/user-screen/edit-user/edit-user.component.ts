import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserService} from 'src/app/shared/service/user.service';
import {Location} from '@angular/common';
import {User} from "../../../shared/model/user.entity";
import {MessageService} from "primeng/api";
import {Title} from "@angular/platform-browser";
import {OAuthService} from "../../../shared/service/oauth.service";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userSubject$ = new BehaviorSubject<User>({} as User);
  user$?: Observable<User>;
  saving = false;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private service: UserService,
              private messageService: MessageService,
              private titleService: Title,
              private oAuthService: OAuthService) {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.get(id).subscribe(value => {
        this.userSubject$.next(value);
        this.user$ = this.userSubject$.asObservable();
        let tokenGenerated = Boolean(this.route.snapshot.queryParamMap.get('tokenGenerated'));
        if (tokenGenerated) {
          this.messageService.add({severity: 'success', summary: 'Token gerado', detail: 'Token gerado'});
        }
      });
    } else {
      this.user$ = this.userSubject$.asObservable();
    }
  }

  ngOnInit(): void {
    this.titleService.setTitle("Usuário");
  }

  back(): void {
    this.location.back();
  }

  save(): void {
    this.saving = true;
    let payload = this.userSubject$.getValue();
    this.service.create(payload).subscribe({
      next: user => {
        this.messageService.add({severity: 'success', summary: 'Usuário criado', detail: JSON.stringify(user)});
        this.location.back();
      },
      error: () => this.saving = false,
      complete: () => this.saving = false
    });
  }

  startFlow(): void {
    this.oAuthService.startFlow().subscribe((response: any) => {
      console.log(`Started flow: ${JSON.stringify(response)}`);
      window.location.href = response.redirectUrl;
    });
  }

  // requestSellerPermission(): void {
  //   window.location.href = 'https://auth.mercadopago.com.br/authorization?' +
  //     `client_id=${environment.mercadoPago.clientId}` +
  //     '&response_type=code' +
  //     '&platform_id=mp' +
  //     `&redirect_uri=${environment.baseUrl}/oauth`;
  // }
}
