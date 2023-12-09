import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,CanActivate,RouterStateSnapshot,UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class hasRoleGuard implements CanActivate{
  constructor(private authService: AuthService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<boolean 
    | UrlTree> 
    | Promise<boolean 
    | UrlTree> 
    | boolean 
    | UrlTree {   
    const isAuthorized = this.authService.user.group.includes(route.data['group']);
    if (!isAuthorized){
      console.log('nones')
      window.alert('aaa')
    }
      
  return isAuthorized
  }
}
