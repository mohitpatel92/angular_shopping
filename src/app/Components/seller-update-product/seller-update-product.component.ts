import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../Service/product.service';
import { product } from '../../data-type';

@Component({
  selector: 'app-seller-update-product',
  imports: [FormsModule],
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css',
})
export class SellerUpdateProductComponent {
  productData: undefined | product;
  productMsg : string | undefined
  constructor(
    private activeRoute: ActivatedRoute,
    private product: ProductService,
    private router:Router
  ) {}

  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('id');

    productId &&
      this.product.getProduct(productId).subscribe((res) => {        
        this.productData = res;
      });
  }

  submit(data:product) {
    if(this.productData){
      data.id = this.productData.id
    }
    this.product.updateProduct(data).subscribe((res)=>{
      if(res){
        this.productMsg='Product is Updated Successfully...!!!'
      }
      setTimeout(() => {
        this.productMsg= undefined
        this.router.navigateByUrl('/seller-home')
      }, 2000);
    })
    
  }
}
