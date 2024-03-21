import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AuthorizationService} from "../../../shared/service/authorization.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userProfile: any;

  constructor(private titleService: Title,
              private authService: AuthorizationService) {}

  ngOnInit() {
    this.titleService.setTitle("Profile");
    this.authService.auth.user$.subscribe(profile => (this.userProfile = profile));
  }
}
