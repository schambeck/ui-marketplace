import {Component} from '@angular/core';
import {CustomAutocompleteComponent} from "../custom-autocomplete.component";
import {Product} from "../../../shared/model/product.entity";
import {ProductService} from "../../../shared/service/product.service";

@Component({
  selector: 'app-product-autocomplete',
  templateUrl: './product-autocomplete.component.html',
  styleUrls: ['./product-autocomplete.component.css'],
  inputs: ['selectedItem'],
  outputs: ['selectedItemChange']
})
export class ProductAutocompleteComponent extends CustomAutocompleteComponent<Product> {
  constructor(service: ProductService) {
    super(service);
  }
}
