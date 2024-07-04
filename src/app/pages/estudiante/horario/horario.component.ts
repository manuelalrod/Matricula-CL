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
  horariosCursoSeleccionado: HorarioModel[] = [];
  horarios: HorarioModel[] = [];
  cursos: CursoModel[] = [];
  profesores: ProfesorModel[] = [];
  dias: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  horas: string[] = [
    '07:00 AM-08:00 AM', '08:00 AM-09:00 AM', '09:00 AM-10:00 AM',
    '10:00 AM-11:00 AM', '11:00 AM-12:00 PM', '12:00 PM-01:00 PM',
    '01:00 PM-02:00 PM', '02:00 PM-03:00 PM', '03:00 PM-04:00 PM',
    '04:00 PM-05:00 PM', '05:00 PM-06:00 PM', '06:00 PM-07:00 PM'
  ];
  isPopupOpen = false;
  editMode = false;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private estudianteService: EstudianteService,
    private horarioService: HorarioService,
    private cursoService: CursoService,
    private profesorService: ProfesorService
  ) {}

  ngOnInit(): void {
    this.cargarCursos();
    this.cargarProfesores();
    this.cargarHorarios();
    
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.estudianteService.obtenerEstudiante(Number(id)).subscribe(
        data => {
          this.estudiante = data;
        },
        error => {
          console.error('Error al cargar el estudiante:', error);
        }
      );
    }
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

  mostrarHorario() {
    if (this.cursoSeleccionado) {
      this.horariosCursoSeleccionado = this.horarios.filter(horario => horario.curso_id === this.cursoSeleccionado!.id);
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

  obtenerNombreProfesor(id_profe: string): string {
    const profesor = this.profesores.find(p => p.id === id_profe);
    return profesor ? `${profesor.nombre} ${profesor.apellido}` : 'Desconocido';
  }

  openAgregarPopup(): void {
    this.editMode = false;
    this.isPopupOpen = true;
  }

  openEditarPopup(): void {
    this.isPopupOpen = true;
  }

  closePopup(): void {
    this.isPopupOpen = false;
  }

  }
