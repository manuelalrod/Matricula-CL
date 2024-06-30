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
        path: 'curso',
        loadComponent: () => import('./pages/administrador/curso/curso.component').then((m) => m.CursoComponent)
    },
    {
        path: 'profesor',
        loadComponent: () => import('./pages/administrador/profesor/profesor.component').then((m) => m.ProfesorComponent)
    },
    {
        path: 'solicitudes',
        loadComponent: () => import('./pages/administrador/solicitudes/solicitudes.component').then((m) => m.SolicitudesComponent)
    },
    //Route Estudiante
    {
        path: 'horario-estudiante',
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
        path: 'horario-profesor',
        loadComponent: () => import('./pages/profesor/horario-p/horario-p.component').then((m) => m.HorarioPComponent)
    },
    {
        path: 'iniciar-profesor',
        loadComponent: () => import('./pages/profesor/iniciar-p/iniciar-p.component').then((m) => m.IniciarPComponent)
    },
];
