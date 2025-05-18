import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../Service/product.service';
import { product } from '../../data-type';
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
        }
      });
  }

  handleQunatity(val: string) {
    if (this.productQuantity < 20 && val == 'plus') {      
      this.productQuantity++;
      console.log('plus...', this.productQuantity);
    }
    if (this.productQuantity > 1 && val == 'min') {
      this.productQuantity--;
    }
  }

  
}
