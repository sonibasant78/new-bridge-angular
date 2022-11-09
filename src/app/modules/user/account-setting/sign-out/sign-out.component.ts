import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.css']
})
export class SignOutComponent implements OnInit {

  constructor(private signoutservice:UserService) { }

  ngOnInit(): void {
  }
  signOut(){
      this.signoutservice.logout()
  }
}
