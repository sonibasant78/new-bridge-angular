import { Injectable } from '@angular/core';
import * as moment from 'moment';

// import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  interestlist: any = [];
  userId: any = "";
  myBridgeId:any="";
  chatId:any="";

  constructor() {
    this.interestlist;
    console.log("utilityService", this.userId);
    this.chatUserId()
  }

  sendMessage(interests: any) {
    this.interestlist = interests;
    console.log(interests);
  }

  usersProfileId(id: any) {
    this.userId = id;
  }

  myBridgeUserId(id:any){
     this.myBridgeId = id ;
    console.log(this.myBridgeId);        
  }

  
  getFormatedTime(date:any){
    return moment(date).fromNow();
  }

   chatUserId(){
    this.chatId ;
    console.log(this.chatId);    
   }
}

