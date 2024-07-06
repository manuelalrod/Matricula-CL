import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SolicitudModel } from '../../../shared/solicitud/solicitud.model';
import { SolicitudService } from '../../../shared/solicitud/solicitud.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-solicitudes',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './solicitudes.component.html',
  styleUrl: './solicitudes.component.css'
})
export class SolicitudesComponent {
  solicitudes: SolicitudModel[] = [];

  constructor(private solicitudService: SolicitudService) {}

  ngOnInit(): void {
    this.cargarSolicitudes();
  }

  cargarSolicitudes(): void {
    this.solicitudService.obtenerSolicitudes().subscribe(
      data => {
        this.solicitudes = data;
      },
      error => {
        console.error('Error al cargar las solicitudes:', error);
      }
    );
  }

  aprobarSolicitud(solicitud: SolicitudModel): void {
    solicitud.estado = 'Aprobado';
    this.solicitudService.actualizarSolicitud(solicitud).subscribe(
      response => {
        console.log('Solicitud aprobada:', response);
        this.cargarSolicitudes(); // Recargar las solicitudes para actualizar la vista
      },
      error => {
        console.error('Error al aprobar la solicitud:', error);
      }
    );
  }

  rechazarSolicitud(solicitud: SolicitudModel): void {
    solicitud.estado = 'Rechazado';
    this.solicitudService.actualizarSolicitud(solicitud).subscribe(
      response => {
        console.log('Solicitud rechazada:', response);
        this.cargarSolicitudes(); // Recargar las solicitudes para actualizar la vista
      },
      error => {
        console.error('Error al rechazar la solicitud:', error);
      }
    );
  }
}
