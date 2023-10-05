import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { StorageService } from 'src/app/shared/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  userId!: any;
  name!: string;
  constructor(private authService: AuthService) {

  }


  ngOnInit(): void {
    this.userId = localStorage.getItem("userID")
    this.authService.getUserProfile(this.userId).subscribe( res =>{
      this.name = res.username
    })



  }

  logout(){
    this.authService.doLogout()
  }
}
