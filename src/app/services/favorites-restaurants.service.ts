import {Injectable} from "@angular/core";
import {Restaurant} from "../components/main/main.component";

@Injectable()
export class FavoritesRestaurantsService{
  public favoritesRestaurants: number[] = [];
  constructor() {
    let array = localStorage.getItem("restId");
    if (array !== null){
      this.favoritesRestaurants = JSON.parse(array);
    }
  }
  getRestaurants(): number[]{
    return this.favoritesRestaurants;
  }
  addRestaurant(id: number): void{
    this.favoritesRestaurants.push(id);
    localStorage.setItem("restId", JSON.stringify(this.favoritesRestaurants));
  }
  deleteRestaurant(id: number): void{
    this.favoritesRestaurants = this.favoritesRestaurants.filter(item => item !== id);
    localStorage.setItem("restId", JSON.stringify(this.favoritesRestaurants));
  }
}
