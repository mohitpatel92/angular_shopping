import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  proUrl = 'http://localhost:3000/products'

  constructor(private http:HttpClient) { }

  addProduct(product:product){
   return this.http.post(this.proUrl,product)      
  }

  productList(){
    return this.http.get<product[]>(this.proUrl)
  }

  deleteProduct(id:number){
    return this.http.delete(`http://localhost:3000/products/${id}`)
  }

  getProduct(id:string){
    return this.http.get<product>(`http://localhost:3000/products/${id}`)
  }

  updateProduct(data:product){        
    return this.http.put<product>(`http://localhost:3000/products/${data.id}`,data)
  }
   populerProduct() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=3');
  }


}
