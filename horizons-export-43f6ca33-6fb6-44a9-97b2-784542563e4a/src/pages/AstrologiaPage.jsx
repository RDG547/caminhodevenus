
import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Star, Heart, Briefcase, Calendar, ArrowLeft, Compass, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import ServiceCard from '@/components/ServiceCard';
import { Button } from '@/components/ui/button';
import { useNotifications } from '@/contexts/AuthContext';

const AstrologiaPage = () => {
  const { addNotification } = useNotifications();
  const astrologiaServices = [
    {
      title: 'Aconselhamento Astrológico',
      description: 'Baseado em seu horóscopo e mapa natal, um aconselhamento personalizado para o momento que está passando.',
      price: '25,00',
      icon: Star,
      type: 'astrologia'
    },
    {
      title: 'Mapa Astral Comum',
      description: 'Pontos básicos do mapa: lua, ascendente, signo solar e vênus. Ideal para iniciantes na astrologia.',
      price: '30,00',
      icon: Star,
      type: 'astrologia'
    },
    {
      title: 'Mapa Profissional',
      description: 'Direcionamento profissional a partir do mapa natal, evidenciando talentos e áreas de destaque.',
      price: '30,00',
      icon: Briefcase,
      type: 'astrologia'
    },
    {
      title: 'Mapa Amoroso',
      description: 'Análise dos caminhos amorosos, dificuldades e obstáculos, com base nos aspectos do seu mapa natal.',
      price: '30,00',
      icon: Heart,
      type: 'astrologia'
    },
    {
      title: 'Nodos Lunares',
      description: 'Aspectos de encarnações passadas (Nodo Sul) e o que deve ser melhorado (Nodo Norte).',
      price: '30,00',
      icon: Compass,
      type: 'astrologia'
    },
    {
      title: 'Revolução Solar',
      description: 'Análise do seu novo ciclo anual, energias renovadas e aprendizados para o próximo ano.',
      price: '40,00',
      icon: Calendar,
      type: 'astrologia'
    },
    {
      title: 'Mapa Astral Completo',
      description: 'Análise completa do momento do seu nascimento, astros e casas astrológicas. Mergulho de autoconhecimento.',
      price: '60,00',
      icon: Sun,
      type: 'astrologia'
    }
  ];

  const combos = [
    {
      title: 'Sinastria Amorosa + Arcano do Relacionamento',
      description: 'Visão astrológica das energias do casal, combinação energética e o arcano regente do relacionamento.',
      price: '66,00',
      icon: Heart,
      type: 'astrologia'
    },
    {
      title: 'Revolução Solar + Tiragem Anual',
      description: 'Previsões para o seu ano: signo regente, posições importantes e tiragem anual dos meses e suas energias.',
      price: '70,00',
      icon: Calendar,
      type: 'astrologia'
    }
  ];

  const pageColors = {
    primaryColor: 'hsl(var(--astrologia-page-primary))',
    accentColor: 'hsl(var(--astrologia-page-accent))',
    buttonGradientClass: 'astrologia-page-button-gradient',
  };

  const handleServiceSelectToast = (serviceName) => {
    addNotification({
      type: "info",
      title: "Navegando para Solicitação...",
      message: `Você será redirecionado para solicitar: ${serviceName}.`,
    });
  };

  return (
    <div className="relative astrologia-page-bg text-foreground">
      <div className="star-field"></div>
      
      <section className="relative min-h-[calc(60vh-5rem)] flex items-center justify-center px-4 z-10">
        <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1604906695534-20733056d143?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")'}}></div>
        <div className="max-w-6xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 floating-animation shadow-lg"
              style={{ backgroundColor: 'hsl(var(--astrologia-page-primary))' }}
            >
              <Sun className="w-10 h-10 text-primary-foreground" />
            </div>
            
            <h1 className="font-cinzel text-5xl md:text-6xl font-bold mb-6 astrologia-page-text-gradient">
              Astrologia
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
              A astrologia é como um mapa do céu refletindo o que pulsa dentro de você. Ela não dita o destino, mas te mostra os caminhos, as marés, os momentos de recolhimento e de ação. É o espelho, revelando o que precisa ser visto, compreendido e acolhido.
            </p>
            
            <Button
              asChild
              variant="outline"
              className="border-[hsl(var(--astrologia-page-primary))] text-[hsl(var(--astrologia-page-primary))] hover:bg-[hsla(var(--astrologia-page-primary)/0.1)] hover:text-[hsl(var(--astrologia-page-primary))]"
            >
              <Link to="/">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Voltar ao Início
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <div className="relative z-10">
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="font-cinzel text-4xl md:text-5xl font-bold mb-6 astrologia-page-text-gradient">
                Serviços de Astrologia
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Explore os mistérios do seu mapa astral e descubra como os planetas e signos influenciam sua jornada de vida.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {astrologiaServices.map((service, index) => (
                <ServiceCard
                  key={service.title}
                  title={service.title}
                  description={service.description}
                  price={service.price}
                  icon={service.icon}
                  delay={index * 0.1}
                  onSelect={handleServiceSelectToast}
                  pageColors={pageColors}
                  serviceType={service.type}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-card/30">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="font-cinzel text-4xl md:text-5xl font-bold mb-6 astrologia-page-text-gradient">
                Combos Especiais
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Pacotes combinados que oferecem uma visão ainda mais completa e detalhada da sua jornada astrológica.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {combos.map((combo, index) => (
                <ServiceCard
                  key={combo.title}
                  title={combo.title}
                  description={combo.description}
                  price={combo.price}
                  icon={combo.icon}
                  delay={index * 0.2}
                  onSelect={handleServiceSelectToast}
                  pageColors={pageColors}
                  serviceType={combo.type}
                />
              ))}
            </div>
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
                <h2 className="font-cinzel text-4xl font-bold mb-6 astrologia-page-text-gradient">
                  A Ciência dos Astros
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Funciona como uma conversa íntima com o universo, onde os planetas sussurram mensagens que ajudam a entender seus ciclos, suas dores, seus talentos e suas transformações. Assim como um velho sábio que conhece sua essência, a astrologia caminha ao seu lado, lembrando que tudo tem um tempo certo para florescer.
                </p>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Cada planeta, signo e casa astrológica carrega significados únicos que, quando interpretados em conjunto, revelam um retrato completo de quem você é e do seu potencial de crescimento.
                </p>
                <div className="space-y-4">
                  {[
                    "Análise personalizada do seu mapa natal",
                    "Orientação para diferentes áreas da vida",
                    "Previsões e ciclos astrológicos"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{backgroundColor: 'hsl(var(--astrologia-page-accent))'}}></div>
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="floating-animation">
                  <img   
                    className="w-full rounded-xl glass-effect shadow-2xl"
                    alt="Mapa astral com símbolos zodiacais e planetas em tons de roxo e verde"
                    src="https://images.unsplash.com/photo-1685478237361-a5b50d0eb76b" />
                </div>
              </motion.div>
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
              <h2 className="font-cinzel text-3xl md:text-4xl font-bold mb-6 astrologia-page-text-gradient">
                Descubra Seu Mapa Astral
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Permita que os astros revelem os segredos da sua personalidade e destino. Agende sua consulta astrológica hoje mesmo.
              </p>
              <Button
                asChild
                size="lg"
                className="astrologia-page-button-gradient hover:opacity-90 transition-opacity font-medium text-lg px-8 py-4 text-primary-foreground shadow-lg"
              >
                <a href="#contato">
                  <Sun className="w-5 h-5 mr-2" />
                  Agendar Consulta
                </a>
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AstrologiaPage;
