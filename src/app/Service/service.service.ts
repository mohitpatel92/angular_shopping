import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { login, SignUp } from '../data-type';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  isSellerloggedIn = new BehaviorSubject<boolean>(false);
  isLoggingError= new EventEmitter<boolean>(false)

  sellerUrl = 'http://localhost:3000/seller';
  constructor(private http: HttpClient, private router: Router) {}

  usersignUp(data: SignUp) {
    return this.http
      .post(this.sellerUrl, data, { observe: 'response' })
      .subscribe((res) => {
        if (res) {
          this.isSellerloggedIn.next(true);
          localStorage.setItem('seller', JSON.stringify(res.body));
          this.router.navigateByUrl('/seller-home');
        }
      });
  }

  userLogin(data: login) {
    this.http
      .get(
        `http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((res: any) => {
        if (res && res.body && res.body.length) {                    
           localStorage.setItem('seller', JSON.stringify(res.body));
          this.router.navigateByUrl('/seller-home');
        }else{
          
          this.isLoggingError.emit(true)
        }
      });
  }

  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerloggedIn.next(true);
      this.router.navigateByUrl('/seller-home');
    }
  }
}
