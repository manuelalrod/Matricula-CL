import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SolicitudModel } from './solicitud.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  private BASE_URL = 'http://localhost:3000'; // Cambia la URL según sea necesario

  constructor(private http: HttpClient) {}
  
  obtenerSolicitudes(): Observable<SolicitudModel[]> {
    return this.http.get<SolicitudModel[]>(`${this.BASE_URL}/solicitudes`);
  }

  // Crear una nueva solicitud
  crearSolicitud(solicitud: SolicitudModel): Observable<SolicitudModel> {
    return this.http.post<SolicitudModel>(`${this.BASE_URL}/solicitud/agregar`, solicitud);
  }

  // Actualizar el estado de una solicitud
  actualizarSolicitud(solicitud: SolicitudModel): Observable<any> {
    return this.http.put(`${this.BASE_URL}/solicitudes/${solicitud.id}`, solicitud);
  }

  obtenerSolicitudesPorEstudiante(estudianteId: string): Observable<SolicitudModel[]> {
    return this.http.get<SolicitudModel[]>(`${this.BASE_URL}/solicitudes/por-estudiante/${estudianteId}`);
  }
}
