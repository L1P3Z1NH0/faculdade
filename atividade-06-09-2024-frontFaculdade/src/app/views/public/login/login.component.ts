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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup;
  loading: boolean = false;

  get email() {
    return this.form.get('email') as FormControl;
  }

  get password() {
    return this.form.get('password') as FormControl;
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public router: Router,
    private toastrService: ToastrService
  ) {
    this.router = inject(Router);
    this.form = this.formBuilder.group({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  async login() {
    try {
      if (!this.form.valid) {
        return;
      }
      this.loading = true;
      await this.authService.authenticate(
        this.email.value,
        this.password.value
      );
      this.loading = false;
      this.router.navigateByUrl('/actions');
    } catch (error: any) {
      this.authService.logout();
      this.loading = true;
      this.toastrService.error(error?.error?.message || 'Erro');
    }
  }
}
