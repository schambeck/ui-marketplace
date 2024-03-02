import {Observable} from "rxjs";
import {Page} from "../model/page";

export interface CustomAutoCompleteService<T> {
  list(page: number, size: number, search: string): Observable<Page<T>>;
}
