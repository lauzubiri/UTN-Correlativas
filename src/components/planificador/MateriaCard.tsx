import type { Materia } from '../../data/types';

interface Props {
  materia: Materia;
  aprobada: boolean;
  habilitada: boolean;
  highlighted: boolean;
  onClick: (e: React.MouseEvent) => void;
}

export default function MateriaCard({ materia, aprobada, habilitada, highlighted, onClick }: Props) {
  return (
    <label
      id={materia.id}
      onClick={onClick}
      className={`
        relative p-3 border rounded-lg shadow-sm transition-all duration-300 flex items-center gap-3 mx-5 select-none z-20 bg-white
        ${highlighted 
            ? 'ring-4 ring-orange-300 border-orange-500 shadow-xl scale-105 z-40' 
            : ''
        }
        ${aprobada
          ? 'bg-green-50 border-green-500 ring-1 ring-green-500 cursor-pointer'
          : habilitada
            ? 'bg-white hover:border-blue-400 hover:shadow-md cursor-pointer'
            : 'bg-gray-100 border-gray-200 opacity-80 cursor-help'
        }
      `}
    >
      <input
        type="checkbox"
        className={`
            w-5 h-5 rounded focus:ring-blue-500 pointer-events-none transition-colors
            ${highlighted ? 'text-orange-500' : 'text-blue-600'}
        `}
        checked={aprobada}
        readOnly
      />
      <div className="flex-1">
        <p className={`text-sm font-medium transition-colors ${
            highlighted ? 'text-orange-900 font-bold' :
            aprobada ? 'text-green-900' : 'text-gray-700'
        }`}>
          {materia.nombre}
        </p>
        <p className="text-[10px] text-gray-500 uppercase tracking-wider">
          {materia.cuatrimestre}
        </p>
      </div>
    </label>
  );
}