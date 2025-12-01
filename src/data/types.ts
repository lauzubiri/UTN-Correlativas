export interface Materia {
  id: string;
  nombre: string;
  anio: number;
  cuatrimestre: string;
  correlativas: string[]; // Array de IDs
}