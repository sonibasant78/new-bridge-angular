import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { UserService } from 'src/app/services/user.service';
declare var $: any;

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
  Aboutlist: any = [];
  schoollist: any = [];
  searchName: string = "";
  schoolid = "";
  userid = "";
  helpformdata: any = {};
  msg: string = "";

  constructor(private apiservice: ApiservicesService, private toastr: ToastrService, private userservice: UserService) { }

  helpForm = new FormGroup({
    schoolname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    help: new FormControl('', [Validators.required]),
    about: new FormControl('', [Validators.required]),
  })

  get schoolname() { return this.helpForm.get('schoolName') }
  get email() { return this.helpForm.get('email') }
  get help() { return this.helpForm.get('help') }
  get about() { return this.helpForm.get('about') }

  ngOnInit(): void {
    this.apiservice.HelpAboutYou().subscribe(response => {
      this.Aboutlist = response.data;
      console.log(this.Aboutlist);
      this.schoolid = this.userservice.getUserData().schoolid;
      this.userid = this.userservice.getUserData()._id;
    })
  }

  helpFormData() {
    this.helpformdata = this.helpForm.value;
    this.helpformdata.schoolid = this.schoolid;
    this.helpformdata.userid = this.userid;
    this.apiservice.HelpData(this.helpformdata).subscribe(response => {
      console.log("response done");



      if (!response.error) {
        console.log("reset values");
        $('#myForm')[0].reset();
        // this.helpformdata.reset();
        
        // this.toastr.success('Submitted' ,'Successfully')
      }
    }, error => {
      this.toastr.error('OOPS!!')
    })



  }

  searchSchool(event: any) {
    this.searchName = event.target.value;
    this.apiservice.schoolList(this.searchName).subscribe((data: any) => {
      this.schoollist = data.data;
      if (!data.error) {
        // this.toastr.success('School added !', 'Success')
      }
    }, error => {
      this.toastr.error('Something went wrong', 'OOPS!!')
    })
  }
}


