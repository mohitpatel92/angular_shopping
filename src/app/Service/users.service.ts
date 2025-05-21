import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { login, product, SignUp } from '../data-type';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  invalidUserAuth = new EventEmitter<boolean>(false)

  constructor(private http:HttpClient,private router:Router) { }

  userUrl = 'http://localhost:3000/users'

  userSignUp(user:SignUp){
    return this.http.post(this.userUrl,user,{observe:'response'}).subscribe((res)=>{
      if(res){
        localStorage.setItem('user',JSON.stringify(res.body))    
        this.router.navigateByUrl('/')    
      }
    })
  }

  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigateByUrl('/home')      
    }
  }

  userLogin(user:login){
    this.http.get<SignUp[]>(`http://localhost:3000/users?email=${user.email}&&password=${user.password}`,{observe:'response'}).subscribe((res)=>{
      if(res && res.body?.length){
         localStorage.setItem('user',JSON.stringify(res.body[0]))     
        this.router.navigateByUrl('/')   
        this.invalidUserAuth.emit(false)         
      }else{
        this.invalidUserAuth.emit(true)
      }
    })
  }

  

}
