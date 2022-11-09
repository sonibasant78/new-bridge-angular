import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { DetectKeypadService } from 'src/app/services/detect-keypad.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {


  msg: string = "";

  constructor(public keypadService: DetectKeypadService, private toatrservice: ToastrService, private forgotservice: ApiservicesService, private routes: Router) { }

  forgotForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  get forgotPassword() { return this.forgotForm.get('forgotPassword') }



  ngOnInit(): void {

  }
  forgotFormData() {
    console.log(this.forgotForm.value);
    this.forgotservice
      .forgotpassworddata(this.forgotForm.value)
      .subscribe((response) => {
        if (!response.error) {
          // this.toatrservice.success('Email has been sent', 'Success')
        }
      }, error => {
        this.toatrservice.error('Email has not been sent', 'Error!!')
      })
  }
}
