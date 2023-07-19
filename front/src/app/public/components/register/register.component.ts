import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { UserService } from '../../services/user-service/user.service';
import { CustomValidators } from '../../validators/custom-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form: FormGroup = new FormGroup(
    {
      email: new FormControl(null, [Validators.required, Validators.email]),
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      passwordConfirm: new FormControl(null, [Validators.required]),
    },
    {
      validators: CustomValidators.passwordMatching,
    }
  );

  constructor(private userService: UserService, private router: Router) {}

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get username(): FormControl {
    return this.form.get('username') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  get passwordConfirm(): FormControl {
    return this.form.get('passwordConfirm') as FormControl;
  }

  register() {
    if (this.form.valid) {
      this.userService
        .register({
          email: this.email.value,
          password: this.password.value,
          username: this.username.value,
        })
        .pipe(tap(() => this.router.navigate(['../login'])))
        .subscribe();
    }
  }
}
