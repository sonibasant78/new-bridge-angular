import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  userid: any = "";
  constructor(private apiservice: ApiservicesService, private toastr:ToastrService,private userservice: UserService) { }

  passwordForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  })

  get oldPassword() { return this.passwordForm.get('oldPassword') }
  get newPassword() { return this.passwordForm.get('newPassword') }
  get confirmPassword() { return this.passwordForm.get('confirmPassword') }

  ngOnInit(): void {
    this.userid = this.userservice.getUserData()._id;
  }

  passwordFormData() {
    let userdata = this.passwordForm.value;
    userdata.userid = this.userid;
    console.log(userdata);
    this.apiservice.ChangePasswordData(userdata).subscribe((response) => { 
      if (!response.error) {
        // this.toastr.success('Password has been changed' ,'Successfully')
      }
    }, error => {
      this.toastr.error('Something went wrong','OOPS!!')
    })
    
  }
}
