import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErrorHttpInterceptorService implements HttpInterceptor {
  constructor(private messageService: MessageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`URL: ${request.url}`);
    return next.handle(request)
      .pipe(
        catchError((response: HttpErrorResponse) => {
          let message: string;
          if (response?.error?.error) {
            message = response.error.error;
          } else if (response?.error?.message) {
            message = response.error.message;
          } else {
            message = response.message;
          }
          const detail = (response.status === 400 || response.status === 409) && (request.url.includes('/offers') || request.url.includes('/shopping-cart') || request.url.includes('/mercado-pago/preferences'))
            ? 'The offer changed or is no longer available. Refresh the offer and select it again.'
            : message;
          this.messageService.add({severity: 'error', summary: 'Error', detail})
          return throwError(() => response);
        })
      )
  }
}
