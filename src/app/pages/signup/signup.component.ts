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
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  constructor(
    private readonly _SignUpService: AuthService,
    private readonly _Router: Router
  ) {}
  apiError!: string;
  isLoading: boolean = false;

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
      ),
    ]),
    age: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(00201|\+201|01)[0-2,5]{1}[0-9]{8}$/),
    ]),
  });

  registerSubmit(form: FormGroup) {
    this.isLoading = true;
    this._SignUpService.handleRegister(form.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        this._Router.navigate(['/signin']);
      },
      error: (err) => {
        this.apiError = err.error.msg;
        this.isLoading = false;
      },
    });
  }
}
