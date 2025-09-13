import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Logo da Paróquia */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-white rounded-full shadow-lg flex items-center justify-center mb-6">
            {/* Placeholder para o logo - você pode substituir por uma imagem real */}
            <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">CR</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            Paróquia Cristo Rei
          </h1>
          <p className="text-lg text-gray-600">
            Uma comunidade de fé e amor
          </p>
        </div>

        {/* Mensagem em breve */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Em Breve
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Estamos preparando algo especial para você. 
            Em breve, nosso novo site estará no ar com todas as informações 
            sobre nossa comunidade paroquial.
          </p>
          
          {/* Seções que estarão disponíveis */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-2xl mb-2">⛪</div>
              <p className="text-sm font-medium text-gray-700">Horários de Missas</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-2xl mb-2">👶</div>
              <p className="text-sm font-medium text-gray-700">Batismos</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="text-2xl mb-2">💒</div>
              <p className="text-sm font-medium text-gray-700">Casamentos</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="text-2xl mb-2">🎓</div>
              <p className="text-sm font-medium text-gray-700">Catequese</p>
            </div>
          </div>
        </div>

        {/* Informações de contato */}
        <div className="text-center text-gray-600">
          <p className="mb-2">
            <strong>Endereço:</strong> [Endereço da paróquia]
          </p>
          <p className="mb-2">
            <strong>Telefone:</strong> [Telefone da paróquia]
          </p>
          <p>
            <strong>Email:</strong> [Email da paróquia]
          </p>
        </div>

        {/* Data de lançamento estimada */}
        <div className="mt-8 text-sm text-gray-500">
          <p>Site em desenvolvimento • Lançamento previsto para dezembro 2024</p>
        </div>
      </div>
    </main>
  )
}