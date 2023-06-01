import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  form: FormGroup;
  passwordHidden: boolean = false;
  creditsFalse: boolean = false;
  registered: boolean = false;
  accountExists: boolean = false;
  message: String = ''
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      currency: ['']
    });
  }

  showOrHide() {
    const password = document.getElementById('password');
    const ion = document.getElementById('ion')
    if (this.passwordHidden == false) {
      this.passwordHidden = true;
      password?.setAttribute('type', 'text')
      ion?.setAttribute('name', 'eye-off-outline')
    }
    else {
      this.passwordHidden = false;
      password?.setAttribute('type', 'password')
      ion?.setAttribute('name', 'eye-outline')
    }
  }
  ngOnInit() {
    localStorage.clear();
  }
  submitForm() {
    console.log(this.form.value)

    this.userService.registerUser(this.form.value).subscribe({
      next: data => {
        this.registered = true;
        this.accountExists = false;
      },
      error: err => {
        this.accountExists = true;
        this.registered = false;
      }
    })
  }
}
