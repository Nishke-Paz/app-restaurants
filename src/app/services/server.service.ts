import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Restaurant} from "../components/main/main.component"

@Injectable()
export class ServerService{
  constructor(private http: HttpClient) {
  }
  getRestByDish(data: {dish: string}): Observable<Restaurant[]>{
    return this.http.post<Restaurant[]>("/search", data);
  }
  getRestById(data: { id: string }): Observable<Restaurant>{
    return this.http.post<Restaurant>("/findById", data);
  }
}
