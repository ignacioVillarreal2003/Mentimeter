import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-options-menti',
  templateUrl: './options-menti.component.html',
  styleUrls: ['./options-menti.component.css']
})
export class OptionsMentiComponent {
  // Variables para almacenar el nombre de usuario y contraseñas
  username: string = "";
  password: string = "";
  newPassword: string = "";

  // Constructor del componente, se ejecuta al crear una instancia del componente
  constructor(private router: Router, private dataService: DataService, private httpService: HttpService) {
    // Verificar si hay un nombre de usuario almacenado en el servicio de datos
    if (this.dataService.username) {
      this.username = this.dataService.username;
    }
  }

  // Método para cambiar la contraseña
  ChangePassword() {
    // Verificar la validez de los datos
    if (this.CheckData()) {
      // Llamar al servicio HTTP para cambiar la contraseña
      this.httpService.ChangePassword(this.username, this.password, this.newPassword).subscribe(
        // Manejar la respuesta exitosa
        (response: any) => {
          // Redirigir a la página principal
          this.router.navigate(['/createMenti']);
        },
        // Manejar errores de la solicitud
        (error: any) => {
          // Mostrar mensaje de error
          this.GetError(error);
        }
      );
    }
  }

  // Método para verificar la validez de los datos
  CheckData() {
    // Verificar la longitud de la nueva contraseña
    if (this.newPassword.length < 8) {
      // Mostrar mensaje de error y registrar la longitud de la contraseña en la consola (puedes eliminar esta línea en producción)
      console.log(this.newPassword.length);
      this.GetError("Password must be at least 8 characters.");
      return false;
    }
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
