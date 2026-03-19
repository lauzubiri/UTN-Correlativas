import type { Materia } from '../../data/types';

interface MateriaCardProps {
  materia: Materia;
  aprobada: boolean;
  cursada: boolean;
  habilitada: boolean;
  highlighted: boolean;
  onClick: (e: React.MouseEvent) => void;
}

export default function MateriaCard({
  materia,
  aprobada,
  cursada,
  habilitada,
  highlighted,
  onClick
}: MateriaCardProps) {
  
  let cardClasses = "relative p-4 rounded-xl border transition-all duration-300 cursor-pointer select-none flex items-center justify-between group ";
  let textClasses = "font-medium transition-colors text-sm md:text-base ";

  if (highlighted) {
    cardClasses += "bg-rose-900/20 border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)] animate-pulse ";
    textClasses += "text-rose-200";
  } else if (aprobada) {
    cardClasses += "bg-emerald-900/20 border-emerald-500/50 hover:bg-emerald-900/30 shadow-sm hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:-translate-y-0.5 ";
    textClasses += "text-emerald-400";
  } else if (cursada) {
    cardClasses += "bg-amber-900/20 border-amber-500/50 hover:bg-amber-900/30 shadow-sm hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:-translate-y-0.5 ";
    textClasses += "text-amber-400";
  } else if (habilitada) {
    cardClasses += "bg-slate-800 border-slate-600 hover:border-indigo-400 hover:bg-slate-700 shadow-sm hover:shadow-[0_0_15px_rgba(99,102,241,0.2)] hover:-translate-y-0.5 ";
    textClasses += "text-slate-200 group-hover:text-white";
  } else {
    cardClasses += "bg-slate-800/30 border-slate-700/50 opacity-60 hover:opacity-100 ";
    textClasses += "text-slate-500";
  }

  return (
    <div className={cardClasses} onClick={onClick}>
      <span className={textClasses}>{materia.nombre}</span>
      
      <div className="ml-3 shrink-0 transition-transform duration-300 group-hover:scale-110">
        {aprobada && (
          <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        )}
        

        {cursada && !aprobada && (
          <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        )}

        {!aprobada && !cursada && !habilitada && (
          <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        )}
      </div>
    </div>
  );
}