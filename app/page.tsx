import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Rodrigo Kame</h1>
        <p className="text-lg max-w-xl">
          Programador apaixonado por tecnologia, especializado em transformar café em código funcional.
          Sempre em busca de desafios criativos, soluções elegantes e bugs que misteriosamente somem
          quando alguém vem olhar minha tela.
        </p>
      </div>
    </div>
  );
}
