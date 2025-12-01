interface ToastProps {
  titulo: string;
  items: string[];
  onClose: () => void;
}

export default function Toast({ titulo, items, onClose }: ToastProps) {
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in-up">
      <div className="bg-[#323232] text-white pl-4 pr-6 py-4 rounded shadow-2xl border-l-[6px] border-orange-500 max-w-sm md:max-w-md flex flex-col gap-2">
        <div className="flex justify-between items-start gap-4">
          <div className="flex items-center gap-2">
            <span className="text-orange-400 text-lg">⚠️</span>
            <p className="font-bold text-white tracking-wide text-sm">{titulo}</p>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white transition-colors text-lg leading-none"
          >
            ✕
          </button>
        </div>
        
        {items.length > 0 && (
           <ul className="list-disc list-inside text-xs text-gray-300 pl-7 space-y-1">
             {items.map(item => (
               <li key={item}>{item}</li>
             ))}
           </ul>
        )}
      </div>
    </div>
  );
}