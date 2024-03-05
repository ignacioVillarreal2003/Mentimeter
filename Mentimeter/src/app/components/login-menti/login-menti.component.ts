import { Component } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login-menti',
  templateUrl: './login-menti.component.html',
  styleUrls: ['./login-menti.component.css']
})
export class LoginMentiComponent {
  username: string = "";
  password: string = "";

  constructor(private dataService: DataService, private httpService: HttpService, private router: Router) { }

  Login() {
    if (this.CheckData()){
      this.httpService.Login(this.username, this.password).subscribe(
        (response: any) => {
          this.dataService.username = this.username;
          localStorage.setItem('token', response);
          this.router.navigate(['/createMenti']);
        },
        (error: any) => {
          this.GetError(error);
        }
      );
    } 
  }

  Register() {
    if (this.CheckData()){
      this.httpService.Register(this.username, this.password).subscribe(
        (response: any) => {
          this.dataService.username = this.username;
          localStorage.setItem('token', response);
          this.router.navigate(['/createMenti']);
        },
        (error: any) => {
          this.GetError(error);
        }
      );
    } 
  }

  CheckData() {
    if (this.username.length < 8) {
      this.GetError("Username of at least 8 characters.");
      return false;
    }
    if (this.password.length < 8) {
      this.GetError("Password of at least 8 characters.");
      return false;
    }
    return true;
  }

  GetError(error: string){
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error,
      timer: 2000,
      timerProgressBar: true
    });
  }
}
