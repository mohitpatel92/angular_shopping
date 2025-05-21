import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../Service/product.service';
import { cart, product } from '../../data-type';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [NgFor, NgIf],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  productData: undefined | product;
  productQuantity: number = 1;
  removeCart = false;
  removeCartData: product | undefined;
  constructor(
    private activeRouter: ActivatedRoute,
    private product: ProductService
  ) {}

  ngOnInit(): void {
    let productId = this.activeRouter.snapshot.paramMap.get('productId');

    productId &&
      this.product.getProduct(productId).subscribe((res) => {
        if (res) {
          this.productData = res;
          let cartData = localStorage.getItem('localCart');
          if (productId && cartData) {
            let items = JSON.parse(cartData);
            items = items.filter((e: product) => e.id?.toString() === productId);
            if (items.length) {
              this.removeCart = true;
            } else {
              this.removeCart = false;
            }
          }
          let user = localStorage.getItem('user');
          if (user) {
            let userId = user && JSON.parse(user).id;
            this.product.getCartList(userId);
            this.product.cartData.subscribe((res) => {
              //console.log("items....",res);
              let item = res.filter(
                (e: product) => productId.toString() == e.productId?.toString()
              );

              if (item.length) {
                this.removeCartData = item[0];
                this.removeCart = true;
              }
            });
          }
        }
      });
  }

  handleQunatity(val: string) {
    if (this.productQuantity < 20 && val == 'plus') {
      this.productQuantity++;
    }
    if (this.productQuantity > 1 && val == 'min') {
      this.productQuantity--;
    }
  }

  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.product.localAddCart(this.productData);
        this.removeCart = true;
      } else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        let cartData: cart = {
          ...this.productData,
          productId: this.productData.id,
          userId,
        };
        delete cartData.id;
        //console.log('cartdata...', cartData);
        this.product.addToCart(cartData).subscribe((res) => {
          if (res) {
            this.product.getCartList(userId);
            this.removeCart = true;
          }
        });
      }
    }
  }

  removeToCart(productId: number) {
    if (!localStorage.getItem('user')) {
      this.product.removeItemFromCart(productId);
    } else {
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      console.log('remove cart....', this.removeCartData);
      this.removeCartData &&
        this.product.removeToCart(this.removeCartData?.id).subscribe((res) => {
          if (res) {
            this.product.getCartList(userId);
          }
        });
    }
    this.removeCart = false;
  }
}
