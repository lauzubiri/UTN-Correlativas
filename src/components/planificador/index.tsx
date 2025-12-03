import { useState, useEffect } from 'react';
import { materias } from '../../data/materias';
import type { Materia } from '../../data/types';

import { useMaterias } from '../../hooks/useMaterias';
import { useDragScroll } from '../../hooks/useDragScroll';
import MateriaCard from './MateriaCard';
import Toast from './Toast';

export default function Planificador() {
  const { aprobadas, toggleMateria, toggleAnio, estaHabilitada } = useMaterias();
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
        {anios.map((anio) => {
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