import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { DetectKeypadService } from 'src/app/services/detect-keypad.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  hide = true;
  confirmHide = true;

  resetPasswordForm = new FormGroup({
    newPass: new FormControl('', [Validators.required]),
    confPass: new FormControl('', [Validators.required])
  })
  code: any;

  get password() { return this.resetPasswordForm.get('password') }
  get confirmPassword() { return this.resetPasswordForm.get('confirmPassword') }


  constructor(public keypadService: DetectKeypadService, private forgotservice: ApiservicesService, private route: ActivatedRoute, private routes: Router) { }

  ngOnInit(): void {
    this.code = this.route.snapshot.paramMap.get('code');
  }

  resetPassword() {
    let data = this.resetPasswordForm.value
    console.log(data);
    data.code = this.code;
    console.log(data);
    this.forgotservice
      .resetPasswordData(data)
      .subscribe((data) => {
        this.routes.navigate(['/login']);
      },
        err => {
          console.log(err);
        })
  }
}
