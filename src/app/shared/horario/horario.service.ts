import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HorarioModel } from './horario.model'; 
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }


  obtenerHorario() {
    return this.http.get<HorarioModel[]>(`${this.BASE_URL}/horario`);
  }

  obtenerHorarioPorProfesor(profesorId: string) {
    return this.http.get<HorarioModel[]>(`${this.BASE_URL}/horarios-profesor/${profesorId}`)
  }

  obtenerHorariosCurso(cursoId: string): Observable<HorarioModel[]> {
    return this.http.get<HorarioModel[]>(`${this.BASE_URL}/horarios-curso/${cursoId}`);
  }

  obtenerHorariosAprobados(estudianteId: string): Observable<HorarioModel[]> {
    return this.http.get<HorarioModel[]>(`${this.BASE_URL}/horarios-aprobados/${estudianteId}`);
  }

  agregarHorario(horario: HorarioModel)  {
    return this.http.post<string>(`${this.BASE_URL}/horario/agregar`, horario);
  }

  editarHorario(horario: HorarioModel) {
    return this.http.put<string>(`${this.BASE_URL}/horario/actualizar/${horario.id}`, horario);
  }

  borrarHorario(id: string) {
    return this.http.delete<string>(`${this.BASE_URL}/horario/borrar/${id}`);
  }
}