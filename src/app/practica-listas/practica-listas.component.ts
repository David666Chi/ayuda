import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type ExerciseId =
  | 'inventario'
  | 'pares-impares'
  | 'palabra-corta'
  | 'ordenar-palabras'
  | 'eliminar-duplicados'
  | 'turnos-panaderia';

interface ExerciseDefinition {
  id: ExerciseId;
  title: string;
  description: string;
}

@Component({
  selector: 'app-practica-listas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './practica-listas.component.html',
  styleUrl: './practica-listas.component.scss'
})
export class PracticaListasComponent {
  readonly exercises: ExerciseDefinition[] = [
    {
      id: 'inventario',
      title: 'Productos disponibles y retiros',
      description:
        'Administra los productos disponibles en una tienda: añade artículos, retíralos y reordénalos con arrastrar y soltar.'
    },
    {
      id: 'pares-impares',
      title: 'Pares e impares',
      description:
        'Genera una lista de números aleatorios y clasifícalos automáticamente en pares e impares.'
    },
    {
      id: 'palabra-corta',
      title: 'Palabra más corta',
      description:
        'Ingresa una lista de palabras y descubre cuál tiene la menor longitud.'
    },
    {
      id: 'ordenar-palabras',
      title: 'Ordenar palabras por tamaño',
      description:
        'Organiza un conjunto de palabras de acuerdo con su longitud, de la más corta a la más larga.'
    },
    {
      id: 'eliminar-duplicados',
      title: 'Eliminar palabras repetidas',
      description:
        'Identifica y conserva únicamente las palabras únicas dentro de una lista.'
    },
    {
      id: 'turnos-panaderia',
      title: 'Gestor de turnos (pilas)',
      description:
        'Simula un sistema de turnos para una panadería: añade nuevos turnos y atiende al siguiente en la cola.'
    }
  ];

  selectedExercise: ExerciseId = 'inventario';

  // Ejercicio 1: Inventario de productos
  nuevoProducto = '';
  inventario: string[] = [];
  historialRetiros: string[] = [];
  indiceEnArrastre: number | null = null;

  // Ejercicio 2: Números pares e impares
  cantidadNumeros = 10;
  numerosAleatorios: number[] = [];
  numerosPares: number[] = [];
  numerosImpares: number[] = [];

  // Ejercicio 3: Palabra más corta
  palabrasPalabraCorta = '';
  palabraMasCorta: string | null = null;

  // Ejercicio 4: Ordenar palabras por tamaño
  palabrasParaOrdenar = '';
  palabrasOrdenadas: string[] = [];

  // Ejercicio 5: Eliminar palabras repetidas
  palabrasDuplicadas = '';
  palabrasSinDuplicados: string[] = [];

  // Ejercicio 6: Turnos en la panadería
  nuevoTurno = '';
  colaTurnos: number[] = [];
  ultimoTurnoAtendido: number | null = null;

  seleccionarEjercicio(id: ExerciseId): void {
    this.selectedExercise = id;
  }

  agregarProducto(): void {
    const producto = this.nuevoProducto.trim();
    if (!producto) {
      return;
    }

    this.inventario = [...this.inventario, producto];
    this.nuevoProducto = '';
  }

  retirarProducto(indice: number): void {
    const copia = [...this.inventario];
    const [productoRetirado] = copia.splice(indice, 1);
    this.inventario = copia;

    if (productoRetirado) {
      this.historialRetiros = [productoRetirado, ...this.historialRetiros].slice(0, 5);
    }
  }

  iniciarArrastre(indice: number, evento: DragEvent): void {
    this.indiceEnArrastre = indice;
    evento.dataTransfer?.setData('text/plain', String(indice));
    evento.dataTransfer?.setDragImage(new Image(), 0, 0);
  }

  permitirArrastre(evento: DragEvent): void {
    evento.preventDefault();
    if (evento.dataTransfer) {
      evento.dataTransfer.dropEffect = 'move';
    }
  }

  soltarProducto(indiceObjetivo: number): void {
    if (this.indiceEnArrastre === null || this.indiceEnArrastre === indiceObjetivo) {
      this.indiceEnArrastre = null;
      return;
    }

    const inventarioActualizado = [...this.inventario];
    const [productoMovido] = inventarioActualizado.splice(this.indiceEnArrastre, 1);
    if (productoMovido === undefined) {
      this.indiceEnArrastre = null;
      return;
    }

    inventarioActualizado.splice(indiceObjetivo, 0, productoMovido);
    this.inventario = inventarioActualizado;
    this.indiceEnArrastre = null;
  }

  cancelarArrastre(): void {
    this.indiceEnArrastre = null;
  }

  generarNumeros(): void {
    const cantidad = Math.max(1, Math.min(this.cantidadNumeros, 100));
    const numeros = Array.from({ length: cantidad }, () => Math.floor(Math.random() * 100) + 1);

    this.numerosAleatorios = numeros;
    this.numerosPares = numeros.filter(numero => numero % 2 === 0);
    this.numerosImpares = numeros.filter(numero => numero % 2 !== 0);
  }

  calcularPalabraMasCorta(): void {
    const palabras = this.parsearPalabras(this.palabrasPalabraCorta);
    if (!palabras.length) {
      this.palabraMasCorta = null;
      return;
    }

    this.palabraMasCorta = palabras.reduce((masCorta, actual) =>
      actual.length < masCorta.length ? actual : masCorta
    );
  }

  ordenarPalabrasPorTamano(): void {
    const palabras = this.parsearPalabras(this.palabrasParaOrdenar);
    this.palabrasOrdenadas = palabras.sort((a, b) => a.length - b.length);
  }

  eliminarPalabrasDuplicadas(): void {
    const palabras = this.parsearPalabras(this.palabrasDuplicadas);
    const unicas = Array.from(new Set(palabras));
    this.palabrasSinDuplicados = unicas;
  }

  agregarTurno(): void {
    const turno = parseInt(this.nuevoTurno, 10);
    if (Number.isNaN(turno) || turno <= 0) {
      return;
    }

    if (this.colaTurnos.includes(turno)) {
      this.nuevoTurno = '';
      return;
    }

    this.colaTurnos = [...this.colaTurnos, turno];
    this.nuevoTurno = '';
  }

  atenderTurno(): void {
    if (!this.colaTurnos.length) {
      return;
    }

    const [turnoAtendido, ...resto] = this.colaTurnos;
    this.colaTurnos = resto;
    this.ultimoTurnoAtendido = turnoAtendido;
  }

  private parsearPalabras(entrada: string): string[] {
    return entrada
      .split(/[\n,;]+|\s+/)
      .map(palabra => palabra.trim())
      .filter(Boolean);
  }
}
