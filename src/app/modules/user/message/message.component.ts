import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiservicesService } from 'src/app/services/apiservices.service';
import { UserService } from 'src/app/services/user.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { ChatDetailComponent } from '../chat-detail/chat-detail.component';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})


export class MessageComponent implements OnInit {
  isMessageSelected: boolean = false;
  selectedChatIndex: number;
  countRecieverId :any;
  messageList: any = [];
  @ViewChild(ChatDetailComponent)
  private chatDetailComponent: ChatDetailComponent;

  constructor(
    private apiservice: ApiservicesService,
    private userservice: UserService,
    public actRoute: ActivatedRoute,
    private websocketservice: WebsocketService,
  ) {
  }

  loggedUserId: any = '';
  ngOnInit(): void {
    let userId = this.userservice.getUserData()._id;
    console.log("userid",userId);
    
    this.usersMessage();
    this.socketOn();
   
    
    // this.actRoute.queryParamMap.subscribe((queryParams:any)  => {
    //   console.log(queryParams.params.id) 
    //   if(!queryParams.params.id){
    //     console.log("no id");
    //     this.usersMessage();
    //   }
  
    // });
  }

  socketOn(){
    let userId = this.userservice.getUserData()._id;
    this.websocketservice.emit('addUser', userId);
    console.log('socket me user gaye hain');
    this.websocketservice.listen('getUsers').subscribe((data) => {
      console.log('mujhe mera data mil gaya hai');
      // console.log(data);
    });
  }
 

  showMessage(index: number) {
    this.selectedChatIndex = index;
    this.isMessageSelected = true;
  }

  //chat list api--------------------
  usersMessage() {

    this.loggedUserId = this.userservice.getUserData()._id;
    console.log("this.loggedUserId usersMessage ",this.loggedUserId);
    this.apiservice.chatNowData(this.loggedUserId).subscribe((response) => {
      this.messageList = response.data;
      console.log("ye mere message ki list hai",this.messageList);      
    });
  }
  
  OnChatUserSelected(userId:any){
    console.log(userId,"userId")
    this.chatDetailComponent.loadUserSpecificChat(userId);

    //  reciever id for count -
    // this.apiservice.receiverId=userId;
    console.log(this.apiservice);
    this.apiservice.receiverId.next(userId)
  }
}
