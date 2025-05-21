import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { priceSummary } from '../../data-type';
import { ProductService } from '../../Service/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  imports: [NgFor],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent {
  cartData: any[] = [];
  priceSummary: priceSummary = { 
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0,
  };

  constructor(private product: ProductService,private router :Router) {}

  ngOnInit(): void {
    this.loadDetails()
  }

  removeToCart(id: number|undefined) {
    id && this.cartData && this.product.removeToCart(id).subscribe((res)=>{       
      this.loadDetails()
    })
  }

  checkout() {
    this.router.navigateByUrl('/checkout')
  }

  loadDetails(){
    this.product.currantCart().subscribe((res) => {
      if (res) {        
        this.cartData = res;
        let price = 0;
        res.forEach((item) => {
          if (item.quantity) {
            price = price + +item.price * item.quantity;
          }
        });
        this.priceSummary.price = price;
        this.priceSummary.discount = price / 10;
        this.priceSummary.tax = price / 10;
        this.priceSummary.delivery = 100;
        this.priceSummary.total = price + price / 10 + 100 - price / 10;
        if(this.cartData.length===0){
          this.router.navigateByUrl('/home')
        }
      }
    });
  }

}



