import { Component } from '@angular/core';
import { EstudianteModel } from '../../../shared/estudiantes/estudiante.model';
import { EstudianteService } from '../../../shared/estudiantes/estudiantes.service';
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

  constructor(
    private route: ActivatedRoute,
    private estudianteService: EstudianteService
  ) {}

  ngOnInit(): void {
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
  }


