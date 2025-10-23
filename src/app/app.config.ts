import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

/**
 * Configuración global de la aplicación Angular
 * 
 * Este archivo define los providers y servicios que estarán disponibles
 * en toda la aplicación a través del sistema de inyección de dependencias.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // Provider para manejo global de errores del navegador
    provideBrowserGlobalErrorListeners(),
    
    // Provider para optimización de detección de cambios de Angular
    provideZoneChangeDetection({ eventCoalescing: true }),
    
    /**
     * Provider del Router de Angular
     * 
     * provideRouter(routes) configura el sistema de enrutamiento de Angular:
     * - Registra las rutas definidas en el array 'routes'
     * - Habilita la navegación programática y declarativa
     * - Proporciona servicios como Router, ActivatedRoute, etc.
     * - Permite el uso de directivas como routerLink y routerOutlet
     * 
     * Este provider es esencial para que funcione el enrutamiento en la aplicación.
     */
    provideRouter(routes)
  ]
};
