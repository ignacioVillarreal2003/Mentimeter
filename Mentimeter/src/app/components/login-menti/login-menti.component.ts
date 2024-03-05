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
  // Variables para almacenar el nombre de usuario y la contraseña
  username: string = "";
  password: string = "";

  constructor(private dataService: DataService, private httpService: HttpService, private router: Router) { }

  // Método para iniciar sesión
  Login() {
    // Verificar la validez de los datos ingresados
    if (this.CheckData()) {
      // Enviar solicitud de inicio de sesión al servicio HTTP
      this.httpService.Login(this.username, this.password).subscribe(
        (response: any) => {
          // Almacenar el nombre de usuario en el servicio de datos y el token en el almacenamiento local
          this.dataService.username = this.username;
          localStorage.setItem('token', response);
          // Navegar a la página de creación de Menti
          this.router.navigate(['/createMenti']);
        },
        (error: any) => {
          // Mostrar mensaje de error en caso de error en la solicitud
          this.GetError(error);
        }
      );
    }
  }

  // Método para registrar un nuevo usuario
  Register() {
    // Verificar la validez de los datos ingresados
    if (this.CheckData()) {
      // Enviar solicitud de registro al servicio HTTP
      this.httpService.Register(this.username, this.password).subscribe(
        (response: any) => {
          // Almacenar el nombre de usuario en el servicio de datos y el token en el almacenamiento local
          this.dataService.username = this.username;
          localStorage.setItem('token', response);
          // Navegar a la página de creación de Menti
          this.router.navigate(['/createMenti']);
        },
        (error: any) => {
          // Mostrar mensaje de error en caso de error en la solicitud
          this.GetError(error);
        }
      );
    }
  }

  // Método para verificar la validez de los datos ingresados
  CheckData() {
    // Verificar la longitud del nombre de usuario
    if (this.username.length < 8) {
      this.GetError("Username of at least 8 characters.");
      return false;
    }
    // Verificar la longitud de la contraseña
    if (this.password.length < 8) {
      this.GetError("Password of at least 8 characters.");
      return false;
    }
    // Los datos son válidos
    return true;
  }

  // Método para mostrar mensajes de error
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
