import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class Register {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  submit(): void {
    this.authService.register(this.form.getRawValue()).subscribe(
      () => this.router.navigate(['/login']),
      (error) => {
        // Handle registration error
      }
    );
  }

  // submit(): void {
  //   this.http
  //     .post('http://127.0.0.1:8000/register', this.form.getRawValue())
  //     .subscribe(() => this.router.navigate(['/login']));
  // }
}
