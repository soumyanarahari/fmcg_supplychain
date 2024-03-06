import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  userTypes = ['manufacturer', 'brand', 'individual','distributor','service provider']; 
  constructor(public router:Router,public http:HttpClient,public authService:AuthService,public toastr:ToastrService) { }
  username: string = '';
  email: string='';
  password: string = '';
  userType: string = ''; 
  confirmPassword: string = '';
  errorMessage: string = '';
  ngOnInit() {
  }
  signin() {
    if (!this.username || !this.password || !this.confirmPassword || !this.userType) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.authService.register({ username: this.username,email:this.email, password: this.password,userType : this.userType  }).subscribe(
      (response => {
       this.toastr.success('User registered successfully');
      alert(response.error); // Alert the message received from the server
        this.router.navigate(['login']);
      }),
      (error) => {
        this.toastr.error('Registration failed. Please try again.')
        this.errorMessage = 'Registration failed. Please try again.';
      }
    );
  }
  login(){
    this.router.navigate(['login'])
  }
}
