import { SuccessfulorderComponent } from './components/successfulorder/successfulorder.component';
import { UpdateProfileComponent } from './components/profile/update-profile/update-profile.component';
import { AuthGuard } from './Guard/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { ProductsComponent } from './components/products/products.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';
import { SignupComponent } from './components/signup/signup.component';
import { OrderDetalisComponent } from './components/order-detalis/order-detalis.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
      { path: 'cart', component: CartComponent },
      { path: 'productdetails/:id', component: ProductdetailsComponent },
      { path: 'product', component: ProductsComponent },
      { path: 'succesfullorder', component: SuccessfulorderComponent },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'updateprofile',
        component: UpdateProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'orderDetails/:id',
        component: OrderDetalisComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
