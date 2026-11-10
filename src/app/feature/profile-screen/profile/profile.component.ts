import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userProfile: any;

  constructor(private titleService: Title,
              private readonly keycloak: KeycloakService) {}

  ngOnInit() {
    this.titleService.setTitle("Perfil");
    this.keycloak.getKeycloakInstance().loadUserInfo().then(value => this.userProfile = value);
  }
}
