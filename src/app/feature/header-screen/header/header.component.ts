import {Component} from '@angular/core';
import {AuthorizationService} from "../../../shared/service/authorization.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  display = false;
  menuDisplay = true;

  constructor(public authService: AuthorizationService) {
  }

  toggleMenuDisplay() {
    this.menuDisplay = !this.menuDisplay;
  }
}
