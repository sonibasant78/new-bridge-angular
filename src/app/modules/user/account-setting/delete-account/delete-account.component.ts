import { _DisposeViewRepeaterStrategy } from '@angular/cdk/collections';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { identity } from 'rxjs';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { UserService } from 'src/app/services/user.service';
declare var $: any;

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent implements OnInit {
  userid: any = "";
  id: any = "";
  msg: string;

  constructor(private apiservice: ApiservicesService,private toastr:ToastrService ,private userservice: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userid = this.userservice.getUserData()._id;
    console.log(this.userid);
    // this.id=this.userid;
    // console.log(this.userid)
  }

  deleteAccount() {
    let data = {
      userid: this.userid
    }
    this.apiservice.deleteAccountData(data).subscribe((response) => {
      console.log(response)
      this.userservice.logout();
      if (!response.error) {
        // this.toastr.success('Account has been deleted', 'Success')
      }
    }, error => {
      this.toastr.error('Account has not been deleted','OOPS!!')
    })

    $('#exampleModal').modal('hide');
  }
}
