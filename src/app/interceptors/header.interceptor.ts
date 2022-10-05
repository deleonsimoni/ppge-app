import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { AuthService } from '@app/shared/services';

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  private fromInitialsToLanguageCode = {
    br: 'pt-br',
    us: 'en-us',
    es: 'es-es'
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const languageStorage = localStorage.getItem('language');
    const languageParsed = languageStorage ? this.fromInitialsToLanguageCode[languageStorage] : this.fromInitialsToLanguageCode.br;
    req = req.clone({
      setHeaders: {
        ...this.authService.getAuthorizationHeaders(),
        language: languageParsed
      },
    });

    return next.handle(req);
  }
}
