import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstudianteModel } from './estudiante.model'; 
import { CursoModel } from '../curso/curso.model';
import { HorarioModel } from '../horario/horario.model';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  obtenerEstudiantes(): Observable<EstudianteModel[]> {
    return this.http.get<EstudianteModel[]>(`${this.baseUrl}/estudiantes`);
  }

  obtenerEstudiante(id: number): Observable<EstudianteModel> {
    return this.http.get<EstudianteModel>(`${this.baseUrl}/estudiante/${id}`);
  }

  obtenerCursosAprobados(estudianteId: string): Observable<CursoModel[]> {
    return this.http.get<CursoModel[]>(`${this.baseUrl}/cursos-aprobados/${estudianteId}`);
}

obtenerHorariosCurso(cursoId: string): Observable<HorarioModel[]> {
  return this.http.get<HorarioModel[]>(`${this.baseUrl}/horarios-curso/${cursoId}`);
}

  agregarEstudiante(estudiante: EstudianteModel): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/estudiante/agregar`, estudiante);
  }

  editarEstudiante(id: number, estudiante: EstudianteModel): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/estudiante/actualizar/${id}`, estudiante);
  }

  borrarEstudiante(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/estudiante/borrar/${id}`);
  }
}