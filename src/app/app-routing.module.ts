import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FavoritesComponent} from "./components/favorites/favorites.component";
import {MainComponent} from "./components/main/main.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";

const routes: Routes = [
  { path: "", component: MainComponent },
  { path: "favorites", component: FavoritesComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
