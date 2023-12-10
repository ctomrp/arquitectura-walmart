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
      const user = this.authService.user;
    
      if (user) {
        const userRoles = user.group; // Assuming user.group is an array of roles the user has
        
        // Check if the user has the required role for the route
        if (route.data['group']) {
          const requiredRole = route.data['group'];
  
          if (userRoles.includes(requiredRole)) {
            // User has the required role, grant access
            return true;
          } else {
            // User does not have the required role, deny access
            // You can also redirect to a different route or show an error message
            console.log(`User does not have the required role: ${requiredRole}`);
            
            return false;
          }
        } else {
          // Route does not have a required role, grant access by default
          return true;
        }
      } else {
        // User is not authenticated, you can redirect to the login page or handle it as needed
        console.log('User not authenticated');
        return false;
      }
    }

  
}
