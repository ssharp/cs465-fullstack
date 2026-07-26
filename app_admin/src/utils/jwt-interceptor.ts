import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationService } from '../app/services/authentication';

export const JwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthenticationService);

  const isAuthAPI =
    req.url.includes('/login') ||
    req.url.includes('/register');

  if (authService.isLoggedIn() && !isAuthAPI) {
    const token = authService.getToken();

    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next(authReq);
  }

  return next(req);
};
