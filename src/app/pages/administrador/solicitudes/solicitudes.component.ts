import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SolicitudModel } from '../../../shared/solicitud/solicitud.model';
import { SolicitudService } from '../../../shared/solicitud/solicitud.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EstudianteService } from '../../../shared/estudiantes/estudiantes.service';
import { CursoService } from '../../../shared/curso/curso.service';
import { EstudianteModel } from '../../../shared/estudiantes/estudiante.model';
import { CursoModel } from '../../../shared/curso/curso.model';

@Component({
  selector: 'app-solicitudes',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './solicitudes.component.html',
  styleUrl: './solicitudes.component.css'
})
export class SolicitudesComponent {
  solicitudes: SolicitudModel[] = [];
  estudiantes: EstudianteModel[] = [];
  cursos: CursoModel[] = [];

  constructor( 
    private solicitudService: SolicitudService,
    private estudianteService: EstudianteService,
    private cursoService: CursoService
  ) {}

  ngOnInit(): void {
    this.cargarSolicitudes();
    this.cargarCursos();
    this.cargarEstudiantes();
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

  cargarEstudiantes(): void {
    this.estudianteService.obtenerEstudiantes().subscribe(
      data => {
        this.estudiantes = data;
      },
      error => {
        console.error('Error al cargar los estudiantes:', error);
      }
    );
  }

  cargarCursos(): void {
    this.cursoService.obtenerCursos().subscribe(
      data => {
        this.cursos = data;
      },
      error => {
        console.error('Error al cargar los cursos:', error);
      }
    );
  }

  obtenerNombreCurso(cursoId: string): string {
    const curso = this.cursos.find(c => c.id === cursoId);
    return curso ? curso.nombre : 'Curso desconocido';
  }

  obtenerNombreEstudiante(estudianteId: number): string {
    const estudiante = this.estudiantes.find(e => e.id === estudianteId);
    return estudiante ? `${estudiante.nombre} ${estudiante.apellido}` : 'Estudiante desconocido';
  }

  obtenerEdadEstudiante(estudianteId: number): string | null {
    const estudiante = this.estudiantes.find(e => e.id === estudianteId);
    return estudiante ? estudiante.edad.toString() : null;
  }
  

  obtenerPruebaEstudiante(estudianteId: number): string {
    const estudiante = this.estudiantes.find(e => e.id === estudianteId);
    return estudiante ? estudiante.prueba : 'Desconocido';
  }

  aprobarSolicitud(solicitud: SolicitudModel): void {
    solicitud.estado = 'Aprobado';
    this.solicitudService.actualizarSolicitud(solicitud).subscribe(
      response => {
        console.log('Solicitud aprobada:', response);
        this.cargarSolicitudes(); 
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
        this.cargarSolicitudes(); 
      },
      error => {
        console.error('Error al rechazar la solicitud:', error);
      }
    );
  }
}
