import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from "@angular/core";
import {Restaurant} from "../main/main.component";
import {FavoritesRestaurantsService} from "../../services/favorites-restaurants.service";

@Component({
  selector: "app-popup",
  templateUrl: "./popup.component.html",
  styleUrls: ["./popup.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupComponent{
  @Input() currentRest?: Restaurant;
  @Input() isFavorites?: boolean;
  @Output() clickClose: EventEmitter<void> = new EventEmitter<void>();
  constructor(
    private favoritesRestaurantsService: FavoritesRestaurantsService
  ) {
  }
  close(){
    this.clickClose.emit();
  }
  clickFavourites(){
    if (this.currentRest && this.isFavorites){
      this.favoritesRestaurantsService.deleteRestaurant(this.currentRest.Id);
    } else if (this.currentRest) {
      this.favoritesRestaurantsService.addRestaurant(this.currentRest.Id);
    }
    this.isFavorites = !this.isFavorites;
  }
}
