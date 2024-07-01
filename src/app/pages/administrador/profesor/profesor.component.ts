import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfesorModel } from '../../../shared/profesor/profesor.model';
import { ProfesorService } from '../../../shared/profesor/profesor.service';

@Component({
  selector: 'app-profesor',
  standalone: true,
  imports: [ RouterLink, CommonModule, FormsModule ],
  templateUrl: './profesor.component.html',
  styleUrl: './profesor.component.css'
})
export class ProfesorComponent implements OnInit{

  profesores: Observable<ProfesorModel[]> | undefined;
  id = '';
  profesor = new ProfesorModel("", "", "", "", "", "");
  loading: boolean = false;
  isPopupOpen: boolean = false;
  editMode: boolean = false;

  constructor( 
    private profesorservice: ProfesorService,
    private route: ActivatedRoute
   ) {}

  ngOnInit(): void {
    this.profesores = this.profesorservice.obtenerProfesores();

    this.id = this.route.snapshot.params['id'];
    if(this.id) {
      console.log("Editar");
      this.profesorservice.obtenerProfesor(this.id).subscribe(data => {
        this.profesor = data[0]
      })
    } else {
      console.log("crear")
    }
  }

  onSubmit(): void {
    this.loading = true;

    if(this.editMode) {
      this.profesorservice.editarProfesor(this.profesor).subscribe(
        data => {
          console.log("registro actualizado:", data);
          this.closePopup();
          this.loading = false
        },
        error => {
          console.error("Error al actualizar el registro:", error);
          this.loading = false;
        }
      );
    } else {
      this.profesorservice.agregarProfesor(this.profesor).subscribe(
        data => {
          console.log("Registro agregado:", data);
          this.closePopup();
          this.loading = false;
        },
        error => {
          console.error("Error al crear el registro:", error)
          this.loading = false
        }
      );
    }
  }

  borrarProfesor(id: string) {
    this.loading = true
    this.profesorservice.borrarProfesor(id).subscribe(data => {
      this.loading = false
    })
  }

  openAgregarPopup(): void {
    this.profesor = new ProfesorModel("", "", "", "", "", "");
    this.editMode = false;
    this.isPopupOpen = true;
  }

  openEditarPopup(profesor: ProfesorModel): void {
    this.profesor = { ...profesor };
    this.editMode = true;
    this.isPopupOpen= true;
  }

  closePopup(): void {
    this.isPopupOpen = false;
  }
}
