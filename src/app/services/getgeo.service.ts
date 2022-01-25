import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class GetgeoService {
  constructor(private http: HttpClient) {}
  url='http://127.0.0.1:5000/cars'
  getCars():Promise<any> {
    return this.http
      .get<any>(this.url)
      .toPromise();
      //.then((data) => {});
  }
}
