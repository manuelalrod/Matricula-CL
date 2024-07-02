import { Component, OnInit } from '@angular/core';
import { HorarioService } from '../../../shared/horario/horario.service';
import { CursoService } from '../../../shared/curso/curso.service';
import { ProfesorService } from '../../../shared/profesor/profesor.service';
import { CursoModel } from '../../../shared/curso/curso.model';
import { ProfesorModel } from '../../../shared/profesor/profesor.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-horarios',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './horarios.component.html',
  styleUrl: './horarios.component.css'
})
export class HorariosComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    
  }
}
