import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProfesorModel } from './profesor.model'; // Ajusta la ruta según tu estructura de proyecto

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  private BASE_URL = 'http://localhost:3000'; // Cambia la URL según sea necesario

  constructor(private http: HttpClient) {}

  obtenerProfesores(): Observable<ProfesorModel[]> {
    return this.http.get<ProfesorModel[]>(`${this.BASE_URL}/profesores`);
  }

  obtenerProfesor(id: string): Observable<ProfesorModel[]> {
    return this.http.get<ProfesorModel[]>(`${this.BASE_URL}/profesor/${id}`);
  }

  agregarProfesor(profesor: ProfesorModel): Observable<string> {
    return this.http.post<string>(`${this.BASE_URL}/profesor/agregar`, profesor);
  }

  editarProfesor(profesor: ProfesorModel): Observable<string> {
    return this.http.put<string>(`${this.BASE_URL}/profesor/actualizar/${profesor.id}`, profesor);
  }

  borrarProfesor(id: string): Observable<string> {
    return this.http.delete<string>(`${this.BASE_URL}/profesor/borrar/${id}`);
  }
}
