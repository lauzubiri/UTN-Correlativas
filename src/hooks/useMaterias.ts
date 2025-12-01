import { useState, useEffect } from 'react';
import { materias } from '../data/materias';
import type { Materia } from '../data/types';

export function useMaterias() {
  const [aprobadas, setAprobadas] = useState<string[]>([]);

  // Carga inicial desde localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const guardadas = localStorage.getItem('aprobadas');
      if (guardadas) setAprobadas(JSON.parse(guardadas));
    }
  }, []);

  // Persistencia automática
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('aprobadas', JSON.stringify(aprobadas));
    }
  }, [aprobadas]);

  const estaHabilitada = (materia: Materia) => {
    if (materia.correlativas.length === 0) return true;
    return materia.correlativas.every(c => aprobadas.includes(c));
  };

  // --- LÓGICA RECURSIVA ---

  // 1. Busca hacia adelante (Hijos/Nietos)
  // Se usa al DESMARCAR para limpiar en cascada el futuro
  const obtenerDescendientes = (idPadre: string): string[] => {
    const hijosDirectos = materias
      .filter(m => m.correlativas.includes(idPadre))
      .map(m => m.id);

    let todos = [...hijosDirectos];
    hijosDirectos.forEach(h => todos = [...todos, ...obtenerDescendientes(h)]);
    return todos;
  };

  // 2. Busca hacia atrás (Padres/Abuelos)
  // Se usa al APROBAR EL AÑO para completar requisitos automáticamente
  const obtenerAntecesores = (idMateria: string): string[] => {
    const materia = materias.find(m => m.id === idMateria);
    if (!materia) return [];

    let antecesores = [...materia.correlativas];
    materia.correlativas.forEach(corrId => {
      antecesores = [...antecesores, ...obtenerAntecesores(corrId)];
    });
    return antecesores;
  };

  // --- ACCIONES ---

  const toggleMateria = (id: string) => {
    if (aprobadas.includes(id)) {
      // Al desmarcar individualmente, limpiamos dependencias futuras
      const dependientes = obtenerDescendientes(id);
      const idsAEliminar = [id, ...dependientes];
      setAprobadas(aprobadas.filter(aprobadaId => !idsAEliminar.includes(aprobadaId)));
    } else {
      setAprobadas([...aprobadas, id]);
    }
  };

  const toggleAnio = (anio: number) => {
    const idsDelAnio = materias.filter(m => m.anio === anio).map(m => m.id);
    const estanTodasAprobadas = idsDelAnio.every(id => aprobadas.includes(id));

    if (estanTodasAprobadas) {
      // CASO DESMARCAR: Quitamos las del año y sus consecuencias futuras
      let idsAEliminar = [...idsDelAnio];
      idsDelAnio.forEach(id => {
        idsAEliminar = [...idsAEliminar, ...obtenerDescendientes(id)];
      });
      setAprobadas(prev => prev.filter(id => !idsAEliminar.includes(id)));

    } else {
      // CASO APROBAR: Agregamos las del año y sus requisitos pasados
      let aAprobar = [...idsDelAnio];
      idsDelAnio.forEach(id => {
        aAprobar = [...aAprobar, ...obtenerAntecesores(id)];
      });
      
      // Usamos Set para evitar duplicados si un requisito ya estaba aprobado
      setAprobadas(prev => [...new Set([...prev, ...aAprobar])]);
    }
  };

  return { aprobadas, toggleMateria, toggleAnio, estaHabilitada };
}