import {ApplicationRef, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, takeUntil} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ServerService} from "../../services/server.service";
import {RxUnsubscribeComponent} from "../rx-unsubscribe";
import {FavoritesRestaurantsService} from "../../services/favorites-restaurants.service";

export interface Restaurant {
  Id: number;
  name: string;
  type: string;
  description: string;
  address: string;
  menu: Menu[];
}

export interface Menu {
  name: string;
  price: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent extends RxUnsubscribeComponent implements OnInit{
  notFound: boolean = false;
  currentRest?: Restaurant;
  showCurrentRest: boolean = false;
  launchDetectionStrategy: Object = new Object;
  form = new FormGroup({
    field: new FormControl('', [
      Validators.required,
      Validators.min(2),
      Validators.pattern(/^[а-яА-ЯёЁ ]+$/)]),
  })
  data?: Observable<Restaurant[]>;
  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private server: ServerService,
    private changeDetectorRef: ChangeDetectorRef,
    public favoritesRestaurantsService: FavoritesRestaurantsService) {
    super();
  }
  ngOnInit(){
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
              this.router.navigate(["/"]);
            }
          })
      }
    });
  }

  search():void {
    if (this.form.invalid){
      this.notFound = true;
    } else {
      this.notFound = false;
      this.data = this.server.getRestByDish({dish: this.form.controls['field'].value}).pipe(map(data => {
        if (JSON.stringify(data) === JSON.stringify({})){
          this.notFound = true;
        }
        return data;
      }));
    }
  }
  showRest(data: Restaurant): void{
    this.currentRest = data;
    this.router.navigate(["/"], { queryParams: { id: data.Id } });
    this.showCurrentRest = true;
  }

  close(): void{
    this.showCurrentRest = false;
    this.router.navigate(["/"]);
    this.launchDetectionStrategy = new Object;
  }
}
