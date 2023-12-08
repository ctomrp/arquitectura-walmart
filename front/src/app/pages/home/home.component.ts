import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from 'src/app/emitters/emitters';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class Home implements OnInit {
  message = '';

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.checkAuthentication().subscribe(
      (res: any) => {
        this.message = `Hi ${res.name}`;
        this.authService.setAuthenticated(true);
      },
      (err) => {
        this.message = 'You are not logged in';
        this.authService.setAuthenticated(false);
      }
    );
  }
}
