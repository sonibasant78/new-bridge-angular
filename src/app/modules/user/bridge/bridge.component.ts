import { Component, OnInit } from '@angular/core';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { UserService } from 'src/app/services/user.service';
import { UtilityService } from 'src/app/services/utility.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bridge',
  templateUrl: './bridge.component.html',
  styleUrls: ['./bridge.component.css']
})
export class BridgeComponent implements OnInit {
  id: any = "";
  bridgedUsers: any = [];
  usersid: any = "";
  profileimage: any;
  urllink: any ="assets/web/prof.png";
  baseUrl: any = this.apiservice.baseurl;

  constructor(private utilityService: UtilityService, private route: Router, private apiservice: ApiservicesService, private userservice: UserService) { }

  ngOnInit(): void {
    this.bridgedUserList()
  }

  bridgedUserList() {
    let userid = this.userservice.getUserData()._id;
    this.apiservice.bridgedUserData(userid).subscribe((response) => {
      console.log(response);
      this.bridgedUsers = response.data;
      if (this.bridgedUsers.image) {
        if (this.bridgedUsers.image.includes('/public/uploads')) {this.profileimage = this.baseUrl + this.bridgedUsers.image}
        else  {this.profileimage = this.bridgedUsers.image}}
      else {
        this.profileimage = this.urllink;
      }
    })
  }

  sendIndex(Id: any) {
   
    this.route.navigate(["/user/user-profile"],{ queryParams: { id:Id } })
  }
}
