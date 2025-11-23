export interface ResultadoModalProps {
  open: boolean;
  nota: number | null;
  feedback?: string; 
  xp?: number;
  passou: boolean;
  onClose: () => void;
  onRetry: () => void;
  onNext?: () => void;
}

export function ResultadoModal({
  open,
  nota,
  feedback, 
  xp,
  passou,
  onClose,
  onRetry,
  onNext
}: ResultadoModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 p-8 rounded-xl shadow-2xl w-full max-w-2xl animate-fadeIn border border-gray-700 flex flex-col max-h-[90vh]">

        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2">
            {passou ? (
              <span className="text-green-400">🎉 Parabéns!</span>
            ) : (
              <span className="text-red-400">😓 Quase lá!</span>
            )}
          </h2>

          <div className="text-gray-300 text-lg">
            Sua nota: <strong className={passou ? "text-green-400 text-2xl" : "text-red-400 text-2xl"}>{nota}</strong>
          </div>

          {passou && xp && (
            <div className="mt-2 inline-block bg-green-900/30 px-4 py-1 rounded-full border border-green-500/30">
              <span className="text-green-400 font-bold text-sm">+{xp} XP Conquistado</span>
            </div>
          )}
        </div>

        {/* Área de Feedback com Scroll */}
        {feedback && (
          <div className="bg-gray-800 rounded-lg p-6 mb-6 overflow-y-auto flex-1 border border-gray-700 text-left shadow-inner">
            <h3 className="text-gray-400 font-bold mb-3 uppercase text-xs tracking-wider border-b border-gray-700 pb-2">
              Análise da IA
            </h3>
            <div className="prose prose-invert prose-sm max-w-none text-gray-300 whitespace-pre-wrap leading-relaxed">
              {feedback}
            </div>
          </div>
        )}

        {/* Botões de Ação */}
        <div className="flex gap-3 justify-end mt-auto pt-4 border-t border-gray-800">
          <button
            className="px-5 py-2.5 rounded-lg font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
            onClick={onClose}
          >
            Fechar
          </button>

          <button
            className="bg-gray-700 hover:bg-gray-600 px-5 py-2.5 rounded-lg font-medium text-white transition-colors"
            onClick={onRetry}
          >
            Tentar Novamente
          </button>

          {passou && onNext && (
            <button
              className="bg-green-600 hover:bg-green-700 px-6 py-2.5 rounded-lg font-bold text-white shadow-lg hover:shadow-green-900/20 transition-all transform hover:scale-105"
              onClick={onNext}
            >
              Próxima Atividade →
            </button>
          )}
        </div>

      </div>
    </div>
  );
}