import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'inicio',
    loadComponent: () => import('./pages/Inicio/inicio.component').then((m) => m.InicioComponent)
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  //Route Administrador
  {
    path: 'iniciar',
    loadComponent: () => import('./pages/administrador/iniciar-a/iniciar-a.component').then((m) => m.IniciarAComponent)
  },
  {
    path: 'curso',
    loadComponent: () => import('./pages/administrador/curso/curso.component').then((m) => m.CursoComponent)
  },
  {
    path: 'profesores',
    loadComponent: () => import('./pages/administrador/profesor/profesor.component').then((m) => m.ProfesorComponent)
  },
  {
    path: 'solicitudes',
    loadComponent: () => import('./pages/administrador/solicitudes/solicitudes.component').then((m) => m.SolicitudesComponent)
  },
  {
    path: 'horarios',
    loadComponent: () => import('./pages/administrador/horarios/horarios.component').then((m) => m.HorariosComponent)
  },
  //Route Estudiante
  {
    path: 'horario-estudiante/:id',
    loadComponent: () => import('./pages/estudiante/horario/horario.component').then((m) => m.HorarioComponent)
  },
  {
    path: 'iniciar-estudiante',
    loadComponent: () => import('./pages/estudiante/iniciar/iniciar.component').then((m) => m.IniciarComponent)
  },
  {
    path: 'solicitar',
    loadComponent: () => import('./pages/estudiante/solicitar/solicitar.component').then((m) => m.SolicitarComponent)
  },
  //Route Profesor
  {
    path: 'horario-profesor/:id',
    loadComponent: () => import('./pages/profesor/horario-p/horario-p.component').then((m) => m.HorarioPComponent)
  },
  {
    path: 'iniciar-profesor',
    loadComponent: () => import('./pages/profesor/iniciar-p/iniciar-p.component').then((m) => m.IniciarPComponent)
  },
];



