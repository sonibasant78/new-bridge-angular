import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  userData: any = {};
  localUserDataKey = "userData";
  schoolId:any="";

  constructor(
    private router: Router) {
    this.getUserData();
  }

  isUserLogin() {
    console.log('isUserLogin called.');

    return Object.keys(this.userData).length ? true : false;
  }


  saveUserDataLocal(value: any) {
    if (value) {
      let str = JSON.stringify(value);
      localStorage.setItem(this.localUserDataKey, str);
      this.getUserData();
      console.log();
    }
  }

  getUserData() {
    let data = localStorage.getItem(this.localUserDataKey);
    if (data) {
      let obj = JSON.parse(data);
      this.userData = obj;
      return obj;
    } else {
      return {};
    }
  }

  logout() {
    this.userData = {};
    localStorage.clear();

    setTimeout(() =>{
      this.router.navigateByUrl('/login');
    },500);


  }


}
