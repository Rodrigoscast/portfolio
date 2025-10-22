import ChuvaFundo from "@/components/ChuvaFundo";

export default function MusicPlayer({
    visivel,
    ref,
}: {
    visivel: boolean;
    ref: any;
}) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ChuvaFundo />
      
      <div className="z-10 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">💧 Bem-vindo ao meu portfólio</h1>
        <p>Som ambiente e código fluindo com o som da chuva.</p>
      </div>
    </div>
  );
}
