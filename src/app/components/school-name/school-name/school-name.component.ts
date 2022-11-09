import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DetectKeypadService } from 'src/app/services/detect-keypad.service';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-school-name',
  templateUrl: './school-name.component.html',
  styleUrls: ['./school-name.component.css']
})

export class SchoolNameComponent implements OnInit {
  linkedInToken: any;
  data: any;
  linkedInCredentials = {
    clientId: "78bzws0w7qzcqx",
    // redirectUrl: "http%3A%2F%2Flocalhost%3A4200%2Fsign-up",
    redirectUrl: "http%3A%2F%2F165.22.222.20%2Fdemo%2Fbridge-new%2Fsign-up",
    // To read basic user profile data and email
  };
  schoollist: any = [];
  searchName: string = "";
  schoolid = "";

  constructor(private _apiservice: ApiservicesService, private toastr: ToastrService, private userservice: UserService, public keypadService: DetectKeypadService, private router: Router, private routes: ActivatedRoute) { }


  schoolForm = new FormGroup({
    schoolName: new FormControl('', [Validators.required]),
  })

  get schoolName() { return this.schoolForm.get('schoolName') }

  ngOnInit(): void {

  }

  goToSignup() {

    if (this.schoolid) {
      this.router.navigate(['/sign-up'], { queryParams: { schoolid: this.schoolid } });
      // this.toastr.success('School Name Added Successfully!', 'Success')
    }
    else {
      this.toastr.error('Please Enter Valid School Name')
    }
  }

  add(data: any) {
    console.log(data);
    this.schoolid = data;

  }

  searchSchool(event: any) {
    this.searchName = event.target.value;
    console.log("event hai mera",event.target.value);
    
    this._apiservice.schoolList(this.searchName).subscribe((data: any) => {
        this.schoollist = data.data;
        console.log(this.schoollist);
      })



  }

  continueWithLinkedin() {
    // this.router.navigate(['/sign-up'], { queryParams: { schoolid: this.schoolid } });
    if (this.schoolid) {
      window.location.href = `https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=${this.linkedInCredentials.clientId}&redirect_uri=${this.linkedInCredentials.redirectUrl}&scope=r_liteprofile%20r_emailaddress&state=${this.schoolid}`;

    }



    console.log("page refresh");


  }
}
