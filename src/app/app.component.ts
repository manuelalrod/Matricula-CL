import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CursoComponent } from './pages/administrador/curso/curso.component';
import { ProfesorComponent } from './pages/administrador/profesor/profesor.component';
import { SolicitudesComponent } from './pages/administrador/solicitudes/solicitudes.component';
import { HorarioComponent } from './pages/estudiante/horario/horario.component';
import { IniciarComponent } from './pages/estudiante/iniciar/iniciar.component';
import { InicioComponent } from './pages/Inicio/inicio.component';
import { IniciarPComponent } from './pages/profesor/iniciar-p/iniciar-p.component';
import { HorarioPComponent } from './pages/profesor/horario-p/horario-p.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    CursoComponent, 
    ProfesorComponent, 
    SolicitudesComponent, 
    IniciarComponent, 
    HorarioComponent,
    InicioComponent,
    IniciarPComponent,
    HorarioPComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'matricula';
}
