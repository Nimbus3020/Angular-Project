import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { 

  }
  apiurl='http://localhost:3000/user';

  RegisterUser(inputdata:any){
    return this.http.post(this.apiurl + '/', inputdata)
  }
  GetUserbyCode(id:any){
    return this.http.get(this.apiurl+'/'+id);
  }
  Getall(){
    return this.http.get(this.apiurl);
  }
  updateuser(id:any,inputdata:any){
    return this.http.put(this.apiurl+'/'+id,inputdata);
  }
  getuserrole(){
    return this.http.get('http://localhost:3000/role');
  }
  isloggedin(){
    return sessionStorage.getItem('username')!=null;
  }
  getrole(){
    return sessionStorage.getItem('role')!=null?sessionStorage.getItem('role')?.toString():'';
  }
  GetAllCustomer(){
    return this.http.get('http://localhost:3000/customer');
  }
  Getaccessbyrole(role:any,menu:any){
    return this.http.get('http://localhost:3000/roleaccess?role='+role+'&menu='+menu)
  }


  postUser( data: any ){
    return this.http.post("http://localhost:3000/user",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  
  getUser(){
    return this.http.get(this.apiurl)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  
  updateUser(data:any,id: string){
    return this.http.put(this.apiurl+'/'+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteUser(id : string){
    return this.http.delete(this.apiurl+'/'+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
