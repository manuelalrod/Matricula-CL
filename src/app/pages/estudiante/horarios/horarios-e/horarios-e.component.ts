import { Component } from '@angular/core';
import { HorarioModel } from '../../../../shared/horario/horario.model';
import { HorarioService } from '../../../../shared/horario/horario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CursoModel } from '../../../../shared/curso/curso.model';
import { CursoService } from '../../../../shared/curso/curso.service';
import { ProfesorService } from '../../../../shared/profesor/profesor.service';
import { ProfesorModel } from '../../../../shared/profesor/profesor.model';

@Component({
  selector: 'app-horarios-e',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './horarios-e.component.html',
  styleUrl: './horarios-e.component.css'
})
export class HorariosEComponent {

  cursoSeleccionado: CursoModel | null = null;
  horariosCursoSeleccionado: HorarioModel[] = [];
  horarios: HorarioModel[] = [];
  cursos: CursoModel[] = [];
  profesores: ProfesorModel[] = [];
  loading: boolean = false;
  dias: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  horas: string[] = [
    '07:00 AM-08:00 AM', '08:00 AM-09:00 AM', '09:00 AM-10:00 AM',
    '10:00 AM-11:00 AM', '11:00 AM-12:00 PM', '12:00 PM-01:00 PM',
    '01:00 PM-02:00 PM', '02:00 PM-03:00 PM', '03:00 PM-04:00 PM',
    '04:00 PM-05:00 PM', '05:00 PM-06:00 PM', '06:00 PM-07:00 PM'
  ];

  constructor(
    private horarioService: HorarioService,
    private cursoService: CursoService,
    private profesorService: ProfesorService
  ) {}

  ngOnInit(): void {
    this.cargarHorarios();
    this.cargarCursos();
    this.cargarProfesores();
  }

  cargarHorarios(): void {
    this.loading = true;
    this.horarioService.obtenerHorario().subscribe(
      data => {
        this.horarios = data;
        this.loading = false;
      },
      error => {
        console.error('Error al cargar los horarios:', error);
        this.loading = false;
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

  seleccionarCurso(curso: CursoModel) {
    this.cursoSeleccionado = curso;
    if (this.cursoSeleccionado) {
      this.horariosCursoSeleccionado = this.horarios.filter(horario => horario.curso_id === curso.id);
    }
  }

  obtenerNombreCurso(cursoId: string): string {
    const curso = this.cursos.find(c => c.id === cursoId);
    return curso ? curso.nombre : 'Desconocido';
  }

  obtenerHorarioPorDiaYHora(dia: string, hora: string): HorarioModel[] {
    const hora24 = this.convertirAHora24(hora.split('-')[0].trim());
    return this.horariosCursoSeleccionado.filter(h => 
      h.dia === dia && 
      this.convertirAHora24(h.hora_inicio) <= hora24 && 
      this.convertirAHora24(h.hora_fin) > hora24
    );
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

  mostrarHorario() {
    if (this.cursoSeleccionado) {
      this.horariosCursoSeleccionado = this.horarios.filter(horario => horario.curso_id === this.cursoSeleccionado!.id);
    }
  }

  obtenerNombreProfesor(id_profe: string): string {
    const profesor = this.profesores.find(p => p.id === id_profe);
    return profesor ? `${profesor.nombre} ${profesor.apellido}` : 'Desconocido';
  }
}
