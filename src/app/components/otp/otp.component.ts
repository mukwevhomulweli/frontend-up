import { Component } from '@angular/core';
import { UserOTP } from 'src/app/types/UserOTP';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent {
  email: String = ''
  userData?: UserOTP;


  ngOnInit() {
    const serializedData = localStorage.getItem('userOTP');

    if (serializedData) {
      this.userData = JSON.parse(serializedData) as UserOTP
      this.email = this.userData.email;
    }

  }
}
