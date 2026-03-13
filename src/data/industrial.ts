import type { Materia } from './types';

export type TipoRequisito = 'aprobada' | 'cursada' | 'finales_cantidad';

export interface Requisito {
  tipo: TipoRequisito;
  materiaId?: string;
  cantidad?: number;
}

export interface MateriaIndustrialBase {
  id: string;
  nombre: string;
  anio: number;
  requisitos: Requisito[];
}

export const materiasIndustrial: MateriaIndustrialBase[] = [
    // --- PRIMER AÑO ---
    { id: 'analisis-mat-1', nombre: 'Análisis Matemático I', anio: 1, requisitos: [] },
    { id: 'quimica-gral', nombre: 'Química General', anio: 1, requisitos: [] },
    { id: 'sistemas-representacion', nombre: 'Sistemas de Representación', anio: 1, requisitos: [] },
    { id: 'informatica-1', nombre: 'Informática I', anio: 1, requisitos: [] },
    { id: 'pensamiento-sistemico', nombre: 'Pensamiento Sistémico', anio: 1, requisitos: [] },
    { id: 'fisica-1', nombre: 'Física I', anio: 1, requisitos: []},
    { id: 'algebra-geo', nombre: 'Algebra General y Geometría Analítica', anio: 1, requisitos: [] },
    { id: 'ingenieria-sociedad', nombre: 'Ingeniería y Sociedad', anio: 1, requisitos: [] },
  
    // --- SEGUNDO AÑO ---
    { id: 'analisis-mat-2', nombre: 'Análisis Matemático II', anio: 2, requisitos: [{ tipo: 'cursada', materiaId: 'analisis-mat-1' }, { tipo: 'cursada', materiaId: 'algebra-geo' }] },
    { id: 'administracion-gral', nombre: 'Administración General', anio: 2, requisitos: [{ tipo: 'cursada', materiaId: 'informatica-1' }, { tipo: 'cursada', materiaId: 'pensamiento-sistemico' }, { tipo: 'cursada', materiaId: 'algebra-geo' }, { tipo: 'cursada', materiaId: 'ingenieria-sociedad' }] },
    { id: 'probabilidad-estadistica', nombre: 'Probabilidad y Estadística', anio: 2, requisitos: [{ tipo: 'cursada', materiaId: 'analisis-mat-1' }, { tipo: 'cursada', materiaId: 'algebra-geo' }] },
    { id: 'ciencia-materiales', nombre: 'Ciencia de los Materiales', anio: 2, requisitos: [{ tipo: 'cursada', materiaId: 'quimica-gral' }, { tipo: 'cursada', materiaId: 'fisica-1' }] },
    { id: 'fisica-2', nombre: 'Física II', anio: 2, requisitos: [{ tipo: 'cursada', materiaId: 'analisis-mat-1' }, { tipo: 'cursada', materiaId: 'fisica-1' }] },
    { id: 'economia-gral', nombre: 'Economía General', anio: 2, requisitos: [{ tipo: 'cursada', materiaId: 'analisis-mat-1' }, { tipo: 'cursada', materiaId: 'pensamiento-sistemico' }, { tipo: 'cursada', materiaId: 'ingenieria-sociedad' }] },
    { id: 'informatica-2', nombre: 'Informática II', anio: 2, requisitos: [{ tipo: 'cursada', materiaId: 'informatica-1' }] },
    { id: 'ingles-1', nombre: 'Ingles I', anio: 2, requisitos: [] },
  
    // --- TERCER AÑO ---
    { id: 'costos-presupuestos', nombre: 'Costos y Presupuestos', anio: 3, requisitos: [{ tipo: 'cursada', materiaId: 'administracion-gral' }, { tipo: 'cursada', materiaId: 'economia-gral' }, { tipo: 'aprobada', materiaId: 'analisis-mat-1' }, { tipo: 'aprobada', materiaId: 'informatica-1' }, { tipo: 'aprobada', materiaId: 'pensamiento-sistemico' }, { tipo: 'aprobada', materiaId: 'algebra-geo' }, { tipo: 'aprobada', materiaId: 'ingenieria-sociedad' }] },
    { id: 'estudio-trabajo', nombre: 'Estudio del Trabajo', anio: 3, requisitos: [{ tipo: 'cursada', materiaId: 'administracion-gral' }, { tipo: 'cursada', materiaId: 'probabilidad-estadistica' }, { tipo: 'aprobada', materiaId: 'analisis-mat-1' }, { tipo: 'aprobada', materiaId: 'sistemas-representacion' }, { tipo: 'aprobada', materiaId: 'informatica-1' }, { tipo: 'aprobada', materiaId: 'pensamiento-sistemico' }, { tipo: 'aprobada', materiaId: 'algebra-geo' }, { tipo: 'aprobada', materiaId: 'ingenieria-sociedad' }] },
    { id: 'comercializacion', nombre: 'Comercialización', anio: 3, requisitos: [{ tipo: 'cursada', materiaId: 'administracion-gral' }, { tipo: 'cursada', materiaId: 'probabilidad-estadistica' }, { tipo: 'cursada', materiaId: 'economia-gral' }, { tipo: 'aprobada', materiaId: 'analisis-mat-1' }, { tipo: 'aprobada', materiaId: 'informatica-1' }, { tipo: 'aprobada', materiaId: 'pensamiento-sistemico' }, { tipo: 'aprobada', materiaId: 'algebra-geo' }, { tipo: 'aprobada', materiaId: 'ingenieria-sociedad' }] },
    { id: 'termodinamica-maquinas-termicas', nombre: 'Termodinámica y Máquinas Térmicas', anio: 3, requisitos: [{ tipo: 'cursada', materiaId: 'quimica-gral' }, { tipo: 'cursada', materiaId: 'fisica-2' }, { tipo: 'aprobada', materiaId: 'analisis-mat-1' }, { tipo: 'aprobada', materiaId: 'fisica-1' }] },
    { id: 'estatica-resistencia-materiales', nombre: 'Estática y Resistencia de Materiales', anio: 3, requisitos: [{ tipo: 'cursada', materiaId: 'analisis-mat-2' }, { tipo: 'cursada', materiaId: 'ciencia-materiales' }, { tipo: 'aprobada', materiaId: 'analisis-mat-1' }, { tipo: 'aprobada', materiaId: 'quimica-gral' }, { tipo: 'aprobada', materiaId: 'fisica-1' }, { tipo: 'aprobada', materiaId: 'algebra-geo' }] },
    { id: 'mecanica-fluidos', nombre: 'Mecánica de los Fluidos', anio: 3, requisitos: [{ tipo: 'cursada', materiaId: 'analisis-mat-2' }, { tipo: 'aprobada', materiaId: 'analisis-mat-1' }, { tipo: 'aprobada', materiaId: 'fisica-1' }, { tipo: 'aprobada', materiaId: 'algebra-geo' }] },
    { id: 'economia-empresa', nombre: 'Economía de la Empresa', anio: 3, requisitos: [{ tipo: 'cursada', materiaId: 'administracion-gral' }, { tipo: 'cursada', materiaId: 'economia-gral' }, { tipo: 'aprobada', materiaId: 'analisis-mat-1' }, { tipo: 'aprobada', materiaId: 'informatica-1' }, { tipo: 'aprobada', materiaId: 'pensamiento-sistemico' }, { tipo: 'aprobada', materiaId: 'algebra-geo' }, { tipo: 'aprobada', materiaId: 'ingenieria-sociedad' }] },
    { id: 'electrotecnia-maquinas-electricas', nombre: 'Electrotecnia y Máquinas Eléctricas', anio: 3, requisitos: [{ tipo: 'cursada', materiaId: 'fisica-2' }, { tipo: 'aprobada', materiaId: 'analisis-mat-1' }, { tipo: 'aprobada', materiaId: 'fisica-1' }] },
  
    // --- CUARTO AÑO ---
    { id: 'analisis-numeric-calcul-avanz', nombre: 'Análisis Numérico y Cálculo Avanzado', anio: 4, requisitos: [{ tipo: 'cursada', materiaId: 'analisis-mat-2' }, { tipo: 'aprobada', materiaId: 'analisis-mat-1' }, { tipo: 'aprobada', materiaId: 'algebra-geo' }] },
    { id: 'seguridad-higiene-ing-ambiental', nombre: 'Seguridad, Higiene e Ingeniería Ambiental', anio: 4, requisitos: [{ tipo: 'cursada', materiaId: 'estudio-trabajo' }, { tipo: 'aprobada', materiaId: 'administracion-gral' }, { tipo: 'aprobada', materiaId: 'probabilidad-estadistica' }] },
    { id: 'investigacion-operativa', nombre: 'Investigación Operativa', anio: 4, requisitos: [{ tipo: 'cursada', materiaId: 'analisis-mat-2' }, { tipo: 'cursada', materiaId: 'probabilidad-estadistica' }, { tipo: 'cursada', materiaId: 'analisis-numeric-calcul-avanz' }, { tipo: 'aprobada', materiaId: 'analisis-mat-1' }, { tipo: 'aprobada', materiaId: 'algebra-geo' }] },
    { id: 'procesos-industriales', nombre: 'Procesos Industriales', anio: 4, requisitos: [{ tipo: 'cursada', materiaId: 'estudio-trabajo' }, { tipo: 'cursada', materiaId: 'termodinamica-maquinas-termicas' }, { tipo: 'cursada', materiaId: 'electrotecnia-maquinas-electricas' }, { tipo: 'aprobada', materiaId: 'quimica-gral' }, { tipo: 'aprobada', materiaId: 'administracion-gral' }, { tipo: 'aprobada', materiaId: 'ciencia-materiales' }, { tipo: 'aprobada', materiaId: 'fisica-2' }] },
    { id: 'mecanica-mecanismos', nombre: 'Mecánica y Mecanismos', anio: 4, requisitos: [{ tipo: 'cursada', materiaId: 'analisis-mat-2' }, { tipo: 'aprobada', materiaId: 'analisis-mat-1' }, { tipo: 'aprobada', materiaId: 'fisica-1' }, { tipo: 'aprobada', materiaId: 'algebra-geo' }] },
    { id: 'evaluacion-proyectos', nombre: 'Evaluación de Proyectos', anio: 4, requisitos: [{ tipo: 'cursada', materiaId: 'costos-presupuestos' }, { tipo: 'cursada', materiaId: 'estudio-trabajo' }, { tipo: 'cursada', materiaId: 'comercializacion' }, { tipo: 'cursada', materiaId: 'economia-empresa' }, { tipo: 'aprobada', materiaId: 'administracion-gral' }, { tipo: 'aprobada', materiaId: 'probabilidad-estadistica' }, { tipo: 'aprobada', materiaId: 'economia-gral' }, { tipo: 'aprobada', materiaId: 'ingles-1' }] },
    { id: 'planif-control-produccion', nombre: 'Planificación y Control de la Producción', anio: 4, requisitos: [{ tipo: 'cursada', materiaId: 'estudio-trabajo' }, { tipo: 'aprobada', materiaId: 'administracion-gral' }, { tipo: 'aprobada', materiaId: 'probabilidad-estadistica' }] },
    { id: 'diseno-producto', nombre: 'Diseño del Producto', anio: 4, requisitos: [{ tipo: 'cursada', materiaId: 'informatica-2' }, { tipo: 'cursada', materiaId: 'comercializacion' }, { tipo: 'aprobada', materiaId: 'sistemas-representacion' }, { tipo: 'aprobada', materiaId: 'informatica-1' }, { tipo: 'aprobada', materiaId: 'administracion-gral' }, { tipo: 'aprobada', materiaId: 'probabilidad-estadistica' }, { tipo: 'aprobada', materiaId: 'economia-gral' }] },
    { id: 'ingles-2', nombre: 'Ingles II', anio: 4, requisitos: [{ tipo: 'cursada', materiaId: 'ingles-1' }] },
  
    // --- QUINTO AÑO ---
    { id: 'instalaciones-industriales', nombre: 'Instalaciones Industriales', anio: 5, requisitos: [{ tipo: 'cursada', materiaId: 'termodinamica-maquinas-termicas' }, { tipo: 'cursada', materiaId: 'estatica-resistencia-materiales' }, { tipo: 'cursada', materiaId: 'mecanica-fluidos' }, { tipo: 'cursada', materiaId: 'electrotecnia-maquinas-electricas' }, { tipo: 'aprobada', materiaId: 'quimica-gral' }, { tipo: 'aprobada', materiaId: 'analisis-mat-2' }, { tipo: 'aprobada', materiaId: 'ciencia-materiales' }, { tipo: 'aprobada', materiaId: 'fisica-2' }] },
    { id: 'legislacion', nombre: 'Legislación', anio: 5, requisitos: [{ tipo: 'aprobada', materiaId: 'administracion-gral' }] },
    { id: 'mantenimiento', nombre: 'Mantenimiento', anio: 5, requisitos: [{ tipo: 'cursada', materiaId: 'instalaciones-industriales' }, { tipo: 'aprobada', materiaId: 'termodinamica-maquinas-termicas' }, { tipo: 'aprobada', materiaId: 'estatica-resistencia-materiales' }, { tipo: 'aprobada', materiaId: 'electrotecnia-maquinas-electricas' }] },
    { id: 'manejo-mat-distrib-plantas', nombre: 'Manejo de Materiales y Distribución de Plantas', anio: 5, requisitos: [{ tipo: 'cursada', materiaId: 'estudio-trabajo' }, { tipo: 'cursada', materiaId: 'mecanica-mecanismos' }, { tipo: 'aprobada', materiaId: 'analisis-mat-2' }, { tipo: 'aprobada', materiaId: 'administracion-gral' }, { tipo: 'aprobada', materiaId: 'estatica-resistencia-materiales' }] },
    { id: 'comercio-exterior', nombre: 'Comercio Exterior', anio: 5, requisitos: [{ tipo: 'cursada', materiaId: 'evaluacion-proyectos' }, { tipo: 'aprobada', materiaId: 'estudio-trabajo' }, { tipo: 'aprobada', materiaId: 'comercializacion' }, { tipo: 'aprobada', materiaId: 'economia-empresa' }] },
    { id: 'relaciones-industriales', nombre: 'Relaciones Industriales', anio: 5, requisitos: [{ tipo: 'cursada', materiaId: 'estudio-trabajo' }, { tipo: 'aprobada', materiaId: 'administracion-gral' }, { tipo: 'aprobada', materiaId: 'probabilidad-estadistica' }] },
    { id: 'ingenieria-calidad', nombre: 'Ingeniería en Calidad', anio: 5, requisitos: [{ tipo: 'cursada', materiaId: 'estudio-trabajo' }, { tipo: 'aprobada', materiaId: 'administracion-gral' }, { tipo: 'aprobada', materiaId: 'probabilidad-estadistica' }] },
    { id: 'control-gestion', nombre: 'Control de Gestión', anio: 5, requisitos: [{ tipo: 'cursada', materiaId: 'costos-presupuestos' }, { tipo: 'cursada', materiaId: 'economia-empresa' }, { tipo: 'aprobada', materiaId: 'administracion-gral' }, { tipo: 'aprobada', materiaId: 'economia-gral' }] },
    { id: 'proyecto-final', nombre: 'Proyecto Final', anio: 5, requisitos: [{ tipo: 'cursada', materiaId: 'analisis-numeric-calcul-avanz' }, { tipo: 'cursada', materiaId: 'seguridad-higiene-ing-ambiental' }, { tipo: 'cursada', materiaId: 'investigacion-operativa' }, { tipo: 'cursada', materiaId: 'procesos-industriales' }, { tipo: 'cursada', materiaId: 'evaluacion-proyectos' }, { tipo: 'cursada', materiaId: 'planif-control-produccion' }, { tipo: 'aprobada', materiaId: 'estudio-trabajo' }, { tipo: 'aprobada', materiaId: 'comercializacion' }, { tipo: 'aprobada', materiaId: 'termodinamica-maquinas-termicas' }, { tipo: 'aprobada', materiaId: 'estatica-resistencia-materiales' }, { tipo: 'aprobada', materiaId: 'mecanica-fluidos' }, { tipo: 'aprobada', materiaId: 'economia-empresa' }, { tipo: 'aprobada', materiaId: 'electrotecnia-maquinas-electricas' }, { tipo: 'aprobada', materiaId: 'ingles-2' }] }
  ];