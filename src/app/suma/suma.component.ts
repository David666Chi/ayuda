import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

/**
 * Componente SumaComponent para Angular v20 standalone
 * 
 * Este componente recibe dos parámetros dinámicos desde la URL mediante ActivatedRoute
 * y calcula la suma de ambos números. Implementa tipado estricto y manejo de errores.
 * 
 * @example
 * URL: /suma/5/3
 * Resultado: 5 + 3 = 8
 */
@Component({
  selector: 'app-suma',
  standalone: true,
  templateUrl: './suma.component.html',
  styleUrl: './suma.component.scss'
})
export class SumaComponent implements OnInit, OnDestroy {
  /**
   * Primer número extraído de los parámetros de ruta
   * Tipado estricto con definite assignment assertion (!)
   */
  primerNumero!: number;
  
  /**
   * Segundo número extraído de los parámetros de ruta
   * Tipado estricto con definite assignment assertion (!)
   */
  segundoNumero!: number;
  
  /**
   * Resultado de la suma calculada
   * Tipado estricto con definite assignment assertion (!)
   */
  resultado!: number;
  
  /**
   * Mensaje de error si ocurre algún problema
   */
  error: string | null = null;
  
  /**
   * Suscripción a los parámetros de ruta para manejo de memoria
   */
  private paramsSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  /**
   * Inicialización del componente
   * Se suscribe a los parámetros de ruta y calcula la suma
   */
  ngOnInit(): void {
    // Suscripción a los parámetros de ruta usando ActivatedRoute
    this.paramsSubscription = this.route.params.subscribe(params => {
      try {
        // Extraer y convertir los parámetros de string a number
        this.primerNumero = parseInt(params['primerNumero'], 10);
        this.segundoNumero = parseInt(params['segundoNumero'], 10);
        
        // Validación de números válidos
        if (isNaN(this.primerNumero) || isNaN(this.segundoNumero)) {
          this.error = 'Los parámetros deben ser números válidos';
          this.resultado = 0;
          return;
        }
        
        // Validación de números positivos (opcional)
        if (this.primerNumero < 0 || this.segundoNumero < 0) {
          this.error = 'Los números deben ser positivos';
          this.resultado = 0;
          return;
        }
        
        // Cálculo de la suma
        this.resultado = this.primerNumero + this.segundoNumero;
        this.error = null;
        
        // Log para debugging
        console.log(`Suma calculada: ${this.primerNumero} + ${this.segundoNumero} = ${this.resultado}`);
        
      } catch (err) {
        this.error = 'Error al procesar los parámetros de la ruta';
        this.resultado = 0;
        console.error('Error en SumaComponent:', err);
      }
    });
  }

  /**
   * Limpieza de recursos al destruir el componente
   * Evita memory leaks desuscribiéndose de los observables
   */
  ngOnDestroy(): void {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
  }

  /**
   * Método para navegar a una nueva suma
   * @param primerNumero - Primer número para la suma
   * @param segundoNumero - Segundo número para la suma
   */
  navegarASuma(primerNumero: number, segundoNumero: number): void {
    this.router.navigate(['/suma', primerNumero, segundoNumero]);
  }

  /**
   * Método para volver a la página principal
   */
  volverAlInicio(): void {
    this.router.navigate(['/']);
  }
}
