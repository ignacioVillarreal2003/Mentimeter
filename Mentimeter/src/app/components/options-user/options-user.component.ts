import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-options-user',
  templateUrl: './options-user.component.html',
  styleUrls: ['./options-user.component.css']
})

export class OptionsUserComponent {

  username: string = "";
  currentPassword: string = "";
  newPassword: string = "";

  constructor(private router: Router, private dataService: DataService, private httpService: HttpService) {
    if (this.dataService.username) {
      this.username = this.dataService.username;
    }
  }

  ChangePassword() {
    if (this.CheckData()) {
      this.httpService.ChangePassword(this.username, this.currentPassword, this.newPassword).subscribe(
        (response: any) => {
          this.router.navigate(['/createMenti']);
        },
        (error: any) => {
          this.GetError(error);
        }
      );
    }
  }

  CheckData() {
    if (this.newPassword.length < 8) {
      console.log(this.newPassword.length);
      this.GetError("Password must be at least 8 characters.");
      return false;
    }
    return true;
  }

  GetError(error: string) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error,
      timer: 2000,
      timerProgressBar: true
    });
  }
}
