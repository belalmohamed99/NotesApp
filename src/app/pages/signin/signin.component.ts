import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  constructor(
    private _SignUpService: AuthService,
    private readonly _Router: Router
  ) {}
  isLoading: boolean = false;
  LoginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
      ),
    ]),
  });
  loginSubmit(form: FormGroup) {
    this.isLoading = true;
    this._SignUpService.handleLogin(form.value).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem('token', '3b8ny__' + res.token);
        this._Router.navigate(['/notes']);
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }
}
