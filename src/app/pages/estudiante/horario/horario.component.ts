import { Component } from '@angular/core';
import { EstudianteModel } from '../../../shared/estudiantes/estudiante.model';
import { EstudianteService } from '../../../shared/estudiantes/estudiantes.service';
import { CursoModel } from '../../../shared/curso/curso.model';
import { CursoService } from '../../../shared/curso/curso.service';
import { ProfesorService } from '../../../shared/profesor/profesor.service';
import { ProfesorModel } from '../../../shared/profesor/profesor.model';
import { HorarioModel } from '../../../shared/horario/horario.model';
import { HorarioService } from '../../../shared/horario/horario.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SolicitudService } from '../../../shared/solicitud/solicitud.service';
import { SolicitudModel } from '../../../shared/solicitud/solicitud.model';

@Component({
  selector: 'app-horario',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './horario.component.html',
  styleUrl: './horario.component.css'
})
export class HorarioComponent {
  estudiante: EstudianteModel | null = null;
  cursoSeleccionado: CursoModel | null = null;
  cursosAprobados: CursoModel[] = [];
  horariosCursoSeleccionado: HorarioModel[] = [];
  cursos: CursoModel[] = [];
  horarios: HorarioModel[] = [];
  horariosFiltrados: HorarioModel[] = [];
  profesores: ProfesorModel[] = [];
  dias: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  horas: string[] = [
    '07:00 AM-08:00 AM', '08:00 AM-09:00 AM', '09:00 AM-10:00 AM',
    '10:00 AM-11:00 AM', '11:00 AM-12:00 PM', '12:00 PM-01:00 PM',
    '01:00 PM-02:00 PM', '02:00 PM-03:00 PM', '03:00 PM-04:00 PM',
    '04:00 PM-05:00 PM', '05:00 PM-06:00 PM', '06:00 PM-07:00 PM'
  ];

  isPopupOpen = false;
  solicitudAprobada = false;

  constructor(
    private route: ActivatedRoute,
    private estudianteService: EstudianteService,
    private horarioService: HorarioService,
    private cursoService: CursoService,
    private solicitudService: SolicitudService,
    private profesorService: ProfesorService
  ) {}

ngOnInit(): void {
  this.cargarCursos();
  this.cargarProfesores(); // Cargar la lista de profesores al inicializar el componente

  const id = this.route.snapshot.paramMap.get('id');
  if (id) {
    this.estudianteService.obtenerEstudiante(Number(id)).subscribe(
      data => {
        this.estudiante = data;
        if (this.estudiante) {
          this.cargarCursosAprobados(this.estudiante.id.toString());
        } else {
          console.error('No se pudo obtener el estudiante.');
        }
      },
      error => {
        console.error('Error al cargar el estudiante:', error);
      }
    );
  } else {
    console.error('No se encontró el ID del estudiante en la ruta.');
  }
}

  cargarHorarios(): void {
    this.horarioService.obtenerHorario().subscribe(
      data => {
        this.horarios = data;
      },
      error => {
        console.error('Error al cargar los horarios:', error);
      }
    );
  }


  cargarProfesores(): void {
    this.profesorService.obtenerProfesores().subscribe(
      data => {
        this.profesores = data;
      },
      error => {
        console.error('Error al cargar los profesores:', error);
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
  
  cargarCursosAprobados(estudianteId: string): void {
    this.solicitudService.obtenerSolicitudes().subscribe(
      data => {
        const solicitudesAprobadas = data.filter(
          s => s.estudiante_id === estudianteId && s.estado === 'Aprobado'
        );
        this.cursosAprobados = this.cursos.filter(curso =>
          solicitudesAprobadas.some(s => s.curso_id === curso.id)
        );

        // Verificar si el curso seleccionado está aprobado
        if (this.cursoSeleccionado && this.cursosAprobados.some(c => c.id === this.cursoSeleccionado!.id)) {
          this.solicitudAprobada = true;
          this.mostrarHorario();
        }
      },
      error => {
        console.error('Error al cargar las solicitudes:', error);
      }
    );
  }

  mostrarHorariosDeCurso(cursoId: string): void {
    if (this.cursoSeleccionado && this.solicitudAprobada) {
      this.horariosCursoSeleccionado = this.horarios.filter(horario => horario.curso_id === this.cursoSeleccionado!.id);
    }
  }
  

  mostrarHorario() {
    if (this.cursoSeleccionado) {
      this.horariosCursoSeleccionado = this.horarios.filter(horario => horario.curso_id === this.cursoSeleccionado!.id);
    }
  }

  obtenerNombreCurso(cursoId: string): string {
    const curso = this.cursos.find(c => c.id === cursoId);
    return curso ? curso.nombre : 'Desconocido';
  }

  obtenerNombreProfesor(id_profe: string): string {
    const profesor = this.profesores.find(p => p.id === id_profe);
    return profesor ? `${profesor.nombre} ${profesor.apellido}` : 'Desconocido';
  }

  obtenerHorarioPorDiaYHora(dia: string, hora: string): HorarioModel[] {
    return this.horariosCursoSeleccionado.filter(h =>
      h.dia === dia && this.horasEnRango(hora, h.hora_inicio, h.hora_fin)
    );
  }

  horasEnRango(horaConsulta: string, horaInicio: string, horaFin: string): boolean {
    const [horaConsultaInicio, horaConsultaFin] = horaConsulta.split('-').map(h => h.trim());
    const [horarioInicio, horarioFin] = [horaInicio, horaFin].map(h => this.convertirAHora24(h));

    const consultaInicio = this.convertirAHora24(horaConsultaInicio);
    const consultaFin = this.convertirAHora24(horaConsultaFin);

    return consultaInicio >= horarioInicio && consultaFin <= horarioFin;
  }

  convertirAHora24(hora: string): string {
    const [time, modifier] = hora.split(' ');
    let [hours, minutes] = time.split(':');

    if (modifier === 'PM' && hours !== '12') {
      hours = (parseInt(hours, 10) + 12).toString();
    }
    if (modifier === 'AM' && hours === '12') {
      hours = '00';
    }

    return `${hours.padStart(2, '0')}:${minutes}`;
  }


  openAgregarPopup(): void {
    this.isPopupOpen = true;

    // Limpiar el horario al abrir el popup
    this.horariosCursoSeleccionado = [];
  }

  closePopup(): void {
    this.isPopupOpen = false;
    this.cursoSeleccionado = null; // Limpiar el curso seleccionado al cerrar el popup
    this.horariosCursoSeleccionado = []; // Limpiar los horarios al cerrar el popup
  }
}