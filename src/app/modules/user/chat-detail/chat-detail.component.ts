import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';
import { UtilityService } from 'src/app/services/utility.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.css'],
})
export class ChatDetailComponent implements OnInit {

  // @ViewChild('message') message: ElementRef;
  @ViewChild('scrollUp') private scrollUpmain: ElementRef;
  //for open edit model -
  @ViewChild('myModal') private myModal: ElementRef<HTMLInputElement>;;

  // textMessage: any;
  messgaeValue: any
  chatMessagesArr: any = [];
  userLastMessage: any = '';
  messageList: any = [];
  charUserImage: any = '';
  charUserName: any = '';
  chatUserId: any = '';
  socketUserId: string = '';
  loggedUserId: any = '';
  i: any = '';
  userId: any = '';
  valueInput: any = '';
  blankPlaceHolder = '';
  value = "";
  loading: boolean = true;
  showEmojiPicker = false;
  message = '';
  senderid: any;
  join_url = '';
  activeEditMessageEntity: any = {};
  isReactionAdded: boolean = false;
  addReactionInfo: any = {}
  selectedEditMessage: any | undefined
  name: any;
  isCopyUrlEnable: boolean = false; // to show and hide the edit button


  //message send -
  sendMsgForm = new FormGroup({
    msg: new FormControl(''),
  });

  scheduleMeetingForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    time: new FormControl('', [Validators.required]),
    duration_hours: new FormControl('', [Validators.required]),
    duration_minutes: new FormControl('', [Validators.required]),
  });

  constructor(
    public dialog: MatDialog,
    private location: Location,
    public chatService: ChatService,
    private router: Router,
    private websocketservice: WebsocketService,
    private apiservice: ApiservicesService,
    public utilityservice: UtilityService,
    private userservice: UserService,
    private route: ActivatedRoute,
    private _httpClient: HttpClient,
    private _snackBar: MatSnackBar,
    private toaster: ToastrService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    console.log("ngOnInit got it");
    // this.sendMsg();

    this.route.queryParams
      .subscribe((params: any) => {
        console.log("got it");
        this.chatUserId = params['id'];
        this.chatMessages();
      });

    this.recieverUserData();
    this.socketListen();
    this.chatMessagesArr;
    this.value = this.userservice.getUserData().email;
  }

  //sender message edit -
  openSendMessageFormWithDataForEdit(data: any) {
    console.log("data", data);
    this.sendMsgForm = new FormGroup({
      msg: new FormControl(data.senderMessage)
    })
  }

  enableEditMessageInput(x: any) {
    console.log("enableEditMessageInput called ", x);
    let previousMessage = x.senderMessage ? x.senderMessage : x.recieverMessage;
    this.activeEditMessageEntity = { messageId: x.message_id, previousMessage: previousMessage };
    console.log("this.activeEditMessageEntity ", this.activeEditMessageEntity);
  }

  editMessage(data: any) {
    console.log("edit message called");

    if (!this.activeEditMessageEntity.newEditedMessage) {
      this.activeEditMessageEntity = {};
      return;
    };

    // API body to be send
    let requestBody = { messageId: data.message_id, message: this.activeEditMessageEntity.newEditedMessage };

    console.log("requestBody ", requestBody);



    this.apiservice
      .editSendMessgeDataService(requestBody)
      .subscribe((response) => {
        console.log("editSendMessgeDataService api response ", response);
        console.log("this.activeEditMessageEntity ", this.activeEditMessageEntity);

        (document.getElementById(this.activeEditMessageEntity.messageId) as HTMLParagraphElement).innerText = this.activeEditMessageEntity.newEditedMessage;
        this.activeEditMessageEntity = {};

      }, (error) => {
        console.log("editSendMessgeDataService api error ", error);

        // If error occured set previous message
        let element = (document.getElementById(this.activeEditMessageEntity.messageId) as HTMLParagraphElement);
        element.innerText = this.activeEditMessageEntity.previousMessage;

        this.activeEditMessageEntity = {};
        this.toaster.error('Message edition failed', 'Error!!')
      })
  }

  messageChanged(event: any) {
    console.log("event.target.value ", event.target.value);
    this.activeEditMessageEntity['newEditedMessage'] = event.target.value;
    console.log("this.activeEditMessageEntity ", this.activeEditMessageEntity);
  }

  loadUserSpecificChat(chatId: any) {
    // this.websocketservice.disconnect()
    this.chatUserId = chatId;

    //getting chat data and profile image header
    this.chatMessages();
    this.recieverUserData();

    //listen to socket for incoming data
    // this.socketListen();
    this.chatMessagesArr;
    this.value = this.userservice.getUserData().email;
  }

  onLoad() {
    this.loading = false;
  }

  chatMessages() {
    this.recieverUserData();
    let loggedUserId = this.userservice.getUserData()._id;
    if (this.chatUserId != undefined) {
      this.apiservice
        .chatMessagesData(loggedUserId, this.chatUserId)
        .subscribe((response) => {
          this.chatMessagesArr = response.data;
          console.log(response);

          this.doScrollChat()
        });
    }
  }

  //for scroll down chat msg-
  doScrollChat() {
    setTimeout(() => {
      console.log("scrolling down....")
      console.log(this.scrollUpmain.nativeElement.scrollTop)
      console.log(this.scrollUpmain.nativeElement.scrollHeight);

      try {
        this.scrollUpmain.nativeElement.scrollTop = this.scrollUpmain.nativeElement.scrollHeight + 200;
      }
      catch (err) {
        console.log(err)
      }
    }, 800);
  }

  //isko dekhenge ki kaisa khel hona hai idhar
  //this makes no sense
  usersMessage() {
    console.log("usersMessage called");
    this.loggedUserId = this.userservice.getUserData()._id;
    this.apiservice.chatNowData(this.loggedUserId).subscribe((response) => {
      this.messageList = response.data;
      this.userLastMessage = this.messageList.recieverMessage;
      console.log("yahin response apun mangta hai bro");
      console.log(response);
    });
  }

  // while clicking send button
  sendMsg() {
    console.log("sendMsg called");
    this.valueInput = this.sendMsgForm.controls.msg.value;

    let data = {
      senderId: this.userservice.getUserData()._id,
      recieverId: this.chatUserId,
      message: this.valueInput,
    };

    console.log(data);

    this.apiservice
      .chatMsgSend(data)
      .subscribe((response) => {
        console.log("chatMsgSend response", response);

        let senderData = { senderMessage: this.valueInput, messagedAt: new Date(), message_id: response.data.messageId, reaction_emoji_unicodes: [], };
        this.chatMessagesArr.push(senderData);
        console.log("after send message  this.chatMessagesArr.length ", this.chatMessagesArr);

        // emitting message new message through socket
        this.websocketservice.emit('sendMessage', {
          recieverMessage: this.valueInput,
          recieverImage: this.userservice.getUserData().image,
          recieverName: this.charUserName,
          message_id: response.data.messageId,
          reaction_emoji_unicodes: [],
          messagedAt: new Date(),
          recieverId: this.chatUserId,
          senderMessage: this.valueInput,
          senderId: this.userservice.getUserData()._id,
        });

        if (this.chatMessagesArr.length == 1) this.usersMessage();
        this.doScrollChat()
      });

    this.blankPlaceHolder = '';
    // this.textArea = '';
    this.message = ''

    console.log("msg send by user - ");
    console.log(this.sendMsgForm.controls.msg.value); //jo message apan bhej rahe hain input field se
  }

  /*
  Loading user image and header
  */
  recieverUserData() {
    console.log("user profile chat details")
    console.log(this.chatUserId)
    if (this.chatUserId != undefined) {
      this.apiservice.userProfileData(this.chatUserId).subscribe((response) => {
        console.log(response);
        if (response.data.image.length == 0) {
          this.charUserImage = 'assets/web/prof.png';
        }
        else {
          this.charUserImage = 'https://raphael-dashboard.hackerkernel.com' + response.data.image;
        }
        this.charUserName = response.data.firstname;
        this.userId = response.data._id;
      });
    }
  }

  //listening incoming message through socket
  socketListen() {
    // receive message
    this.websocketservice
      .listen('getMessage')
      .subscribe((response) => {
        console.log("socket getMessage message response")
        response.createdAt = new Date();
        if (this.chatUserId === response.senderId) {
          this.chatMessagesArr.push(response);
          console.log("after get message listen this.chatMessagesArr.length ", this.chatMessagesArr);
          this.usersMessage();
        }
      });

    this.listenReceiveAddedReaction();
  }

  sendIndex() {
    this.router.navigate(['/user/user-profile'], {
      queryParams: { id: this.chatUserId },
    });
  }

  zoomMeeting() {
    if (this.isFormValid) {
      console.log("zoom meeting info added");

      this.scheduleMeeting();
    }

  }

  private scheduleMeeting() {

    const payloads = this.scheduleMeetingForm.value;
    console.log("payloads", payloads);
    // payloads.email = "tanmayrichhs3@gmail.com";


    // payloads.email = "tanmayrichhs3@gmail.com";
    // const payloads = this.scheduleMeetingForm.value;
    // console.log("payloads.email", payloads.email);

    this._httpClient.post(`https://raphael-dashboard.hackerkernel.com/user/zoom-meeting`, payloads).subscribe((res: any) => {
      if (!res.error) {
        // this.toaster.success('Successfully Added')
      }
      // console.log("response meeting",res);
      // console.log(res.data.body.join_url);

      this.isCopyUrlEnable = !this.isCopyUrlEnable;
      this.join_url = res.data.body.join_url;

    }, error => {
      this.toaster.error('Something went wrong !', 'OOPS!!')
    })
  }

  copyToClipboard() {
    const content = (document.getElementById('myDiv') as HTMLElement).innerText;
    navigator['clipboard'].writeText(content).then().catch(e => console.error(e));

  }

  private displayMessage(message: string) {
    this._snackBar.open(message, "Okay", {
      duration: 5000
    });
  }

  private get isFormValid(): boolean {
    return this.scheduleMeetingForm.valid;
  }

  toggleEmojiPicker(messageId: any, emojiAction: string) {
    console.log(this.showEmojiPicker);
    this.showEmojiPicker = !this.showEmojiPicker;
    this.addReactionInfo = { messageId, emojiAction };
    console.log("this.addReactionInfo ", this.addReactionInfo);
  }

  addEmoji(event: any) {
    console.log("addEmoji called");
    console.log("event.emoji ", event.emoji);
    console.log("event.emoji.native ", event.emoji.native);
    console.log("this.addReactionInfo.emojiAction", this.addReactionInfo.emojiAction);

    if (Object.keys(this.addReactionInfo).length && this.addReactionInfo.emojiAction == "addReaction") {
      this.addReaction(event.emoji.unified);
      return;
    };

    const { message } = this;
    console.log(message);
    const text = `${message}${event.emoji.native}`;
    this.message = text;
  }

  onFocus() {
    console.log('focus');
    this.showEmojiPicker = false;
  }

  onBlur() {
    console.log('onblur');
    // this.toggleEmojiPicker();
  }

  addReaction(emojiCode: string) {
    console.log("add reaction called");

    let entity = { messageId: this.addReactionInfo.messageId, unicode: [emojiCode] };

    this.apiservice
      .addReactionToMessage(entity)
      .subscribe((response: any) => {
        console.log("addReactionToMessage api response ", response.data);

        this.chatMessagesArr
          .filter((entity: any) => entity.message_id == response.data.messageId)
          .map((item: any) => item.reaction_emoji_unicodes = response.data.unicodeList);

        this.addReactionInfo = {};
      }, (error) => {
        console.log("addReactionToMessage api error ", error);
        this.toaster.error('Adding reaction process failed', 'Error!!')
      })

    console.log("this.chatUserId ", this.chatUserId);
    console.log("this.userservice.userData._id ", this.userservice.userData._id);

    this.websocketservice.emit('addReaction', {
      senderId: this.userservice.userData._id,
      recieverId: this.chatUserId,
      messageId: this.addReactionInfo.messageId,
      unicode: [emojiCode]
    });
  }

  convertUnicodeToEmoji(unicodes: string[]) {
    return unicodes.map((unicode: string) => String.fromCodePoint(parseInt(unicode, 16)));
  }

  listenReceiveAddedReaction() {
    this.websocketservice.
      listen('receiveAddedReaction')
      .subscribe((response: any) => {
        console.log('receiveAddedReaction messsage listen ', response);
        console.log("this.chatMessagesArr ", this.chatMessagesArr);
        console.log("response.messageId ", response.messageId)
        var foundIndex = this.chatMessagesArr.findIndex((x: any) => x.message_id == response.messageId);
        console.log("foundIndex", foundIndex);
        console.log("this.chatMessagesArr[foundIndex].reaction_emoji_unicodes ", this.chatMessagesArr[foundIndex].reaction_emoji_unicodes)
        this.chatMessagesArr[foundIndex].reaction_emoji_unicodes.push(response.unicode.pop());
      });
  }
}
