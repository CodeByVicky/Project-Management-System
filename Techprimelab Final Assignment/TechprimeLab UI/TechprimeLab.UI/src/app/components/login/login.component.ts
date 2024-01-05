import { Component, OnInit } from '@angular/core';
import { Authentication } from '../../model/authentication.model';
import { AuthenticationsService } from '../../services/authentications.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginObj: { email: string; password: string } = { email: '', password: '' };
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";

  showAlert: boolean = false;
  alertMessage: string = '';

  constructor(private authenticationsService: AuthenticationsService, private router: Router) { }

  ngOnInit(): void {
  
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onLogin() {
    const validEmail = this.validateEmail(this.loginObj.email);
    const validPassword = !!this.loginObj.password;
  
    if (!validEmail || !validPassword) {
      this.showAlertMessage('Please enter a valid email and password', true);
    } else {
      this.authenticationsService.login(this.loginObj)
        .subscribe(
          (res) => {
            if (res && res.Message) {
              this.showAlertMessage(res.Message, true);
            } else {
              // Redirect to the 'navigate' component upon successful login
              this.router.navigate(['navigate']);
            }
          },
          (err) => {
            this.showAlertMessage(err?.error?.Message || 'Invalid Credentials', true);
          }
        );
    }
  }

  showAlertMessage(message: string, show: boolean) {
    this.alertMessage = message;
    this.showAlert = show;
  }

  validateEmail(email: string): boolean {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}


