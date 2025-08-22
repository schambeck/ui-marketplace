import {Injectable} from "@angular/core";
import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";

// @Injectable({
//   providedIn: 'root'
// })
export class NgrokHttpInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // console.log(`url: ${req.url}`);
    const authReq = req.clone({headers: req.headers.set('ngrok-skip-browser-warning', '69420')});
    return next.handle(authReq);
  }
}
