import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SolicitudModel } from './solicitud.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  private apiUrl = 'http://localhost:3000';  // URL de tu backend, ajusta según sea necesario

  constructor(private http: HttpClient) {}
  
  obtenerSolicitudes(): Observable<SolicitudModel[]> {
    return this.http.get<SolicitudModel[]>(`${this.apiUrl}/solicitudes`);
  }

  // Crear una nueva solicitud
  crearSolicitud(solicitud: SolicitudModel): Observable<SolicitudModel> {
    return this.http.post<SolicitudModel>(`${this.apiUrl}/solicitud/agregar`, solicitud);
  }

  // Actualizar el estado de una solicitud
  actualizarSolicitud(solicitud: SolicitudModel): Observable<any> {
    return this.http.put(`${this.apiUrl}/solicitudes/${solicitud.id}`, solicitud);
  }

  // Actualizar la solicitud de la matricula
  actualizarSolicitudMatricula(id: string ,solicitud: SolicitudModel): Observable<any> {
    return this.http.put(`${this.apiUrl}/solicitudes/actualizar/${id}`, solicitud);
  }

  obtenerSolicitudesPorEstudiante(estudianteId: string): Observable<SolicitudModel[]> {
    return this.http.get<SolicitudModel[]>(`${this.apiUrl}/solicitudes/por-estudiante/${estudianteId}`);
  }
}
