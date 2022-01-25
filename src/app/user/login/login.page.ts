import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
username:any;
password: any;  
public formData : FormGroup;
  constructor(private auth : AuthenticationService,  private router: Router,) { 
    if (this.auth.currentUserValue) {
      this.router.navigate(['cars']);
  }
  }
  
  ngOnInit() {

  }

  signIn(){

    this.auth.seConnecter(this.username,this.password)
    .pipe(first())
    .subscribe(
        data => {
            this.router.navigate(["cars"]);
        },
        error => {
           // this.alertService.error(error);
            //this.loading = false;
            alert(error)
        });
}
  
  }

 
  

