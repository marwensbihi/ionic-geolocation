import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  currentUserValue;
  constructor(private router: Router, private http: HttpClient) {}

  seConnecter(username, password) {
      console.log(username+" " + password)
      return this.http
        .post<any>(`http://127.0.0.1:5000/loginio`, { username, password })
        .pipe(
          map((user) => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            this.currentUserValue=user;
            localStorage.setItem("currentUser", JSON.stringify(user));
            //this.currentUserValue.next(user);
            
            return user;

          })
        );
  }

  
  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    //this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
}
}
