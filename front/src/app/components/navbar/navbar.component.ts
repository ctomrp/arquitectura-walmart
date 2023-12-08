import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Emitters } from 'src/app/emitters/emitters';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  authenticated = false;
  authenticated$ = this.authService.isAuthenticated$;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.checkAuthentication();
    this.authenticated = this.authService.isAuthenticated();
    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    });
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.authenticated = false;
      this.authService.clearLocalStorage();
      this.router.navigate(['/home']);
    });
  }
}
