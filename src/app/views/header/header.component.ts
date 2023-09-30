import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { StorageService } from 'src/app/shared/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private authService: AuthService) {

  }

  logout(){
    this.authService.doLogout()
  }
}
