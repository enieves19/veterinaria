import { Component, OnInit } from '@angular/core';
import { PacientesService } from '../../services/pacientes.service';
import { Pacientes } from '../../interfaces/pacientes.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-datos-paciente',
  templateUrl: './datos-paciente.component.html',
  styleUrls: ['./datos-paciente.component.css']
})
export class DatosPacienteComponent implements OnInit {
 // Obtener la lista de pacientes
  pacientes: Pacientes[];
  paciente: any = {};
  filtrarNombre: any = '';
  // tslint:disable-next-line: no-inferrable-types
  p: number = 1;
  constructor(public pacienteService: PacientesService) { }

  ngOnInit(): void {
    this.obtenerPacientes();
  }
 obtenerPacientes() {
   this.pacienteService.getPaciente().subscribe((resp: Pacientes[]) => {
     this.pacientes = resp;
     console.log(this.pacientes);
   });
 }
 seleccionarPaciente(idpaciente) {
   this.pacienteService.seleccionarPaciente(idpaciente).subscribe(resp => {
    this.paciente = resp[0];
    console.log(this.paciente);
   });
 }
 editarPaciente() {
   this.pacienteService.editarPaciente(this.paciente).subscribe(resp => {
    // tslint:disable-next-line: no-string-literal
    if (resp['resultado'] === 'OK') {
      Swal.fire({
        icon: 'success',
        title: '¡Paciente Editado Correctamente!',
        showConfirmButton: false,
        timer: 2000
      });
      this.obtenerPacientes();
    }
   });
}

EliminarPaciente(idpaciente) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });
  swalWithBootstrapButtons.fire({
    title: '¿Desea Eliminar Al Paciente?',
    text: '',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      this.pacienteService.eliminarPaciente(idpaciente).subscribe(resp => {
        // tslint:disable-next-line: triple-equals
        // tslint:disable-next-line: no-string-literal
        if ( resp['resultado'] === 'OK') {
      swalWithBootstrapButtons.fire(
        '¡Paciente Eliminado!',
        'Haga Click Para Continuar',
        'success'
      );
      this.obtenerPacientes();
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
