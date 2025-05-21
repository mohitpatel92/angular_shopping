//import '$localize/init';
import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { cart, product } from '../../data-type';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../Service/product.service';

@Component({
  selector: 'app-home',
  imports: [NgbCarouselModule, NgIf, NgFor, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  trendyProducts: undefined | product[];
  populerProducts: undefined | product[];
  productData: product | undefined;
  productId: number | undefined;

  constructor(private product: ProductService) {}

  ngOnInit(): void {
    this.product.populerProduct().subscribe((data) => {
      this.populerProducts = data;

      this.product.trendyProduct().subscribe((res) => {
        this.trendyProducts = res;
      });
    });
  }

  addToCart(id: any) {
    this.product.getProduct(id).subscribe((res) => {
      if (res) {
        this.productData = res;
        if (this.productData) {
        let user = localStorage.getItem('user')
        if(!user){
          this.product.localAddCart(this.productData)
        }else{
          let userId = user && JSON.parse(user).id
          let cartData:cart={
            ...this.productData,productId:this.productData.id,userId
          }
          delete cartData.id
           this.product.addToCart(cartData).subscribe((res)=>{
            this.product.getCartList(userId)
          })
        }
        }
      }
    });
  }
}
