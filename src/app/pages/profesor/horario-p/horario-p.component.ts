import { Component } from '@angular/core';
import { ProfesorModel } from '../../../shared/profesor/profesor.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProfesorService } from '../../../shared/profesor/profesor.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-horario-p',
  standalone: true,
  imports: [RouterLink, CommonModule,FormsModule],
  templateUrl: './horario-p.component.html',
  styleUrl: './horario-p.component.css'
})
export class HorarioPComponent {
  profesor: ProfesorModel | null = null;

  constructor(
    private route: ActivatedRoute,
    private profesorService: ProfesorService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.profesorService.obtenerProfesor(id).subscribe(
        data => {
          this.profesor = this.capitalizeProfesorData(data[0]);
        },
        error => {
          console.error('Error al cargar el profesor:', error);
        }
      );
    }
  }

  capitalizeProfesorData(profesor: ProfesorModel): ProfesorModel {
    return {
      ...profesor,
      nombre: this.capitalizeFirstLetter(profesor.nombre),
      apellido: this.capitalizeFirstLetter(profesor.apellido)
    };
  }

  capitalizeFirstLetter(value: string): string {
    if (!value) {
      return '';
    }
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
}
