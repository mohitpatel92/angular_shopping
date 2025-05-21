import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { SellerAuthComponent } from './Components/seller-auth/seller-auth.component';
import { SellerHomeComponent } from './Components/seller-home/seller-home.component';
import { authGuard } from './Guard/auth.guard';
import { SellerAddProductComponent } from './Components/seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './Components/seller-update-product/seller-update-product.component';
import { SearchComponent } from './Components/search/search.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { UserAuthComponent } from './Components/user-auth/user-auth.component';
import { CartPageComponent } from './Components/cart-page/cart-page.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { MyOrdersComponent } from './Components/my-orders/my-orders.component';

export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:HomeComponent},
    {path:'seller-auth',component:SellerAuthComponent},
    {path:'seller-home',component:SellerHomeComponent,canActivate:[authGuard]},
    {path:'seller-add-product',component:SellerAddProductComponent,canActivate:[authGuard]},
    {path:'seller-update-product/:id',component:SellerUpdateProductComponent,canActivate:[authGuard]},
    {path:'search/:query',component:SearchComponent},
    {path:'details/:productId',component:ProductDetailsComponent},
    {path:'user-auth',component:UserAuthComponent},
    {path:'cart-page',component:CartPageComponent},
    {path:'checkout',component:CheckoutComponent},
    {path:'my-orders',component:MyOrdersComponent}
];
