import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, product } from '../data-type';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  proUrl = 'http://localhost:3000/products';
  cartData = new EventEmitter<product[] | []>();

  constructor(private http: HttpClient, private activeRouter: ActivatedRoute) {}

  addProduct(product: product) {
    return this.http.post(this.proUrl, product);
  }

  productList() {
    return this.http.get<product[]>(this.proUrl);
  }

  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }

  getProduct(id: string) {
    return this.http.get<product>(`http://localhost:3000/products/${id}`);
  }

  updateProduct(data: product) {
    return this.http.put<product>(
      `http://localhost:3000/products/${data.id}`,
      data
    );
  }
  populerProduct() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=3');
  }

  trendyProduct() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=8');
  }

  searchProducts(query: string) {
    return this.http.get<product[]>(
      `http://localhost:3000/products?q=${query}`
    );
  }

  localAddCart(data: product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
    }
    this.cartData.emit(cartData);
  }

  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      items = items.filter((e) => e.id !== productId);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  addToCart(cartData: cart) {
    return this.http.post('http://localhost:3000/cart', cartData);
  }

  getCartList(userId: number) {
    return this.http
      .get<product[]>(`http://localhost:3000/cart?userId=${userId}`, {
        observe: 'response',
      })
      .subscribe((res) => {
        if (res && res.body) {
          this.cartData.emit(res.body);
        }
      });
  }

  removeToCart(cartId: number) {
    return this.http.delete('http://localhost:3000/cart/' + cartId);
  }

  currantCart() {
    let userStore = localStorage.getItem('user');
    let useData = userStore && JSON.parse(userStore);
    return this.http.get<cart[]>('http://localhost:3000/cart?userId='+useData.id)
  }

  orderNow(data:order){
    return this.http.post('http://localhost:3000/orders',data)
  }

  OrderList(){
    let userStore = localStorage.getItem('user');
    let useData = userStore && JSON.parse(userStore);
    return this.http.get<order[]>('http://localhost:3000/orders?userId='+useData.id)
  }

  deleteCartItems(cartId:number){
    return this.http.delete('http://localhost:3000/cart/' + cartId,{observe:'response'}).subscribe((res)=>{    
        this.cartData.emit([])    
    })
  }

  deleteOrder(id:number){
    return this.http.delete('http://localhost:3000/orders/'+id)
  }

}
