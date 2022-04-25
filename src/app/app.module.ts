import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { OrdersComponent } from './components/orders/orders.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';
import { ChangeproductimgDirective } from './directives/changeproductimg.directive';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
<<<<<<< HEAD
import { FilterPipe } from './Pipes/filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
=======
import { ReactiveFormsModule } from '@angular/forms';

>>>>>>> d7b80ca5ee9c0bd5b3f1f2f550af2ca2e1695171
@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SignupComponent,
    OrdersComponent,
    CartComponent,
    ProductdetailsComponent,
    ChangeproductimgDirective,
    LoginComponent,
    ProductsComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
<<<<<<< HEAD
    FormsModule,
=======
>>>>>>> d7b80ca5ee9c0bd5b3f1f2f550af2ca2e1695171
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
