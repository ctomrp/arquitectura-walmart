import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class Login {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  submit(): void {
    this.authService.login(this.form.getRawValue()).subscribe(
      () => {
        this.authService.setAuthenticated(true);
        this.router.navigate(['/reporte']);
      },
      (error) => {
        // Handle login error
      }
    );
  }

  // submit(): void {
  //   this.http
  //     .post('http://127.0.0.1:8000/login', this.form.getRawValue(), {
  //       withCredentials: true,
  //     })
  //     .subscribe(() => this.router.navigate(['/reporte']));
  // }
}
