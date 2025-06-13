
import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Clock, Users, Zap, ArrowLeft, HelpCircle, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import ServiceCard from '@/components/ServiceCard';
import { Button } from '@/components/ui/button';
import { useNotifications } from '@/contexts/AuthContext';

const TarotPage = () => {
  const { addNotification } = useNotifications();
  const tarotServices = [
    {
      title: '1 Pergunta',
      description: 'Uma pergunta objetiva para uma resposta rápida e direta do Tarot.',
      price: '10,00',
      icon: HelpCircle,
      type: 'tarot'
    },
    {
      title: '5 Perguntas',
      description: 'Tiragem em tempo real, ideal para explorar algumas questões pontuais.',
      price: '15,00',
      icon: Zap,
      type: 'tarot'
    },
    {
      title: '10 Perguntas',
      description: 'Tiragem em tempo real, para uma análise mais aprofundada de múltiplas questões.',
      price: '20,00',
      icon: Zap,
      type: 'tarot'
    },
    {
      title: 'Círculos (2 Círculos + 2 Perguntas)',
      description: 'Método de jogo onde tiraremos de forma mais ampla sobre determinada situação.',
      price: '25,00',
      icon: Users,
      type: 'tarot'
    },
    {
      title: 'Método Espelho',
      description: 'Uma leitura introspectiva para entender reflexos e projeções em situações específicas.',
      price: '30,00',
      icon: BookOpen,
      type: 'tarot'
    },
    {
      title: 'Método Rosa',
      description: 'Leitura amorosa para analisar o casal, vontades, influências e parceria.',
      price: '33,00',
      icon: Moon,
      type: 'tarot'
    },
    {
      title: 'Mesa Real',
      description: 'Análise completa de todas as áreas da sua vida para os próximos 30 dias.',
      price: '50,00',
      icon: Users,
      type: 'tarot'
    },
    {
      title: 'Jogo Aberto',
      description: 'Uma hora online para qualquer pacote ou pergunta, máxima flexibilidade.',
      price: '75,00',
      icon: Clock,
      type: 'tarot'
    }
  ];

  const pageColors = {
    primaryColor: 'hsl(var(--tarot-page-primary))',
    accentColor: 'hsl(var(--tarot-page-accent))',
    buttonGradientClass: 'tarot-page-button-gradient',
  };

  const handleServiceSelectToast = (serviceName) => {
    addNotification({
      type: "info", 
      title: "Navegando para Solicitação...",
      message: `Você será redirecionado para solicitar: ${serviceName}.`
    });
  };

  return (
    <div className="relative tarot-page-bg text-foreground">
      <div className="star-field"></div>
      
      <section className="relative min-h-[calc(60vh-5rem)] flex items-center justify-center px-4 z-10">
        <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1605105209036-76aca6acc093?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")'}}></div>
        <div className="max-w-6xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 floating-animation shadow-lg"
              style={{ backgroundColor: 'hsl(var(--tarot-page-primary))' }}
            >
              <Moon className="w-10 h-10 text-primary-foreground" />
            </div>
            
            <h1 className="font-cinzel text-5xl md:text-6xl font-bold mb-6 tarot-page-text-gradient">
              Tarot
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
               O tarot é um conselho guiado, ele vem quando precisamos pensar e ter uma ajuda no processo de reflexão, a fim de organizar dentro das suas demandas trilhando junto a você, caminhos que precisam de ajuda. Seus conselhos são como um amigo ou mãe após um desabafo, mostrando que sempre existe um caminho a trilhar.
            </p>
            
            <Button
              asChild
              variant="outline"
              className="border-[hsl(var(--tarot-page-primary))] text-[hsl(var(--tarot-page-primary))] hover:bg-[hsla(var(--tarot-page-primary)/0.1)] hover:text-[hsl(var(--tarot-page-primary))]"
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
              <h2 className="font-cinzel text-4xl md:text-5xl font-bold mb-6 tarot-page-text-gradient">
                Serviços de Tarot
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Escolha o método que melhor se adequa às suas necessidades e permita que as cartas revelem os caminhos do seu destino.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tarotServices.map((service, index) => (
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
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-cinzel text-4xl font-bold mb-6 tarot-page-text-gradient">
                  A Sabedoria do Tarot
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  O Tarot é uma ferramenta milenar de autoconhecimento e orientação espiritual. Através de suas 78 cartas, cada uma carregada de simbolismo e significado, podemos acessar insights profundos sobre nossa vida, relacionamentos, carreira e propósito.
                </p>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Nossas consultas são realizadas com respeito, ética e profissionalismo, sempre focando no seu crescimento pessoal e bem-estar espiritual.
                </p>
                <div className="space-y-4">
                  {[
                    "Consultas online em tempo real",
                    "Métodos tradicionais e eficazes",
                    "Orientação personalizada e acolhedora"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{backgroundColor: 'hsl(var(--tarot-page-primary))'}}></div>
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
                    alt="Cartas de tarot místicas espalhadas sobre mesa com cristais em tons de roxo e verde"
                    src="https://images.unsplash.com/photo-1556739442-4c892bcbe8ba" />
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
              <h2 className="font-cinzel text-3xl md:text-4xl font-bold mb-6 tarot-page-text-gradient">
                Pronto para Descobrir Seu Destino?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Entre em contato conosco e agende sua consulta de tarot. O universo tem mensagens especiais para você.
              </p>
              <Button
                asChild
                size="lg"
                className="tarot-page-button-gradient hover:opacity-90 transition-opacity font-medium text-lg px-8 py-4 text-primary-foreground shadow-lg"
              >
                <a href="#contato">
                  <Moon className="w-5 h-5 mr-2" />
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

export default TarotPage;
