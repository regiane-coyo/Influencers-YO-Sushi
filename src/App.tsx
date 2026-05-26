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
  ChevronRight,
  ExternalLink,
  Clock,
  FolderOpen,
  Sparkles,
  Percent
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
  instagramUrl: string;
  category: "reviews" | "lifestyle" | "micro";
  status?: "active" | "waiting";
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
    instagramUrl: "https://www.instagram.com/sjcampos_",
    category: "reviews",
    status: "active"
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
    analysis: "Maior influencer de indicações em termos de volume. O Pacote Prata é muito competitivo pois já inclui tráfego pago, o que garante alcance além da base orgânica. Ideal para o 'hype' de inauguração.",
    pros: ["Maior alcance absoluto de reviews", "Tráfego pago incluso nos pacotes", "Entrega de material bruto"],
    cons: ["Ticket médio mais alto"],
    rating: 5,
    instagramUrl: "https://www.instagram.com/lugaresdovale",
    category: "reviews",
    status: "active"
  },
  {
    handle: "@ficadicasjc",
    followers: 202869,
    packs: [
      { name: "Inauguração: Plano Start", price: 1590, delivery: ["Roteiro estratégico", "Captação profissional", "Publicação em collab", "Impulsionamento incluso"] },
      { name: "Plano Trimestral", price: 4290, delivery: ["Tráfego pago incluso", "Recorrência de 3 meses"] },
    ],
    analysis: "Excelente alcance absoluto e estrutura de agência com captação profissional e impulsionamento já inclusos. É um dos maiores e mais consolidados canais de dicas culinárias e entretenimento em São José dos Campos.",
    pros: ["Maior audiência consolidada em SJC", "Produção e captação profissional completa", "Foco estratégico em gastronomia e lazer"],
    cons: ["Valor inicial mais alto, porém condizente com a entrega premium"],
    rating: 4.9,
    instagramUrl: "https://www.instagram.com/ficadicasjc/",
    category: "reviews",
    status: "active"
  },
  {
    handle: "@sanjadicas",
    followers: 164413,
    packs: [
      { name: "Plano Básico", price: 750, delivery: ["1 Reels"] },
      { name: "Plano Pro", price: 890, delivery: ["1 Reels", "1 combo de stories"] },
    ],
    analysis: "Uma das marcas mais fortes de recomendação na cidade. O Plano Pro por R$890 oferece um excelente upgrade de alcance, adicionando um combo completo de stories por apenas R$140 adicionais.",
    pros: ["Elevado recall de marca local", "Excelente engajamento com público de gastronomia", "Upgrade de stories extremamente vantajoso no Plano Pro"],
    cons: ["Diferença pequena para o Plano Pro faz o Plano Básico ser menos atrativo"],
    rating: 4.8,
    instagramUrl: "https://www.instagram.com/sanjadicas/",
    category: "reviews",
    status: "active"
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
    instagramUrl: "https://www.instagram.com/lugares_sjc/",
    category: "reviews",
    status: "active"
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
    instagramUrl: "https://www.instagram.com/ocasaldesjc/",
    category: "reviews",
    status: "active"
  },
  // Lifestyle Niche
  {
    handle: "@alinempereira",
    followers: 51356,
    packs: [
      { name: "Stories (3 a 5 vídeos)", price: 400, delivery: ["3 a 5 vídeos nos stories"] },
      { name: "Stories + Foto no feed", price: 600, delivery: ["Sequência de stories + 1 post de foto no feed"] },
      { name: "Stories + Reels", price: 800, delivery: ["Sequência de stories + 1 Reels produzido"] },
      { name: "Recebidos + Stories", price: 200, delivery: ["Envio de produto/refeição + stories mostrando a experiência"] },
    ],
    analysis: "Possui uma excelente presença humanizada e muito próxima do público focado em estilo de vida, cotidiano, maternidade e comportamento em SJC. É uma ótima indicação para dar um toque autêntico e de proximidade à campanha de inauguração do Yo Sushi.",
    pros: ["Excelente engajamento próximo e pessoal", "Preços de pacotes de stories e recebidos muito acessíveis", "Perfeito para humanizar a marca"],
    cons: ["Base de seguidores intermediária quando comparada aos grandes veículos de reviews"],
    rating: 4.7,
    instagramUrl: "https://www.instagram.com/alinempereira/",
    category: "lifestyle",
    status: "active"
  },
  {
    handle: "@luisgbarros",
    followers: 155002,
    packs: [
      { name: "Stories (3 a 5 vídeos)", price: 750, delivery: ["3 a 5 vídeos falados nos stories"] },
      { name: "Stories + Foto no feed", price: 990, delivery: ["Combo de stories + 1 post de foto no feed"] },
      { name: "Stories + Reels", price: 1200, delivery: ["Combo de stories + 1 Reels gravado no local"] },
    ],
    analysis: "Excelente audiência jovem, masculina e de lifestyle urbano na cidade. Perfeito para posicionar o Yo Sushi como um local moderno, descolado e com altíssimo apelo visual. Apresenta ótimos pacotes consolidados.",
    pros: ["Alcance forte com público qualificado e jovem", "Produção estética impecável", "Reels com ótimo histórico de visualizações locais"],
    cons: ["Orçamento de Reels demanda maior fatia do budget de estilo de vida"],
    rating: 4.8,
    instagramUrl: "https://www.instagram.com/luisgbarros/",
    category: "lifestyle",
    status: "active"
  },
  {
    handle: "@deborafernandesplus",
    followers: 178097,
    packs: [],
    analysis: "Relevante influenciadora do nicho plus size e lifestyle em SJC sob grande destaque nacional. Aguardando o envio do orçamento formal para cruzamento de dados. Indicador estratégico focado em autenticidade.",
    pros: ["Público amplamente engajado", "Posicionamento claro e conexão pessoal forte", "Presença local expressiva em SJC"],
    cons: ["Depende da definição dos valores para fechar a correlação de custo-benefício"],
    rating: 4.5,
    instagramUrl: "https://www.instagram.com/deborafernandesplus/",
    category: "lifestyle",
    status: "waiting"
  },
  {
    handle: "@anaclarauchoa",
    followers: 369050,
    packs: [],
    analysis: "Uma das maiores audiências de estilo de vida, fitness e dia a dia de São José dos Campos. Aguardando o envio da tabela de cotação. Tem enorme poder de conversão de público qualificado.",
    pros: ["Audiência massiva de 369k followers", "Estética de alto padrão para vídeos de gastronomia", "Presença vip com enorme visibilidade"],
    cons: ["Aguardando valores oficiais de comercialização"],
    rating: 4.8,
    instagramUrl: "https://www.instagram.com/anaclarauchoa/",
    category: "lifestyle",
    status: "waiting"
  },
  {
    handle: "@ocasalmaster",
    followers: 108310,
    packs: [],
    analysis: "Focados em rotina saudável, casal, esportes e dicas em família. Aguardando retorno com os valores oficiais. Ideal para um posicionamento acolhedor e atrativo para casais dinâmicos locais.",
    pros: ["Conversa com casais e famílias com alto ticket de consumo", "Abordagem descontraída e alegre", "Vídeos dinâmicos e modernos"],
    cons: ["Valores em negociação"],
    rating: 4.4,
    instagramUrl: "https://www.instagram.com/ocasalmaster/",
    category: "lifestyle",
    status: "waiting"
  },
  {
    handle: "@biamachadoblog",
    followers: 595353,
    packs: [],
    analysis: "O maior perfil avaliado em todo o mapeamento regional (quase 600k seguidores). Perfeito para dar enorme prestígio local e repercussão imediata em SJC. Aguardando envio das propostas comerciais.",
    pros: ["Maior rede e audiência local absoluta", "Identificação profunda com SJC", "Poder massivo de gerar 'hype' e lotar a inauguração"],
    cons: ["Custo provável alto devido à dimensão da base, aguardando envio do media kit"],
    rating: 5.0,
    instagramUrl: "https://www.instagram.com/biamachadoblog/",
    category: "lifestyle",
    status: "waiting"
  },
  {
    handle: "@elisaprits",
    followers: 90447,
    packs: [],
    analysis: "Foco forte em beleza, cotidiano e lifestyle em SJC. Aguardando a tabela de publicidade oficial para cálculo de ROI. Muito assertiva para conexões sinceras e humanizadas.",
    pros: ["Conteúdo extremamente natural e cotidiano", "Público predominantemente feminino e de alta atenção", "Relação próxima com o comércio local de São José"],
    cons: ["Valores ainda pendentes de recebimento"],
    rating: 4.3,
    instagramUrl: "https://www.instagram.com/elisaprits/",
    category: "lifestyle",
    status: "waiting"
  },
  // Micro Niche (Perfis Menores)
  {
    handle: "@nadiaver",
    followers: 19589,
    packs: [],
    analysis: "Influenciadora com público extremamente cativo e engajamento qualificado em São José dos Campos. Excelente para divulgação espontânea baseada em experiência.",
    pros: ["Audiência ativa regional", "Produção de conteúdo nativa e espontânea"],
    cons: ["Base de seguidores em consolidação regional"],
    rating: 4.2,
    instagramUrl: "https://www.instagram.com/nadiaver/",
    category: "micro"
  },
  {
    handle: "@aovivodaniel",
    followers: 38279,
    packs: [],
    analysis: "Perfil engajado e dinâmico focado em cobertura local de eventos e cotidiano de SJC. Excelente comunicação direta em fotos e vídeos.",
    pros: ["Excelente comunicação em vídeo", "Grande afinidade com público ativo de SJC"],
    cons: ["Foco editorial mais voltado para entretenimento geral"],
    rating: 4.3,
    instagramUrl: "https://www.instagram.com/aovivodaniel/",
    category: "micro"
  },
  {
    handle: "@pamelavital____",
    followers: 2471,
    packs: [],
    analysis: "Micro-influenciadora focada de forma autêntica no público regional de São José dos Campos. Excelente para recomendação de alto nível de confiança.",
    pros: ["Micro-nicho altamente conectado", "Alto índice de confiança do público próximo"],
    cons: ["Base de seguidores compacta (foco em hiper-segmentação)"],
    rating: 4.1,
    instagramUrl: "https://www.instagram.com/pamelavital_____/",
    category: "micro"
  },
  {
    handle: "@camiilaalves",
    followers: 23964,
    packs: [],
    analysis: "Presença estética e estilizada, ideal para sinergia com marcas locais de estética, moda e gastronomia em SJC.",
    pros: ["Fidelidade elevada do público local", "Perfil estético ideal para sinergia com marcas de comida"],
    cons: ["Menor alcance bruto geral"],
    rating: 4.2,
    instagramUrl: "https://www.instagram.com/camiilaalves/",
    category: "micro"
  },
  {
    handle: "@marynetto",
    followers: 2574,
    packs: [],
    analysis: "Micro-perfil local com contato muito direto com seus seguidores em São José, compartilhando rotina e indicações genuínas.",
    pros: ["Engajamento orgânico de comunidade", "Conversas genuínas de indicações locais"],
    cons: ["Audiência restrita ao círculo mais próximo de contatos"],
    rating: 4.0,
    instagramUrl: "https://www.instagram.com/marynetto/",
    category: "micro"
  },
  {
    handle: "@loranasalgado",
    followers: 22026,
    packs: [],
    analysis: "Excelente comunicadora local com ótima estética e conteúdo leve focado em entretenimento, lifestyle e marcas locais.",
    pros: ["Conteúdo leve e descontraído", "Perfil de público conectado com gastronomia e eventos"],
    cons: ["Alcance focado em redes menores de recomendação"],
    rating: 4.2,
    instagramUrl: "https://www.instagram.com/loranasalgado/",
    category: "micro"
  },
  {
    handle: "@gossipsanja",
    followers: 11842,
    packs: [],
    analysis: "Perfil de entretenimento e notícias cotidianas muito ativo de SJC. Excelente canal de compartilhamento de ações dinâmicas rápidas.",
    pros: ["Conteúdo extremamente dinâmico", "Potencial de viralização local elevado"],
    cons: ["Normalmente atua com cobertura descentralizada de indicações"],
    rating: 4.1,
    instagramUrl: "https://www.instagram.com/gossipsanja/",
    category: "micro"
  },
  {
    handle: "@mirelaponce",
    followers: 4481,
    packs: [],
    analysis: "Produção visual vibrante focada em estilo de vida e gastronomia regional, gerando excelente proximidade com os seguidores.",
    pros: ["Relação muito ativa com seguidores de SJC", "Fotos e vídeos de estilo convidativo"],
    cons: ["Foco em micronicho regionalizado"],
    rating: 4.1,
    instagramUrl: "https://www.instagram.com/mirelaponce/",
    category: "micro"
  },
  {
    handle: "@ingridcoelhocosta",
    followers: 5430,
    packs: [],
    analysis: "Foco de indicações locais em SJC para lazer, gastronomia e passeios em família. Conexão real e muito espontânea.",
    pros: ["Fidelidade e conexão real com o público de SJC", "Perfil atrativo para gastronomia e lazer"],
    cons: ["Foco de recomendação amplamente orgânico"],
    rating: 4.1,
    instagramUrl: "https://www.instagram.com/ingridcoelhocosta/",
    category: "micro"
  },
  {
    handle: "@fabipupio",
    followers: 9832,
    packs: [],
    analysis: "Micro-influenciadora com excelente produção de fotos autorais, com destaque para curadoria de gastronomia e lazer em SJC.",
    pros: ["Curadoria visual qualificada", "Ideal para experimentação e degustação no local"],
    cons: ["Foco muito concentrado em composição estética no feed"],
    rating: 4.2,
    instagramUrl: "https://www.instagram.com/fabipupio/",
    category: "micro"
  },
  {
    handle: "@jeitojessicadeser",
    followers: 55088,
    packs: [],
    analysis: "Presença marcante focada no dia a dia em SJC. Tem grande volume de interação regional diária em seus stories.",
    pros: ["Grande comunidade engajada de 55k+ seguidores", "Ideal para divulgações amplas de produtos inovadores"],
    cons: ["Engajamento oscilante devido à variedade de temas cotidianos"],
    rating: 4.5,
    instagramUrl: "https://www.instagram.com/jeitojessicadeser/",
    category: "micro"
  },
  {
    handle: "@taylaamunhoz",
    followers: 5184,
    packs: [],
    analysis: "Conteúdo intimista, charmoso e muito autêntico conectando rotina real e estética agradável de dia a dia.",
    pros: ["Conteúdo intimista e autêntico", "Foco no público de São José dos Campos"],
    cons: ["Audiência altamente nichada e orgânica"],
    rating: 4.1,
    instagramUrl: "https://www.instagram.com/taylaamunhoz/",
    category: "micro"
  },
  {
    handle: "@eu.gabitorres",
    followers: 9936,
    packs: [],
    analysis: "Micro-influenciadora local ativa com linguagem direta e espontânea focada em dicas de rotina, bem-estar e indicação local.",
    pros: ["Comunicação natural e espontânea", "Público bem delimitado da cidade"],
    cons: ["Consolidação de base em andamento regionalmente"],
    rating: 4.1,
    instagramUrl: "https://www.instagram.com/eu.gabitorres/",
    category: "micro"
  },
  {
    handle: "@mamoraisblog",
    followers: 11208,
    packs: [],
    analysis: "Perfil engajado com foco em indicações diárias, descobertas gastronômicas e resenha de novidades em SJC.",
    pros: ["Bom volume para o nicho de micro-influência", "Excelente alcance orgânico nas indicações locais"],
    cons: ["Grande multiplicidade de canais e produtos divulgados simultaneamente"],
    rating: 4.2,
    instagramUrl: "https://www.instagram.com/mamoraisblog/",
    category: "micro"
  },
  {
    handle: "@carolsrr",
    followers: 1751,
    packs: [],
    analysis: "Produção de conteúdo altamente genuína focada em conexões reais e circulo altamente confiável de recomendações locais em SJC.",
    pros: ["Conversão pessoal autêntica", "Público seleto e focado regionalmente"],
    cons: ["Audiência inicial e em crescimento gradual"],
    rating: 4.0,
    instagramUrl: "https://www.instagram.com/carolsrr/",
    category: "micro"
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<"reviews" | "lifestyle" | "micro" | "mix">("reviews");
  const [selectedInfluencer, setSelectedInfluencer] = useState<Influencer | null>(null);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const filteredInfluencers = INFLUENCERS.filter(
    (inf) => inf.category === activeTab
  );

  const handleTabChange = (tab: "reviews" | "lifestyle" | "micro" | "mix") => {
    setActiveTab(tab);
    setSelectedInfluencer(null);
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
            <p className="text-neutral-500 max-w-2xl text-sm">
              Mapeamento estratégico e comparativo para a nova unidade do Restaurante Yo Sushi em São José dos Campos. Navegue pelas categorias para comparar dados.
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

        {/* Niche Category Tabs */}
        <div className="flex flex-wrap border-b border-neutral-200 mt-10 gap-1">
          <button
            onClick={() => handleTabChange("reviews")}
            className={`px-6 py-3.5 font-bold text-sm tracking-wide transition-all border-b-2 flex items-center gap-2 ${
              activeTab === "reviews"
                ? "border-red-500 text-red-600 font-extrabold"
                : "border-transparent text-neutral-500 hover:text-neutral-800 hover:border-neutral-300"
            }`}
          >
            <Award size={16} />
            Perfis - Reviews
            <span className={`text-[10px] ml-1 px-1.5 py-0.5 rounded-full ${
              activeTab === "reviews" ? "bg-red-100 text-red-600" : "bg-neutral-100 text-neutral-600"
            }`}>
              {INFLUENCERS.filter(i => i.category === "reviews").length}
            </span>
          </button>
          <button
            onClick={() => handleTabChange("lifestyle")}
            className={`px-6 py-3.5 font-bold text-sm tracking-wide transition-all border-b-2 flex items-center gap-2 ${
              activeTab === "lifestyle"
                ? "border-red-500 text-red-600 font-extrabold"
                : "border-transparent text-neutral-500 hover:text-neutral-800 hover:border-neutral-300"
            }`}
          >
            <Users size={16} />
            Perfis Lifestyle
            <span className={`text-[10px] ml-1 px-1.5 py-0.5 rounded-full ${
              activeTab === "lifestyle" ? "bg-red-100 text-red-600" : "bg-neutral-100 text-neutral-600"
            }`}>
              {INFLUENCERS.filter(i => i.category === "lifestyle").length}
            </span>
          </button>
          <button
            onClick={() => handleTabChange("micro")}
            className={`px-6 py-3.5 font-bold text-sm tracking-wide transition-all border-b-2 flex items-center gap-2 ${
              activeTab === "micro"
                ? "border-red-500 text-red-600 font-extrabold"
                : "border-transparent text-neutral-500 hover:text-neutral-800 hover:border-neutral-300"
            }`}
          >
            <TrendingUp size={16} />
            Perfis menores
            <span className={`text-[10px] ml-1 px-1.5 py-0.5 rounded-full ${
              activeTab === "micro" ? "bg-red-100 text-red-600" : "bg-neutral-100 text-neutral-600"
            }`}>
              {INFLUENCERS.filter(i => i.category === "micro").length}
            </span>
          </button>
          <button
            onClick={() => handleTabChange("mix")}
            className={`px-6 py-3.5 font-bold text-sm tracking-wide transition-all border-b-2 flex items-center gap-2 ${
              activeTab === "mix"
                ? "border-red-500 text-red-600 font-extrabold"
                : "border-transparent text-neutral-500 hover:text-neutral-800 hover:border-neutral-300"
            }`}
          >
            <Sparkles size={16} />
            Sugestões de Mix
            <span className={`text-[10px] ml-1 px-1.5 py-0.5 rounded-full font-bold ${
              activeTab === "mix" ? "bg-amber-100 text-amber-700" : "bg-zinc-100 text-zinc-600"
            }`}>
              3 Mixes
            </span>
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Comparison Grid or Mix View */}
        <div className="lg:col-span-8 space-y-6">
          {activeTab === "mix" ? (
            <div className="space-y-6">
              {/* Introduction Card */}
              <div className="bg-gradient-to-r from-neutral-900 to-zinc-800 text-white rounded-3xl p-8 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500 rounded-full -mr-12 -mt-12 -z-0 opacity-10 group-hover:scale-110 transition-transform duration-300" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-amber-400 text-zinc-950 p-2.5 rounded-xl">
                      <Sparkles size={22} className="animate-pulse" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight">Sugestões de Mix</h2>
                      <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mt-0.5">Combinações de Investimento Recomendadas</p>
                    </div>
                  </div>
                  <p className="text-zinc-300 text-sm leading-relaxed">
                    Abaixo apresentamos 3 opções estratégicas de mix de influenciadores para o investimento ideal de Yo Sushi SJC, equilibrando alcance, conversão e diversidade de públicos.
                  </p>
                </div>
              </div>

              {/* Mix 1 */}
              <div className="bg-white rounded-3xl border border-neutral-200 p-8 shadow-sm hover:border-neutral-300 transition-all">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-100 pb-4 mb-6">
                  <div>
                    <span className="bg-red-50 text-red-600 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Mix 1</span>
                    <h3 className="text-2xl font-bold tracking-tight text-neutral-900 mt-1">Alta Performance & Multiplataforma</h3>
                  </div>
                  <div className="bg-red-50 border border-red-100 rounded-2xl px-5 py-3 text-right">
                    <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider">Investimento Total</p>
                    <p className="text-2xl font-black text-red-600 font-mono mt-0.5">{formatCurrency(3670)}</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-neutral-900">@ficadicasjc <span className="text-xs font-normal text-red-600 bg-red-50 px-2 py-0.5 rounded ml-1 font-mono">Review</span></span>
                      <span className="font-bold text-neutral-800 font-mono text-sm">{formatCurrency(1590)}</span>
                    </div>
                    <p className="text-sm text-neutral-600 leading-snug">
                      <span className="font-semibold text-neutral-800">Plano Lançamento / Inauguração</span> — roteiro estratégico, captação profissional, collab + impulsionamento
                    </p>
                  </div>

                  <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-neutral-900">@ocasaldesjc <span className="text-xs font-normal text-red-600 bg-red-50 px-2 py-0.5 rounded ml-1 font-mono">Review</span></span>
                      <span className="font-bold text-neutral-800 font-mono text-sm">{formatCurrency(1090)}</span>
                    </div>
                    <p className="text-sm text-neutral-600 leading-snug">
                      <span className="font-semibold text-neutral-800">Pacote dos Sonhos</span> — 1 Reels + 2 stories, distribuição em múltiplas plataformas + direito de uso 1 ano
                    </p>
                  </div>

                  <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-neutral-900">@luisgbarros <span className="text-xs font-normal text-blue-600 bg-blue-50 px-2 py-0.5 rounded ml-1 font-mono">Lifestyle</span></span>
                      <span className="font-bold text-neutral-800 font-mono text-sm">{formatCurrency(990)}</span>
                    </div>
                    <p className="text-sm text-neutral-600 leading-snug">
                      Stories + Foto no feed — 155k seguidores, público lifestyle amplo
                    </p>
                  </div>
                </div>

                <div className="bg-neutral-50 rounded-2xl p-5 border border-neutral-100 flex gap-3">
                  <div className="text-red-500 mt-0.5 flex-shrink-0">
                    <Zap size={16} />
                  </div>
                  <p className="text-sm text-neutral-700 leading-relaxed">
                    <strong>O mais completo:</strong> @ficadicasjc ancora com conteúdo profissional e tráfego pago. @ocasaldesjc distribui em TikTok, Facebook, YouTube e Kwai — e o cliente fica com o conteúdo por 1 ano. @luisgbarros diversifica para o público lifestyle.
                  </p>
                </div>
              </div>

              {/* Mix 2 */}
              <div className="bg-white rounded-3xl border border-neutral-200 p-8 shadow-sm hover:border-neutral-300 transition-all">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-100 pb-4 mb-6">
                  <div>
                    <span className="bg-red-50 text-red-600 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Mix 2</span>
                    <h3 className="text-2xl font-bold tracking-tight text-neutral-900 mt-1">Cobertura Ampla & Distribuição</h3>
                  </div>
                  <div className="bg-red-50 border border-red-100 rounded-2xl px-5 py-3 text-right">
                    <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider">Investimento Total</p>
                    <p className="text-2xl font-black text-red-600 font-mono mt-0.5">{formatCurrency(3330)}</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-neutral-900">@sanjadicas <span className="text-xs font-normal text-red-600 bg-red-50 px-2 py-0.5 rounded ml-1 font-mono">Review</span></span>
                      <span className="font-bold text-neutral-800 font-mono text-sm">{formatCurrency(890)}</span>
                    </div>
                    <p className="text-sm text-neutral-600 leading-snug">
                      <span className="font-semibold text-neutral-800">Plano Pro</span> — Reels + combo de stories (164k seg. locais)
                    </p>
                  </div>

                  <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-neutral-900">@sjcampos_ <span className="text-xs font-normal text-red-600 bg-red-50 px-2 py-0.5 rounded ml-1 font-mono">Review</span></span>
                      <span className="font-bold text-neutral-800 font-mono text-sm">{formatCurrency(650)}</span>
                    </div>
                    <p className="text-sm text-neutral-600 leading-snug">
                      1 Reels completo
                    </p>
                  </div>

                  <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-neutral-900">@ocasaldesjc <span className="text-xs font-normal text-red-600 bg-red-50 px-2 py-0.5 rounded ml-1 font-mono">Review</span></span>
                      <span className="font-bold text-neutral-800 font-mono text-sm">{formatCurrency(990)}</span>
                    </div>
                    <p className="text-sm text-neutral-600 leading-snug">
                      <span className="font-semibold text-neutral-800">Pacote Ouro</span> — 1 Reels, múltiplas plataformas + direito de uso 1 ano
                    </p>
                  </div>

                  <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-neutral-900">@alinempereira <span className="text-xs font-normal text-blue-600 bg-blue-50 px-2 py-0.5 rounded ml-1 font-mono">Lifestyle</span></span>
                      <span className="font-bold text-neutral-800 font-mono text-sm">{formatCurrency(800)}</span>
                    </div>
                    <p className="text-sm text-neutral-600 leading-snug">
                      Stories + Reels (sequência de stories + 1 Reels produzido) — público feminino, alto potencial para gastronomia
                    </p>
                  </div>
                </div>

                <div className="bg-neutral-50 rounded-2xl p-5 border border-neutral-100 flex gap-3">
                  <div className="text-red-500 mt-0.5 flex-shrink-0">
                    <Zap size={16} />
                  </div>
                  <p className="text-sm text-neutral-700 leading-relaxed">
                    <strong>4 perfis ativos com 3 reviews focados em SJC + 1 lifestyle:</strong> O @ocasaldesjc garante presença fora do Instagram sem custo extra. Boa cobertura para criar barulho simultâneo na cidade.
                  </p>
                </div>
              </div>

              {/* Mix 3 */}
              <div className="bg-white rounded-3xl border border-neutral-200 p-8 shadow-sm hover:border-neutral-300 transition-all">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-100 pb-4 mb-6">
                  <div>
                    <span className="bg-red-50 text-red-600 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Mix 3</span>
                    <h3 className="text-2xl font-bold tracking-tight text-neutral-900 mt-1">Robustez & Alcance Máximo</h3>
                  </div>
                  <div className="bg-red-50 border border-red-100 rounded-2xl px-5 py-3 text-right">
                    <p className="text-xs text-neutral-400 font-bold uppercase tracking-wider">Investimento Total</p>
                    <p className="text-2xl font-black text-red-600 font-mono mt-0.5">{formatCurrency(3680)}</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-neutral-900">@ficadicasjc <span className="text-xs font-normal text-red-600 bg-red-50 px-2 py-0.5 rounded ml-1 font-mono">Review</span></span>
                      <span className="font-bold text-neutral-800 font-mono text-sm">{formatCurrency(1590)}</span>
                    </div>
                    <p className="text-sm text-neutral-600 leading-snug">
                      <span className="font-semibold text-neutral-800">Plano Inauguração</span> — captação profissional, roteiro + impulsionamento
                    </p>
                  </div>

                  <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-neutral-900">@luisgbarros <span className="text-xs font-normal text-blue-600 bg-blue-50 px-2 py-0.5 rounded ml-1 font-mono">Lifestyle</span></span>
                      <span className="font-bold text-neutral-800 font-mono text-sm">{formatCurrency(1200)}</span>
                    </div>
                    <p className="text-sm text-neutral-600 leading-snug">
                      Stories + Reels — 155k seg., maior entrega deste perfil
                    </p>
                  </div>

                  <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-neutral-900">@sanjadicas <span className="text-xs font-normal text-red-600 bg-red-50 px-2 py-0.5 rounded ml-1 font-mono">Review</span></span>
                      <span className="font-bold text-neutral-800 font-mono text-sm">{formatCurrency(890)}</span>
                    </div>
                    <p className="text-sm text-neutral-600 leading-snug">
                      <span className="font-semibold text-neutral-800">Plano Pro</span> — Reels + combo de stories (164k seg. locais)
                    </p>
                  </div>
                </div>

                <div className="bg-neutral-50 rounded-2xl p-5 border border-neutral-100 flex gap-3">
                  <div className="text-red-500 mt-0.5 flex-shrink-0">
                    <Zap size={16} />
                  </div>
                  <p className="text-sm text-neutral-700 leading-relaxed">
                    <strong>Combina o melhor conteúdo profissional com o maior perfil lifestyle:</strong> Excelente combinação de @ficadicasjc e @sanjadicas com o público abrangente de @luisgbarros (155k). Boa opção se o cliente quiser apostar em menos perfis mas com entregas mais robustas por criador.
                  </p>
                </div>
              </div>

              {/* Notes & Negotiations */}
              <div className="bg-amber-50 rounded-3xl p-8 border border-amber-200">
                <div className="flex items-center gap-2 text-amber-900 font-bold mb-4">
                  <Percent size={20} className="text-amber-600" />
                  <h4 className="text-lg uppercase tracking-wider">Benefícios & Condições Especiais</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl p-5 border border-amber-200/50 shadow-sm">
                    <p className="font-bold text-neutral-900 text-sm mb-1.5 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500" /> Luís Barros (@luisgbarros)
                    </p>
                    <p className="text-neutral-600 text-xs leading-relaxed">
                      Caso seja fechado algum trabalho, ele pode fazer uma <strong>visita extra (stories) de cortesia</strong>, para reforçar a divulgação.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-5 border border-amber-200/50 shadow-sm">
                    <p className="font-bold text-neutral-900 text-sm mb-1.5 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500" /> Sanja Dicas (@sanjadicas)
                    </p>
                    <p className="text-neutral-600 text-xs leading-relaxed">
                      Caso seja fechado algum trabalho, ele consegue oferecer um <strong>desconto de R$ 50,00</strong> adicionais.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredInfluencers.map((inf) => (
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
                        <h3 className="text-xl font-bold flex items-center gap-1.5 group">
                          <a
                            href={inf.instagramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-neutral-900 group-hover:text-red-500 group-hover:underline transition-colors focus:outline-none flex items-center gap-1"
                          >
                            {inf.handle}
                            <ExternalLink size={13} className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400" />
                          </a>
                        </h3>
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

                    <div className="space-y-2 mb-6 min-h-[44px]">
                      {inf.status === "waiting" ? (
                        <div className="flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-2 rounded-xl text-xs font-semibold border border-amber-200">
                          <Clock size={14} className="animate-pulse" />
                          <span>AGUARDANDO ORÇAMENTO</span>
                        </div>
                      ) : inf.category === "micro" ? (
                        <div className="flex items-center gap-1.5 bg-red-50 text-red-700/90 px-3 py-2 rounded-xl text-xs font-semibold border border-red-100">
                          <Zap size={13} className="text-red-500" />
                          <span>Foco em Permuta / Degustação</span>
                        </div>
                      ) : (
                        <>
                          {inf.packs.slice(0, 2).map((p) => (
                            <div key={p.name} className="flex justify-between text-sm">
                              <span className="text-neutral-600 line-clamp-1">{p.name}</span>
                              <span className="font-bold text-neutral-800 flex-shrink-0">{formatCurrency(p.price)}</span>
                            </div>
                          ))}
                          {inf.packs.length > 2 && (
                            <p className="text-xs text-neutral-400 font-medium">+ {inf.packs.length - 2} opções de pacotes</p>
                          )}
                        </>
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
                    <div className="flex items-center justify-between mb-6 border-b border-neutral-100 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-red-500 text-white p-2 rounded-xl">
                          <Zap size={24} />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold tracking-tight">O que compensa mais em {selectedInfluencer.handle}?</h2>
                          <p className="text-xs text-neutral-400 font-medium mt-0.5">Nicho: {selectedInfluencer.category === "reviews" ? "Gastronomia & Dicas (Reviews)" : selectedInfluencer.category === "lifestyle" ? "Estilo de Vida & Lifestyle" : "Perfis Menores / Micro-influenciadores"}</p>
                        </div>
                      </div>
                      <a
                        href={selectedInfluencer.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-red-500 transition-colors border border-neutral-200 px-3 py-1.5 rounded-lg hover:border-red-200"
                      >
                        Abrir Instagram <ExternalLink size={12} />
                      </a>
                    </div>

                    <p className="text-neutral-600 leading-relaxed mb-8 text-lg italic">
                      "{selectedInfluencer.analysis}"
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                      <div className="space-y-4">
                        <h4 className="font-bold text-sm uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                          <CheckCircle2 size={16} className="text-emerald-500" /> Prós de Atuação
                        </h4>
                        <ul className="space-y-2">
                          {selectedInfluencer.pros.map((pro, i) => (
                            <li key={i} className="flex items-start gap-2 text-neutral-700">
                              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                              <span className="text-sm">{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-bold text-sm uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                          <Award size={16} className="text-red-500" /> Detalhes Comerciais
                        </h4>
                        {selectedInfluencer.status === "waiting" ? (
                          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-800 text-sm font-semibold flex items-center gap-2">
                            <Clock size={16} className="animate-pulse" />
                            <span>Aguardando envio das cotações / mídia kit do assessor.</span>
                          </div>
                        ) : selectedInfluencer.category === "micro" ? (
                          <div className="p-4 bg-red-50/50 rounded-2xl border border-red-100 text-neutral-700 text-xs leading-relaxed space-y-2">
                            <div className="flex items-center gap-2 text-red-600 font-bold text-sm mb-1">
                              <Zap size={14} />
                              <span>Estratégia de Relacionamento (Recebidos):</span>
                            </div>
                            <p className="text-neutral-600 text-sm leading-relaxed">
                              Recomendamos parcerias de <b>Permuta de Sushi & Envio de Recebidos Premium</b> para obter menções orgânicas qualificadas. Micro-influenciadores possuem contato extremamente íntimo com seus públicos, gerando alto índice de conversão regional de forma orgânica.
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {selectedInfluencer.packs.map((p) => (
                              <div key={p.name} className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                                <div className="flex justify-between font-bold mb-1">
                                  <span className="text-neutral-800 text-sm">{p.name}</span>
                                  <span className="text-red-600 text-sm">{formatCurrency(p.price)}</span>
                                </div>
                                <p className="text-xs text-neutral-500">{p.delivery.join(" • ")}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="h-64 bg-neutral-100 rounded-3xl border-2 border-dashed border-neutral-200 flex flex-col items-center justify-center text-neutral-400">
                    <Info size={32} className="mb-2 opacity-50" />
                    <p className="font-medium font-mono text-sm tracking-wider">Selecione um perfil para ver a análise estratégica</p>
                  </div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>

        {/* Verdict Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* Mídia Kits Box */}
          <div className="bg-white rounded-3xl p-8 border border-neutral-200 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-full -mr-8 -mt-8 -z-0 opacity-50 group-hover:scale-110 transition-transform duration-300" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-red-50 text-red-600 p-2.5 rounded-xl">
                  <FolderOpen size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-neutral-900">Mídia Kits</h3>
                  <p className="text-xs text-neutral-400 font-medium">Arquivos & Apresentações</p>
                </div>
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                Acesse a pasta compartilhada no Google Drive para visualizar os materiais digitais, propostas e mídias kits enviados diretamente pelos influencers.
              </p>
              <a
                href="https://drive.google.com/drive/folders/1-fHOdQ-Ozf4q_t0M3sAE2jSJIbkgn9Qv"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 px-4 bg-neutral-900 hover:bg-red-600 text-white font-bold text-sm rounded-2xl transition-all shadow-sm hover:shadow group-hover:translate-y-[-1px] active:translate-y-0"
              >
                <span>Acessar Pasta Google Drive</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

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
                  O valor de R$150 para 5 stories fornece grande volume contínuo de menções custando pouquíssimo budget.
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

