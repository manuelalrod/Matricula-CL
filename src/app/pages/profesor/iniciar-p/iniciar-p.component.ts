import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProfesorModel } from '../../../shared/profesor/profesor.model';
import { ProfesorService } from '../../../shared/profesor/profesor.service';

@Component({
  selector: 'app-iniciar-p',
  standalone: true,
  imports: [RouterLink, CommonModule,FormsModule],
  templateUrl: './iniciar-p.component.html',
  styleUrl: './iniciar-p.component.css'
})
export class IniciarPComponent {

  profesores: ProfesorModel[] = [];
  selectedProfesorId: string | null = null;

  constructor(
    private profesorService: ProfesorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarProfesores();
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

  irAProfesores(): void {
    if (this.selectedProfesorId) {
      this.router.navigate(['/horario-profesor', this.selectedProfesorId]);
    } else {
      alert('Por favor seleccione un profesor.');
    }
  }

}
