import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { UserService } from 'src/app/services/user.service';
import { UtilityService } from 'src/app/services/utility.service';



declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // @Output() closeModalEvent = new EventEmitter<boolean>();

  // onCloseModal(event: any){
  //   this.closeModalEvent.emit(false);
  //  }

  @ViewChild('filterNameInterst') filterNameInterst: ElementRef;
  @ViewChild('editProfileModalBtn') editProfileModalBtn: ElementRef | undefined;
  @ViewChild('AddInterestModalBtn') AddInterestModalBtn: ElementRef | undefined;

  @ViewChild('AddExperienceModalBtn') AddExperienceModalBtn: ElementRef | undefined;

  id: any;

  username: string = "";
  Lastname: any = ""
  accountType: string = "";
  userEmail: any = ""
  urllink: string = "assets/web/prof.png";
  userid: any = "";
  imageObject: any = {};
  interestList: any = [];
  tagslist: any = [];
  profileInterestList: any = [];
  updateUserDetails: any = [];
  ExperienceList: any = [];
  schoolName: any = "";
  locatioN: any = '';
  EducationList: any = [];
  filteredArray: any = [];
  Description: any = "";
  baseUrl: string = "https://raphael-dashboard.hackerkernel.com";
  profileimage: string = '';
  myControl = new FormControl('')
  selectable = false;
  removable = true;
  blank = '';

  loading: boolean = true;
  value =
    `URL`;

  isBridgedUserid: any = "";
  isBridgedUser: any = "";
  userIsBridged: any = "";
  userBridgedOrNot: any = "";

  constructor(private userservice: UserService, private apiservice: ApiservicesService, private toastr: ToastrService, private utilityservice: UtilityService, private _fb: FormBuilder, private route: ActivatedRoute
   , private _httpClient: HttpClient,
    private _snackBar: MatSnackBar,
    private modelService: NgbModal) { }

  experienceForm = new FormGroup({

    // _id: new FormControl(''),
    experienceId: new FormControl(''),
    title: new FormControl('', [Validators.required]),
    employment: new FormControl('', [Validators.required]),
    company: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    startMonth: new FormControl('', [Validators.required]),
    startYear: new FormControl('', [Validators.required]),
    endMonth: new FormControl(''),
    endYear: new FormControl(''),
  })

  educationForm = new FormGroup({
    educationId: new FormControl(''),
    business: new FormControl('', [Validators.required]),
    startMonth: new FormControl('', [Validators.required]),
    startYear: new FormControl('', [Validators.required]),
    endMonth: new FormControl(''),
    endYear: new FormControl(''),
    grade: new FormControl('', [Validators.required]),
    activities: new FormControl('', [Validators.required]),
  })

  EditForm = new FormGroup({
    image: new FormControl('', [Validators.required]),
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  })

  scheduleMeetingForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    time: new FormControl('', [Validators.required]),
    duration_hours: new FormControl('', [Validators.required]),
    duration_minutes: new FormControl('', [Validators.required]),
    email: new FormControl("tanmayrichhs3@gmail.com")

  })

  get experienceId() { return this.experienceForm.get('experienceId') }
  get title() { return this.experienceForm.get('title') }
  get employment() { return this.experienceForm.get('employment') }
  get company() { return this.experienceForm.get('company') }
  get location() { return this.experienceForm.get('location') }
  get startMonth() { return this.experienceForm.get('startMonth') }
  get startYear(){ return this.experienceForm.get('startYear')}
  get endMonth(){ return this.experienceForm.get('endMonth')}
  get endYear() { return this.experienceForm.get('endYear') }

  get educationId() { return this.educationForm.get('educationId') }
  get business() { return this.educationForm.get('business') }
  get smonth() { return this.educationForm.get('startMonth') }
  get syear() { return this.experienceForm.get('startYear') }
  get emonth() { return this.educationForm.get('endMonth') }
  get eyear() { return this.educationForm.get('endYear') }
  get grade() { return this.educationForm.get('grade') }
  get activities() { return this.educationForm.get('activities') }

  get image() { return this.EditForm.get('ProfileImage') }
  get firstname() { return this.EditForm.get('firstname') }
  get lastname() { return this.EditForm.get('lastname') }
  get email() { return this.EditForm.get('email') }
  get description() { return this.EditForm.get('description') }


  ngOnInit(): void {

    console.log('this.experienceForm.valid');
    console.log(this.experienceForm.valid);

    let id = this.route.snapshot.params.id;
    console.log("param id")
    console.log(id);

    console.log("UserComponent ngOnIt called");
    this.userid = this.userservice.getUserData()._id;
    this.getUserProfileData();
    this.userProfileInterest();
    this.getExperienceFormData();
    this.getEducationFormData();
    console.log(this.profileInterestList);
    console.log(this.interestList);

  }

  onLoad() {
    this.loading = false;
  }

  saveExperienceFormData() {
    console.log("saveExperienceFormData called");
    let data = this.experienceForm.value;
    console.log("data ",data);
    // return;
    data.userId = this.userservice.getUserData()._id;
    console.log("data.userId", data.userId);

    this.apiservice.saveExperienceData(data).subscribe((response) => {
      console.log(response);
      //new chnge -
      // this.experienceForm.reset();
      this.getExperienceFormData();
      this.AddExperienceModalBtn?.nativeElement.click();

    })
  }

  editSaveExperienceFormData() {
    console.log("editSaveExperienceFormData called");
    let data = this.experienceForm.value;

    console.log("data ",data);
    // return;
    // this.experienceForm.get('experienceid')?.setValue( this.experienceForm.value._id)
    // console.log("valuse", this.experienceForm.value.experienceid);

    // data.user_id = this.userservice.getUserData().experienceid;
    console.log(this.experienceForm.value);
    console.log(this.experienceForm.value._id);

    const formData = new FormData();
    formData.append("experienceId", this.experienceForm.value.experienceId);
    formData.append("title", this.experienceForm.value.title);
    formData.append("employment", this.experienceForm.value.employment);
    formData.append("company", this.experienceForm.value.company);
    formData.append("location", this.experienceForm.value.location);
    formData.append("startMonth", this.experienceForm.value.startMonth);
    formData.append("startYear", this.experienceForm.value.startYear);
    formData.append("endMonth", this.experienceForm.value.endMonth);
    formData.append("endYear", this.experienceForm.value.endYear);

    this.apiservice.editSaveExperienceData(formData).subscribe((response) => {
      console.log(response);
      this.getExperienceFormData();

    })
  }

  editSaveEducationFormData(){
    console.log("editSaveExperienceFormData called");
    let data = this.educationForm.value;

    // this.experienceForm.get('experienceid')?.setValue( this.experienceForm.value._id)
    console.log("valuse of educationId --- ", this.educationForm.value.educationId);

    data.user_id = this.userservice.getUserData()._id;
    console.log(this.educationForm.value);
    console.log(this.educationForm.value._id);

    const formData = new FormData();
    formData.append("educationId", this.educationForm.value.educationId);
    formData.append("business", this.educationForm.value.business);
    formData.append("startMonth", this.educationForm.value.startMonth);
    formData.append("startYear", this.educationForm.value.startYear);
    formData.append("endMonth", this.educationForm.value.endMonth);
    formData.append("endYear", this.educationForm.value.endYear);
    formData.append("grade", this.educationForm.value.grade);
    formData.append("activities", this.educationForm.value.activities);

    this.apiservice.editSaveEducationData(formData).subscribe((response) => {
      console.log(response);
      this.getEducationFormData();
    })
  }

  //cancel form data  -
  saveExperienceFormDataCancel() {
    this.experienceForm.reset();
  }

  saveEducationFormDataCancel() {
    this.educationForm.reset();
  }

  getExperienceFormData() {
    console.log(this.experienceForm.value)
    let userId = this.userservice.getUserData()._id;
    this.apiservice.getExperienceData(userId).subscribe((response) => {
      console.log("Experience Response :");
      console.log(response);
      if (response.data.length) {
        this.ExperienceList = response.data;
        this.schoolName = response.data[0].title;
        this.locatioN = response.data[0].location;
        console.log(this.schoolName);
      }
      this.experienceForm.reset();
    })
  }

  saveEducationFormData() {
    console.log(this.educationForm.value)
    let data = this.educationForm.value;
    data.userId = this.userservice.getUserData()._id;
    console.log("data.userId",data.userId);

    console.log("data ", data);
    this.apiservice.saveEducationData(data).subscribe((response) => {
        console.log(response);

        this.getEducationFormData();
        this.educationForm.reset();

      })
  }

  getEducationFormData() {
    console.log(this.educationForm.value)
    let userId = this.userservice.getUserData()._id;
    this.apiservice.getEducationData(userId).subscribe((response) => {
      console.log(response);
      this.EducationList = response.data;

    })
  }

  EditFormData() {
    console.log("EditFormData called");
    let editFormValue = this.EditForm.value;
    editFormValue.image = this.imageObject;
    editFormValue.userid = this.userservice.getUserData()._id;
    console.log("editFormValue");
    console.log(editFormValue);

    this.apiservice.editProfileData(editFormValue)
      .subscribe((response) => {
        console.log(response);

        if (!response.error) {
          // this.EditForm.reset();
          this.editProfileModalBtn?.nativeElement.click();
          this.EditForm.reset();
          // this.toastr.success('Profile has been edited', 'Success')
          this.getUserProfileData();
        }
      }, error => {
        this.toastr.error('Profile has not been edited', 'Error!!')
      })
  }

  selectFile(event: any) {
    if (event.target.files) {
      var reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      console.log(event.target.files[0]);
      this.imageObject = event.target.files[0];
      reader.onload = (event: any) => {
        this.urllink = event.target.result
      }
    }
  }

  getUserProfileData() {
    console.log("getUserProfileData profile component");

    this.apiservice
      .userProfileData(this.userid)
      .subscribe((response) => {
        this.updateUserDetails = response.data;
        if (this.updateUserDetails.image) {
          if (this.updateUserDetails.image.includes('/public/uploads')) {
            this.profileimage = this.baseUrl + this.updateUserDetails.image
          }
          else { this.profileimage = this.updateUserDetails.image }
        }
        else {
          this.profileimage = this.urllink;
        }
        console.log(this.updateUserDetails);
        console.log("Before this.urllink ", this.urllink);
        if (this.updateUserDetails.image != null)
          this.urllink = `${this.baseUrl}` + this.updateUserDetails.image;
        else {
          this.urllink = `${this.baseUrl}`;
        }
        this.imageObject = this.updateUserDetails.image;
        console.log("After this.urllink ", this.urllink);
        console.log(this.updateUserDetails.firstname);
        this.isBridgedUserid = response.data._id
        console.log("experienceid", this.educationId);

        this.isUserBridgedFunc();
      })
  }

  userProfileInterest() {
    this.apiservice.userInterestData(this.userid).subscribe((response) => {

      this.profileInterestList = response.data;
      console.log(response);
    })
  }

  searchInterest(event: any) {
    let searchname = event.target.value;
    this.apiservice.interestlist(searchname).subscribe((response) => {

      this.interestList = response.data;
      console.log(this.interestList);
      console.log(this.profileInterestList);
      this.filtrArr();
    })
  }

  // interest reset -
  searchIntrestReset() {
    console.log("searchIntrestReset");
    this.filterNameInterst.nativeElement.value = '';
  }

  filtrArr() {
    const res = this.interestList.filter((items: any) => !this.profileInterestList.includes(items.interest));
    // this.filteredArray.reset();
    this.filteredArray = res;
    console.log(this.filteredArray);
  }

  AddInterest() {
    let data = {
      userid: this.userid,
      interests: this.tagslist
    }
    this.apiservice.addInteresttdata(data)
      .subscribe((response) => {

        this.AddInterestModalBtn?.nativeElement.click();
        this.utilityservice.sendMessage(this.tagslist);
        this.userProfileInterest()
      })
  }

  add(event: string): void {
    this.blank = '';
    const value = (event || '').trim();
    this.tagslist.push(value);
    console.log(this.tagslist);
  }

  remove(index: number): void {
    if (index >= 0) {
      this.tagslist.splice(index, 1);
    }
  }

  openEditUserProfileDataModal() {
    this.EditForm
      .patchValue({
        firstname: this.updateUserDetails.firstname,
        lastname: this.updateUserDetails.lastname,
        email: this.updateUserDetails.email,
        description: this.updateUserDetails.description,
      });
    console.log("this.EditForm", this.EditForm);
  }

  test(event: any) {
    console.log(event.checked);
    if (!event.checked) { }
  }

  onSubmit() {
    if (this.isFormValid) {
      this.scheduleMeeting();
    }
  }

  private scheduleMeeting() {
    const payloads = this.scheduleMeetingForm.value;
    this._httpClient.post(`https://raphael-dashboard.hackerkernel.com/user/zoom-meeting`, payloads).subscribe((res: any) => {
      this.displayMessage(res.message);
    }, (error: any) => {
      this.displayMessage(error.message);
    })
  }

  private displayMessage(message: string) {
    this._snackBar.open(message, "Okay", {
      duration: 5000
    });
  }

  private get isFormValid(): boolean {
    return this.scheduleMeetingForm.valid;
  }

  //for edit experience data -
  openExperienceModelWithData(data: any) {
    console.log("openExperienceModelWithData data");
    console.log(data)
    this.experienceForm
      .patchValue({
        experienceId: data._id,
        title: data.title,
        employment: data.employment,
        company: data.company,
        location: data.location,
        startMonth: data.startMonth,
        startYear: data.startYear,
        endMonth: data.endMonth,
        endYear: data.endYear,
      });
    // this.experienceForm = new FormGroup({
    //   _id: new FormControl(data._id, [Validators.required]),
    //   title: new FormControl(data.title, [Validators.required]),
    //   employment: new FormControl(data.employment, [Validators.required]),
    //   company: new FormControl(data.company, [Validators.required]),
    //   location: new FormControl(data.location, [Validators.required]),
    //   startMonth: new FormControl(data.startMonth, [Validators.required]),
    //   startYear: new FormControl(data.startYear, [Validators.required]),
    //   endMonth: new FormControl(data.endMonth, [Validators.required]),
    //   endYear: new FormControl(data.endYear, [Validators.required]),
    // })
  }

  openEducationModelWithData(data: any) {
    console.log("openEducationModelWithData fun work for edit");
    console.log(data);
    console.log("education Id --" ,data._id);
    console.log(" education id --" ,data.educationid);

    this.educationForm.patchValue({
      educationId:data._id,
      business:data.business,
      startMonth:data.startMonth,
      startYear:data.startYear,
      endMonth:data.endMonth,
      endYear:data.endYear,
      grade:data.grade,
      activities:data.activities
    })

    // this.educationForm = new FormGroup({
    //   _id: new FormControl(data.id, [Validators.required]),
    //   business: new FormControl(data.business, [Validators.required]),
    //   startMonth: new FormControl(data.startMonth, [Validators.required]),
    //   startYear: new FormControl(data.startYear, [Validators.required]),
    //   endMonth: new FormControl(data.endMonth, [Validators.required]),
    //   endYear: new FormControl(data.endYear, [Validators.required]),
    //   grade: new FormControl(data.grade, [Validators.required]),
    //   activities: new FormControl(data.activities, [Validators.required]),
    // })
  }

  addOrRemoveUserBridge() {
    let data = {
      userid: this.userservice.getUserData()._id,
      bridgeduserid: this.isBridgedUserid
    }

    console.log("this.userIsBridged = ", this.userIsBridged);

    if (!this.userIsBridged) {
      this.apiservice.addBridge(data).subscribe((response) => {
        this.userBridgedOrNot = "Bridged";
        this.isUserBridgedFunc();
      })
    }
    else {
      this.apiservice.removeBridge(data).subscribe((response) => {
        if (!response.error)
          this.userBridgedOrNot = "Bridged";

        this.isUserBridgedFunc();
      })
    }
  }

  isUserBridgedFunc() {
    let userid = this.userservice.getUserData()._id;

    this.apiservice
      .isUserbridgedData(userid, this.isBridgedUserid)
      .subscribe((response) => {
        console.log("isUserBridgedFunc: " + response);
        this.userIsBridged = response.bridged;
        this.userBridgedOrNot = response.message;
        this.isBridgedUser = response;

      }, error => {
        console.log(error);
        this.userIsBridged = error.bridged;
        this.userBridgedOrNot = "Bridged";
      })
  }

  deleteExperience(data: any) {
    console.log("deleteExperience called ", data);
    this.apiservice
      .deleteExperience(data._id)
      .subscribe((response) => {
        console.log("deleteExperience api response ", response);
        console.log("show form data");
        this.getExperienceFormData();
        console.log("getExperienceFormData",this.getExperienceFormData());

      }, (error) => {
        console.log("delete api error");
        console.log(error);
      });
  }

  deleteEducation(data: any) {
    console.log("deleteEducation called ", data);
    this.apiservice
      .deleteEducation(data._id)
      .subscribe((response) => {
        console.log("deleteEducation api response ", response);
        console.log("show form data");

        this.getEducationFormData();
        console.log("getEducationFormData",this.getEducationFormData());

      }, (error) => {
        console.log("delete api error");
        console.log(error);
      });
  }
}


