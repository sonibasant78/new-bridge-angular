import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { UserService } from 'src/app/services/user.service';
import { UtilityService } from 'src/app/services/utility.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  isBridgedUserid: any = "";
  userdetails: any = [];
  presentUserId: any = "";
  isBridgedUser: any = "";
  click = true;
  urllink: string = "assets/web/prof.png";
  profileimage: string = "";
  baseUrl: string = "https://raphael-dashboard.hackerkernel.com";
  userInterests: any = [];
  userIsBridged: any = "";
  ExperienceList: any = [];
  EducationList: any = [];
  schoolName: any = "";
  locatioN: any = '';
  userBridgedOrNot: any = "";
  loading: boolean = true;
  constructor(private _utilityservice: UtilityService, private SpinnerService: NgxSpinnerService, private apiservice: ApiservicesService, private userservice: UserService, private route: Router, private routes: ActivatedRoute) {
    
  }

  ngOnInit(): void {
    this.routes
      .queryParams
      .subscribe((params: any) => {
        this.presentUserId = params['id'];
        console.log('this.presentUserId ', this.presentUserId);
      });
    this.userProfileData();
    this.isUserBridgedFunc();
    this.getExperienceFormData();
    this.getEducationFormData();
  }
  onLoad() {
    this.loading = false;
  }


  userProfileData() {

  console.log("user profile component called");

  console.log("present user profile data - " , );

    this.isBridgedUserid = this.presentUserId;
    console.log("present user profile data id - ",this.presentUserId);
    this.apiservice
      .userProfileData(this.presentUserId).subscribe((response) => {
        console.log(response);
        this.userdetails = response.data;
        if (this.userdetails.image) {
          if (this.userdetails.image.includes('/public/uploads')) { this.profileimage = this.baseUrl + this.userdetails.image }
          else { this.profileimage = this.userdetails.image }
        }
        else {
          this.profileimage = this.urllink;
        }
        this.userInterests = response.data.interests;
        console.log(this.userdetails);
        console.log(this.isBridgedUserid);
      })

  }

  addOrRemoveUserBridge() {
    let data = {
      userid: this.userservice.getUserData()._id,
      bridgeduserid: this.isBridgedUserid
    }

    console.log("this.userIsBridged = ", this.userIsBridged);

    if (!this.userIsBridged) {
      this.apiservice.addBridge(data).subscribe((response) => {
        this.userBridgedOrNot = "Bridged";
        this.isUserBridgedFunc();
      })
    }
    else {
      this.apiservice.removeBridge(data).subscribe((response) => {
        if (!response.error)
          this.userBridgedOrNot = "Bridged";

        this.isUserBridgedFunc();
      })
    }
  }

  isUserBridgedFunc() {
    let userid = this.userservice.getUserData()._id;

    this.apiservice
      .isUserbridgedData(userid, this.isBridgedUserid)
      .subscribe((response) => {
        console.log(response);
        this.userIsBridged = response.bridged;
        this.userBridgedOrNot = response.message;
        this.isBridgedUser = response;
      })
  }



  getExperienceFormData() {
    let userId = this.presentUserId;
    this.apiservice.getExperienceData(userId).subscribe((response) => {
      console.log(response);
      this.ExperienceList = response.data;
      console.log("this.ExperienceList", this.ExperienceList);

      this.schoolName = response.data[0].title;
      this.locatioN = response.data[0].location;
    })
  }


  getEducationFormData() {
    let userId = this.presentUserId;
    this.apiservice.getEducationData(userId).subscribe((response) => {
      console.log(response);
      this.EducationList = response.data;
      console.log("this.EducationList", this.EducationList);


    })
  }

  chatNow() {
    // this._utilityservice.chatId = id;  
    this.route.navigate(["/user/message"], { queryParams: { id: this.presentUserId } })
  }
}

