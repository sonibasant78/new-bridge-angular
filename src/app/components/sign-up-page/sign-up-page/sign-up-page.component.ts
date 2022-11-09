import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { DetectKeypadService } from 'src/app/services/detect-keypad.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent implements OnInit {

  signUpForm = new FormGroup({
    firstname: new FormControl('', [Validators.required, Validators.pattern('^[a-z A-Z]+$')]),
    lastname: new FormControl('', [Validators.required, Validators.pattern('^[a-z A-Z]+$')]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    dateofbirth: new FormControl('', [Validators.required]),
    graduation: new FormControl('', [Validators.required]),
    childrengrade: new FormControl([], [Validators.required]),
    grades: new FormControl([], [Validators.required]),
    accountType: new FormControl('parent'),
    // socialLogin: new FormControl(''),
    image: new FormControl(''),

  })
  linkedInToken: any;
  data: any;
  linkedInCredentials = {
    // redirectUrl: "http%3A%2F%2Flocalhost%3A4200%2Fsign-up",
    redirectUrl: "http%3A%2F%2F165.22.222.20%2Fdemo%2Fbridge-new%2Fsign-up",
    // To read basic user profile data and email
  };
  filteredArray: any = [];
  interestlist: any;
  childrenGradeList: any = [];
  GradesList: any = [];
  gradeList: any = [];
  userDetailsWithSchoolId: any = "";
  userGrade: any = [];
  linkedinDetails: any = {};
  minDate = new Date(1970, 0, 1);
  maxDate = new Date;

  get firstname() { return this.signUpForm.get('firstname') }
  get lastname() { return this.signUpForm.get('lastname') }
  get username() { return this.signUpForm.get('username') }
  get email() { return this.signUpForm.get('email') }
  get password() { return this.signUpForm.get('password') }
  get dateofbirth() { return this.signUpForm.get('dateofbirth') }
  get graduation() { return this.signUpForm.get('graduation') }
  get childrengrade() { return this.signUpForm.get('childrengrade') }
  get grades() { return this.signUpForm.get('grades') }
  get accountType() { return this.signUpForm.get('accountType') }
  get image() { return this.signUpForm.get('image') }


  constructor(public keypadService: DetectKeypadService, private toastr: ToastrService, private apiservice: ApiservicesService, private routes: Router, private route: ActivatedRoute,
    private signupservice: UserService) { }

  ngOnInit(): void {
    this.route
      .queryParams
      .subscribe((params: any) => {
        this.userDetailsWithSchoolId = params['state'] || params['schoolid'];
        console.log('this.userDetailsWithSchoolId ', this.userDetailsWithSchoolId);
      });

    this.linkedInToken = this.route.snapshot.queryParams['code'];
    console.log("this.linkedInToken");
    console.log(this.linkedInToken);
    if (this.linkedInToken) {
      this.apiservice
        .linkedinSignUp(this.linkedInToken, this.linkedInCredentials.redirectUrl, this.data)
        .subscribe((response) => {
          this.linkedinDetails = response.data;
          console.log(this.linkedinDetails,"linkedinDetails");

          this.LinkedinFetchDetails();
          console.log("boom guys");
          console.log(response.data);
        })
    }
  }

  signUpSubmit() {
    console.log(this.signUpForm.value);
    let data = this.signUpForm.value
    data.childrengrade = this.childrenGradeList;
    data.grades = this.GradesList;
    console.log(data);
    data.schoolid = this.userDetailsWithSchoolId;
    console.log("code", this.linkedInToken);

    if (this.linkedInToken) {
      data.socialLogin = 'true';
    }
    else {
      data.socialLogin = 'false';
    }
    console.log("data");
    console.log(data);

    // return;
    this.apiservice
      .registerData(data)
      .subscribe((data: any) => {
        console.log("registerData api response");

        const response = data;
        console.log(response.data);

        if (!response.error) {
          console.log(response.data);
          this.signupservice.saveUserDataLocal(response.data);
          this.routes.navigate(['/interests']);
          // this.toastr.success('Submitted', 'Successfully')

        }
      }
        , (err: any) => {
          this.toastr.error('All fields is required')
          console.log(err);
        });
  }

  searchGrade(event: any) {

    console.log("serch grade work");

    this.userGrade = event.target.value;
    console.log("this.userGrade",this.userGrade);
    // if (this.linkedInToken != undefined) {
      this.apiservice.userGradeData(this.userGrade).subscribe((response) => {
        this.gradeList = response.data
        console.log("this.gradeList ------- gl",this.gradeList);
        console.log("this.childrenGradeList -------- cgl",this.childrenGradeList);
        this.filterArr();
      })
    // }
    // else {
    //   console.error("token not found");

    // }
  }

  // new chnages
  filterArr() {
    const res = this.gradeList.filter((items: any) => !this.childrenGradeList.includes(items.grade));
    this.filteredArray = res;
    console.log(this.filteredArray);

  }
  // new chnages

  // add(event: string): void {
  //   const value = (event || '').trim();
  //   this.childrenGradeList =[];
  //   this.childrenGradeList.push(value);
  // }

  add2(event: string): void {
    const value = (event || '').trim();
    this.GradesList = [];
    this.GradesList.push(value);
  }

  LinkedinFetchDetails() {
    this.signUpForm
      .patchValue({
        firstname: this.linkedinDetails.firstname,
        lastname: this.linkedinDetails.lastname,
        email: this.linkedinDetails.email,
        image: this.linkedinDetails.profilePicture,
        username: this.linkedinDetails.email.substring(0, this.linkedinDetails.email.lastIndexOf("@"))
      });
  }
}

// if(this.linkedInToken){
    //   this.signUpForm.setValue({
    //     is_social_login :'true',
    //     })
    // }
