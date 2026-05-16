import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, MapPin, Star, Coffee, Waves, Shield, Play, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LandingPage: React.FC = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="pt-24 pb-12">
      {/* Video Modal Placeholder */}
      <AnimatePresence>
        {showVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-6 backdrop-blur-xl"
          >
            <div className="relative w-full max-w-5xl aspect-video glass-card overflow-hidden bg-maori-dark">
              <button 
                onClick={() => setShowVideo(false)}
                className="absolute top-4 right-4 z-10 p-2 glass rounded-full text-white hover:bg-maori-orange transition-colors"
              >
                <X size={24} />
              </button>
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <Play size={64} className="text-maori-orange mx-auto mb-4 animate-pulse" />
                  <h3 className="text-2xl font-display font-bold text-white">Maori Mantiqueira Hotel</h3>
                  <p className="text-maori-steel/60">Cruzeiro, São Paulo</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative px-6 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight text-white mb-6">
              Acolhimento na <span className="text-maori-orange">Mantiqueira.</span>
            </h1>
            <p className="text-lg text-maori-steel/80 mb-8 max-w-lg leading-relaxed">
              Localizado estrategicamente em Cruzeiro/SP, o Maori Mantiqueira Hotel une conforto, 
              qualidade e conexão com a Serra da Mantiqueira e o Vale da Fé.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/reservar"
                className="bg-maori-orange hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 transition-all group"
              >
                Reservar Agora
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button 
                onClick={() => setShowVideo(true)}
                className="glass hover:bg-white/10 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 transition-all"
              >
                <Play size={20} fill="currentColor" />
                Ver Vídeo
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, rotate: 5, scale: 0.9 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl glass p-2">
              <img 
                src="/src/assets/images/regenerated_image_1778516609996.png" 
                alt="Maori Mantiqueira Hotel" 
                className="w-full h-full object-contain rounded-[1.5rem]"
                referrerPolicy="no-referrer"
              />
            </div>
            <motion.div 
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-6 glass px-6 py-4 rounded-2xl flex items-center gap-4 border-maori-orange/30"
            >
              <div className="bg-maori-orange/20 p-2 rounded-xl">
                <MapPin className="text-maori-orange" />
              </div>
              <div>
                <div className="font-bold text-white">Cruzeiro, SP</div>
                <div className="text-xs text-maori-steel/60">Vale do Paraíba</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-white mb-4">Negócios, Fé e Lazer</h2>
            <p className="text-maori-steel/60">O local ideal para quem visita o Vale do Paraíba e Sul de Minas</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: "Público Corporativo", desc: "Próximo a Resende, Itatiaia e polos industriais" },
              { icon: Star, title: "Roteiro da Fé", desc: "Próximo à Canção Nova e Santuário de Aparecida" },
              { icon: Waves, title: "Ecoturismo", desc: "Aos pés da majestosa Serra da Mantiqueira" },
              { icon: Coffee, title: "Conforto Moderno", desc: "Hospedagem sem complicações e com estilo" },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8 hover:bg-white/15 transition-colors cursor-default"
              >
                <div className="bg-maori-orange/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                  {typeof feature.icon === 'function' ? <feature.icon className="text-maori-orange" size={24} /> : React.createElement(feature.icon as any, { className: "text-maori-orange", size: 24 })}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-maori-steel/60">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* City Details */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
             <div className="order-2 lg:order-1 relative group">
                <div className="aspect-video glass p-2 rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src="/src/assets/images/regenerated_image_1778516611905.png" 
                    alt="Cruzeiro - No Coração do Vale" 
                    className="w-full h-full object-contain rounded-2xl"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-64 -right-4 glass-card p-6 max-w-sm bg-maori-dark/95 backdrop-blur-2xl border-maori-orange/30 shadow-2xl z-10">
                  <p className="text-sm text-white font-bold mb-2 uppercase tracking-widest text-maori-orange">Cruzeiro / SP</p>
                  <p className="italic text-sm text-maori-steel/80 mb-4 leading-relaxed">
                    "A cidade se destaca por sua riqueza natural e histórica, cercada pela imponente Serra da Mantiqueira e banhada pelo Rio Paraíba do Sul."
                  </p>
                  <div className="flex items-center gap-4 border-t border-white/10 pt-4">
                    <div className="text-xs text-maori-steel/40">
                      <p className="font-bold text-white mb-1 uppercase">Contato</p>
                      <p>(12) 3141-7904</p>
                      <p>reservas@maorihotel.com.br</p>
                    </div>
                  </div>
                </div>
             </div>
             <div className="order-1 lg:order-2">
                <h2 className="text-4xl font-display font-bold text-white mb-6">No Coração do Vale</h2>
                <p className="text-lg text-maori-steel/80 mb-8 leading-relaxed">
                  Cruzeiro é banhada pelo Rio Paraíba do Sul e cortada por importantes rodovias e uma ferrovia histórica. 
                  Sua identidade visual contemporânea traduz acolhimento e pertencimento.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { label: "Canção Nova", km: "22km" },
                    { label: "Aparecida", km: "45km" },
                    { label: "Hospital Regional", km: "Próximo" },
                    { label: "Unitau Campus", km: "Local" }
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col border-l-2 border-maori-orange pl-4">
                      <span className="text-white font-bold">{item.label}</span>
                      <span className="text-xs text-maori-steel/50">{item.km}</span>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};
