import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';
import { UtilityService } from 'src/app/services/utility.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Location } from '@angular/common';
import { Params } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { I } from '@angular/cdk/keycodes';
declare var $: any;

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css'],
})
export class ChatListComponent implements OnInit {

  @ViewChild('AddChatUserModalBtn') AddChatUserModalBtn: ElementRef | undefined;
  @Output() chatUserIdForChatDetails = new EventEmitter<string>();
  
  messageList: any = [];
  loggedUserId: any = '';
  userLastMessage: any = '';
  userLastMessageTime: any = '';
  notification: boolean = false;
  unSeenMsg: any = "";
  isActive: boolean = true;
  searchChatUserList: any = [];
  searchChatUserTagList: any = [];
  searchName: any = '';
  selectable = false;
  removable = true;
  isDataAvailable: boolean = false;
  

  constructor(
    public chatService: ChatService,
    private webservice: WebsocketService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private apiservice: ApiservicesService,
    public utilityservice: UtilityService,
    private userservice: UserService,
    public actRoute: ActivatedRoute,
  ) { 

       this.apiservice.receiverId.subscribe(countRecieverId =>{
      console.log("new receiverId count ",countRecieverId);

      if(countRecieverId && this.messageList){
        for(let i of this.messageList){
          if(i.recieverId==countRecieverId){
             i.showCount=false;
             console.log('show count',this.messageList);
             
          }
          
        }
      }

    })
  }

  ngOnInit(): void {
    this.usersMessage();

    // this.apiservice.chatNowData(this.loggedUserId).then(this.apiservice.chatNowData=>this.loggedUserId)

    this.socketListen();
  }

  navigateToChatDetail() {
    if (window.innerWidth < 768) {
    }
  }

  
  usersMessage() {

    this.loggedUserId = this.userservice.getUserData()._id;

    this.apiservice.chatNowData(this.loggedUserId).subscribe((response) => {
      console.log(response);
      
      this.messageList = response.data;
      this.userLastMessage = this.messageList.recieverMessage;
      console.log("userLastMessage",this.userLastMessage);
      
      this.unSeenMsg = response.data.count;
      console.log();

      console.log(response);

      for(let i of this.messageList){
        console.log(i);
        i.showCount=true
        if(i.count==0){
          i.showCount=false
        }
      }

    });
  }


  showMessage(Id: any) {
    console.log("show message 1-------- called ",Id);
    let loggedUserId = this.userservice.getUserData()._id;

    //by using output - 
    this.chatUserIdForChatDetails.emit(Id);

    $('#startConvModal').modal('hide');

    // old data method -
    // this.router.navigate(['user/message'], { queryParams: { id: Id } });
    
    // new method not wotking
    // this.location.go(this.router.createUrlTree([this.router.url], { queryParams: { id: Id } }).toString())
    // console.log("this.router.createUrlTree([this.router.url] ",this.router.createUrlTree([this.router.url]));

    // this.webservice.emit('addUser',(loggedUserId) )

  }

  
  searchChatUser(event: any) {
    this.searchName = event.target.value;
    let userid = this.userservice.getUserData()._id;
    this.apiservice.bridgedUserData(userid).subscribe((response) => {
      this.searchChatUserList = response.data;
    });
  }

  add(event: string): void {
    const value = (event || '').trim();
    this.searchChatUserTagList.push(value);
  }

  remove(index: number): void {
    if (index >= 0) {
      this.searchChatUserTagList.splice(index, 1);
    }
  }

  socketListen() {
    this.webservice.listen('getMessage').subscribe((res) => {
      console.log('responsed messsage');
      console.log(res);
      console.log(this.messageList);
    });
  }

  // activeChatUser() {
  //   console.log();
  //   //   if(i){
  //   //     this.isActive = false ;
  //   //   }
  //   if (this.userLastMessage) {
  //     this.unSeenMsg += 1;
  //   }
  // }
  searchChatUsers() {
    this.AddChatUserModalBtn?.nativeElement.click();
  }
}
