import { Component, OnInit } from '@angular/core';
import { EstudianteModel } from '../../../shared/estudiantes/estudiante.model';
import { EstudianteService } from '../../../shared/estudiantes/estudiantes.service';
import { HorarioModel } from '../../../shared/horario/horario.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VerHorarioComponent } from '../ver-horario/ver-horario/ver-horario.component';
import { HorarioService } from '../../../shared/horario/horario.service';
import { SolicitudService } from '../../../shared/solicitud/solicitud.service';
import { SolicitudModel } from '../../../shared/solicitud/solicitud.model';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-horario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, VerHorarioComponent],
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit {
  estudiante: EstudianteModel | null = null;
  horarios: HorarioModel[] = [];
  solicitudes: SolicitudModel[] = [];
  dias: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  horas: string[] = [
    '07:00 AM-08:00 AM', '08:00 AM-09:00 AM', '09:00 AM-10:00 AM',
    '10:00 AM-11:00 AM', '11:00 AM-12:00 PM', '12:00 PM-01:00 PM',
    '01:00 PM-02:00 PM', '02:00 PM-03:00 PM', '03:00 PM-04:00 PM',
    '04:00 PM-05:00 PM', '05:00 PM-06:00 PM', '06:00 PM-07:00 PM'
  ];

  loading = false;
  isPopupOpen = false;

  constructor(
    private horarioService: HorarioService,
    private route: ActivatedRoute,
    private estudianteService: EstudianteService,
    private solicitudService: SolicitudService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.estudianteService.obtenerEstudiante(Number(id)).subscribe(
        data => {
          this.estudiante = data;
          this.cargarHorarios(id);
          this.cargarSolicitudesPorEstudiante(id);
        },
        error => {
          console.error('Error al cargar el estudiante:', error);
        }
      );
    }
  }

  cargarSolicitudesPorEstudiante(estudianteId: string): void {
    this.solicitudService.obtenerSolicitudesPorEstudiante(estudianteId).subscribe(
      data => {
        this.solicitudes = data;
        console.log('Solicitudes cargadas:', this.solicitudes);
      },
      error => {
        console.error('Error al cargar las solicitudes:', error);
      }
    );
  }

  cargarHorarios(estudianteId: string): void {
    this.loading = true;
    this.horarioService.obtenerHorariosAprobados(estudianteId).subscribe(
      data => {
        this.horarios = data;
        this.loading = false;
        console.log('Horarios cargados:', this.horarios);
      },
      error => {
        console.error('Error al cargar los horarios:', error);
        this.loading = false;
      }
    );
  }

  obtenerHorarioPorDiaYHora(dia: string, hora: string): HorarioModel[] {
    const hora24 = this.convertirAHora24(hora.split('-')[0].trim());
    const horariosPorDiaYHora = this.horarios.filter(h => 
      h.dia === dia && 
      this.convertirAHora24(h.hora_inicio) <= hora24 && 
      this.convertirAHora24(h.hora_fin) > hora24
    );
    console.log(`Horarios para ${dia} a las ${hora}:`, horariosPorDiaYHora);
    return horariosPorDiaYHora;
  }

  convertirAHora24(hora12: string): string {
    const [time, period] = hora12.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (period === 'PM' && hours < 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }

    return `${String(hours).padStart(2, '0')}:${minutes}`;
  }

  openAgregarPopup(): void {
    this.isPopupOpen = true;
  }

  closePopup(): void {
    this.isPopupOpen = false;
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
