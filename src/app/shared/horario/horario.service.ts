import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HorarioModel } from './horario.model'; 


@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }


  obtenerHorario() {
    return this.http.get<HorarioModel[]>(`${this.BASE_URL}/horario`);
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