import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { SellerAuthComponent } from './Components/seller-auth/seller-auth.component';
import { SellerHomeComponent } from './Components/seller-home/seller-home.component';
import { authGuard } from './Guard/auth.guard';
import { SellerAddProductComponent } from './Components/seller-add-product/seller-add-product.component';

export const routes: Routes = [
    {path:'',redirectTo:'/home',pathMatch:'full'},
    {path:'home',component:HomeComponent},
    {path:'seller-auth',component:SellerAuthComponent},
    {path:'seller-home',component:SellerHomeComponent,canActivate:[authGuard]},
    {path:'seller-add-product',component:SellerAddProductComponent,canActivate:[authGuard]}
];
