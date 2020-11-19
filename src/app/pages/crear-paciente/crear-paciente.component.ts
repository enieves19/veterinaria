import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PacientesService } from '../../services/pacientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-paciente',
  templateUrl: './crear-paciente.component.html',
  styleUrls: ['./crear-paciente.component.css']
})
export class CrearPacienteComponent {

  pacientes: any = {} ;
  constructor(private pacientesService: PacientesService , private router: Router) { }

  AltaPaciente() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: '¿Desea Registrar Al Paciente?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.pacientesService.altaPaciente(this.pacientes).subscribe(resp => {
          // tslint:disable-next-line: triple-equals
          // tslint:disable-next-line: no-string-literal
          if ( resp['resultado'] === 'OK') {
        swalWithBootstrapButtons.fire(
          '¡Registrado!',
          '¡Paciente Registrado!',
          'success'
        );
        this.router.navigate(['/nuevo-historial']);
          }
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          '¡Cancelado!',
          'Ups!',
          'error'
        );
      }
    } );

     }
}
