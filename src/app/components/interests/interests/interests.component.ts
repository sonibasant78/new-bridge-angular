import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { UtilityService } from 'src/app/services/utility.service';


@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.css']
})
export class InterestsComponent implements OnInit {


  myControl = new FormControl();
  searchName: any;
  interestlist: any = [];
  selectable = false;
  removable = true;
  addOnBlur = true;
  tagslist: any = [];
  userid: any = "";


  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  msg: string;

  constructor(private apiservice: ApiservicesService, private toastr: ToastrService, private routes: Router, private _interestservice: UtilityService, private userservice: UserService) { }

  ngOnInit(): void {
    this.userid = this.userservice.getUserData()._id;
    console.log(this.userid);
  }

  searchInterest(event: any) {
    this.searchName = event.target.value;
    this.apiservice.interestlist(this.searchName).subscribe((data: any) => {
        this.interestlist = data.data;
        console.log(this.interestlist);
        if (!data.error) {
          // this.toastr.success('Please choose your interests', 'Interests List Fetched')
        }
      }, error => {
        this.toastr.error('Something went wrong !', 'OOPS!!')
      })
  }

  userDetails() {
    console.log(this.tagslist);
    // return
    
    let data = {
      userid: this.userid,
      interests: this.tagslist
    }
    this.apiservice.addInteresttdata(data)
      .subscribe((response) => {     
        this._interestservice.sendMessage(this.tagslist);
        console.log(this.tagslist);

        this.routes.navigate(['/user/dashboard']);
        if (!response.error) {
          // this.toastr.success('Added !', 'Success')
        }
      }, error => {
        this.toastr.error('Something went wrong !', 'OOPS!!')
      })
  }

  add(event: string): void {
    const value = (event || '').trim();
    this.tagslist.push(value);
  }

  remove(index: number): void {
    if (index >= 0) {
      this.tagslist.splice(index, 1);
    }
  }
}
