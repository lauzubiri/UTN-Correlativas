import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase'; 
import type { Materia } from '../data/types';  

export const useMaterias = (carreraId: string, userId?: string | null) => {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [aprobadas, setAprobadas] = useState<string[]>([]);
  const [cursadas, setCursadas] = useState<string[]>([]); // 1. NUEVO ESTADO

  // Cargar el catálogo de materias
  useEffect(() => {
    const fetchMaterias = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('materias')
        .select('*')
        .eq('carrera_id', carreraId);

      if (error) setError(error.message);
      else setMaterias(data as Materia[]);
      setLoading(false);
    };
    fetchMaterias();
  }, [carreraId]);

  // Cargar el progreso (SOLO LECTURA)
  useEffect(() => {
    const cargarProgreso = async () => {
      if (userId) {
        const { data } = await supabase
          .from('progreso_usuarios')
          .select('materias_aprobadas, materias_cursadas') // 2. TRAEMOS AMBOS
          .eq('user_id', userId)
          .maybeSingle(); 

        if (data) {
          setAprobadas(data.materias_aprobadas || []);
          setCursadas(data.materias_cursadas || []);
        } else {
          setAprobadas([]);
          setCursadas([]);
        }
      } else {
        if (typeof window !== 'undefined') {
          const savedA = localStorage.getItem('materiasAprobadas');
          const savedC = localStorage.getItem('materiasCursadas');
          setAprobadas(savedA ? JSON.parse(savedA) : []);
          setCursadas(savedC ? JSON.parse(savedC) : []);
        }
      }
    };
    cargarProgreso();
  }, [userId]); 

  // Función de GUARDADO DIRECTO
  const guardarProgresoSeguro = async (nuevasAprobadas: string[], nuevasCursadas: string[]) => {
    if (userId) {
      const { error } = await supabase
        .from('progreso_usuarios')
        .upsert({
          user_id: userId,
          materias_aprobadas: nuevasAprobadas,
          materias_cursadas: nuevasCursadas // 3. GUARDAMOS AMBOS
        });
      if (error) console.error("Error guardando progreso:", error);
    } else {
      localStorage.setItem('materiasAprobadas', JSON.stringify(nuevasAprobadas));
      localStorage.setItem('materiasCursadas', JSON.stringify(nuevasCursadas));
    }
  };

  // --- FUNCIONES RECURSIVAS ---
  const getTodasLasCorrelativas = (materiaId: string, visitadas = new Set<string>()): string[] => {
    if (visitadas.has(materiaId)) return [];
    visitadas.add(materiaId);
    const materia = materias.find(m => m.id === materiaId);
    if (!materia || !materia.requisitos) return [];
    const directas = materia.requisitos.filter(r => r.materiaId).map(r => r.materiaId as string);
    let todas = [...directas];
    for (const req of directas) todas = [...todas, ...getTodasLasCorrelativas(req, visitadas)];
    return todas;
  };

  const getTodasLasDependientes = (materiaId: string, visitadas = new Set<string>()): string[] => {
    if (visitadas.has(materiaId)) return [];
    visitadas.add(materiaId);
    const dependientesDirectas = materias.filter(m => m.requisitos?.some(r => r.materiaId === materiaId)).map(m => m.id);
    let todas = [...dependientesDirectas];
    for (const dep of dependientesDirectas) todas = [...todas, ...getTodasLasDependientes(dep, visitadas)];
    return todas;
  };

  // --- LÓGICA DE INTERFAZ (EL CICLO DE 3 ESTADOS) ---
  const toggleMateria = (id: string) => {
    const estaAprobada = aprobadas.includes(id);
    const estaCursada = cursadas.includes(id);
    let nuevasAprobadas = [...aprobadas];
    let nuevasCursadas = [...cursadas];

    if (!estaCursada && !estaAprobada) {
      // 1. NADA -> CURSADA
      nuevasCursadas.push(id);
    } else if (estaCursada) {
      // 2. CURSADA -> APROBADA
      nuevasCursadas = nuevasCursadas.filter(m => m !== id);
      nuevasAprobadas.push(id);
    } else {
      // 3. APROBADA -> NADA
      const dependientes = getTodasLasDependientes(id);
      const paraSacar = new Set([id, ...dependientes]);
      nuevasAprobadas = nuevasAprobadas.filter(m => !paraSacar.has(m));
      nuevasCursadas = nuevasCursadas.filter(m => !paraSacar.has(m));
    }

    setAprobadas(nuevasAprobadas);
    setCursadas(nuevasCursadas);
    guardarProgresoSeguro(nuevasAprobadas, nuevasCursadas);
  };

  const toggleAnio = (anio: number) => {
    const materiasDelAnio = materias.filter(m => m.anio === anio).map(m => m.id);
    const estanTodasAprobadas = materiasDelAnio.every(id => aprobadas.includes(id));
    let nuevasAprobadas: string[];
    let nuevasCursadas = [...cursadas];

    if (estanTodasAprobadas) {
        const paraSacar = new Set<string>(materiasDelAnio);
        materiasDelAnio.forEach(id => getTodasLasDependientes(id).forEach(dep => paraSacar.add(dep)));
        nuevasAprobadas = aprobadas.filter(id => !paraSacar.has(id));
        nuevasCursadas = cursadas.filter(id => !paraSacar.has(id));
    } else {
        const paraAgregar = new Set<string>(materiasDelAnio);
        materiasDelAnio.forEach(id => getTodasLasCorrelativas(id).forEach(req => paraAgregar.add(req)));
        nuevasAprobadas = [...new Set([...aprobadas, ...paraAgregar])];
        nuevasCursadas = nuevasCursadas.filter(id => !nuevasAprobadas.includes(id)); // Sacamos cursadas si ya las aprobamos
    }

    setAprobadas(nuevasAprobadas);
    setCursadas(nuevasCursadas);
    guardarProgresoSeguro(nuevasAprobadas, nuevasCursadas);
  };

  const estaHabilitada = (materia: Materia) => {
    if (!materia.requisitos || materia.requisitos.length === 0) return true;
    return materia.requisitos.every(req => {
      // Regla: Para habilitarla, el requisito debe estar al menos cursado
      return req.materiaId ? (aprobadas.includes(req.materiaId) || cursadas.includes(req.materiaId)) : false;
    });
  };

  return { materias, loading, error, aprobadas, cursadas, toggleMateria, toggleAnio, estaHabilitada };
};