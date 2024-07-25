import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class XhrInterceptor implements HttpInterceptor {
  //constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    //const authToken = this.auth.getToken();

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    /*const authReq = req.clone({
      headers: req.headers.set('Authorization', authToken)
    });*/
    const authReq = req.clone();

    // send cloned request with header to the next handler.
    return next.handle(authReq);

     /*const xhr = req.clone({
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
    });
    return next.handle(xhr);*/
  }
}