//import '$localize/init';
import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { product } from '../../data-type';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../Service/product.service';

@Component({
  selector: 'app-home',
  imports: [NgbCarouselModule,NgIf,NgFor,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  trendyProducts :undefined | product[]
	populerProducts : undefined | product[]

  constructor(private product:ProductService){}

  ngOnInit(): void {
    this.product.populerProduct().subscribe((data) =>{      
      this.populerProducts = data

      this.product.trendyProduct().subscribe((res)=>{
        this.trendyProducts = res 
      })

    })
  
   }
  
}
