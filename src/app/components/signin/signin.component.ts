import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UserOTP } from 'src/app/types/UserOTP';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  form: FormGroup;
  passwordHidden: boolean = false;
  creditsFalse: boolean = false;
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  ngOnInit() {
    localStorage.clear();
  }

  submitForm() {
    console.log(this.form.value);
    this.userService.signInUser(this.form.value).subscribe({
      next: (data: UserOTP) => {

        this.creditsFalse = false;
        this.router.navigate(['/otp'])
        localStorage.setItem('userOTP', JSON.stringify(data))
      }
      ,
      error: err => {
        this.creditsFalse = true;
        console.error(err);

      }
    })

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

}
