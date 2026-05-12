import { useState } from "react";
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  CheckCircle2, 
  Star, 
  Award, 
  Zap,
  Info,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ServicePack {
  name: string;
  price: number;
  delivery: string[];
}

interface Influencer {
  handle: string;
  followers: number;
  packs: ServicePack[];
  analysis: string;
  pros: string[];
  cons: string[];
  rating: number; // 1-5
}

const INFLUENCERS: Influencer[] = [
  {
    handle: "@sjcampos_",
    followers: 107410,
    packs: [
      { name: "1 Reels", price: 650, delivery: ["1 Reels"] },
      { name: "Stories Individual", price: 100, delivery: ["1 Story"] },
      { name: "Collab (Vídeo Pronto)", price: 350, delivery: ["Post em Collab", "Vídeo enviado pronto"] },
    ],
    analysis: "Possui uma base sólida de seguidores locais. O valor do Reels é intermediário, mas a opção de postar vídeo pronto em collab por R$350 é uma excelente oportunidade para a agência manter o controle criativo com baixo custo.",
    pros: ["Audiência segmentada em SJC", "Preço acessível para collab", "Bom volume de seguidores"],
    cons: ["Preço individual de story um pouco alto comparado a pacotes"],
    rating: 4,
  },
  {
    handle: "@lugaresdovale",
    followers: 171579,
    packs: [
      { name: "Bronze", price: 540, delivery: ["3 stories ou post carrossel"] },
      { name: "Prata", price: 940, delivery: ["1 Reels", "2 stories", "Material (foto/vídeo)", "Tráfego pago incluso"] },
      { name: "Ouro", price: 1390, delivery: ["1 Reels", "3 stories", "Carrossel", "Material", "Tráfego pago"] },
      { name: "Diamante", price: 1780, delivery: ["2 Reels", "6 stories", "Material", "Tráfego pago"] },
    ],
    analysis: "Maior influencer em termos de volume. O Pacote Prata é muito competitivo pois já inclui tráfego pago, o que garante alcance além da base orgânica. Ideal para o 'hype' de inauguração.",
    pros: ["Maior alcance absoluto", "Tráfego pago incluso nos pacotes", "Entrega de material bruto"],
    cons: ["Ticket médio mais alto"],
    rating: 5,
  },
  {
    handle: "@lugares_sjc",
    followers: 21500,
    packs: [
      { name: "Sequência Stories", price: 150, delivery: ["5 stories falando sobre a marca"] },
      { name: "Combo Reels", price: 400, delivery: ["5 stories", "1 Reels (até 90s)"] },
      { name: "Eventos", price: 500, delivery: ["5 stories do evento", "1 Reels do evento"] },
    ],
    analysis: "Melhor opção para cobertura de base e stories falados (humanização). Embora a base seja menor, o preço é extremamente agressivo. Ótimo para 'inundar' o Instagram com menções diárias.",
    pros: ["Custo-benefício imbatível em stories", "Opção de cobertura de evento barata", "Conteúdo mais orgânico/falado"],
    cons: ["Menor base de seguidores"],
    rating: 4.5,
  },
  {
    handle: "@ocasaldesjc",
    followers: 104008,
    packs: [
      { name: "Pacote Ouro", price: 990, delivery: ["1 Reels multi-plataforma (TikTok, FB, YT, Kwai)", "Uso de imagem (1 ano)"] },
      { name: "Dos Sonhos", price: 1090, delivery: ["1 Reels", "2 stories", "Multi-plataforma", "Uso de imagem (1 ano)"] },
      { name: "Pacote Casal", price: 1890, delivery: ["2 Reels", "4 stories", "Multi-plataforma", "Uso de imagem (1 ano)"] },
    ],
    analysis: "Focado em onipresença digital. A entrega multi-plataforma e o direito de uso por 1 ano são os grandes diferenciais. Perfeito se a agência planeja usar o conteúdo deles em anúncios próprios (UGC).",
    pros: ["Multi-plataforma (TikTok, YT Shorts, etc)", "Direito de uso por 1 ano incluso", "Dinâmica de casal gera confiança"],
    cons: ["Preço elevado se focar apenas no Instagram"],
    rating: 4.8,
  },
];

export default function App() {
  const [selectedInfluencer, setSelectedInfluencer] = useState<Influencer | null>(null);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans p-4 md:p-8">
      {/* Header */}
      <header className="max-w-6xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Análise de Cotações: Yo Sushi SJC
            </h1>
            <p className="text-neutral-500 max-w-2xl">
              Comparativo de influencers para a inauguração da unidade em São José dos Campos. 
              Avaliação de métricas, pacotes e melhor custo-benefício.
            </p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-neutral-200 flex items-center gap-4">
            <div className="bg-red-50 p-3 rounded-xl">
              <TrendingUp className="text-red-500 w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-neutral-400 font-medium uppercase tracking-wider">Status do Projeto</p>
              <p className="font-bold text-neutral-800 text-sm">Fase de Cotação</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Comparison Grid */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {INFLUENCERS.map((inf) => (
              <motion.div
                key={inf.handle}
                layoutId={inf.handle}
                onClick={() => setSelectedInfluencer(inf)}
                className={`cursor-pointer p-6 rounded-2xl border transition-all ${
                  selectedInfluencer?.handle === inf.handle 
                    ? "border-red-500 bg-white ring-2 ring-red-100" 
                    : "border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-md"
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{inf.handle}</h3>
                    <div className="flex items-center gap-1.5 text-neutral-500 mt-1">
                      <Users size={14} />
                      <span className="text-sm font-medium">{inf.followers.toLocaleString('pt-BR')} seguidores</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-yellow-50 text-yellow-600 px-2 py-1 rounded-lg text-sm font-bold border border-yellow-100">
                    <Star size={14} fill="currentColor" />
                    {inf.rating}
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {inf.packs.slice(0, 2).map((p) => (
                    <div key={p.name} className="flex justify-between text-sm">
                      <span className="text-neutral-600">{p.name}</span>
                      <span className="font-bold text-neutral-800">{formatCurrency(p.price)}</span>
                    </div>
                  ))}
                  {inf.packs.length > 2 && (
                    <p className="text-xs text-neutral-400 font-medium">+ {inf.packs.length - 2} opções de pacotes</p>
                  )}
                </div>

                <div className="flex items-center justify-between text-red-500 font-bold text-sm">
                  <span>Ver análise completa</span>
                  <ChevronRight size={16} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Analysis View */}
          <AnimatePresence mode="wait">
            {selectedInfluencer ? (
              <motion.div
                key={selectedInfluencer.handle}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="bg-white rounded-3xl border border-neutral-200 p-8 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-red-500 text-white p-2 rounded-xl">
                    <Zap size={24} />
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight">O que compensa mais em {selectedInfluencer.handle}?</h2>
                </div>

                <p className="text-neutral-600 leading-relaxed mb-8 text-lg italic">
                  "{selectedInfluencer.analysis}"
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-4">
                    <h4 className="font-bold text-sm uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                       <CheckCircle2 size={16} className="text-emerald-500" /> Prós (Entrega)
                    </h4>
                    <ul className="space-y-2">
                      {selectedInfluencer.pros.map((pro, i) => (
                        <li key={i} className="flex items-start gap-2 text-neutral-700">
                          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-bold text-sm uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                       <Award size={16} className="text-red-500" /> Pacotes Detalhados
                    </h4>
                    <div className="space-y-3">
                      {selectedInfluencer.packs.map((p) => (
                        <div key={p.name} className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                          <div className="flex justify-between font-bold mb-1">
                            <span className="text-neutral-800">{p.name}</span>
                            <span className="text-red-600">{formatCurrency(p.price)}</span>
                          </div>
                          <p className="text-xs text-neutral-500">{p.delivery.join(" • ")}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-64 bg-neutral-100 rounded-3xl border-2 border-dashed border-neutral-200 flex flex-col items-center justify-center text-neutral-400">
                <Info size={32} className="mb-2 opacity-50" />
                <p className="font-medium font-mono text-sm">Selecione um perfil para ver a análise estratégica</p>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Verdict Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-zinc-900 text-white rounded-3xl p-8 shadow-xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Award className="text-yellow-400" /> Veredito Final
            </h3>
            
            <div className="space-y-8">
              <div className="space-y-3">
                <p className="text-xs font-bold text-neutral-500 uppercase tracking-[2px]">Melhor Alcance (Awareness)</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg">@lugaresdovale</span>
                  <div className="bg-neutral-800 px-3 py-1 rounded-full text-xs font-mono">1º lugar</div>
                </div>
                <p className="text-sm text-neutral-400 leading-snug">
                  Essencial pela massa crítica e inclusão de tráfego pago. Garante que o restaurante seja "visto" por toda a cidade.
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-bold text-neutral-500 uppercase tracking-[2px]">Melhor ROI (Frequência)</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg">@lugares_sjc</span>
                  <div className="bg-neutral-800 px-3 py-1 rounded-full text-xs font-mono">2º lugar</div>
                </div>
                <p className="text-sm text-neutral-400 leading-snug">
                  O valor de R$150 para 5 stories permite que a agência compre volume e mantenha o Yo Sushi na mente das pessoas por mais tempo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="max-w-6xl mx-auto mt-16 pt-8 border-t border-neutral-200 text-center pb-12 text-neutral-400 text-xs font-medium uppercase tracking-wider">
        <p className="mb-1">© 2024 AGÊNCIA DE MARKETING E ESTRATÉGIA</p>
        <p>CONFIDENCIAL: RESTRITO PARA USO INTERNO - YO SUSHI SJC</p>
      </footer>
    </div>
  );
}
