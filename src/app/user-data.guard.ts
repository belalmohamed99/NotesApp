import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const userDataGuard: CanActivateFn = (route, state) => {
 const _Router=inject(Router)
 const _PLATFORM_ID=inject(PLATFORM_ID)
 if(isPlatformBrowser(_PLATFORM_ID)){
   if(localStorage.getItem('token')){
 
     return true;
   }
 }
  _Router.navigate(['/signin'])
  return false;
};
