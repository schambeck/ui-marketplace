import {Component} from '@angular/core';
import {AuthService} from "../../../shared/service/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  display = false;
  menuDisplay = true;

  constructor(public authService: AuthService) {
  }

  toggleMenuDisplay() {
    this.menuDisplay = !this.menuDisplay;
  }
}
