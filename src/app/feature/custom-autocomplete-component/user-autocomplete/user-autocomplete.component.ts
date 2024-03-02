import {Component} from '@angular/core';
import {CustomAutocompleteComponent} from "../custom-autocomplete.component";
import {User} from "../../../shared/model/user.entity";
import {UserService} from "../../../shared/service/user.service";

@Component({
  selector: 'app-user-autocomplete',
  templateUrl: './user-autocomplete.component.html',
  styleUrls: ['./user-autocomplete.component.css'],
  inputs: ['selectedItem'],
  outputs: ['selectedItemChange']
})
export class UserAutocompleteComponent extends CustomAutocompleteComponent<User> {
  constructor(service: UserService) {
    super(service);
  }
}
