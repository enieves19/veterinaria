import { Component, OnInit } from '@angular/core';
import { PacientesService } from 'src/app/services/pacientes.service';
import { ActivatedRoute } from '@angular/router';
import { Historial } from 'src/app/interfaces/historial.interface';
// tslint:disable-next-line: no-trailing-whitespace
import Swal from 'sweetalert2';  

@Component({
  selector: 'app-expediente',
  templateUrl: './expediente.component.html',
  styleUrls: ['./expediente.component.css']
})
export class ExpedienteComponent implements OnInit {

  exp: Historial[];

  expedientes: any = {};

  expediente: any = {};

  // tslint:disable-next-line: no-inferrable-types
  mostrar: boolean = false;
  // tslint:disable-next-line: no-trailing-whitespace
  constructor(private pacienteService: PacientesService, private activatedRoute: ActivatedRoute) { 
    this.activatedRoute.params.subscribe( params => {
      // tslint:disable-next-line: no-string-literal
      this.expedientes = params['id'];
      console.log(this.expedientes);
    });
  }

  ngOnInit(): void {
    this.obtenerExpediente();
  }

  obtenerExpediente() {
    this.pacienteService.getExpedientes(this.expedientes).subscribe( (resp: Historial[]) => {
      this.exp = resp;
      console.log(this.exp);
    });
  }

  seleccionarExpediente(idhistorial) {
    this.pacienteService.seleccionarExpediente(idhistorial).subscribe( resp => {
      this.expediente = resp[0];
      console.log(this.expediente);
    });
  }

  editarExpediente() {
    this.pacienteService.editarExpediente(this.expediente).subscribe( resp => {
      // tslint:disable-next-line: no-string-literal
      if ( resp['resultado'] === 'OK' ) {
        Swal.fire({
          icon: 'success',
          title: 'Expediente editado correctamente',
          showConfirmButton: false,
          timer: 2000
        });
        this.obtenerExpediente();
      }
    });
  }

  seleccionarReceta(idhistorial) {
    this.pacienteService.seleccionarRecetaPDF(idhistorial);
  }
}
