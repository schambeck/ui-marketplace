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
          const inventoryConflict = response.status === 409 && request.url.includes('/inventory');
          const detail = inventoryConflict
            ? 'O estoque mudou ou a reserva expirou. Atualize o inventory e tente novamente.'
            : (response.status === 400 || response.status === 409) && (request.url.includes('/offers') || request.url.includes('/shopping-cart') || request.url.includes('/mercado-pago/preferences') || request.url.includes('/orders/checkout'))
            ? 'A oferta mudou ou não está mais disponível. Atualize a oferta e tente novamente.'
            : message;
          this.messageService.add({severity: 'error', summary: 'Error', detail})
          return throwError(() => response);
        })
      )
  }
}
