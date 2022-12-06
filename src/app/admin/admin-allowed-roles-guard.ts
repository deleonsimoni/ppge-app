import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '@app/shared/services';

@Injectable()
export class OnlyAllowedRolesUsersGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const roles = route.data.roles;
    return this.authService
      .getUser()
      .pipe(
        map(user => {
          let allowed = false;
          if(user) {
            roles.forEach(role => {
              if(user.roles.indexOf(role) > -1)
                allowed = true;
            })
          }
          
          return allowed;
        })
      );
    
    // return this.authService.getUser().pipe(map(user => !!user?.isAdmin || !!user?.isCoordenador || !!user?.isParecerista));
  }
}
