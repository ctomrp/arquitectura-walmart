// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { AuthService } from './services/auth.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard implements CanActivate {
//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(): boolean {
//     if (this.authService.isAuthenticated()) {
//       return true;
//     } else {
//       this.router.navigate(['/login']);
//       return false;
//     }
//   }
// }

// auth.guard.ts
// auth.guard.ts
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './services/auth.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      // El usuario no está autenticado, redirige a la página de inicio de sesión
      this.router.navigate(['/login']);
      return false;
    }
  }
}
