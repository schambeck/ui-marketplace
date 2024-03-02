import {CustomAutoCompleteService} from "../../shared/service/custom-auto-complete.service";
import {EventEmitter, Injectable, Input, Output} from "@angular/core";

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Injectable()
export abstract class CustomAutocompleteComponent<T> {
  @Input() selectedItem = {} as any;
  @Output() selectedItemChange = new EventEmitter<T>();
  filteredItems: T[] = [];

  protected constructor(private service: CustomAutoCompleteService<T>) {
  }

  filter(event: AutoCompleteCompleteEvent) {
    this.service.list(0, 10, event.query)
      .subscribe(page => this.filteredItems = page.content);
  }

  onSelect(event: any) {
    this.selectedItem = event;
    this.selectedItemChange.emit(this.selectedItem);
  }
}
