import type { Materia } from '../../data/types';

interface MateriaCardProps {
  materia: Materia;
  aprobada: boolean;
  habilitada: boolean;
  highlighted: boolean;
  onClick: (e: React.MouseEvent) => void;
}

export default function MateriaCard({
  materia,
  aprobada,
  habilitada,
  highlighted,
  onClick
}: MateriaCardProps) {
  
  // 1. Clases base que tienen todas las tarjetas (transiciones, bordes curvos, etc.)
  let cardClasses = "relative p-4 rounded-xl border transition-all duration-300 cursor-pointer select-none flex items-center justify-between group ";
  let textClasses = "font-medium transition-colors text-sm md:text-base ";

  // 2. Lógica de estados visuales
  if (highlighted) {
    // ESTADO: Faltan correlativas (El usuario hizo clic y tiró error)
    cardClasses += "bg-rose-900/20 border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)] animate-pulse ";
    textClasses += "text-rose-200";
  } else if (aprobada) {
    // ESTADO: Aprobada
    cardClasses += "bg-emerald-900/20 border-emerald-500/50 hover:bg-emerald-900/40 hover:border-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.1)] ";
    textClasses += "text-emerald-400";
  } else if (habilitada) {
    // ESTADO: Se puede cursar (Habilitada)
    cardClasses += "bg-slate-800 border-slate-600 hover:border-indigo-400 hover:bg-slate-700 shadow-sm hover:shadow-[0_0_15px_rgba(99,102,241,0.2)] hover:-translate-y-0.5 ";
    textClasses += "text-slate-200 group-hover:text-white";
  } else {
    // ESTADO: Bloqueada por correlativas
    cardClasses += "bg-slate-800/30 border-slate-700/50 opacity-60 hover:opacity-100 ";
    textClasses += "text-slate-500";
  }

  return (
    <div className={cardClasses} onClick={onClick}>
      <span className={textClasses}>{materia.nombre}</span>
      
      {/* 3. Iconos indicadores (Mejora mucho la Experiencia de Usuario) */}
      <div className="ml-3 shrink-0 transition-transform duration-300 group-hover:scale-110">
        {aprobada && (
          // Icono de Check (Tilde) para aprobadas
          <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        )}
        {!aprobada && !habilitada && !highlighted && (
          // Icono de Candado para las bloqueadas
          <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        )}
      </div>
    </div>
  );
}