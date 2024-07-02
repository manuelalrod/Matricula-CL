import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CursoModel } from './curso.model';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  
  BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  obtenerCursos() {
    return this.http.get<CursoModel[]>(`${this.BASE_URL}/cursos`);
  }

  obtenerCurso(id: string) {
    return this.http.get<CursoModel>(`${this.BASE_URL}/curso/${id}`);
  }

  agregarCurso(curso: CursoModel) {
    return this.http.post<string>(`${this.BASE_URL}/curso/agregar`, curso);
  }

  editarCurso(curso: CursoModel) {
    return this.http.put<string>(`${this.BASE_URL}/curso/actualizar/${curso.id}`, curso);
  }

  borrarCurso(id: string) {
    return this.http.delete<string>(`${this.BASE_URL}/curso/borrar/${id}`);
  }
}
