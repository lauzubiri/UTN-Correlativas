import type { Materia } from './types';

export const materias: Materia[] = [
  {
    id: 'analisis-mat-1',
    nombre: 'Análisis Matemático I',
    anio: 1,
    cuatrimestre: 'Anual',
    requisitos: []
  },
  {
    id: 'algebra-geo',
    nombre: 'Álgebra y Geometría Analítica',
    anio: 1,
    cuatrimestre: 'Anual',
    requisitos: []
  },
  {
    id: 'fisica-1',
    nombre: 'Física I',
    anio: 1,
    cuatrimestre: 'Anual',
    requisitos: []
  },
  {
    id: 'logica-discreta',
    nombre: 'Lógica y Estructuras Discretas',
    anio: 1,
    cuatrimestre: 'Anual',
    requisitos: []
  },
  {
    id: 'algoritmos',
    nombre: 'Algoritmos y Estructuras de Datos',
    anio: 1,
    cuatrimestre: 'Anual',
    requisitos: []
  },
  {
    id: 'sis-negocio',
    nombre: 'Sistemas y Procesos de Negocio',
    anio: 1,
    cuatrimestre: 'Anual',
    requisitos: []
  },
  {
    id: 'arq-computadores',
    nombre: 'Arquitectura de Computadores',
    anio: 1,
    cuatrimestre: 'Anual',
    requisitos: []
  },
  {
    id: 'ingles-1',
    nombre: 'Inglés I',
    anio: 1,
    cuatrimestre: 'Anual',
    requisitos: []
  },
  {
    id: 'analisis-mat-2',
    nombre: 'Análisis Matemático II',
    anio: 2,
    cuatrimestre: 'Anual',
    requisitos: [{ tipo: 'cursada', materiaId: 'analisis-mat-1' }, { tipo: 'cursada', materiaId: 'algebra-geo' }]
  },
  {
    id: 'fisica-2',
    nombre: 'Física II',
    anio: 2,
    cuatrimestre: 'Anual',
    requisitos: [{ tipo: 'cursada', materiaId: 'fisica-1' }, { tipo: 'cursada', materiaId: 'analisis-mat-1' }]
  },
  {
    id: 'sintaxis',
    nombre: 'Sintaxis y Semántica de los Lenguajes',
    anio: 2,
    cuatrimestre: '1º Cuatrimestre',
    requisitos: [{ tipo: 'cursada', materiaId: 'logica-discreta' }, { tipo: 'cursada', materiaId: 'algoritmos' }]
  },
  {
    id: 'paradigmas',
    nombre: 'Paradigmas de Programación',
    anio: 2,
    cuatrimestre: '2º Cuatrimestre',
    requisitos: [{ tipo: 'cursada', materiaId: 'logica-discreta' }, { tipo: 'cursada', materiaId: 'algoritmos' }]
  },
  {
    id: 'analisis-sistemas',
    nombre: 'Análisis de Sistemas de Información',
    anio: 2,
    cuatrimestre: 'Anual',
    requisitos: [{ tipo: 'cursada', materiaId: 'sis-negocio' }, { tipo: 'cursada', materiaId: 'algoritmos' }]
  },
  {
    id: 'sistemas-operativos',
    nombre: 'Sistemas Operativos',
    anio: 2,
    cuatrimestre: 'Anual',
    requisitos: [{ tipo: 'cursada', materiaId: 'arq-computadores' }, { tipo: 'cursada', materiaId: 'algoritmos' }]
  },
  {
    id: 'ingenieria-sociedad',
    nombre: 'Ingeniería y Sociedad',
    anio: 2,
    cuatrimestre: 'Anual',
    requisitos: []
  },
  {
    id: 'ingles-2',
    nombre: 'Inglés II',
    anio: 2,
    cuatrimestre: 'Anual',
    requisitos: [{ tipo: 'cursada', materiaId: 'ingles-1' }]
  },
  {
    id: 'analisis-numerico',
    nombre: 'Análisis Numérico',
    anio: 3,
    cuatrimestre: 'Anual',
    requisitos: [{ tipo: 'cursada', materiaId: 'analisis-mat-2' }, { tipo: 'cursada', materiaId: 'algebra-geo' }, { tipo: 'cursada', materiaId: 'algoritmos' }]
  },
  {
    id: 'probabilidad-estadistica',
    nombre: 'Probabilidad y Estadística',
    anio: 3,
    cuatrimestre: 'Anual',
    requisitos: [{ tipo: 'cursada', materiaId: 'analisis-mat-1' }, { tipo: 'cursada', materiaId: 'algebra-geo' }]
  },
  {
    id: 'diseno-sistemas',
    nombre: 'Diseño de Sistemas de Información',
    anio: 3,
    cuatrimestre: 'Anual',
    requisitos: [{ tipo: 'cursada', materiaId: 'analisis-sistemas' }, { tipo: 'cursada', materiaId: 'paradigmas' }, { tipo: 'cursada', materiaId: 'sintaxis' }]
  },
  {
    id: 'desarrollo-software',
    nombre: 'Desarrollo de Software',
    anio: 3,
    cuatrimestre: 'Anual',
    requisitos: [{ tipo: 'cursada', materiaId: 'paradigmas' }, { tipo: 'cursada', materiaId: 'analisis-sistemas' }]
  },
  {
    id: 'bases-datos',
    nombre: 'Bases de Datos',
    anio: 3,
    cuatrimestre: '1º Cuatrimestre',
    requisitos: [{ tipo: 'cursada', materiaId: 'analisis-sistemas' }, { tipo: 'cursada', materiaId: 'sintaxis' }, { tipo: 'cursada', materiaId: 'algoritmos' }]
  },
  {
    id: 'comunicaciones',
    nombre: 'Comunicación de Datos',
    anio: 3,
    cuatrimestre: '1º Cuatrimestre',
    requisitos: [{ tipo: 'cursada', materiaId: 'fisica-2' }, { tipo: 'cursada', materiaId: 'arq-computadores' }, { tipo: 'cursada', materiaId: 'analisis-mat-2' }]
  },
  {
    id: 'economia',
    nombre: 'Economía',
    anio: 3,
    cuatrimestre: '2º Cuatrimestre',
    requisitos: [{ tipo: 'cursada', materiaId: 'analisis-sistemas' }]
  },
  {
    id: 'inv-operativa',
    nombre: 'Investigación Operativa',
    anio: 4,
    cuatrimestre: '1º Cuatrimestre',
    requisitos: [{ tipo: 'cursada', materiaId: 'probabilidad-estadistica' }, { tipo: 'cursada', materiaId: 'analisis-numerico' }]
  },
  {
    id: 'simulacion',
    nombre: 'Simulación',
    anio: 4,
    cuatrimestre: '1º Cuatrimestre',
    requisitos: [{ tipo: 'cursada', materiaId: 'probabilidad-estadistica' }, { tipo: 'cursada', materiaId: 'logica-discreta' }]
  },
  {
    id: 'automatizacion',
    nombre: 'Tecnologías para la Automatización',
    anio: 4,
    cuatrimestre: '2º Cuatrimestre',
    requisitos: [{ tipo: 'cursada', materiaId: 'analisis-mat-2' }, { tipo: 'cursada', materiaId: 'fisica-2' }]
  },
  {
    id: 'ing-calidad',
    nombre: 'Ingeniería y Calidad de Software',
    anio: 4,
    cuatrimestre: '1º Cuatrimestre',
    requisitos: [{ tipo: 'cursada', materiaId: 'desarrollo-software' }, { tipo: 'cursada', materiaId: 'diseno-sistemas' }, { tipo: 'cursada', materiaId: 'probabilidad-estadistica' }]
  },
  {
    id: 'admin-sistemas',
    nombre: 'Administración de Sistemas de Información',
    anio: 4,
    cuatrimestre: 'Anual',
    requisitos: [{ tipo: 'cursada', materiaId: 'diseno-sistemas' }, { tipo: 'cursada', materiaId: 'bases-datos' }, { tipo: 'cursada', materiaId: 'economia' }]
  },
  {
    id: 'redes-datos',
    nombre: 'Redes de Datos',
    anio: 4,
    cuatrimestre: '2º Cuatrimestre',
    requisitos: [{ tipo: 'cursada', materiaId: 'comunicaciones' }, { tipo: 'cursada', materiaId: 'sistemas-operativos' }]
  },
  {
    id: 'legislacion',
    nombre: 'Legislación',
    anio: 4,
    cuatrimestre: '2º Cuatrimestre',
    requisitos: [{ tipo: 'cursada', materiaId: 'ing-sociedad' }, { tipo: 'cursada', materiaId: 'diseno-sistemas' }]
  },
  {
    id: 'ia',
    nombre: 'Inteligencia Artificial',
    anio: 5,
    cuatrimestre: '1º Cuatrimestre',
    requisitos: [{ tipo: 'cursada', materiaId: 'simulacion' }, { tipo: 'cursada', materiaId: 'inv-operativa' }]
  },
  {
    id: 'ciencia-datos',
    nombre: 'Ciencia de Datos',
    anio: 5,
    cuatrimestre: '1º Cuatrimestre',
    requisitos: [{ tipo: 'cursada', materiaId: 'bases-datos' }, { tipo: 'cursada', materiaId: 'probabilidad-estadistica' }, { tipo: 'cursada', materiaId: 'simulacion' }]
  },
  {
    id: 'sistemas-gestion',
    nombre: 'Sistemas de Gestión',
    anio: 5,
    cuatrimestre: 'Anual',
    requisitos: [{ tipo: 'cursada', materiaId: 'admin-sistemas' }, { tipo: 'cursada', materiaId: 'inv-operativa' }]
  },
  {
    id: 'gestion-gerencial',
    nombre: 'Gestión Gerencial',
    anio: 5,
    cuatrimestre: '1º Cuatrimestre',
    requisitos: [{ tipo: 'cursada', materiaId: 'admin-sistemas' }, { tipo: 'cursada', materiaId: 'economia' }]
  },
  {
    id: 'proyecto-final',
    nombre: 'Proyecto Final',
    anio: 5,
    cuatrimestre: 'Anual',
    requisitos: [{ tipo: 'cursada', materiaId: 'admin-sistemas' }, { tipo: 'cursada', materiaId: 'ing-calidad' }, { tipo: 'cursada', materiaId: 'redes-datos' }]
  },
  {
    id: 'seguridad',
    nombre: 'Seguridad en los Sistemas de Información',
    anio: 5,
    cuatrimestre: '2º Cuatrimestre',
      requisitos: [{ tipo: 'cursada', materiaId: 'redes-datos' }, { tipo: 'cursada', materiaId: 'ing-calidad' }]
  }
];