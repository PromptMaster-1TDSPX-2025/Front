export interface ResultadoModalProps {
  open: boolean;
  nota: number | null;
  xp?: number;          
  passou: boolean;      
  onClose: () => void;
  onRetry: () => void;
  onNext?: () => void;   
}

export function ResultadoModal({
  open,
  nota,
  xp,
  passou,
  onClose,
  onRetry,
  onNext
}: ResultadoModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-xl shadow-lg text-center w-96 animate-fadeIn">

        <h2 className="text-2xl font-bold mb-3">
          {passou ? (
            <span className="text-green-400">🎉 Parabéns!</span>
          ) : (
            <span className="text-red-400">😓 Quase lá!</span>
          )}
        </h2>

        <p className="text-gray-300 mb-4">
          Sua nota foi <strong>{nota}</strong>.
        </p>

        {passou && xp && (
          <p className="text-green-400 font-semibold mb-6">
            Você ganhou +{xp} XP!
          </p>
        )}

        <div className="flex flex-col gap-3">

          {/* Jogar novamente — aparece SEMPRE */}
          <button
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md text-white"
            onClick={onRetry}
          >
            Jogar novamente
          </button>

          {/* Continuar — só aparece se passou */}
          {passou && onNext && (
            <button
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md text-white"
              onClick={onNext}
            >
              Continuar → Próxima Atividade
            </button>
          )}

          {/* Fechar */}
          <button
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-white"
            onClick={onClose}
          >
            Fechar
          </button>

        </div>

      </div>
    </div>
  );
}
