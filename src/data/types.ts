export type TipoRequisito = 'aprobada' | 'cursada' | 'finales_cantidad';

export interface Requisito {
  tipo: TipoRequisito;
  materiaId?: string; 
  cantidad?: number;  
}

export interface Materia {
  id: string;
  nombre: string;
  anio: number;
  cuatrimestre?: string;
  requisitos: Requisito[];
}