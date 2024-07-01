import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfesorModel } from './profesor.model';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  BASE_URL = 'http://localhost:3000'

  constructor( private http: HttpClient ) { }

  obtenerProfesores() {
    return this.http.get<ProfesorModel[]>(this.BASE_URL+'/profesores');
  }

  obtenerProfesor(id:string) {
    return this.http.get<ProfesorModel[]>(`${this.BASE_URL}/profesor/${id}`);
  }

  agregarProfesor(profesor: ProfesorModel){
    return this.http.post<string>(`${this.BASE_URL}/profesor/agregar`, profesor);
  }

  editarProfesor(profesor: ProfesorModel){
    return this.http.put<string>(`${this.BASE_URL}/profesor/actualizar/${profesor.id}`, profesor)
  }

  borrarProfesor(id:string){
    return this.http.delete<string>(`${this.BASE_URL}/profesor/borrar/${id}`)
  }
  
}
