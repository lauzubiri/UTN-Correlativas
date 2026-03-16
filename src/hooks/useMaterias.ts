import { useState, useEffect } from 'react';
import type { Materia } from '../data/types';

export const useMaterias = (materias: Materia[]) => {
  const [aprobadas, setAprobadas] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('materiasAprobadas');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('materiasAprobadas', JSON.stringify(aprobadas));
  }, [aprobadas]);

  // --- FUNCIONES RECURSIVAS DE GRAFOS ---

  // 1. Buscar hacia atrás: Obtiene todas las correlativas requeridas (y las requeridas de las requeridas)
  const getTodasLasCorrelativas = (materiaId: string, visitadas = new Set<string>()): string[] => {
    if (visitadas.has(materiaId)) return [];
    visitadas.add(materiaId);
    
    const materia = materias.find(m => m.id === materiaId);
    if (!materia || !materia.requisitos) return [];
    
    const directas = materia.requisitos
      .filter(r => r.materiaId)
      .map(r => r.materiaId as string);
       
    let todas = [...directas];
    for (const req of directas) {
      todas = [...todas, ...getTodasLasCorrelativas(req, visitadas)];
    }
    return todas;
  };

  // 2. Buscar hacia adelante: Obtiene todas las materias que tienen a esta como requisito
  const getTodasLasDependientes = (materiaId: string, visitadas = new Set<string>()): string[] => {
    if (visitadas.has(materiaId)) return [];
    visitadas.add(materiaId);
    
    const dependientesDirectas = materias
      .filter(m => m.requisitos?.some(r => r.materiaId === materiaId))
      .map(m => m.id);
      
    let todas = [...dependientesDirectas];
    for (const dep of dependientesDirectas) {
      todas = [...todas, ...getTodasLasDependientes(dep, visitadas)];
    }
    return todas;
  };

  // --- LÓGICA DE INTERFAZ ---

  const toggleMateria = (id: string) => {
    setAprobadas(prev => {
      const estaAprobada = prev.includes(id);

      if (estaAprobada) {
        // DESMARCAR INDIVIDUAL: Saco esta materia y todas las que dependen de ella hacia el futuro
        const dependientes = getTodasLasDependientes(id);
        const paraSacar = new Set([id, ...dependientes]);
        return prev.filter(m => !paraSacar.has(m));
      } else {
        // MARCAR INDIVIDUAL: Solo marco esta materia. 
        // (Si el usuario pudo hacer clic, el componente index.tsx ya validó que cumple los requisitos)
        return [...prev, id];
      }
    });
  };

  const toggleAnio = (anio: number) => {
    const materiasDelAnio = materias.filter(m => m.anio === anio).map(m => m.id);
    const estanTodasAprobadas = materiasDelAnio.every(id => aprobadas.includes(id));

    setAprobadas(prev => {
       if (estanTodasAprobadas) {
          // DESMARCAR AÑO: Saco las de este año y todas sus dependientes futuras
          const paraSacar = new Set<string>(materiasDelAnio);
          materiasDelAnio.forEach(id => {
             getTodasLasDependientes(id).forEach(dep => paraSacar.add(dep));
          });
          return prev.filter(id => !paraSacar.has(id));
       } else {
          // MARCAR AÑO: Agrego las de este año y todas sus correlativas pasadas
          const paraAgregar = new Set<string>(materiasDelAnio);
          materiasDelAnio.forEach(id => {
             getTodasLasCorrelativas(id).forEach(req => paraAgregar.add(req));
          });
          return [...new Set([...prev, ...paraAgregar])];
       }
    });
  };

  const estaHabilitada = (materia: Materia) => {
    if (!materia.requisitos || materia.requisitos.length === 0) return true;
    return materia.requisitos.every(req => {
      switch (req.tipo) {
        case 'aprobada':
        case 'cursada':
          return req.materiaId ? aprobadas.includes(req.materiaId) : false;
        case 'finales_cantidad':
          return aprobadas.length >= (req.cantidad || 0);
        default:
          return true;
      }
    });
  };

  return { aprobadas, toggleMateria, toggleAnio, estaHabilitada };
};