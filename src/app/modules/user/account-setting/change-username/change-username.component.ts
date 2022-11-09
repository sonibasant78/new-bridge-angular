import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-username',
  templateUrl: './change-username.component.html',
  styleUrls: ['./change-username.component.css']
})
export class ChangeUsernameComponent implements OnInit {
  userid: any = "";
  usernameForm = new FormGroup({
    newUsername: new FormControl('', [Validators.required]),
  })
  msg: string;

  constructor(private apiservice: ApiservicesService,private toastr:ToastrService, private userservice: UserService) { }
  
  get changeUsername() { return this.usernameForm.get('schoolName') }

  ngOnInit(): void {
    this.userid = this.userservice.getUserData()._id;
  }

  usernameFormData() {
    let userdata = this.usernameForm.value;
    userdata.userid = this.userid;
    this.apiservice.ChangeUsernameData(userdata).subscribe((response) => {
      this.userservice.saveUserDataLocal(response.data);
      console.log(response.data);
      if (!response.error) {
        // this.toastr.success('Username has been changed', 'Success')
      }
    }, error => {
      this.toastr.error('Username has not been changed','Error!!')
    })
  }
}
