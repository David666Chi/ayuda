import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SumaComponent } from './suma/suma.component';
import { PracticaListasComponent } from './practica-listas/practica-listas.component';

/**
 * Configuración de rutas de la aplicación "navegacion-componentes"
 * 
 * Este archivo define todas las rutas disponibles en la aplicación Angular.
 * Cada ruta especifica qué componente se debe cargar cuando se navega a una URL específica.
 */
export const routes: Routes = [
  /**
   * Ruta principal (página de inicio)
   * path: '' - Corresponde a la URL raíz '/'
   * component: HomeComponent - El componente que se renderiza
   */
  { 
    path: '', 
    component: HomeComponent,
    title: 'Inicio - Navegación Componentes'
  },
  
  /**
   * Ruta con parámetros dinámicos para la calculadora de suma
   * path: 'suma/:primerNumero/:segundoNumero' - URL con parámetros de ruta
   * - :primerNumero - Parámetro dinámico para el primer número
   * - :segundoNumero - Parámetro dinámico para el segundo número
   * component: SumaComponent - El componente que maneja la suma
   * 
   * Ejemplo de URL: /suma/5/3
   */
  {
    path: 'suma/:primerNumero/:segundoNumero',
    component: SumaComponent,
    title: 'Calculadora de Suma'
  },

  /**
   * Ruta para la práctica de listas
   * Permite acceder al catálogo interactivo de ejercicios
   */
  {
    path: 'practica-listas',
    component: PracticaListasComponent,
    title: 'Práctica de Listas'
  },
  
  /**
   * Ruta comodín (wildcard) - Captura todas las rutas no definidas
   * path: '**' - El doble asterisco significa "cualquier ruta no coincidente"
   * redirectTo: '' - Redirige a la ruta principal (página de inicio)
   * 
   * Esta ruta debe ir al final del array para que Angular la evalúe después
   * de intentar hacer match con todas las rutas específicas.
   */
  { 
    path: '**', 
    redirectTo: '' 
  }
];
