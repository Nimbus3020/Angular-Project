import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from '../service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdatepopupComponent } from '../updatepopup/updatepopup.component'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserModel } from './user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  formValue!: FormGroup;
  userModelObj : UserModel = new UserModel();
  userData !: any;
  editId!: any;

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
  }

  postUserDetails(){
    this.userModelObj.id = this.formValue.value.id;
    this.userModelObj.name = this.formValue.value.name;
    this.userModelObj.title = this.formValue.value.title;
    this.userModelObj.password = this.formValue.value.password;
    this.userModelObj.department = this.formValue.value.department;
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

  SetAccesspermission() {
      this.authService.Getaccessbyrole(this.authService.getrole(), 'customer').subscribe(res => {
        this.userData = res;
        //console.log(this.accessdata);
  
        if(this.userData.length>0){
          this.postUserDetails();
        }else{
          alert('you are not authorized to access.');
          this.router.navigate(['']);
        }
  
      });
    }
}








