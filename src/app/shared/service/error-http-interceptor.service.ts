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
            message = response.status === 0
              ? 'Não foi possível conectar ao serviço. Tente novamente em instantes.'
              : response.status === 401
                ? 'Entre na sua conta para acessar este recurso.'
                : response.status === 403
                  ? 'Sua conta não tem permissão para acessar este recurso.'
                  : 'Não foi possível carregar os dados. Tente novamente.';
          }
          const inventoryConflict = response.status === 409 && request.url.includes('/inventory');
          const detail = inventoryConflict
            ? 'O estoque mudou ou a reserva expirou. Atualize o estoque e tente novamente.'
            : (response.status === 400 || response.status === 409) && (request.url.includes('/offers') || request.url.includes('/shopping-cart') || request.url.includes('/mercado-pago/preferences') || request.url.includes('/orders/checkout'))
            ? 'A oferta mudou ou não está mais disponível. Atualize a oferta e tente novamente.'
            : message;
          this.messageService.add({severity: 'error', summary: 'Não foi possível concluir a ação', detail})
          return throwError(() => response);
        })
      )
  }
}
