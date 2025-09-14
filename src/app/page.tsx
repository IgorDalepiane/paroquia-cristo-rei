import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-red-50 to-red-100 flex flex-col items-center justify-center p-4">
      <div className="text-center">
        {/* Logo da Paróquia */}
        <div className="mb-12">
          <div className="w-40 h-40 mx-auto bg-white rounded-full shadow-lg flex items-center justify-center mb-8 overflow-hidden">
            <Image
              src="/logo.jpg"
              alt="Paróquia Cristo Rei"
              width={160}
              height={160}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 tracking-wide" style={{ fontFamily: 'var(--font-geist-sans)' }}>
            Paróquia Cristo Rei
          </h1>
        </div>

        {/* Mensagem em breve */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-normal text-gray-800 tracking-wider" style={{ fontFamily: 'var(--font-dancing-script)' }}>
            Em Breve!
          </h2>
        </div>
      </div>
    </main>
  )
}
