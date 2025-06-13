
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, Moon, Sun, ArrowLeft, Sparkles, Users, Feather, BookOpen, Layers2, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const SobrePage = () => {
  const values = [
    {
      icon: Heart,
      title: 'Acolhimento e Empatia',
      description: 'Criamos um espaço seguro e acolhedor, onde cada história é ouvida com empatia e respeito.',
      iconColor: 'hsl(var(--icon-tarot))', 
      titleColor: 'hsl(var(--icon-tarot))'
    },
    {
      icon: Feather,
      title: 'Intuição e Conexão Espiritual',
      description: 'Buscamos desenvolver nossa espiritualidade para oferecer leituras intuitivas e profundamente conectadas.',
      iconColor: 'hsl(var(--icon-astrologia))',
      titleColor: 'hsl(var(--icon-astrologia))'
    },
    {
      icon: TrendingUp, 
      title: 'Evolução e Crescimento',
      description: 'Acreditamos no poder transformador do autoconhecimento e guiamos você em sua jornada de evolução.',
      iconColor: 'hsl(var(--icon-baralho-cigano))',
      titleColor: 'hsl(var(--icon-baralho-cigano))'
    },
    {
      icon: BookOpen,
      title: 'Sabedoria e Clareza',
      description: 'Combinamos estudo e prática para trazer clareza e sabedoria, ajudando a iluminar seus caminhos.',
      iconColor: 'hsl(60, 70%, 50%)', 
      titleColor: 'hsl(60, 70%, 50%)' 
    }
  ];

  return (
    <div className="relative bg-gradient-to-br from-background via-purple-900/30 to-background">
      <div className="star-field"></div>
      
      <div className="relative z-10">
        <section className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-20 h-20 cosmic-gradient rounded-full flex items-center justify-center mx-auto mb-8 floating-animation shadow-lg">
                <Users className="w-10 h-10 text-primary-foreground" />
              </div>
              
              <h1 className="font-cinzel text-5xl md:text-6xl font-bold mb-6 text-gradient">
                Sobre Nós: Beatriz & Juliana
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
                Beatriz e Juliana, sempre fomos apaixonadas pelo místico, pelo oculto que nos sussurra e a chama que queima em nosso peito e almas afins, uma hora se encontraram em cada passagem.
              </p>
              
              <Button
                asChild
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 hover:text-primary"
              >
                <Link to="/">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Voltar ao Início
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-cinzel text-4xl font-bold mb-6 text-gradient">
                  Nossa União: O Nascimento da Vênus
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Assim, como amigas e irmãs nos alinhamos dentro do místico, cada uma com seus mistérios para trazer sempre o melhor a quem atendemos, buscamos sempre desenvolver nossa espiritualidade e ajudar quem chega até nós como se fosse nosso chamado.
                </p>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Por meio desse chamado e união, nasceu a Vênus, uma casa para quem precisa de refúgio e um bengala para quem precisa de apoio, ajudando, acalentando e aconselhando em tempos difíceis, rindo em tempos bons e sempre buscando a evolução, crescimento e florescer.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="floating-animation">
                  <img  className="w-full rounded-xl glass-effect shadow-2xl" alt="Duas amigas sorrindo em um ambiente natural e místico, com elementos de tarot e astrologia ao redor em tons de roxo e verde" src="https://images.unsplash.com/photo-1654518981792-e32b340dacfd" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        <section className="py-20 px-4 bg-card/50">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="glass-effect rounded-xl p-8"
              >
                <div className="flex items-center mb-4">
                  <Sun className="w-10 h-10 text-primary mr-4"/>
                  <h3 className="font-cinzel text-3xl font-semibold text-gradient">Bia</h3>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Cartomante e astróloga, sou especialista em interpretações de mapas natais, trânsitos astrológicos e revoluções solares, além de cartomante de baralho cigano com ligação ancestral.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="glass-effect rounded-xl p-8"
              >
                <div className="flex items-center mb-4">
                  <Moon className="w-10 h-10 text-accent mr-4"/>
                  <h3 className="font-cinzel text-3xl font-semibold text-gradient">Ju</h3>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Taróloga e astróloga trás reflexões, afeto, construção e proteção em suas cartas trazendo um acolhimento mesmo que de longe.
                </p>
              </motion.div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="font-cinzel text-4xl md:text-5xl font-bold mb-6 text-gradient">
                Nossos Pilares
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Os princípios que guiam cada consulta e orientação que oferecemos.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="glass-effect rounded-xl p-6 text-center card-hover flex flex-col"
                  >
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: value.iconColor }}
                    >
                      <Icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    
                    <h3 className={`font-cinzel text-xl font-semibold mb-4`} style={{color: value.titleColor}}>
                      {value.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed flex-grow">
                      {value.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-effect rounded-xl p-12 shadow-xl"
            >
              <h2 className="font-cinzel text-3xl md:text-4xl font-bold mb-6 text-gradient">
                Pronto para Sua Jornada?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Se você chegou até aqui, não foi coincidência. O universo está chamando você para uma jornada de autoconhecimento e transformação.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="tarot-page-button-gradient hover:opacity-90 transition-opacity font-medium text-primary-foreground shadow-lg"
                >
                  <Link to="/tarot">
                    <Moon className="w-5 h-5 mr-2" />
                    Consulta de Tarot
                  </Link>
                </Button>
                
                <Button
                  asChild
                  size="lg"
                  className="astrologia-page-button-gradient hover:opacity-90 transition-opacity font-medium text-primary-foreground shadow-lg"
                >
                  <Link to="/astrologia">
                    <Sun className="w-5 h-5 mr-2" />
                    Mapa Astral
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="baralho-cigano-page-button-gradient hover:opacity-90 transition-opacity font-medium text-primary-foreground shadow-lg"
                >
                  <Link to="/baralho-cigano">
                    <Layers2 className="w-5 h-5 mr-2" />
                    Baralho Cigano
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SobrePage;
