import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EstudianteModel } from '../../../shared/estudiantes/estudiante.model';
import { EstudianteService } from '../../../shared/estudiantes/estudiantes.service';

@Component({
  selector: 'app-iniciar',
  standalone: true,
  imports: [RouterLink, CommonModule,FormsModule],
  templateUrl: './iniciar.component.html',
  styleUrl: './iniciar.component.css'
})
export class IniciarComponent {
  estudiantes: EstudianteModel[] = [];
  estudiante: EstudianteModel = new EstudianteModel(0, '', '', '', 0, 'No', '');
  selectedStudentId: number | null = null;
  selectedStudent: EstudianteModel | null = null;
  isPopupOpen = false;
  editMode = false;
  loading = false;
  id: string | null = null;

  constructor(
    private estudianteService: EstudianteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarEstudiantes();
  }

  cargarEstudiantes(): void {
    this.estudianteService.obtenerEstudiantes().subscribe(
      data => {
        if (Array.isArray(data)) {
          this.estudiantes = data;
        } else {
          this.estudiantes = [];
        }
      },
      error => {
        console.error('Error al cargar los estudiantes:', error);
        this.estudiantes = [];
      }
    );
  }

  onSubmit(): void {
    this.loading = true;
    if (this.editMode) {
      this.estudianteService.editarEstudiante(this.estudiante.id, this.estudiante).subscribe(
        data => {
          console.log('Registro actualizado:', data);
          this.cargarEstudiantes();
          this.closePopup();
          this.loading = false;
        },
        error => {
          console.error('Error al actualizar el estudiante:', error);
          this.loading = false;
        }
      );
    } else {
      this.estudianteService.agregarEstudiante(this.estudiante).subscribe(
        data => {
          console.log('Registro agregado:', data);
          this.cargarEstudiantes();
          this.closePopup();
          this.loading = false;
        },
        error => {
          console.error('Error al agregar el estudiante:', error);
          this.loading = false;
        }
      );
    }
  }

  onStudentSelect(event: Event): void {
    const selectedId = (event.target as HTMLSelectElement).value;
    this.selectedStudentId = Number(selectedId);
    this.selectedStudent = this.estudiantes.find(est => est.id === this.selectedStudentId) || null;
  }

  openAgregarPopup(): void {
    this.estudiante = new EstudianteModel(0, '', '', '', 0, 'No', '');
    this.editMode = false;
    this.isPopupOpen = true;
  }

  openEditarPopup(estudiante: EstudianteModel): void {
    this.estudiante = { ...estudiante };
    this.editMode = true;
    this.isPopupOpen = true;
  }

  closePopup(): void {
    this.isPopupOpen = false;
  }

  verHorario(): void {
    if (this.selectedStudentId) {
      this.router.navigate(['/horario-estudiante', this.selectedStudentId]);
    }
  }
}
