import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  BASE_URL = 'http://localhost:3000/horas';

  constructor(private http: HttpClient) { }

 
}
