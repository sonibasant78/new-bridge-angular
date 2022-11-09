import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { DetectKeypadService } from 'src/app/services/detect-keypad.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from 'src/app/services/websocket.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  linkedInToken: any;
  data: any;
  linkedInCredentials = {
    clientId: "78bzws0w7qzcqx",
    // redirectUrl: "http%3A%2F%2Flocalhost%3A4200%2Flogin",
    redirectUrl: "http%3A%2F%2F165.22.222.20%2Fdemo%2Fbridge-new%2Flogin",
    // To read basic user profile data and email
  }

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })
  linkedinDetails: any;


  get Username() { return this.loginForm.get('Invalid Username') }
  get password() { return this.loginForm.get('password') }

  loginFormData() {
    console.log(this.loginForm.value)
  }

  constructor(
    public keypadService: DetectKeypadService,
    private loginservice: ApiservicesService,
    private routes: Router,
    private userService: UserService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private http: HttpClient) {
  }

  ngOnInit(): void {
    this.linkedInToken = this.route.snapshot.queryParams['code'];
    console.log("this.linkedInToken");
    console.log(this.linkedInToken);
    if (this.linkedInToken) {
      this.loginservice
        .LoginWithLinkedin(this.linkedInToken, this.linkedInCredentials.redirectUrl, this.data)
        .subscribe((response) => {
          this.userService.saveUserDataLocal(response.data);
          this.routes.navigate(['/user/dashboard']);
          console.log(response);

          console.log("boom guys");
          console.log(response.data);
        })
    }
  }

  loginSubmit() {
    this.loginservice
      .loginData(this.loginForm.value)
      .subscribe((response: any) => {
        console.log("response");
        console.log(response);
        if (!response.data.error) {
          this.userService.saveUserDataLocal(response.data);
          this.routes.navigate(['/user/dashboard']);
        }
        if (!response.error) {
          // this.toastr.success('Login Successfully!', 'Success')
        }
      }, error => {
        this.toastr.error('Invalid Credentials or Something Went Wrong !', 'OOPS!!')
      })

  }

  linkedinLogin() {
    window.location.href = `https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=${this.linkedInCredentials.clientId}&redirect_uri=${this.linkedInCredentials.redirectUrl}&scope=r_liteprofile%20r_emailaddress&state=999999999`;
  }


}

