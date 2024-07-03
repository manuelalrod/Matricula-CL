import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { CursoModel } from '../../../shared/curso/curso.model';
import { ProfesorModel } from '../../../shared/profesor/profesor.model';
import { CursoService } from '../../../shared/curso/curso.service';
import { ProfesorService } from '../../../shared/profesor/profesor.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-curso',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './curso.component.html',
  styleUrl: './curso.component.css'
})
export class CursoComponent implements OnInit{

  cursos: CursoModel[] = [];
  profesores: ProfesorModel[] = [];
  curso: CursoModel = new CursoModel("", "", "", "");
  profesor: ProfesorModel = new ProfesorModel("", "", "", "", "", "");
  isPopupOpen = false;
  editMode = false;
  loading = false;
  id: string | null = null;

  constructor(
    private cursoservice: CursoService,
    private profesorservice: ProfesorService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    
    this.profesorservice.obtenerProfesores().subscribe(
      data => {
        this.profesores = data;
      },
      error => {
        console.error("Error al cargar los profesores:", error);
      }
    );

    
    this.cargarCursos();

 
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      console.log("Editar");
      this.cursoservice.obtenerCurso(this.id).subscribe(
        data => {
          this.curso = data;
          this.editMode = true;
        },
        error => {
          console.error("Error al cargar el curso:", error);
        }
      );
    } else {
      console.log("Crear");
    }
  }

  cargarCursos(): void {
    this.cursoservice.obtenerCursos().subscribe(
      data => {
        this.cursos = data;
      },
      error => {
        console.error("Error al cargar los cursos:", error);
      }
    );
  }

  onSubmit(): void {
    this.loading = true;

    if (this.editMode) {
      this.cursoservice.editarCurso(this.curso).subscribe(
        data => {
          console.log("Registro actualizado:", data);
          this.cargarCursos(); 
          this.closePopup();
          this.loading = false;
        },
        error => {
          console.error("Error al actualizar el curso:", error);
          this.loading = false;
        }
      );
    } else {
      this.cursoservice.agregarCurso(this.curso).subscribe(
        data => {
          console.log("Registro agregado:", data);
          this.cargarCursos(); 
          this.closePopup();
          this.loading = false;
        },
        error => {
          console.error("Error al agregar el curso:", error);
          this.loading = false;
        }
      );
    }
  }

  borrarCurso(id: string) {
    this.loading = true;
    this.cursoservice.borrarCurso(id).subscribe(data =>{
      this.cargarCursos();
      this.loading = false
    })
  }

  openAgregarPopup(): void {
    this.curso = new CursoModel('', '', '', '');
    this.editMode = false;
    this.isPopupOpen = true;
  }

  openEditarPopup(curso: CursoModel): void {
    this.curso = { ...curso };
    this.editMode = true;
    this.isPopupOpen = true;
  }

  closePopup(): void {
    this.isPopupOpen = false;
  }

  obtenerNombreProfesor(id: string): string {
    const profesor = this.profesores.find(p => p.id === id);
    return profesor ? `${profesor.nombre} ${profesor.apellido}` : 'Desconocido';
  }
}
