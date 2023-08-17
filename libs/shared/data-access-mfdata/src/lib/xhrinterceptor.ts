import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class XhrInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    /*const xhr = req.clone({
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
    });
    return next.handle(xhr);*/
    //return next.handle(req.clone({ url: req.url, withCredentials: true}));
    req = req.clone({
      setHeaders: { 
        Authorization: 'Basic ' + btoa('user:user')
      }
    });
    return next.handle(req);
  }
}