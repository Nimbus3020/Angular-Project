import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserModel } from '../user/user.model';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  formValue!: FormGroup;
  userModelObj : UserModel = new UserModel();
  userData !: any;
  editId!: any;
  user:any;

  constructor(private builder: FormBuilder, private authService: AuthService,
    private router: Router) {}




  ngOnInit(): void {
    this.formValue = this.builder.group({
      id : [''],
      name : [''],
      email: [''],
      title: [''],
      department: [''],
      role: [''],
      status : [''],
      password: [''],
      isactive: this.builder.control(false),
      position: ['']
    })
    this.getAllUsers();
    this.authService.GetUserbyCode(sessionStorage.getItem('username')).subscribe(res => {
      this.user = res;
      console.log(this.user);
    });
    console.log(this.user)
  }

  postUserDetails(){
    this.userModelObj.id = this.formValue.value.id;
    this.userModelObj.name = this.formValue.value.name;
    this.userModelObj.title = this.formValue.value.title;
    this.userModelObj.password = this.formValue.value.password;
    this.userModelObj.department = this.formValue.value.password;
    this.userModelObj.email = this.formValue.value.email;
    this.userModelObj.status = this.formValue.value.status;
    this.userModelObj.role = this.formValue.value.role;
    this.userModelObj.isactive = this.formValue.value.isactive;
    this.userModelObj.position = this.formValue.value.position;

    this.authService.postUser(this.userModelObj)
    .subscribe((res: any) => {
      console.log(res);
      alert("Loaded..")
      let ref = document.getElementById("cancel")
      ref?.click();
      this.formValue.reset();
      this.getAllUsers();
    },
      (    err: any)=>{
      alert("Something went wrong");
    })
  }
  getAllUsers(){
    this.authService.getUser()
    .subscribe((res: any)=>{
      console.log(res)
      this.userData = res;
    })
  }

  deleteAuser(row: any){
    this.authService.deleteUser(row.id)
    .subscribe((res: any)=>{
      alert("User Deleted")
      this.getAllUsers();
    })
  }

  onEdit(row: any){
    this.userModelObj.id = row.id;
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['password'].setValue(row.password);
    this.formValue.controls['status'].setValue(row.isactive);
    this.formValue.controls['title'].setValue(row.title);
    this.formValue.controls['department'].setValue(row.department);
    this.formValue.controls['position'].setValue(row.position);
    this.formValue.controls['role'].setValue(row.role);
  }

  updateAuser(){
    // this.userModelObj.id = this.formValue.value.id;
    this.userModelObj.name = this.formValue.value.name;
    this.userModelObj.email = this.formValue.value.email;
    this.userModelObj.title = this.formValue.value.title;
    this.userModelObj.password = this.formValue.value.password;
    this.userModelObj.department = this.formValue.value.department;
    this.userModelObj.role = this.formValue.value.role;
    this.userModelObj.status = this.formValue.value.status;
    this.userModelObj.isactive = this.formValue.value.isactive;
    this.userModelObj.position = this.formValue.value.position;

    console.log('this.userModelObj.id: ', this.userModelObj.id)
    console.log('this.userModelObj: ', this.userModelObj)

    this.authService.updateUser(this.userModelObj, this.userModelObj.id)
    .subscribe((res: any) =>{
      alert("Updated Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllUsers();
    })

  }
}
