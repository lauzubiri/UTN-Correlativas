export type TipoRequisito = 'aprobada' | 'cursada' | 'finales_cantidad';

export interface Requisito {
  tipo: TipoRequisito;
  materiaId?: string;
  cantidad?: number;
}

export interface MateriaIndustrial {
  id: string;
  nombre: string;
  requisitos: Requisito[];
}

export const materiasIndustrial: MateriaIndustrial[] = [
  {
    id: 'analisis-mat-1',
    nombre: 'Análisis Matemático I',
    requisitos: []
  },
  {
    id: 'quimica-gral',
    nombre: 'Química General',
    requisitos: []
  },
  {
    id: 'sistemas-representacion',
    nombre: 'Sistemas de Representación',
    requisitos: []
  },
  {
    id: 'informatica-1',
    nombre: 'Informática I',
    requisitos: []
  },
  {
    id: 'pensamiento-sistemico',
    nombre: 'Pensamiento Sistémico',
    requisitos: []
  },
  {
    id: 'fisica-1',
    nombre: 'Física I',
    requisitos: []
  },
  {
    id: 'algebra-geo',
    nombre: 'Algebra General y Geometría Analítica',
    requisitos: []
  },
  {
    id: 'ingenieria-sociedad',
    nombre: 'Ingeniería y Sociedad',
    requisitos: []
  },
  {
    id: 'analisis-mat-2',
    nombre: 'Análisis Matemático II',
    requisitos: [
      { tipo: 'cursada', materiaId: 'analisis-mat-1' },
      { tipo: 'cursada', materiaId: 'algebra-geo' }
    ]
  },
  {
    id: 'administracion-gral',
    nombre: 'Administración General',
    requisitos: [
      { tipo: 'cursada', materiaId: 'informatica-1' },
      { tipo: 'cursada', materiaId: 'pensamiento-sistemico' },
      { tipo: 'cursada', materiaId: 'algebra-geo' },
      { tipo: 'cursada', materiaId: 'ingenieria-sociedad' }
    ]
  },
  {
    id: 'probabilidad-estadistica',
    nombre: 'Probabilidad y Estadística',
    requisitos: [
      { tipo: 'cursada', materiaId: 'analisis-mat-1' },
      { tipo: 'cursada', materiaId: 'algebra-geo' }
    ]
  },
  {
    id: 'ciencia-materiales',
    nombre: 'Ciencia de los Materiales',
    requisitos: [
      { tipo: 'cursada', materiaId: 'quimica-gral' },
      { tipo: 'cursada', materiaId: 'fisica-1' }
    ]
  },
  {
    id: 'fisica-2',
    nombre: 'Física II',
    requisitos: [
      { tipo: 'cursada', materiaId: 'analisis-mat-1' },
      { tipo: 'cursada', materiaId: 'fisica-1' }
    ]
  },
  {
    id: 'economia-gral',
    nombre: 'Economía General',
    requisitos: [
      { tipo: 'cursada', materiaId: 'analisis-mat-1' },
      { tipo: 'cursada', materiaId: 'pensamiento-sistemico' },
      { tipo: 'cursada', materiaId: 'ingenieria-sociedad' }
    ]
  },
  {
    id: 'informatica-2',
    nombre: 'Informática II',
    requisitos: [
      { tipo: 'cursada', materiaId: 'informatica-1' }
    ]
  },
  {
    id: 'ingles-1',
    nombre: 'Ingles I',
    requisitos: []
  },
  {
    id: 'costos-presupuestos',
    nombre: 'Costos y Presupuestos',
    requisitos: [
      { tipo: 'cursada', materiaId: 'administracion-gral' },
      { tipo: 'cursada', materiaId: 'economia-gral' },
      { tipo: 'aprobada', materiaId: 'analisis-mat-1' },
      { tipo: 'aprobada', materiaId: 'informatica-1' },
      { tipo: 'aprobada', materiaId: 'pensamiento-sistemico' },
      { tipo: 'aprobada', materiaId: 'algebra-geo' },
      { tipo: 'aprobada', materiaId: 'ingenieria-sociedad' }
    ]
  },
  {
    id: 'estudio-trabajo',
    nombre: 'Estudio del Trabajo',
    requisitos: [
      { tipo: 'cursada', materiaId: 'administracion-gral' },
      { tipo: 'cursada', materiaId: 'probabilidad-estadistica' },
      { tipo: 'aprobada', materiaId: 'analisis-mat-1' },
      { tipo: 'aprobada', materiaId: 'sistemas-representacion' },
      { tipo: 'aprobada', materiaId: 'informatica-1' },
      { tipo: 'aprobada', materiaId: 'pensamiento-sistemico' },
      { tipo: 'aprobada', materiaId: 'algebra-geo' },
      { tipo: 'aprobada', materiaId: 'ingenieria-sociedad' }
    ]
  },
  {
    id: 'comercializacion',
    nombre: 'Comercialización',
    requisitos: [
      { tipo: 'cursada', materiaId: 'administracion-gral' },
      { tipo: 'cursada', materiaId: 'probabilidad-estadistica' },
      { tipo: 'cursada', materiaId: 'economia-gral' },
      { tipo: 'aprobada', materiaId: 'analisis-mat-1' },
      { tipo: 'aprobada', materiaId: 'informatica-1' },
      { tipo: 'aprobada', materiaId: 'pensamiento-sistemico' },
      { tipo: 'aprobada', materiaId: 'algebra-geo' },
      { tipo: 'aprobada', materiaId: 'ingenieria-sociedad' }
    ]
  },
  {
    id: 'termodinamica-maquinas-termicas',
    nombre: 'Termodinámica y Máquinas Térmicas',
    requisitos: [
      { tipo: 'cursada', materiaId: 'quimica-gral' },
      { tipo: 'cursada', materiaId: 'fisica-2' },
      { tipo: 'aprobada', materiaId: 'analisis-mat-1' },
      { tipo: 'aprobada', materiaId: 'fisica-1' }
    ]
  },
  {
    id: 'estatica-resistencia-materiales',
    nombre: 'Estática y Resistencia de Materiales',
    requisitos: [
      { tipo: 'cursada', materiaId: 'analisis-mat-2' },
      { tipo: 'cursada', materiaId: 'ciencia-materiales' },
      { tipo: 'aprobada', materiaId: 'analisis-mat-1' },
      { tipo: 'aprobada', materiaId: 'quimica-gral' },
      { tipo: 'aprobada', materiaId: 'fisica-1' },
      { tipo: 'aprobada', materiaId: 'algebra-geo' }
    ]
  },
  {
    id: 'mecanica-fluidos',
    nombre: 'Mecánica de los Fluidos',
    requisitos: [
      { tipo: 'cursada', materiaId: 'analisis-mat-2' },
      { tipo: 'aprobada', materiaId: 'analisis-mat-1' },
      { tipo: 'aprobada', materiaId: 'fisica-1' },
      { tipo: 'aprobada', materiaId: 'algebra-geo' }
    ]
  },
  {
    id: 'economia-empresa',
    nombre: 'Economía de la Empresa',
    requisitos: [
      { tipo: 'cursada', materiaId: 'administracion-gral' },
      { tipo: 'cursada', materiaId: 'economia-gral' },
      { tipo: 'aprobada', materiaId: 'analisis-mat-1' },
      { tipo: 'aprobada', materiaId: 'informatica-1' },
      { tipo: 'aprobada', materiaId: 'pensamiento-sistemico' },
      { tipo: 'aprobada', materiaId: 'algebra-geo' },
      { tipo: 'aprobada', materiaId: 'ingenieria-sociedad' }
    ]
  },
  {
    id: 'electrotecnia-maquinas-electricas',
    nombre: 'Electrotecnia y Máquinas Eléctricas',
    requisitos: [
      { tipo: 'cursada', materiaId: 'fisica-2' },
      { tipo: 'aprobada', materiaId: 'analisis-mat-1' },
      { tipo: 'aprobada', materiaId: 'fisica-1' }
    ]
  },
  {
    id: 'analisis-numerico-calculo-avanzado',
    nombre: 'Análisis Numérico y Cálculo Avanzado',
    requisitos: [
      { tipo: 'cursada', materiaId: 'analisis-mat-2' },
      { tipo: 'aprobada', materiaId: 'analisis-mat-1' },
      { tipo: 'aprobada', materiaId: 'algebra-geo' }
    ]
  },
  {
    id: 'seguridad-higiene-ingenieria-ambiental',
    nombre: 'Seguridad, Higiene e Ingeniería Ambiental',
    requisitos: [
      { tipo: 'cursada', materiaId: 'estudio-trabajo' },
      { tipo: 'aprobada', materiaId: 'administracion-gral' },
      { tipo: 'aprobada', materiaId: 'probabilidad-estadistica' }
    ]
  },
  {
    id: 'investigacion-operativa',
    nombre: 'Investigación Operativa',
    requisitos: [
      { tipo: 'cursada', materiaId: 'analisis-mat-2' },
      { tipo: 'cursada', materiaId: 'probabilidad-estadistica' },
      { tipo: 'cursada', materiaId: 'analisis-numerico-calculo-avanzado' },
      { tipo: 'aprobada', materiaId: 'analisis-mat-1' },
      { tipo: 'aprobada', materiaId: 'algebra-geo' }
    ]
  },
  {
    id: 'procesos-industriales',
    nombre: 'Procesos Industriales',
    requisitos: [
      { tipo: 'cursada', materiaId: 'estudio-trabajo' },
      { tipo: 'cursada', materiaId: 'termodinamica-maquinas-termicas' },
      { tipo: 'cursada', materiaId: 'electrotecnia-maquinas-electricas' },
      { tipo: 'aprobada', materiaId: 'quimica-gral' },
      { tipo: 'aprobada', materiaId: 'administracion-gral' },
      { tipo: 'aprobada', materiaId: 'ciencia-materiales' },
      { tipo: 'aprobada', materiaId: 'fisica-2' }
    ]
  },
  {
    id: 'mecanica-mecanismos',
    nombre: 'Mecánica y Mecanismos',
    requisitos: [
      { tipo: 'cursada', materiaId: 'analisis-mat-2' },
      { tipo: 'aprobada', materiaId: 'analisis-mat-1' },
      { tipo: 'aprobada', materiaId: 'fisica-1' },
      { tipo: 'aprobada', materiaId: 'algebra-geo' }
    ]
  },
  {
    id: 'evaluacion-proyectos',
    nombre: 'Evaluación de Proyectos',
    requisitos: [
      { tipo: 'cursada', materiaId: 'costos-presupuestos' },
      { tipo: 'cursada', materiaId: 'estudio-trabajo' },
      { tipo: 'cursada', materiaId: 'comercializacion' },
      { tipo: 'cursada', materiaId: 'economia-empresa' },
      { tipo: 'aprobada', materiaId: 'administracion-gral' },
      { tipo: 'aprobada', materiaId: 'probabilidad-estadistica' },
      { tipo: 'aprobada', materiaId: 'economia-gral' },
      { tipo: 'aprobada', materiaId: 'ingles-1' }
    ]
  },
  {
    id: 'planificacion-control-produccion',
    nombre: 'Planificación y Control de la Producción',
    requisitos: [
      { tipo: 'cursada', materiaId: 'estudio-trabajo' },
      { tipo: 'aprobada', materiaId: 'administracion-gral' },
      { tipo: 'aprobada', materiaId: 'probabilidad-estadistica' }
    ]
  },
  {
    id: 'diseno-producto',
    nombre: 'Diseño del Producto',
    requisitos: [
      { tipo: 'cursada', materiaId: 'informatica-2' },
      { tipo: 'cursada', materiaId: 'comercializacion' },
      { tipo: 'aprobada', materiaId: 'sistemas-representacion' },
      { tipo: 'aprobada', materiaId: 'informatica-1' },
      { tipo: 'aprobada', materiaId: 'administracion-gral' },
      { tipo: 'aprobada', materiaId: 'probabilidad-estadistica' },
      { tipo: 'aprobada', materiaId: 'economia-gral' }
    ]
  },
  {
    id: 'ingles-2',
    nombre: 'Ingles II',
    requisitos: [
      { tipo: 'cursada', materiaId: 'ingles-1' }
    ]
  },
  {
    id: 'instalaciones-industriales',
    nombre: 'Instalaciones Industriales',
    requisitos: [
      { tipo: 'cursada', materiaId: 'termodinamica-maquinas-termicas' },
      { tipo: 'cursada', materiaId: 'estatica-resistencia-materiales' },
      { tipo: 'cursada', materiaId: 'mecanica-fluidos' },
      { tipo: 'cursada', materiaId: 'electrotecnia-maquinas-electricas' },
      { tipo: 'aprobada', materiaId: 'quimica-gral' },
      { tipo: 'aprobada', materiaId: 'analisis-mat-2' },
      { tipo: 'aprobada', materiaId: 'ciencia-materiales' },
      { tipo: 'aprobada', materiaId: 'fisica-2' }
    ]
  },
  {
    id: 'legislacion',
    nombre: 'Legislación',
    requisitos: [
      { tipo: 'aprobada', materiaId: 'administracion-gral' }
    ]
  },
  {
    id: 'mantenimiento',
    nombre: 'Mantenimiento',
    requisitos: [
      { tipo: 'cursada', materiaId: 'instalaciones-industriales' },
      { tipo: 'aprobada', materiaId: 'termodinamica-maquinas-termicas' },
      { tipo: 'aprobada', materiaId: 'estatica-resistencia-materiales' },
      { tipo: 'aprobada', materiaId: 'electrotecnia-maquinas-electricas' }
    ]
  },
  {
    id: 'manejo-materiales-distribucion-plantas',
    nombre: 'Manejo de Materiales y Distribución de Plantas',
    requisitos: [
      { tipo: 'cursada', materiaId: 'estudio-trabajo' },
      { tipo: 'cursada', materiaId: 'mecanica-mecanismos' },
      { tipo: 'aprobada', materiaId: 'analisis-mat-2' },
      { tipo: 'aprobada', materiaId: 'administracion-gral' },
      { tipo: 'aprobada', materiaId: 'estatica-resistencia-materiales' }
    ]
  },
  {
    id: 'comercio-exterior',
    nombre: 'Comercio Exterior',
    requisitos: [
      { tipo: 'cursada', materiaId: 'evaluacion-proyectos' },
      { tipo: 'aprobada', materiaId: 'estudio-trabajo' },
      { tipo: 'aprobada', materiaId: 'comercializacion' },
      { tipo: 'aprobada', materiaId: 'economia-empresa' }
    ]
  },
  {
    id: 'relaciones-industriales',
    nombre: 'Relaciones Industriales',
    requisitos: [
      { tipo: 'cursada', materiaId: 'estudio-trabajo' },
      { tipo: 'aprobada', materiaId: 'administracion-gral' },
      { tipo: 'aprobada', materiaId: 'probabilidad-estadistica' }
    ]
  },
  {
    id: 'ingenieria-calidad',
    nombre: 'Ingeniería en Calidad',
    requisitos: [
      { tipo: 'cursada', materiaId: 'estudio-trabajo' },
      { tipo: 'aprobada', materiaId: 'administracion-gral' },
      { tipo: 'aprobada', materiaId: 'probabilidad-estadistica' }
    ]
  },
  {
    id: 'control-gestion',
    nombre: 'Control de Gestión',
    requisitos: [
      { tipo: 'cursada', materiaId: 'costos-presupuestos' },
      { tipo: 'cursada', materiaId: 'economia-empresa' },
      { tipo: 'aprobada', materiaId: 'administracion-gral' },
      { tipo: 'aprobada', materiaId: 'economia-gral' }
    ]
  },
  {
    id: 'proyecto-final',
    nombre: 'Proyecto Final',
    requisitos: [
      { tipo: 'cursada', materiaId: 'analisis-numerico-calculo-avanzado' },
      { tipo: 'cursada', materiaId: 'seguridad-higiene-ingenieria-ambiental' },
      { tipo: 'cursada', materiaId: 'investigacion-operativa' },
      { tipo: 'cursada', materiaId: 'procesos-industriales' },
      { tipo: 'cursada', materiaId: 'evaluacion-proyectos' },
      { tipo: 'cursada', materiaId: 'planificacion-control-produccion' },
      { tipo: 'aprobada', materiaId: 'estudio-trabajo' },
      { tipo: 'aprobada', materiaId: 'comercializacion' },
      { tipo: 'aprobada', materiaId: 'termodinamica-maquinas-termicas' },
      { tipo: 'aprobada', materiaId: 'estatica-resistencia-materiales' },
      { tipo: 'aprobada', materiaId: 'mecanica-fluidos' },
      { tipo: 'aprobada', materiaId: 'economia-empresa' },
      { tipo: 'aprobada', materiaId: 'electrotecnia-maquinas-electricas' },
      { tipo: 'aprobada', materiaId: 'ingles-2' }
    ]
  },
  {
    id: 'practica-profesional-supervisada',
    nombre: 'Práctica Profesional Supervisada',
    requisitos: [
      { tipo: 'cursada', materiaId: 'analisis-numerico-calculo-avanzado' },
      { tipo: 'cursada', materiaId: 'seguridad-higiene-ingenieria-ambiental' },
      { tipo: 'cursada', materiaId: 'investigacion-operativa' },
      { tipo: 'cursada', materiaId: 'procesos-industriales' },
      { tipo: 'cursada', materiaId: 'evaluacion-proyectos' },
      { tipo: 'cursada', materiaId: 'planificacion-control-produccion' },
      { tipo: 'aprobada', materiaId: 'estudio-trabajo' },
      { tipo: 'aprobada', materiaId: 'comercializacion' },
      { tipo: 'aprobada', materiaId: 'termodinamica-maquinas-termicas' },
      { tipo: 'aprobada', materiaId: 'estatica-resistencia-materiales' },
      { tipo: 'aprobada', materiaId: 'mecanica-fluidos' },
      { tipo: 'aprobada', materiaId: 'economia-empresa' },
      { tipo: 'aprobada', materiaId: 'electrotecnia-maquinas-electricas' },
      { tipo: 'aprobada', materiaId: 'ingles-2' }
    ]
  }
];

