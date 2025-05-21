import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../Service/product.service';
import { cart, order } from '../../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
orderMsg:string | undefined =''
totalPrice : number | undefined = 0
cartData:cart[]|undefined

  constructor(private product:ProductService,private router:Router){}

  ngOnInit(): void {
    this.product.currantCart().subscribe((res)=>{
      let price=0
      console.log("Res..",res);
      this.cartData=res 
      res.forEach((item) => {
        if(item.quantity){
          price = price +(+item.price * item.quantity)  
        }
      })
      this.totalPrice = price + (price/10)+100-(price/10)
             
    })
  }

  orderNow(data:{email:string,address:string,contact:string}){ 
    let user = localStorage.getItem('user')
    let userId = user && JSON.parse(user).id
  
    if(this.totalPrice){
      let orderData : order = {...data,totalPrice:this.totalPrice,userId,id:undefined}

      this.cartData?.forEach((item) => {                 
       
        setTimeout(() => {
          item.id && this.product.deleteCartItems(item.id)
        }, 600);

      })
      this.product.orderNow(orderData).subscribe((res)=>{
        if(res){           
           this.orderMsg = 'Order has been Placed...!!!'            
           setTimeout(() => {
             this.router.navigateByUrl('/my-orders')  
             this.orderMsg=undefined 
           }, 3000); 
        }
      })
    }
  }

}

