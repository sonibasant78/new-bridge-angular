import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  searchInputValue: string = '';
  userdata: any = {};
  showSearchList: boolean = false;
  SearchUser: any = "";
  updateUserDetails: any = [];
  UserList: any = [];
  profileimage: string = '';
  urllink: string = "assets/web/prof.png";
  baseUrl: string = "https://raphael-dashboard.hackerkernel.com";
  loading: boolean = true;

  @ViewChild('searchBar') searchBar: ElementRef | undefined;
  @ViewChild('searchedResultArea') searchedResultArea: ElementRef | undefined;
  isSearchFocused: boolean = false;
  homeSelect: string;
  @ViewChild("searchInput") searchInput: ElementRef | undefined;

  focusOnFirstName() {
    this.searchInput!.nativeElement.focus();
  }

  constructor(private router: Router,
    public userservice: UserService,
    private apiservice: ApiservicesService,
    private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (this.searchedResultArea && this.searchBar) {
        if (e.target !== this.searchBar!.nativeElement && e.target !== this.searchedResultArea!.nativeElement) {
          this.showSearchList = false;
        }
      }
    });
    this.homeSelect = this.router.url;

  }

  ngOnInit(): void {
    this.getUserProfileData();
  }
  onLoad() {
    this.loading = false;
  }

  searchuser(event: any) {
    console.log("search user api call");

    this.SearchUser = event.target.value;
    this.apiservice
      .userlist(this.SearchUser).subscribe((data: any) => {
        this.UserList = data.data;
        console.log(data);


      })

  }

  onSearchInputChange() {
    this.showSearchList = this.searchInputValue.length > 2 ? true : false;
  }

  navigateToSearchedList(id: string) {
    console.log("navigateToSearchedList called ", id);
    this.router.navigate(['/user/user-profile'], { queryParams: { id: id } });
    // this.router.navigate(['/user/user-profile'], { queryParams: { id: id } });
  }

  onSearchFocus() {
    console.log('focus hua h');
    this.isSearchFocused = true;
  }

  onSearchBlur() {
    console.log('blur hua h');
    this.isSearchFocused = false;
    this.searchInputValue = '';
  }

  select() {
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          this.homeSelect = this.router.url;
        }
      }
    );
  }

  getUserProfileData() {
    console.log("user component funcion called");

    let userid = this.userservice.getUserData()._id;
    this.apiservice
      .userProfileData(userid)
      .subscribe((response) => {

        this.updateUserDetails = response.data;
        if (this.updateUserDetails.image) {
          if (this.updateUserDetails.image.includes('/public/uploads')) { this.profileimage = this.baseUrl + this.updateUserDetails.image }
          else { this.profileimage = this.updateUserDetails.image }
        }
        else {
          this.profileimage = this.urllink;
        }

        console.log("UserComponent ", this.updateUserDetails);
        console.log(this.updateUserDetails.firstname);
      })
  }
}
