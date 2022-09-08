import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  public user = {
    username: '',
    password: '',
    name: '',
    lastname: '',
    email: '',
    phone: '',
  };

  constructor(private userService: UserService, private snack: MatSnackBar) {}

  ngOnInit(): void {}

  formSubmit() {
    console.log(this.user);
    // Data Validation
    if (this.user.username == '' || this.user.username == null) {
      this.snack.open('El nombre de usuario es requerido', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }

    // POST Request
    this.userService.addUser(this.user).subscribe(
      (data) => {
        console.log(data);
        Swal.fire(
          `Bienvenido ${this.user.username}`,
          'Usuario registrado con exito',
          'success'
        );
      },
      (error) => {
        console.log(error);
        this.snack.open('Ha ocurrido un error en el sistema', 'Aceptar', {
          duration: 3000,
        });
      }
    );
  }
}
