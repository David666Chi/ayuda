import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Componente principal de la aplicación
 * Representa la página de inicio con navegación a la calculadora
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="home-container">
      <h1>Bienvenido a Navegación Componentes</h1>
      <p>Esta es la página principal de la aplicación.</p>
      
      <div class="navigation-section">
        <h2>Navegación</h2>
        <p>Prueba la calculadora con parámetros de ruta:</p>
        <ul>
          <li>
            <a routerLink="/suma/5/3" class="nav-link">
              Suma: 5 + 3 = 8
            </a>
          </li>
          <li>
            <a routerLink="/suma/10/25" class="nav-link">
              Suma: 10 + 25 = 35
            </a>
          </li>
          <li>
            <a routerLink="/suma/100/200" class="nav-link">
              Suma: 100 + 200 = 300
            </a>
          </li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }
    
    h1 {
      color: #2c3e50;
      margin-bottom: 1rem;
    }
    
    .navigation-section {
      margin-top: 2rem;
      padding: 1.5rem;
      background-color: #f8f9fa;
      border-radius: 8px;
      border: 1px solid #e9ecef;
    }
    
    .nav-link {
      display: inline-block;
      margin: 0.5rem;
      padding: 0.75rem 1.5rem;
      background-color: #007bff;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      transition: background-color 0.3s ease;
    }
    
    .nav-link:hover {
      background-color: #0056b3;
    }
    
    ul {
      list-style: none;
      padding: 0;
    }
    
    li {
      margin: 0.5rem 0;
    }
  `]
})
export class HomeComponent {}
