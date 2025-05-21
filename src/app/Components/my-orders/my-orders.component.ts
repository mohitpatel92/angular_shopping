import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ProductService } from '../../Service/product.service';
import { order } from '../../data-type';

@Component({
  selector: 'app-my-orders',
  imports: [NgFor],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css',
})
export class MyOrdersComponent {
  orderData: order[] | undefined;

  constructor(private product: ProductService) {}

  ngOnInit(): void {
    this.getOrderList();
  }

  cancelOrder(id: number | undefined) {
    id &&
      this.product.deleteOrder(id).subscribe((res) => {
        this.getOrderList();
      });
  }

  getOrderList() {
    this.product.OrderList().subscribe((res) => {
      if (res) {
        this.orderData = res;        
      }
    });
  }
}
