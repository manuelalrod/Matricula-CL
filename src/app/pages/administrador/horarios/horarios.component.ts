import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HorarioModel } from '../../../shared/horario/horario.model';
import { CursoModel } from '../../../shared/curso/curso.model';
import { HorarioService } from '../../../shared/horario/horario.service';
import { CursoService } from '../../../shared/curso/curso.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-horarios',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './horarios.component.html',
  styleUrl: './horarios.component.css'
})
export class HorariosComponent implements OnInit {
  horarios: HorarioModel[] = [];
  cursos: CursoModel[] = [];
  formData: HorarioModel = new HorarioModel("", "", "Lunes", "", "");
  isPopupOpen = false;
  editMode = false;
  loading = false;
  id: string | null = null;

  dias: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  horas: string[] = [
    '07:00 AM-08:00 AM', '08:00 AM-09:00 AM', '09:00 AM-10:00 AM',
    '10:00 AM-11:00 AM', '11:00 AM-12:00 PM', '12:00 PM-01:00 PM',
    '01:00 PM-02:00 PM', '02:00 PM-03:00 PM', '03:00 PM-04:00 PM',
    '04:00 PM-05:00 PM', '05:00 PM-06:00 PM', '06:00 PM-07:00 PM'
  ];
  selectedHora: string = this.horas[0]; 

  constructor(
    private horarioService: HorarioService,
    private cursoService: CursoService
  ) {}

  ngOnInit(): void {
    this.cargarHorarios();
    this.cargarCursos();
  }

  cargarHorarios(): void {
    this.horarioService.obtenerHorario().subscribe(
      data => {
        if (Array.isArray(data)) {
          this.horarios = data;
        } else {
          console.error("Error: La respuesta no es un array.", data);
          this.horarios = [];
        }
      },
      error => {
        console.error("Error al cargar los horarios:", error);
        this.horarios = [];
      }
    );
  }

  cargarCursos(): void {
    this.cursoService.obtenerCursos().subscribe(
      data => {
        if (Array.isArray(data)) {
          this.cursos = data;
        } else {
          console.error("Error: La respuesta no es un array.", data);
          this.cursos = [];
        }
      },
      error => {
        console.error("Error al cargar los cursos:", error);
        this.cursos = [];
      }
    );
  }

  onSubmit(): void {
    this.loading = true;
    const [hora_inicio, hora_fin] = this.selectedHora.split('-');
    this.formData.hora_inicio = this.convertirAHora24(hora_inicio.trim());
    this.formData.hora_fin = this.convertirAHora24(hora_fin.trim());

    if (this.editMode) {
      this.horarioService.editarHorario(this.formData).subscribe(
        () => {
          this.cargarHorarios();
          this.resetForm();
          this.loading = false;
        },
        error => {
          console.error("Error al actualizar el horario:", error);
          this.loading = false;
        }
      );
    } else {
      this.horarioService.agregarHorario(this.formData).subscribe(
        () => {
          this.cargarHorarios();
          this.resetForm();
          this.loading = false;
        },
        error => {
          console.error("Error al agregar el horario:", error);
          this.loading = false;
        }
      );
    }
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

  resetForm(): void {
    this.formData = new HorarioModel("", "", "Lunes", "", "");
    this.selectedHora = this.horas[0];
    this.editMode = false;
    this.isPopupOpen = false;
  }

  openAgregarPopup(): void {
    this.resetForm();
    this.isPopupOpen = true;
  }

  openEditarPopup(horario: HorarioModel): void {
    this.formData = { ...horario };
    this.selectedHora = `${this.convertirAHora12(this.formData.hora_inicio)}-${this.convertirAHora12(this.formData.hora_fin)}`;
    this.editMode = true;
    this.isPopupOpen = true;
  }

  closePopup(): void {
    this.isPopupOpen = false;
  }

  eliminar(id: string): void {
    this.loading = true;
    this.horarioService.borrarHorario(id).subscribe(() => {
      this.cargarHorarios();
      this.loading = false;
    });
  }

  obtenerNombreCurso(id: string): string {
    const curso = this.cursos.find(c => c.id === id);
    return curso ? curso.nombre : 'Desconocido';
  }

  obtenerHorarioPorDiaYHora(dia: string, hora: string): HorarioModel[] {
    const hora24 = this.convertirAHora24(hora.split('-')[0].trim());
    return this.horarios.filter(h => 
      h.dia === dia && 
      this.convertirAHora24(h.hora_inicio) <= hora24 && 
      this.convertirAHora24(h.hora_fin) > hora24
    );
  }

  convertirAHora12(hora24: string): string {
    const [hours, minutes] = hora24.split(':');
    const hoursNum = parseInt(hours, 10);
    const modifier = hoursNum >= 12 ? 'PM' : 'AM';
    const hours12 = hoursNum % 12 || 12; 
    return `${hours12}:${minutes} ${modifier}`;
  }
}