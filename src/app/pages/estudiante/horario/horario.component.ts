import { Component } from '@angular/core';
import { EstudianteModel } from '../../../shared/estudiantes/estudiante.model';
import { EstudianteService } from '../../../shared/estudiantes/estudiantes.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CursoService } from '../../../shared/curso/curso.service';
import { CursoModel } from '../../../shared/curso/curso.model';

@Component({
  selector: 'app-horario',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './horario.component.html',
  styleUrl: './horario.component.css'
})
export class HorarioComponent {
  estudiante: EstudianteModel | null = null;
  cursos: CursoModel[] = [];
  cursoSeleccionado: CursoModel | null = null;

  constructor(
    private route: ActivatedRoute,
    private estudianteService: EstudianteService,
    private cursoService: CursoService
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

    this.cargarCursos();
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

  seleccionarCurso(event: any): void {
    this.cursoSeleccionado = event.target.value;
  }

  solicitarMatricula(): void {
    if (this.cursoSeleccionado) {
      console.log(`Solicitando matrícula para el curso: ${this.cursoSeleccionado.nombre}`);
      // Aquí puedes agregar la lógica para solicitar la matrícula
    }
  }
  }


