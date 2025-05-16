import { NgIf, NgSwitch, NgSwitchCase, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterOutlet, NgIf, NgSwitch, NgSwitchCase,TitleCasePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  menuType: string = 'default';
  sellerName :string =''
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((res: any) => {
      if (res.url) {
        if (localStorage.getItem('seller') && res.url.includes('seller')) {
          if(localStorage.getItem('seller')){

            let sellerstore = localStorage.getItem('seller')
            let sellerData = sellerstore && JSON.parse(sellerstore)[0]            
            this.sellerName = sellerData.name
          }
          
          //this.sellerName = sellerData
          this.menuType = 'seller';
        } else {
          this.menuType = 'default';
        }
      }
    });
  }

  

  Logout() {
    localStorage.removeItem('seller')
    this.router.navigateByUrl('/')
  }
}
