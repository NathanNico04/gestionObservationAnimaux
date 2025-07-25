import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const jwtInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const auth = inject(AuthService);

  if (auth.isAuthentified)
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
  return next(request);
};
