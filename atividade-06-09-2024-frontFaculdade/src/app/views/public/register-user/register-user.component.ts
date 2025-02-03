import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { ValidatePassword } from 'src/app/shared/validators/validate-password';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
})
export class RegisterUserComponent {
  form: FormGroup;

  get email() {
    return this.form.get('email') as FormControl;
  }

  get password() {
    return this.form.get('password') as FormControl;
  }

  get confirmPassword() {
    return this.form.get('confirmPassword') as FormControl;
  }

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private usersService: UsersService,
    private toastrService: ToastrService,
    private authService: AuthService
  ) {
    this.router = inject(Router);
    this.form = this.formBuilder.group({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        ValidatePassword('confirmPassword'),
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        ValidatePassword('password'),
      ]),
    });
  }

  async register() {
    try {
      if (!this.form.valid) {
        return;
      }
      const res = await this.usersService.register({
        email: this.email.value,
        password: this.password.value,
      });
      await this.authService.authenticate(
        this.email.value,
        this.password.value
      );

      this.toastrService.success(res.message);
      this.router.navigateByUrl('/actions');
    } catch (error: any) {
      this.toastrService.error(error?.error?.message || 'Erro');
    }
  }
}
