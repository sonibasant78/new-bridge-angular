import { Component, OnInit } from '@angular/core';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { UserService } from 'src/app/services/user.service';
import { UtilityService } from 'src/app/services/utility.service';
import { Router } from '@angular/router';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  schoolId: any = '';
  userId: any = '';
  usersid: any = '';
  Userdetails: any = [];
  peopleYouMayKnowDetails: any;
  urllink: string = 'assets/web/prof.png ';
  baseUrl: string = 'https://raphael-dashboard.hackerkernel.com';
  loading: boolean = true;
  // baseUrl: any = this.apiservice.baseurl;
  profileimage:any;
  constructor(
    public utilityService: UtilityService,
    private websocketservice: WebsocketService,
    private route: Router,
    private userservice: UserService,
    private apiservice: ApiservicesService
  ) { }

  ngOnInit() {
    this.schoolId = this.userservice.getUserData().schoolid;
    this.userId = this.userservice.getUserData()._id;
    this.apiservice
      .recentlyJoinedUser(this.schoolId, this.userId)
      .subscribe((response) => {
        this.Userdetails = response.data;
        console.log('this.Userdetails');
        console.log(this.Userdetails);
        this.peopleYouMayKnowList();
        this.socketOn();
      });
  }
  onLoad() {
    this.loading = false;
  }

  //add user with userid and their socketId
  socketOn() {
    let userId = this.userservice.getUserData()._id;
    this.websocketservice.emit('addUser', userId);
    console.log('socket me user gaye hain');
    this.websocketservice
    .listen('getUsers')
    .subscribe((data) => {
      console.log('mujhe mera data mil gaya hai',data);
    });
  }


  userlist(event: any) {
    let option = event.target.value;
    console.log(option);
    if (option == 1) {
      this.apiservice
        .recentlyJoinedUser(this.schoolId, this.userId)  //recently joined user selected-------------------
        .subscribe((response) => {
          this.Userdetails = response.data;
        
          console.log(this.Userdetails.image);
        });
    } else {
      this.apiservice.recommendedUser(this.userId).subscribe((response) => {  //recommended user selected---------------
        console.log(this.userId);
        console.log(response);
        this.Userdetails = response.data;
        console.log(this.Userdetails);
      });
    }
  }

  sendIndex(Id: any) {
    this.route.navigate(['/user/user-profile'], { queryParams: { id: Id } });
  }

  peopleYouMayKnowList() {
    this.apiservice.peopleYouMayKnowData(this.userId).subscribe((response) => {
      this.peopleYouMayKnowDetails = response.data;
      
    });
  }
}


// if (this.Userdetails.image) {
//   if (this.Userdetails.image.includes('/public/uploads')) {this.profileimage = this.baseUrl }
 
  
//   else  {this.profileimage = this.Userdetails.image}}
// else {
//   this.profileimage = this.urllink;
// }
// console.log(this.peopleYouMayKnowDetails);