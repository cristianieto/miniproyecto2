import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  formReg!: FormGroup;
  errorReg: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.formReg = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  onSubmit() {
    this.userService.register(this.formReg.value).then((response) => {
      if(response == undefined){
        this.errorReg = true;
      }else{
        this.router.navigate(['/aplicacion']);
      }
      })
      .catch((error) => console.error(error));
  }

  onGoogleLogin() {
    this.userService.google_login().then((response) => {
      if(response == undefined){
        this.errorReg = true;
      }else{
        this.router.navigate(['/aplicacion']);
      }
      })
      .catch((error) => console.error(error));
  }


}
