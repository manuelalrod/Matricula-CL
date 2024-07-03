import { Component } from '@angular/core';
import { ProfesorModel } from '../../../shared/profesor/profesor.model';
import { HorarioModel } from '../../../shared/horario/horario.model';
import { CursoModel } from '../../../shared/curso/curso.model';
import { CursoService } from '../../../shared/curso/curso.service';
import { HorarioService } from '../../../shared/horario/horario.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProfesorService } from '../../../shared/profesor/profesor.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-horario-p',
  standalone: true,
  imports: [RouterLink, CommonModule,FormsModule],
  templateUrl: './horario-p.component.html',
  styleUrl: './horario-p.component.css'
})
export class HorarioPComponent {
  profesor: ProfesorModel | null = null;
  horarios: HorarioModel[] = [];
  cursos: CursoModel[] = [];
  loading: boolean = false;
  dias: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  horas: string[] = [
    '07:00 AM-08:00 AM', '08:00 AM-09:00 AM', '09:00 AM-10:00 AM',
    '10:00 AM-11:00 AM', '11:00 AM-12:00 PM', '12:00 PM-01:00 PM',
    '01:00 PM-02:00 PM', '02:00 PM-03:00 PM', '03:00 PM-04:00 PM',
    '04:00 PM-05:00 PM', '05:00 PM-06:00 PM', '06:00 PM-07:00 PM'
  ];

  constructor(
    private route: ActivatedRoute,
    private horarioService: HorarioService,
    private profesorService: ProfesorService,
    private cursoService: CursoService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.profesorService.obtenerProfesor(id).subscribe(
        data => {
          this.profesor = this.capitalizeProfesorData(data[0]);
          this.cargarHorarios(id);
          this.cargarCursos();
        },
        error => {
          console.error('Error al cargar el profesor:', error);
        }
      );
    }
  }

  cargarHorarios(profesorId: string): void {
    this.loading = true;
    this.horarioService.obtenerHorarioPorProfesor(profesorId).subscribe(
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

  obtenerNombreCurso(cursoId: string): string {
    const curso = this.cursos.find(c => c.id === cursoId);
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

  capitalizeFirstLetter(value: string): string {
    if (!value) {
      return '';
    }
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }

  capitalizeProfesorData(profesor: ProfesorModel): ProfesorModel {
    return {
      ...profesor,
      nombre: this.capitalizeFirstLetter(profesor.nombre),
      apellido: this.capitalizeFirstLetter(profesor.apellido)
    };
  }

  imprimirHorario(): void {
    const horarioElement = document.getElementById('horario-pdf');
    if (horarioElement) {
      html2canvas(horarioElement).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF.default('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('horario.pdf');
      });
    }
  }
}
