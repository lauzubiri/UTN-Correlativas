import { useState, useEffect } from 'react';
import type { Materia } from '../../data/types';

import { useMaterias } from '../../hooks/useMaterias';
import { useDragScroll } from '../../hooks/useDragScroll';
import MateriaCard from './MateriaCard';
import Toast from './Toast';

type CarreraId = 'sistemas' | 'industrial';

const CARRERAS: { id: CarreraId; nombre: string }[] = [
  { id: 'sistemas', nombre: 'Ingeniería en Sistemas' },
  { id: 'industrial', nombre: 'Ingeniería Industrial' }
];

export default function Planificador() {
  const [selectedCarrera, setSelectedCarrera] = useState<CarreraId>('sistemas');
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let cancelled = false;
    const cargarMaterias = async () => {
      setLoading(true);
      try {
        switch (selectedCarrera) {
          case 'sistemas': {
            const mod = await import('../../data/sistemas');
            if (!cancelled) setMaterias(mod.materias as Materia[]);
            break;
          }
          case 'industrial': {
            const modInd: any = await import('../../data/industrial');
            const materiasAdaptadas: Materia[] = (modInd.materiasIndustrial || []).map((m: any) => ({
              id: m.id,
              nombre: m.nombre,
              anio: 1,
              cuatrimestre: 'Anual',
              correlativas: (m.requisitos || [])
                .filter((r: any) => r.materiaId)
                .map((r: any) => r.materiaId as string)
            }));
            if (!cancelled) setMaterias(materiasAdaptadas);
            break;
          }
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void cargarMaterias();

    return () => {
      cancelled = true;
    };
  }, [selectedCarrera]);

  const { aprobadas, toggleMateria, toggleAnio, estaHabilitada } = useMaterias(materias);
  const { sliderRef, isDown, startDrag, stopDrag, onDrag } = useDragScroll();

  const [toast, setToast] = useState<{ visible: boolean; titulo: string; faltantes: string[] } | null>(null);
  const [highlightedIds, setHighlightedIds] = useState<string[]>([]);

  // Auto-dismiss toast
  useEffect(() => {
    if (toast?.visible) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Clear highlighted items after 2s delay
  useEffect(() => {
    if (highlightedIds.length > 0) {
      const timer = setTimeout(() => setHighlightedIds([]), 2000);
      return () => clearTimeout(timer);
    }
  }, [highlightedIds]);

  const handleCardClick = (materia: Materia, e: React.MouseEvent) => {
    e.preventDefault();
    if (estaHabilitada(materia)) {
      toggleMateria(materia.id);
    } else {
      const faltantesIds = materia.correlativas.filter(id => !aprobadas.includes(id));
      
      setHighlightedIds(faltantesIds);

      const nombresFaltantes = faltantesIds.map(id => materias.find(m => m.id === id)?.nombre || id);
      
      setToast({
        visible: true,
        titulo: `Falta aprobar correlativas para ${materia.nombre}`,
        faltantes: nombresFaltantes
      });
    }
  };

  const anios = [1, 2, 3, 4, 5];

  return (
    <>
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <label htmlFor="carrera-select" className="block text-sm font-medium text-gray-700 mb-1">
            Carrera
          </label>
          <select
            id="carrera-select"
            value={selectedCarrera}
            onChange={(e) => setSelectedCarrera(e.target.value as CarreraId)}
            className="block w-full md:w-72 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {CARRERAS.map((carrera) => (
              <option key={carrera.id} value={carrera.id}>
                {carrera.nombre}
              </option>
            ))}
          </select>
        </div>

        {loading && (
          <div className="text-sm text-gray-500">
            Cargando materias...
          </div>
        )}
      </div>

      <div
        ref={sliderRef}
        onMouseDown={startDrag}
        onMouseLeave={stopDrag}
        onMouseUp={stopDrag}
        onMouseMove={onDrag}
        className={`
          flex flex-col gap-8 md:flex-row md:gap-6 md:items-start
          overflow-x-auto pb-4 cursor-grab active:cursor-grabbing select-none relative
          ${isDown ? 'md:cursor-grabbing' : ''}
        `}
      >
        {loading && materias.length === 0 && (
          <div className="w-full text-center text-gray-500 py-10">
            Cargando mapa de materias...
          </div>
        )}

        {!loading && materias.length === 0 && (
          <div className="w-full text-center text-gray-500 py-10">
            No hay materias para la carrera seleccionada.
          </div>
        )}

        {!loading && materias.length > 0 && anios.map((anio) => {
          const materiasDelAnio = materias.filter(m => m.anio === anio);
          const aprobadasDelAnio = materiasDelAnio.filter(m => aprobadas.includes(m.id)).length;
          const totalDelAnio = materiasDelAnio.length;
          const estaCompleto = aprobadasDelAnio === totalDelAnio;

          return (
            <div key={anio} className="flex-1 min-w-[280px]">
              <div className="flex flex-col gap-2 mb-4 border-b-2 border-blue-500 pb-2 sticky top-0 bg-white z-30 shadow-sm pt-2">
                <div className="flex justify-between items-center pr-4 pl-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-gray-800">{anio}° Año</h3>
                    <span className={`text-xs font-mono px-2 py-0.5 rounded-full transition-colors ${estaCompleto ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-800'}`}>
                      {aprobadasDelAnio} / {totalDelAnio}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => toggleAnio(anio)}
                    className={`
                      text-xs font-bold px-2 py-1 rounded border transition-all
                      ${estaCompleto 
                        ? 'border-red-200 text-red-500 hover:bg-red-50' 
                        : 'border-blue-200 text-blue-600 hover:bg-blue-50'
                      }
                    `}
                  >
                    {estaCompleto ? 'Desmarcar' : 'Aprobar todo'}
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-3 px-2 md:px-0">
                {materiasDelAnio.map((materia) => (
                    <MateriaCard
                      key={materia.id}
                      materia={materia}
                      aprobada={aprobadas.includes(materia.id)}
                      habilitada={estaHabilitada(materia)}
                      highlighted={highlightedIds.includes(materia.id)}
                      onClick={(e) => handleCardClick(materia, e)}
                    />
                  ))} 
              </div>
            </div>
          );
        })}   
      </div>

      {toast && (
        <Toast 
          titulo={toast.titulo} 
          items={toast.faltantes} 
          onClose={() => setToast(null)} 
        />
      )}
    </>
  );
}