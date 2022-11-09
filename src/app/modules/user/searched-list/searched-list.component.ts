import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiservicesService } from 'src/app/services/apiservices.service';

@Component({
  selector: 'app-searched-list',
  templateUrl: './searched-list.component.html',
  styleUrls: ['./searched-list.component.css']
})
export class SearchedListComponent implements OnInit {

  constructor(private route: ActivatedRoute, private apiService: ApiservicesService) { }

  searchedUserId: string;
  searchedUserDetails: any = {};
  profileimage: string = '';
  urllink: string = "assets/web/prof.png";
  baseUrl: string = "https://raphael-dashboard.hackerkernel.com";

  ngOnInit(): void {

    this.route.queryParams
      .subscribe(params => {
        console.log(params); // { orderby: "price" }
        this.searchedUserId = params.id;
        console.log(this.searchedUserId); // price
        this.getSearchedUserInfo();
      });
  }

  getSearchedUserInfo() {
    console.log("getSearchedUserInfo called");
    this.apiService
      .userProfileData(this.searchedUserId)
      .subscribe((response) => {
        console.log("getSearcheUserData api response");
       
        this.searchedUserDetails = response.data;
        if (this.searchedUserDetails.image) {
          if (this.searchedUserDetails.image.includes('/public/uploads')) { this.profileimage = this.baseUrl + this.searchedUserDetails.image }
          else { this.profileimage = this.searchedUserDetails.image }
        }
        else {
          this.profileimage = this.urllink;
        }
        console.log("this.searchedUserDetails  ", this.searchedUserDetails);
      }, (error) => {
        console.log("getSearcheUserData api error");
        console.log(error);
      });
  }
}
