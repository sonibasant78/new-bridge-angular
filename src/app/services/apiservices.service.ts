import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ApiservicesService {


  // baseurl = 'https://raphael-dashboard.hackerkernel.com';
  baseurl = 'http://localhost:9000';
  receiverId = new Subject<any>();

  constructor(private http: HttpClient, private userservive: UserService) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200'
    })
  };

  schoolList(searchName: any): Observable<any> {
    return this.http.get(`${this.baseurl}/user/school-list?schoolname=${searchName}`)

  }

  interestlist(searchName: any): Observable<any> {
    return this.http.get(`${this.baseurl}/user/interest-list?interest=${searchName}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.userservive.getUserData().token}`
      })
    })
  }

  addInteresttdata(data: any): Observable<any> {
    return this.http.post(`${this.baseurl}/user/add-userinterest`, data, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.userservive.getUserData().token}`

      })
    })
  }

  loginData(data: any): Observable<any> {
    return this.http.post(`${this.baseurl}/auth/login`, data)
  }

  registerData(data: any): Observable<any> {
    return this.http.post(`${this.baseurl}/auth/register`, data)
  }

  forgotpassworddata(data: any): Observable<any> {
    return this.http.post(`${this.baseurl}/user/forgot-password`, data)
  }

  resetPasswordData(data: any): Observable<any> {
    return this.http.post(`${this.baseurl}/user/reset-password`, data)
  }

  userlist(searchName: any): Observable<any> {
    return this.http.get(`${this.baseurl}/user/user-list?firstname=${searchName}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.userservive.getUserData().token}`

        })
      })
  }

  recentlyJoinedUser(schoolid: any, userId: any): Observable<any> {
    return this.http.get(`${this.baseurl}/user/user-recently?userId=${userId}&schoolId=${schoolid}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.userservive.getUserData().token}`

      })
    })
  }

  recommendedUser(userId: any): Observable<any> {
    return this.http.get(`${this.baseurl}/user/user-recommended?userId=${userId}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.userservive.getUserData().token}`
      })
    })
  }

  ChangeUsernameData(data: any): Observable<any> {
    return this.http.post(`${this.baseurl}/user/change-username`, data, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.userservive.getUserData().token}`

      })
    })

  }

  ChangePasswordData(data: any): Observable<any> {
    return this.http.post(`${this.baseurl}/user/change-userpassword`, data, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.userservive.getUserData().token}`

      })
    }
    )
  }

  deleteAccountData(data: any): Observable<any> {
    return this.http.post(`${this.baseurl}/user/delete-useraccount`, data, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.userservive.getUserData().token}`

      })
    }
    )
  }

  HelpAboutYou(): Observable<any> {
    return this.http.get(`${this.baseurl}/user/about-list`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.userservive.getUserData().token}`

      })
    }
    )
  }

  HelpData(data: any): Observable<any> {
    return this.http.post(`${this.baseurl}/user/user-help`, data,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.userservive.getUserData().token}`

        })
      })
  }

  editProfileData(data: any): Observable<any> {

    let body = new FormData();
    body.append("firstname", data.firstname)
    if (data.image) {
      body.append("image", data.image)
    }
    body.append("email", data.email)
    body.append("lastname", data.lastname)
    body.append("description", data.description)
    body.append("userid", data.userid)
    console.log("data ", data);

    return this.http.post(`${this.baseurl}/user/edit-profile`, body, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.userservive.getUserData().token}`
      })
    })
  }

  editSendMessgeDataService(data: any): Observable<any> {
    let body = new FormData();
    body.append("messageId", data.messageId)
    body.append("message", data.message)
    return this.http.post(`${this.baseurl}/user/edit-message`, body, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.userservive.getUserData().token}`
      })
    })
  }

  saveExperienceData(data: any): Observable<any> {

    return this.http.post(`${this.baseurl}/user/save-experience`, data, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.userservive.getUserData().token}`
      })
    })
  }

  editSaveExperienceData(data: any): Observable<any> {

    return this.http.post(`${this.baseurl}/user/edit-experience`, data, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.userservive.getUserData().token}`
      })
    })
  }

  getExperienceData(userid: any): Observable<any> {
    return this.http.get(`${this.baseurl}/user/show-experience?userId=${userid}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.userservive.getUserData().token}`
        })
      })
  }

  deleteExperience(experienceId: any): Observable<any> {
    return this.http.get(`${this.baseurl}/user/delete-experience?experienceId=${experienceId}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.userservive.getUserData().token}`
        })
      })
  }

  deleteEducation(educationId: any): Observable<any> {
    return this.http.get(`${this.baseurl}/user/delete-education?educationId=${educationId}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.userservive.getUserData().token}`
        })
      })
  }

  saveEducationData(data: any): Observable<any> {

    return this.http.post(`${this.baseurl}/user/save-education`, data, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.userservive.getUserData().token}`
      })
    })
  }

  editSaveEducationData(data: any): Observable<any> {

    return this.http.post(`${this.baseurl}/user/edit-education`, data, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.userservive.getUserData().token}`
      })
    })
  }

  getEducationData(userid: any): Observable<any> {
    return this.http.get(`${this.baseurl}/user/show-education?userId=${userid}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.userservive.getUserData().token}`
        })
      })
  }

  userProfileData(userid: any): Observable<any> {
    console.log("user profile data ");

    console.log(userid);

    return this.http.get(`${this.baseurl}/user/profile-data?userid=${userid}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.userservive.getUserData().token}`
        })
      })
  }

  userInterestData(userid: any): Observable<any> {
    return this.http.get(`${this.baseurl}/user/userInterest-data?userid=${userid}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.userservive.getUserData().token}`
        })
      })
  }

  userGradeData(grade: any): Observable<any> {
    return this.http.get(`${this.baseurl}/user/grade-list?grade=${grade}`,)
  }

  peopleYouMayKnowData(userid: any): Observable<any> {
    return this.http.get(`${this.baseurl}/user/peopleyoumayknow?userId=${userid}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.userservive.getUserData().token}`
        })
      })
  }

  addBridge(data: any): Observable<any> {
    return this.http.post(`${this.baseurl}/user/add-bridge`, data,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.userservive.getUserData().token}`
        })
      })
  }

  removeBridge(data: any): Observable<any> {
    return this.http.post(`${this.baseurl}/user/remove-bridge`, data,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.userservive.getUserData().token}`
        })
      })
  }

  bridgedUserData(userid: any): Observable<any> {
    return this.http.get(`${this.baseurl}/user/bridgeduser-show?userid=${userid}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.userservive.getUserData().token}`
        })
      })
  }

  isUserbridgedData(userid: any, isBridgedUserid: any): Observable<any> {
    return this.http.get(`${this.baseurl}/user/is-bridged?userid=${userid}&isBridgedUserId=${isBridgedUserid}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.userservive.getUserData().token}`
        })
      })
  }

  linkedinSignUp(token: any, url: any, data: any): Observable<any> {
    return this.http.post(`${this.baseurl}/auth//signIn-with-linkedIn?code=${token}&redirect_URI=${url}`, data
    )
  }

  LoginWithLinkedin(token: any, url: any, data: any): Observable<any> {
    return this.http.post(`${this.baseurl}/auth/loginWith-linkedIn?code=${token}&redirect_URI=${url}`, data
    )
  }

  chatNowData(userid: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', `Bearer ${this.userservive.getUserData().token}`);

    return this.http.get(`${this.baseurl}/user/last-message?user_id=${userid}`,
      {
        headers: headers
      })
  }

  chatMessagesData(chatUserId: any, userid: any): Observable<any> {
    return this.http.get(`${this.baseurl}/user/show-chat?sender_id=${chatUserId}&reciever_id=${userid}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.userservive.getUserData().token}`
        })
      })
  }

  chatMsgSend(data: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', `Bearer ${this.userservive.getUserData().token}`);

    return this.http.post(`${this.baseurl}/user/send-message`, data,
      {
        headers: headers,
      })
  }

  getSearcheUserData(id: string): Observable<any> {
    return this.http.post(`${this.baseurl}/user/searched-user?id=${id}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.userservive.getUserData().token}`
        })
      })
  }

  addReactionToMessage(data: any): Observable<any> {
    return this.http.post(`${this.baseurl}/user/add-reaction`, data, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.userservive.getUserData().token}`

      })
    })
  }

  // getLastMessageByUser(data: any): Observable<any> {
  //   return this.http.post(`${this.baseurl}/user/last-message`, data, {
  //     headers: new HttpHeaders({
  //       Authorization: `Bearer ${this.userservive.getUserData().token}`

  //     })
  //   })
  // }
}
