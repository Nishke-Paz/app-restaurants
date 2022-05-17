import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {ServerService} from "../../services/server.service";
import {Restaurant} from "../main/main.component";
import {ActivatedRoute, Router} from "@angular/router";
import {takeUntil} from "rxjs";
import {RxUnsubscribeComponent} from "../rx-unsubscribe";
import {FavoritesRestaurantsService} from "../../services/favorites-restaurants.service";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.less'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesComponent extends RxUnsubscribeComponent implements OnInit{
  public restaurants: Restaurant[] = [];
  currentRest?: Restaurant;
  showCurrentRest: boolean = false;
  search = false;
  constructor(
    private service: ServerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private server: ServerService,
    private changeDetectorRef: ChangeDetectorRef,
    private favoritesRestaurantsService: FavoritesRestaurantsService
  ) {
    super();
  }
  close(): void{
    this.showCurrentRest = false;
    this.router.navigate(["/favorites"])
  }
  showRest(data: Restaurant): void{
    this.currentRest = data;
    this.router.navigate(["/favorites"], { queryParams: { id: data.Id } });
    this.showCurrentRest = true;
  }
  ngOnInit() {
    this.activatedRoute.queryParams.pipe(takeUntil(this.destroy$)).subscribe(data => {
      if (data["id"]){
        this.server.getRestById({ id: data["id"] })
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: Restaurant) => {
            if (JSON.stringify(data) !== JSON.stringify({})){
              this.currentRest = data;
              this.showCurrentRest = true;
              this.changeDetectorRef.markForCheck();
            } else {
              this.router.navigate(["/favorites"]);
            }
          })
      }
    });
    let arrayRestId = this.favoritesRestaurantsService.getRestaurants();
    for (let i = 0; i < arrayRestId.length; i++){
      this.service.getRestById({id: String(arrayRestId[i])}).subscribe((data) => {
        this.restaurants.push(data);
        if (i === arrayRestId.length - 1){
          this.search = true;
          this.changeDetectorRef.markForCheck();
        }
      })
    }
  }
}
