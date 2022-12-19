import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formLogin: FormGroup;
  errorLogin: boolean = false;

  constructor(private userService: UserService, private router: Router) {
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  onSubmit() {
    this.userService
      .login(this.formLogin.value)
      .then((response) => {
        console.log(response);
        if(response == undefined){
          this.errorLogin = true;
        }else{
          this.router.navigate(['/aplicacion']);
        }
      })
      .catch((error) => {
        console.log(error);
        
      });
  }

  onGoogleLogin() {
    this.userService
      .google_login()
      .then((response) => {
        if(response == undefined){
          this.errorLogin = true;
        }else{
          this.router.navigate(['/aplicacion']);
        }
      })
      .catch((error) => {
        console.log(error);
        
      });
  }

}
