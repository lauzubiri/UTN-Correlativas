import { useState, useEffect } from 'react';
import type { Materia } from '../../data/types';
import { useMaterias } from '../../hooks/useMaterias';
import { useDragScroll } from '../../hooks/useDragScroll';
import { supabase } from '../../lib/supabase';
import MateriaCard from './MateriaCard';
import Toast from './Toast';

type CarreraId = 'sistemas' | 'industrial';

const CARRERAS: { id: CarreraId; nombre: string }[] = [
  { id: 'sistemas', nombre: 'Ingeniería en Sistemas' },
  { id: 'industrial', nombre: 'Ingeniería Industrial' }
];

export default function Planificador() {
  // --- ESTADOS DE AUTENTICACIÓN ---
  const [user, setUser] = useState<any>(null);
  const [isGuest, setIsGuest] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(true); // Para evitar el parpadeo inicial

  // Efecto para detectar sesión de Supabase
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthLoading(false); // Terminó de chequear
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) setIsGuest(false); // Si se loguea, ya no es invitado
    });

    return () => subscription.unsubscribe();
  }, []);

  // Funciones de Login y Logout
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin }
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsGuest(false); // Lo mandamos a la pantalla de login de nuevo
  };

  const handleGuestLogin = () => {
    setIsGuest(true);
  };

  // --- LOGICA DE MATERIAS Y UI ---
  const [selectedCarrera, setSelectedCarrera] = useState<CarreraId>('sistemas');
  const [toast, setToast] = useState<{ visible: boolean; titulo: string; faltantes: string[] } | null>(null);
  const [highlightedIds, setHighlightedIds] = useState<string[]>([]);

  const { materias, loading, error, aprobadas, cursadas, toggleMateria, toggleAnio, estaHabilitada } = useMaterias(selectedCarrera, user?.id);
  const { sliderRef, isDown, startDrag, stopDrag, onDrag } = useDragScroll();

  useEffect(() => {
    if (toast?.visible) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

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
      const faltantesIds = (materia.requisitos || []).filter(req => req.materiaId && !aprobadas.includes(req.materiaId)).map(req => req.materiaId as string);
      setHighlightedIds(faltantesIds);
      const nombresFaltantes = faltantesIds.map(id => materias.find(m => m.id === id)?.nombre || id);
      const requisitoFinales = (materia.requisitos || []).find(r => r.tipo === 'finales_cantidad');
      const faltanFinales = requisitoFinales && aprobadas.length < (requisitoFinales.cantidad || 0);
      if (faltanFinales) {
        nombresFaltantes.push(`Tener al menos ${requisitoFinales.cantidad} finales (Tenés ${aprobadas.length})`);
      }
      setToast({ visible: true, titulo: `Faltan requisitos para ${materia.nombre}`, faltantes: nombresFaltantes });
    }
  };

  const anios = [1, 2, 3, 4, 5];

  // ==========================================
  // 1. PANTALLA DE CARGA INICIAL
  // ==========================================
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // ==========================================
  // 2. PANTALLA DE LOGIN / LANDING
  // ==========================================
  if (!user && !isGuest) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="bg-slate-900/80 border border-slate-700/50 p-8 rounded-2xl shadow-2xl backdrop-blur-md max-w-md w-full text-center">
          
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight mb-2">UTN Correlativas</h1>
            <p className="text-slate-400">Planificá tu carrera, controlá tus finales y desbloqueá tu progreso.</p>
          </div>

          <div className="flex flex-col gap-4">
            <button 
              onClick={handleLogin} 
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition-all shadow-lg hover:shadow-indigo-500/25 font-semibold"
            >
              <svg className="w-5 h-5 bg-white rounded-full p-0.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continuar con Google
            </button>

            <div className="relative flex items-center py-2">
              <div className="grow border-t border-slate-700"></div>
              <span className="shrink-0 mx-4 text-slate-500 text-sm">o</span>
              <div className="grow border-t border-slate-700"></div>
            </div>

            <button 
              onClick={handleGuestLogin}
              className="w-full px-4 py-3 bg-slate-800 text-slate-300 border border-slate-700 rounded-xl hover:bg-slate-700 transition-all font-medium"
            >
              Probar como Invitado
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 3. PANTALLA DEL PLANIFICADOR (APP PRINCIPAL)
  // ==========================================
  return (
    <>
      <div className="my-6 flex flex-col md:flex-row justify-between items-center bg-slate-800/40 p-4 rounded-xl border border-slate-700/50 backdrop-blur-sm shadow-sm md:mx-5">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          {user ? (
            <p className="text-slate-300">
              Bienvenido/a, <span className="font-bold text-indigo-400">{user.user_metadata?.full_name || 'Estudiante'}</span>
            </p>
          ) : (
            <div>
              <p className="text-slate-300 font-medium">Modo Invitado</p>
              <p className="text-slate-400 text-sm">Tu progreso se guarda temporalmente en este navegador.</p>
            </div>
          )}
        </div>
        
        <div>
          {user ? (
            <button 
              onClick={handleLogout} 
              className="px-4 py-2 bg-rose-900/20 text-rose-400 border border-rose-800/50 rounded-lg hover:bg-rose-900/40 hover:border-rose-600 transition-all text-sm font-medium"
            >
              Cerrar Sesión
            </button>
          ) : (
            <button 
              onClick={() => setIsGuest(false)} 
              className="px-4 py-2 bg-indigo-600/20 text-indigo-400 border border-indigo-500/50 rounded-lg hover:bg-indigo-600/40 hover:border-indigo-400 transition-all text-sm font-medium"
            >
              Crear cuenta / Ingresar
            </button>
          )}
        </div>
      </div>

      {error ? (
        <div className="flex justify-center items-center min-h-[30vh]">
          <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg max-w-lg text-center backdrop-blur-sm shadow-xl">
            <strong className="font-bold block mb-2 text-red-400">Error cargando materias</strong>
            <span className="block">{error}</span>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div className="w-full px-5 md:w-72 md:ml-5">
              <label htmlFor="carrera-select" className="block text-sm font-medium text-slate-400 mb-2 tracking-wide uppercase">
                Seleccionar Carrera
              </label>
              <select
                id="carrera-select"
                value={selectedCarrera}
                onChange={(e) => setSelectedCarrera(e.target.value as CarreraId)}
                className="block w-full md:w-72 rounded-lg border border-slate-700 bg-slate-800/80 py-2.5 px-4 text-sm text-slate-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all backdrop-blur-sm"
                disabled={loading}
              >
                {CARRERAS.map((carrera) => (
                  <option key={carrera.id} value={carrera.id} className="bg-slate-800">
                    {carrera.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div
            ref={sliderRef}
            onMouseDown={startDrag}
            onMouseLeave={stopDrag}
            onMouseUp={stopDrag}
            onMouseMove={onDrag}
            className={`
              flex flex-col gap-8 md:flex-row md:gap-8 md:items-start
              overflow-x-auto pb-8 cursor-grab active:cursor-grabbing select-none relative scrollbar-hide
              ${isDown ? 'md:cursor-grabbing' : ''}
            `}
          >
            {loading ? (
              <div className="w-full flex flex-col items-center justify-center py-20">
                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
                <p className="mt-6 text-slate-400 font-medium tracking-wide animate-pulse">Sincronizando con la base de datos...</p>
              </div>
            ) : materias.length === 0 ? (
              <div className="w-full text-center text-slate-500 py-10">
                No hay materias para la carrera seleccionada.
              </div>
            ) : (
              anios.map((anio) => {
                const materiasDelAnio = materias.filter(m => m.anio === anio);
                if (materiasDelAnio.length === 0) return null;

                const aprobadasDelAnio = materiasDelAnio.filter(m => aprobadas.includes(m.id)).length;
                const totalDelAnio = materiasDelAnio.length;
                const estaCompleto = aprobadasDelAnio === totalDelAnio;

                return (
                  <div key={anio} className="flex-1 min-w-[300px]">
                    <div className="flex flex-col gap-2 mb-5 border-b-2 border-slate-800 pb-3 sticky top-0 bg-slate-900/95 backdrop-blur z-30 pt-2">
                      <div className="flex justify-between items-center pr-2 pl-2">
                        <div className="flex items-center gap-3">
                          <h3 className="text-xl font-bold text-slate-200">{anio}° Año</h3>
                          <span className={`text-xs font-mono px-2.5 py-1 rounded-md transition-colors border ${
                            estaCompleto 
                            ? 'bg-emerald-900/30 text-emerald-400 border-emerald-800/50' 
                            : 'bg-indigo-900/30 text-indigo-400 border-indigo-800/50'
                          }`}>
                            {aprobadasDelAnio} / {totalDelAnio}
                          </span>
                        </div>
                        
                        <button
                          onClick={() => toggleAnio(anio)}
                          className={`
                            text-xs font-bold px-3 py-1.5 rounded-md border transition-all duration-200
                            ${estaCompleto 
                              ? 'border-rose-900 text-rose-400 hover:bg-rose-900/30 hover:border-rose-700' 
                              : 'border-slate-700 text-slate-400 hover:text-indigo-400 hover:border-indigo-700 hover:bg-indigo-900/20'
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
                            cursada={cursadas.includes(materia.id)}
                            habilitada={estaHabilitada(materia)}
                            highlighted={highlightedIds.includes(materia.id)}
                            onClick={(e) => handleCardClick(materia, e)}
                          />
                        ))} 
                    </div>
                  </div>
                );
              })
            )}   
          </div>
        </>
      )}

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