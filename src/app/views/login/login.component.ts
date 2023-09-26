import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ServicesService } from 'src/app/shared/services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {


  }
  get f() {
    return this.loginForm.controls;
  }
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  email!: string;
  pass!: string;

  ngOnInit(): void {

   this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    }),
    this.registerForm = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
      username: ['']
    })
  }

 
  register(){
    this.authService.signUp(this.registerForm.value).subscribe( res =>{
      if( res.result){
        this.registerForm.reset();
        this.router.navigate(['login']);
      }
    })
  }

  login(){
    this.authService.signin(this.loginForm.value);
  }

}
