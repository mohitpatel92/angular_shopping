import {
  NgFor,
  NgIf,
  NgSwitch,
  NgSwitchCase,
  TitleCasePipe,
} from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ProductService } from '../../Service/product.service';
import { product } from '../../data-type';


@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterOutlet,
    NgIf,
    NgSwitch,
    NgSwitchCase,
    TitleCasePipe,
    NgFor,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  menuType: string = 'default';
  sellerName: string = '';
  cartItems: number | undefined;
  userName: string | undefined;
  searchResult: undefined | product[];
  constructor(private router: Router, private product: ProductService) {}

  ngOnInit(): void {
    this.router.events.subscribe((res: any) => {
      if (res.url) {
        if (localStorage.getItem('seller') && res.url.includes('seller')) {
          if (localStorage.getItem('seller')) {
            let sellerstore = localStorage.getItem('seller');
            let sellerData = sellerstore && JSON.parse(sellerstore)[0];
            this.sellerName = sellerData.name;
          }          
          this.menuType = 'seller';
        }else if(localStorage.getItem('user')){
          let userStore = localStorage.getItem('user')
          let useData = userStore && JSON.parse(userStore)
          this.userName = useData.name
          this.menuType = 'user'          
          
        } else {
          this.menuType = 'default';
        }
      }
    });
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.product.searchProducts(element.value).subscribe((res) => {        
        if (res.length > 5) {
          res.length = 5;
        }
        this.searchResult = res;
      });
    }
  }

  submitSearch(val:string){
     this.router.navigateByUrl(`search/${val}`)
          
  }

  hideSearch() {
    this.searchResult = undefined;
  }

  Logout() {
    localStorage.removeItem('seller');
    this.router.navigateByUrl('/');
  }


redirectToDetails(id:number){
  this.router.navigateByUrl('/details/'+id)
}

userLogOut(){
  localStorage.removeItem('user')
  this.router.navigateByUrl('/')
}


}
