import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../Service/product.service';
import { product } from '../../data-type';

@Component({
  selector: 'app-seller-add-product',
  imports: [FormsModule],
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css',
})
export class SellerAddProductComponent {
  addProductMessage: string | undefined = '';

  constructor(private product: ProductService) {}

  submit(data: product) {
    this.product.addProduct(data).subscribe((res) => {
      if (res) {
        this.addProductMessage = 'Product Added SuccessFully...!!!';
      }
      setTimeout(() => {
        this.addProductMessage = undefined;
      }, 2000);
    });
  }
}
