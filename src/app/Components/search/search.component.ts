import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../Service/product.service';
import { product } from '../../data-type';

@Component({
  selector: 'app-search',
  imports: [RouterLink, NgFor],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  searchResult: product[] | undefined;
  noProduct: string | undefined;

  constructor(
    private activeRouter: ActivatedRoute,
    private product: ProductService
  ) {}

  ngOnInit(): void {
    let query = this.activeRouter.snapshot.paramMap.get('query');
    query &&
      this.product.searchProducts(query).subscribe((res) => {
        if (res) {
          this.searchResult = res;
        }
      });
  }
}
