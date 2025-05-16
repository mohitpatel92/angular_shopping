import { Component } from '@angular/core';
import { ProductService } from '../../Service/product.service';
import { product } from '../../data-type';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-seller-home',
  imports: [NgFor,RouterLink],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent {
  productList : undefined | product[]
  produtctMessage :string | undefined = ''
  constructor(private product:ProductService){}

  ngOnInit(): void {
    this.list()
     }

     list(){
       this.product.productList().subscribe((res)=>{
      if(res){
        //console.log("list...",res);
        this.productList =res
      }
    })

     }

  deleteProduct(id:number){
    this.product.deleteProduct(id).subscribe((res)=>{
      if(res){
        this.list()
        this.produtctMessage ='Product Deleted Successfully...!!!'   
      }
      setTimeout(() => {
        this.produtctMessage =undefined
      }, 2000);
    })
  }

  edit(id:number){

  }

}
