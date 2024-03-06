import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { AuthService } from '../auth.service';
import { DataStoreService } from '../data-store.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
logindetails = {
  email :"",
  password:""
}
  constructor(
    public router:Router,
    public http:HttpClient,
    public loginService:LoginService,
    public authService:AuthService,
    public toastr:ToastrService,
    public dataStoreService:DataStoreService) { }

  ngOnInit(): void {
  }
// home(){
// this.router.navigate(['/'])
// }
errorMessage: string = '';
login(){
  this.authService.login({ email: this.logindetails.email, password: this.logindetails.password }).subscribe(
    (response) => {
      console.log(response);
      this.toastr.success('User logged in successfully'); 
      localStorage.setItem('token', response.token);
      this.router.navigate(['/']); 
    },
    (error) => {
      this.toastr.error('Failed to login'); 
      this.errorMessage = 'Invalid username or password. Please try again.';
    }
  );
}


signup(){
this.router.navigate(['signup'])
}
}
