import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ServiceService } from '../Service/service.service';

export const authGuard: CanActivateFn = (route, state) => {
  
  const seller = inject(ServiceService )
  if(localStorage.getItem('seller')){
     return true
    }
  
  return seller.isSellerloggedIn;
};
