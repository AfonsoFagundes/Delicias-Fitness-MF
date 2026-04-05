interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    // Overlay
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">

      // Caixa do modal
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl animate-in fade-in zoom-in duration-200 overflow-hidden">

        {/* Linha de cor no topo — igual aos metric cards */}
        <div className="h-0.5 w-full bg-gradient-to-r from-green-400 to-green-600" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-green-50 rounded-lg flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h3 className="font-bold text-sm text-slate-800">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors text-lg leading-none"
          >
            &times;
          </button>
        </div>

        {/* Corpo */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {children}
        </div>

      </div>
    </div>
  );
};