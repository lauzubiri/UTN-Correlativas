import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase'; 
import type { Materia } from '../data/types';  

export const useMaterias = (carreraId: string, userId?: string | null) => {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [aprobadas, setAprobadas] = useState<string[]>([]);

  // 1. Cargar el catálogo de materias de la nube
  useEffect(() => {
    const fetchMaterias = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('materias')
        .select('*')
        .eq('carrera_id', carreraId);

      if (error) {
        setError(error.message);
      } else {
        setMaterias(data as Materia[]);
      }
      setLoading(false);
    };

    fetchMaterias();
  }, [carreraId]);

  // 2. Cargar el progreso (SOLO LECTURA)
  useEffect(() => {
    const cargarProgreso = async () => {
      if (userId) {
        // Logueado: Buscar en la nube
        const { data } = await supabase
          .from('progreso_usuarios')
          .select('materias_aprobadas')
          .eq('user_id', userId)
          .maybeSingle(); 

        if (data && data.materias_aprobadas) {
          setAprobadas(data.materias_aprobadas);
        } else {
          setAprobadas([]); // Alumno nuevo
        }
      } else {
        // Invitado: Buscar en la memoria del navegador
        if (typeof window !== 'undefined') {
          const saved = localStorage.getItem('materiasAprobadas');
          setAprobadas(saved ? JSON.parse(saved) : []);
        }
      }
    };

    cargarProgreso();
  }, [userId]); 

  // --- GUARDADO DIRECTO ---
  // Esta función se llama EXCLUSIVAMENTE cuando el usuario hace clic.
  const guardarProgresoSeguro = async (nuevasAprobadas: string[]) => {
    if (userId) {
      const { error } = await supabase
        .from('progreso_usuarios')
        .upsert({
          user_id: userId,
          materias_aprobadas: nuevasAprobadas
        });
      if (error) console.error("Error guardando progreso:", error);
    } else {
      localStorage.setItem('materiasAprobadas', JSON.stringify(nuevasAprobadas));
    }
  };

  // --- FUNCIONES RECURSIVAS DE GRAFOS ---
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
    const estaAprobada = aprobadas.includes(id);
    let nuevasAprobadas: string[];

    if (estaAprobada) {
      const dependientes = getTodasLasDependientes(id);
      const paraSacar = new Set([id, ...dependientes]);
      nuevasAprobadas = aprobadas.filter(m => !paraSacar.has(m));
    } else {
      nuevasAprobadas = [...aprobadas, id];
    }

    setAprobadas(nuevasAprobadas);
    guardarProgresoSeguro(nuevasAprobadas);
  };

  const toggleAnio = (anio: number) => {
    const materiasDelAnio = materias.filter(m => m.anio === anio).map(m => m.id);
    const estanTodasAprobadas = materiasDelAnio.every(id => aprobadas.includes(id));
    let nuevasAprobadas: string[];

    if (estanTodasAprobadas) {
        const paraSacar = new Set<string>(materiasDelAnio);
        materiasDelAnio.forEach(id => {
            getTodasLasDependientes(id).forEach(dep => paraSacar.add(dep));
        });
        nuevasAprobadas = aprobadas.filter(id => !paraSacar.has(id));
    } else {
        const paraAgregar = new Set<string>(materiasDelAnio);
        materiasDelAnio.forEach(id => {
            getTodasLasCorrelativas(id).forEach(req => paraAgregar.add(req));
        });
        nuevasAprobadas = [...new Set([...aprobadas, ...paraAgregar])];
    }

    setAprobadas(nuevasAprobadas);
    guardarProgresoSeguro(nuevasAprobadas);
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

  return { 
    materias, 
    loading, 
    error, 
    aprobadas, 
    toggleMateria, 
    toggleAnio, 
    estaHabilitada 
  };
};