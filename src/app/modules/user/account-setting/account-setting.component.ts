import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: ['./account-setting.component.css']
})
export class AccountSettingComponent implements OnInit {

  cardselect: string;
  userid: any = "";
  updateUserDetails: any;
  profileimage: string = "";
  urllink: string = "assets/web/prof.png";
  baseUrl: string = "https://raphael-dashboard.hackerkernel.com";
  loading: boolean = true;

  constructor(public router: Router, private apiservice: ApiservicesService, private userservice: UserService) {
    this.cardselect = this.router.url
  }

  ngOnInit(): void {
    this.userid = this.userservice.getUserData()._id;
    this.apiservice
      .userProfileData(this.userid)
      .subscribe((response) => {
        this.updateUserDetails = response.data;
        if (this.updateUserDetails.image) {
          if (this.updateUserDetails.image.includes('/public/uploads')) { this.profileimage = this.baseUrl + this.updateUserDetails.image }
          else { this.profileimage = this.updateUserDetails.image }
        }
        else {
          this.profileimage = this.urllink;
        }
      })
  }
  onLoad() {
    this.loading = false;
  }

  select() {
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          this.cardselect = this.router.url;
        }
      })
  }




}

