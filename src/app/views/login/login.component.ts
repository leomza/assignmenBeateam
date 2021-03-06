import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ApiService } from '../../services/api/api.service'
import { LoginInterface } from '../../models/login.interface'
import { ResponseInterface } from '../../models/response.interface'
//Para que una vez logueado el usuario me direccione la pagina:
import { Router } from '@angular/router'
import * as crypto from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorStatus: boolean = false;
  errorMessage: string = '';

  loginForm = new FormGroup({
    privateKey: new FormControl('', Validators.required),
    date: new FormControl(moment().format("YYYYMMDD")),
  })

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.checkLocalStorage();
  }

  //If the Token exist in the LocalStorage I will redirect directly to the dashboard
  checkLocalStorage() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['dashboard'])
    }
  }

  //Function that going to run when I try to login the user:
  onLogin(form: LoginInterface) {
    //First I concat the object form:
    const userInfo = Object.values(form)[0] + Object.values(form)[1];
    //Then I encrypt the variable:
    const userInfoEncrypt = crypto.SHA384(userInfo).toString();

    this.api.loginByPrivateKey(userInfoEncrypt).subscribe({
      next: (data) => {
        let dataResponse: ResponseInterface = data;
        //If the login is succesfully I will save the token in the LocalStorage
        if (dataResponse.status === 200) {
          localStorage.setItem('token', userInfoEncrypt)
          this.router.navigate(['dashboard'])
        }
      }, error: (errorRes) => {
        this.errorStatus = true;
        this.errorMessage = errorRes.error.message
      }
    })
  }
}
