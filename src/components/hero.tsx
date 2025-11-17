export function Hero() {
  return (

    <section className="px-8 py-20 text-white">
      
      <div className="rounded-2xl bg-linear-to-r from-green-700 to-indigo-900 p-16 flex">
        
        <div className="w-1/2 flex flex-col justify-center">
          <h1 className="text-5xl font-bold leading-tight">
            Domine a Arte da
            <br />
            <span className="text-blue-300">Engenharia de Prompt</span>
          </h1>

          <p className="mt-6 text-lg text-gray-200">
            Aprenda a criar prompts eficazes através de uma experiência
            gamificada e divertida. Receba feedback inteligente da IA e
            evolua suas habilidades!
          </p>

          {/* Botões */}
          <div className="mt-10 flex gap-4">
            <button 
              className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg shadow-lg
                         transition-transform transform hover:scale-105"
            >
              Começar Agora
            </button>
            <button 
              className="px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg
                         transition-colors hover:bg-white hover:text-gray-900"
            >
              Saiba Mais
            </button>
          </div>
        </div>

        {/* Metade direita (fica vazia, apenas com o gradiente) */}
        <div className="w-1/2">
          {/* Você pode adicionar uma ilustração 3D ou imagem aqui mais tarde */}
        </div>

      </div>
    </section>
  );
}