import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {FavoritesComponent} from "./components/favorites/favorites.component";
import {MainComponent} from "./components/main/main.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {RestaurantsComponent} from "./components/restaurants/restaurants.component";
import {PopupComponent} from "./components/popup/popup.component";
import {FavoritesRestaurantsService} from "./services/favorites-restaurants.service";
import {ServerService} from "./services/server.service";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    RestaurantsComponent,
    PopupComponent,
    FavoritesComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    FavoritesRestaurantsService,
    ServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
