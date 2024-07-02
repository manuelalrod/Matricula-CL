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
import { HorariosComponent } from './pages/administrador/horarios/horarios.component';
import { ProfesorService } from './shared/profesor/profesor.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CursoService } from './shared/curso/curso.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    FormsModule,
    HttpClientModule,
    CursoComponent, 
    ProfesorComponent, 
    SolicitudesComponent,
    HorariosComponent, 
    IniciarComponent, 
    HorarioComponent,
    InicioComponent,
    IniciarPComponent,
    HorarioPComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ProfesorService, CursoService]
})
export class AppComponent {
  title = 'matricula';
}
