import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstudianteModel } from './estudiante.model'; // Ajusta la ruta según tu estructura de proyecto

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  private baseUrl = 'http://localhost:3000'; // Cambia la URL según sea necesario

  constructor(private http: HttpClient) {}

  obtenerEstudiantes(): Observable<EstudianteModel[]> {
    return this.http.get<EstudianteModel[]>(`${this.baseUrl}/estudiantes`);
  }

  obtenerEstudiante(id: number): Observable<EstudianteModel> {
    return this.http.get<EstudianteModel>(`${this.baseUrl}/estudiante/${id}`);
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


