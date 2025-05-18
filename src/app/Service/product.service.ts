import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from '../data-type';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  proUrl = 'http://localhost:3000/products'

  constructor(private http:HttpClient,private activeRouter:ActivatedRoute) { }

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

  trendyProduct(){
    return this.http.get<product[]>('http://localhost:3000/products?_limit=8');
  }

  searchProducts(query:string){
    return this.http.get<product[]>(`http://localhost:3000/products?q=${query}`)
  }

  localAddCart(data:product){
    let cartData = []
    let localCart = localStorage.getItem('localCart')
    if(!localCart){
      localStorage.setItem('localCart',JSON.stringify([data]))
    }else{
      cartData = JSON.parse(localCart)
      cartData.push(data)
      localStorage.setItem('localCart',JSON.stringify(cartData))
    }
  }

}
