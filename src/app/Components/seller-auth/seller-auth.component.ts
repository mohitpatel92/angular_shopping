import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServiceService } from '../../Service/service.service';
import { Router } from '@angular/router';
import { login, SignUp } from '../../data-type';


@Component({
  selector: 'app-seller-auth',
  imports: [NgIf,FormsModule],
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent {

  isLogin :boolean = true
  authError :string = ''

  constructor(private seller:ServiceService,private router:Router){}

  ngOnInit(): void {
    this.seller.reloadSeller()
  }

  Login(data:SignUp){
    this.authError=""
      this.seller.userLogin(data)      
      this.seller.isLoggingError.subscribe((err)=>{
        if(err){
          this.authError='Email and Password is not Valid...!!!'
        }
      })         
  }

  SignUp(data:SignUp){
    this.seller.usersignUp(data)
  }

  openLogin(){
    this.isLogin = true
  }

  openSignUp(){
    this.isLogin = false
  }

}
