import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-iniciar-a',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './iniciar-a.component.html',
  styleUrl: './iniciar-a.component.css'
})
export class IniciarAComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (this.username === 'Admin' && this.password === '12345') {
      
      this.router.navigate(['/curso']);
    } else {
      this.errorMessage = 'Invalid username or password.';
    }
  }
}
