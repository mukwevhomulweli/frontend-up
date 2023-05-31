import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UserOTP } from 'src/app/types/UserOTP';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent {
  email: String = ''
  userData?: UserOTP;
  oldOTP: boolean = true;
  newOTP: boolean = false;
  wrongOTP: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    const serializedData = localStorage.getItem('userOTP');

    if (serializedData) {
      this.userData = JSON.parse(serializedData) as UserOTP
      this.email = this.userData.email;
    }

  }

  submit() {
    const inputs = document.querySelectorAll('input');
    const inputArr = Array.from(inputs);
    let string = '';
    for (let i = 0; i < inputArr.length; i++) {
      string += inputArr[i].value;
    }
    if (string === String(this.userData?.otp)) {
      this.router.navigate(['/dashboard']);
      localStorage.clear()
    } else {
      this.wrongOTP = true;
      inputArr.forEach(item => {
        item.setAttribute('class', 'errorOTP');
      })
    }
  }
  moveNext() {

    const inputs = document.querySelectorAll('input');
    const inputArr = Array.from(inputs);

    if (inputArr[0].value.length === 1) {
      inputArr[1].focus()
    }
    if (inputArr[1].value.length === 1) {
      inputArr[2].focus();
    }

    if (inputArr[2].value.length === 1) {
      inputArr[3].focus()
    }

  }



  resendOTP() {
    let object = {
      "email": this.userData?.email
    }

    this.userService.resendOTP(object).subscribe({
      next: data => {

        localStorage.setItem('userOTP', JSON.stringify(data))
        this.oldOTP = false;
        this.newOTP = true;
        this.ngOnInit()

      },
      error: err => {
        this.oldOTP = false;
        this.newOTP = false;
        console.log(err)
      }
    })
  }
}

