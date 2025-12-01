import type { Materia } from './types';

export const materias: Materia[] = [
  {
    id: 'analisis-1',
    nombre: 'Análisis Matemático I',
    anio: 1,
    cuatrimestre: 'Anual',
    correlativas: []
  },
  {
    id: 'algebra',
    nombre: 'Álgebra y Geometría Analítica',
    anio: 1,
    cuatrimestre: 'Anual',
    correlativas: []
  },
  {
    id: 'fisica-1',
    nombre: 'Física I',
    anio: 1,
    cuatrimestre: 'Anual',
    correlativas: []
  },
  {
    id: 'logica-discreta',
    nombre: 'Lógica y Estructuras Discretas',
    anio: 1,
    cuatrimestre: 'Anual',
    correlativas: []
  },
  {
    id: 'algoritmos',
    nombre: 'Algoritmos y Estructuras de Datos',
    anio: 1,
    cuatrimestre: 'Anual',
    correlativas: []
  },
  {
    id: 'sis-negocio',
    nombre: 'Sistemas y Procesos de Negocio',
    anio: 1,
    cuatrimestre: 'Anual',
    correlativas: []
  },
  {
    id: 'arq-computadores',
    nombre: 'Arquitectura de Computadores',
    anio: 1,
    cuatrimestre: 'Anual',
    correlativas: []
  },
  {
    id: 'ingles-1',
    nombre: 'Inglés I',
    anio: 1,
    cuatrimestre: 'Anual',
    correlativas: []
  },
  {
    id: 'analisis-2',
    nombre: 'Análisis Matemático II',
    anio: 2,
    cuatrimestre: 'Anual',
    correlativas: ['analisis-1', 'algebra']
  },
  {
    id: 'fisica-2',
    nombre: 'Física II',
    anio: 2,
    cuatrimestre: 'Anual',
    correlativas: ['fisica-1', 'analisis-1']
  },
  {
    id: 'sintaxis',
    nombre: 'Sintaxis y Semántica de los Lenguajes',
    anio: 2,
    cuatrimestre: '1º Cuatrimestre',
    correlativas: ['logica-discreta', 'algoritmos']
  },
  {
    id: 'paradigmas',
    nombre: 'Paradigmas de Programación',
    anio: 2,
    cuatrimestre: '2º Cuatrimestre',
    correlativas: ['logica-discreta', 'algoritmos']
  },
  {
    id: 'analisis-sistemas',
    nombre: 'Análisis de Sistemas de Información',
    anio: 2,
    cuatrimestre: 'Anual',
    correlativas: ['sis-negocio', 'algoritmos']
  },
  {
    id: 'sistemas-operativos',
    nombre: 'Sistemas Operativos',
    anio: 2,
    cuatrimestre: 'Anual',
    correlativas: ['arq-computadores', 'algoritmos']
  },
  {
    id: 'ing-sociedad',
    nombre: 'Ingeniería y Sociedad',
    anio: 2,
    cuatrimestre: 'Anual',
    correlativas: []
  },
  {
    id: 'ingles-2',
    nombre: 'Inglés II',
    anio: 2,
    cuatrimestre: 'Anual',
    correlativas: ['ingles-1']
  },
  {
    id: 'analisis-numerico',
    nombre: 'Análisis Numérico',
    anio: 3,
    cuatrimestre: 'Anual',
    correlativas: ['analisis-2', 'algebra', 'algoritmos']
  },
  {
    id: 'probabilidad',
    nombre: 'Probabilidad y Estadística',
    anio: 3,
    cuatrimestre: 'Anual',
    correlativas: ['analisis-1', 'algebra']
  },
  {
    id: 'diseno-sistemas',
    nombre: 'Diseño de Sistemas de Información',
    anio: 3,
    cuatrimestre: 'Anual',
    correlativas: ['analisis-sistemas', 'paradigmas', 'sintaxis']
  },
  {
    id: 'desarrollo-software',
    nombre: 'Desarrollo de Software',
    anio: 3,
    cuatrimestre: 'Anual',
    correlativas: ['paradigmas', 'analisis-sistemas']
  },
  {
    id: 'bases-datos',
    nombre: 'Bases de Datos',
    anio: 3,
    cuatrimestre: '1º Cuatrimestre',
    correlativas: ['analisis-sistemas', 'sintaxis', 'algoritmos']
  },
  {
    id: 'comunicaciones',
    nombre: 'Comunicación de Datos',
    anio: 3,
    cuatrimestre: '1º Cuatrimestre',
    correlativas: ['fisica-2', 'arq-computadores', 'analisis-2']
  },
  {
    id: 'economia',
    nombre: 'Economía',
    anio: 3,
    cuatrimestre: '2º Cuatrimestre',
    correlativas: ['analisis-sistemas']
  },
  {
    id: 'inv-operativa',
    nombre: 'Investigación Operativa',
    anio: 4,
    cuatrimestre: '1º Cuatrimestre',
    correlativas: ['probabilidad', 'analisis-numerico']
  },
  {
    id: 'simulacion',
    nombre: 'Simulación',
    anio: 4,
    cuatrimestre: '1º Cuatrimestre',
    correlativas: ['probabilidad', 'logica-discreta']
  },
  {
    id: 'automatizacion',
    nombre: 'Tecnologías para la Automatización',
    anio: 4,
    cuatrimestre: '2º Cuatrimestre',
    correlativas: ['analisis-2', 'fisica-2']
  },
  {
    id: 'ing-calidad',
    nombre: 'Ingeniería y Calidad de Software',
    anio: 4,
    cuatrimestre: '1º Cuatrimestre',
    correlativas: ['desarrollo-software', 'diseno-sistemas', 'probabilidad']
  },
  {
    id: 'admin-sistemas',
    nombre: 'Administración de Sistemas de Información',
    anio: 4,
    cuatrimestre: 'Anual',
    correlativas: ['diseno-sistemas', 'bases-datos', 'economia']
  },
  {
    id: 'redes-datos',
    nombre: 'Redes de Datos',
    anio: 4,
    cuatrimestre: '2º Cuatrimestre',
    correlativas: ['comunicaciones', 'sistemas-operativos']
  },
  {
    id: 'legislacion',
    nombre: 'Legislación',
    anio: 4,
    cuatrimestre: '2º Cuatrimestre',
    correlativas: ['ing-sociedad', 'diseno-sistemas']
  },
  {
    id: 'ia',
    nombre: 'Inteligencia Artificial',
    anio: 5,
    cuatrimestre: '1º Cuatrimestre',
    correlativas: ['simulacion', 'inv-operativa']
  },
  {
    id: 'ciencia-datos',
    nombre: 'Ciencia de Datos',
    anio: 5,
    cuatrimestre: '1º Cuatrimestre',
    correlativas: ['bases-datos', 'probabilidad', 'simulacion']
  },
  {
    id: 'sistemas-gestion',
    nombre: 'Sistemas de Gestión',
    anio: 5,
    cuatrimestre: 'Anual',
    correlativas: ['admin-sistemas', 'inv-operativa']
  },
  {
    id: 'gestion-gerencial',
    nombre: 'Gestión Gerencial',
    anio: 5,
    cuatrimestre: '1º Cuatrimestre',
    correlativas: ['admin-sistemas', 'economia']
  },
  {
    id: 'proyecto-final',
    nombre: 'Proyecto Final',
    anio: 5,
    cuatrimestre: 'Anual',
    correlativas: ['admin-sistemas', 'ing-calidad', 'redes-datos']
  },
  {
    id: 'seguridad',
    nombre: 'Seguridad en los Sistemas de Información',
    anio: 5,
    cuatrimestre: '2º Cuatrimestre',
    correlativas: ['redes-datos', 'ing-calidad']
  }
];