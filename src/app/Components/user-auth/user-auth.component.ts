import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../Service/users.service';
import { cart, login, product, SignUp } from '../../data-type';
import { ProductService } from '../../Service/product.service';

@Component({
  selector: 'app-user-auth',
  imports: [NgIf, FormsModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css',
})
export class UserAuthComponent {
  authError: string = '';
  isLogin: boolean = true;

  constructor(private user: UsersService, private product: ProductService) {}

  ngOnInit(): void {
    this.user.userAuthReload();
  }

  openLogin() {
    this.isLogin = true;
  }
  openSignUp() {
    this.isLogin = false;
  }

  SignUp(data: SignUp) {
    this.user.userSignUp(data);
  }

  Login(data: login) {
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((res) => {
      if (res) {
        this.authError = 'Please Enter valid Value';
      } else {
        setTimeout(() => {
          this.localCartToRemoteCart();
          console.log("settiout");
          
        }, 800);
      }
    });
  }

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (data) {
      let cartDataList: product[] = JSON.parse(data);
      cartDataList.forEach((e: product, index) => {
        let cartData: cart = { ...e, productId: e.id, userId };
        delete cartData.id;
        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((res) => {
            if (res) {
              console.log('res...', res);
            }
          });
          if (cartDataList.length === index + 1) {
            localStorage.removeItem('localCart');
          }
        }, 800);
      });
    }
    setTimeout(() => {
      this.product.getCartList(userId);      
    }, 1000);
  }
}
