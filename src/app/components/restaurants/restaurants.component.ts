import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output} from "@angular/core";
import {Observable} from "rxjs";
import {Restaurant} from "../main/main.component";
import {FavoritesRestaurantsService} from "../../services/favorites-restaurants.service";

@Component({
  selector: "app-restaurants",
  templateUrl: "./restaurants.component.html",
  styleUrls: ["./restaurants.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RestaurantsComponent {
  @Input() data$?: Observable<Restaurant[]>;
  @Input() data?: Restaurant[];
  @Input() isAsync?: boolean;
  @Input() launchDetectionStrategy?: Object;
  @Output() eventClickToRest: EventEmitter<Restaurant> = new EventEmitter<Restaurant>();

  constructor(private favoritesRestaurantsService: FavoritesRestaurantsService) {
  }
  clickToRest(restaurant: Restaurant){
    this.eventClickToRest.emit(restaurant);
  }

  checkFavorites(id: number): boolean{
    return this.favoritesRestaurantsService.getRestaurants().includes(id);
  }

  clickFavourites(event: any, id: number){
    event.stopPropagation();
    if (event.target.attributes[1].value === "restaurant__favourites-yellow"){
      event.target.attributes[1].value = "restaurant__favourites";
      this.favoritesRestaurantsService.deleteRestaurant(id);
    } else {
      event.target.attributes[1].value = "restaurant__favourites-yellow";
      this.favoritesRestaurantsService.addRestaurant(id);
    }
  }
}
