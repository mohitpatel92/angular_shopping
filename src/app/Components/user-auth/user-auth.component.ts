import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../Service/users.service';
import { login, SignUp } from '../../data-type';

@Component({
  selector: 'app-user-auth',
  imports: [NgIf,FormsModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent {
authError :string =''
isLogin :boolean = true

constructor(private user:UsersService){}

ngOnInit(): void {
  this.user.userAuthReload()

}

  openLogin(){
    this.isLogin = true
  }
  openSignUp(){
    this.isLogin = false
  }

  SignUp(data:SignUp){
    this.user.userSignUp(data)    
  }

  Login(data:login){
    this.user.userLogin(data)
    this.user.invalidUserAuth.subscribe((res)=>{
      if(res){
        this.authError = 'Please Enter valid Value'
      }
    })
  }

}
