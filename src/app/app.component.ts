import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, Subject, takeUntil} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ServerService} from "./server.service";

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
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, OnDestroy{
  notFound: boolean = false;
  currentRest?: Restaurant;
  showCurrentRest: boolean = false;
  varForUnsubscribe: Subject<any> = new Subject<any>();
  form = new FormGroup({
    field: new FormControl('', [
      Validators.required,
      Validators.min(2),
      Validators.pattern(/^[а-яА-ЯёЁ ]+$/)]),
  })
  data?: Observable<any>;
  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private server: ServerService) {
  }
  ngOnDestroy(){
    this.varForUnsubscribe.next("");
    this.varForUnsubscribe.complete();
  }
  ngOnInit(){
    this.activatedRoute.queryParams.pipe(takeUntil(this.varForUnsubscribe)).subscribe(data => {
      if (data["id"]){
        this.server.getRestById({ id: data["id"] })
          .pipe(takeUntil(this.varForUnsubscribe))
          .subscribe((data: Restaurant) => {
            if (JSON.stringify(data) !== JSON.stringify({})){
              this.currentRest = data;
              this.showCurrentRest = true;
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
    this.router.navigate(["/"])
  }

  // getLs(id: number): void{
  //   let lsId = localStorage.getItem("restId");
  //   if (lsId !== null){
  //     let arrayId = JSON.parse(lsId)
  //     arrayId.push(id);
  //     localStorage.setItem("restId", JSON.stringify(arrayId));
  //   } else {
  //     let arrayId = [id];
  //     localStorage.setItem("restId", JSON.stringify(arrayId));
  //   }
  //   console.log(localStorage.getItem("restId"));
  // }
}
