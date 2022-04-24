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

const routes: Routes = [
  {
    path: "", component: MainLayoutComponent, children: [
      { path: "", component: HomeComponent, pathMatch: "full" },
      { path: "home", component: HomeComponent },
      { path: "orders", component: OrdersComponent },
      { path: "cart", component: CartComponent },
      { path: "productdetails/:pid", component: ProductdetailsComponent },
      { path: "product", component: ProductsComponent }
    ]
  },
  { path: "signup", component: SignupComponent },
  { path: "login", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
