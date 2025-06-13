
import React from 'react';
import { motion } from 'framer-motion';
import { Layers2, Sparkles, ArrowLeft, HelpCircle, BookOpen, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import ServiceCard from '@/components/ServiceCard';
import { Button } from '@/components/ui/button';
import { useNotifications } from '@/contexts/AuthContext';

const BaralhoCiganoPage = () => {
  const { addNotification } = useNotifications();
  const baralhoCiganoServices = [
    {
      title: '1 Pergunta',
      description: 'Uma pergunta específica para uma resposta clara e direta do Baralho Cigano.',
      price: '10,00',
      icon: HelpCircle,
      type: 'baralho-cigano'
    },
    {
      title: '3 Perguntas',
      description: 'Explore algumas questões importantes com a sabedoria do Baralho Cigano.',
      price: '15,00',
      icon: HelpCircle,
      type: 'baralho-cigano'
    },
    {
      title: '5 Perguntas',
      description: 'Uma leitura mais ampla para diversas áreas da sua vida ou situações específicas.',
      price: '20,00',
      icon: HelpCircle,
      type: 'baralho-cigano'
    },
    {
      title: 'Jogo Aberto',
      description: 'Tempo dedicado para explorar suas questões livremente com o Baralho Cigano.',
      price: '25,00',
      icon: Clock,
      type: 'baralho-cigano'
    },
    {
      title: 'Método Estrela (1 Área da Vida)',
      description: 'Análise focada em uma área específica da sua vida (amor, trabalho, saúde, etc.).',
      price: '30,00',
      icon: BookOpen,
      type: 'baralho-cigano'
    }
  ];

  const pageColors = {
    primaryColor: 'hsl(var(--baralho-cigano-page-primary))',
    accentColor: 'hsl(var(--baralho-cigano-page-accent))',
    buttonGradientClass: 'baralho-cigano-page-button-gradient',
  };

  const handleServiceSelectToast = (serviceName) => {
    addNotification({
      type: "info",
      title: "Navegando para Solicitação...",
      message: `Você será redirecionado para solicitar: ${serviceName}.`,
    });
  };

  return (
    <div className="relative baralho-cigano-page-bg text-foreground">
      <div className="star-field"></div>
      
      <section className="relative min-h-[calc(60vh-5rem)] flex items-center justify-center px-4 z-10">
        <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1591872203901-84987a3955a7?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")'}}></div>
        <div className="max-w-6xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 floating-animation shadow-lg"
              style={{ backgroundColor: 'hsl(var(--baralho-cigano-page-primary))' }}
            >
              <Layers2 className="w-10 h-10 text-primary-foreground" />
            </div>
            
            <h1 className="font-cinzel text-5xl md:text-6xl font-bold mb-6 baralho-cigano-page-text-gradient">
              Baralho Cigano
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
              O baralho cigano é uma palavra direta sobre seus questionamentos, aquele momento que você se vê perdido e precisa tanto refletir quando ouvir na cara o que precisa, colocando as respostas à sua frente e permitindo que você crie a sua própria reflexão e consiga voltar a trilhar seu caminho.
            </p>
            
            <Button
              asChild
              variant="outline"
              className="border-[hsl(var(--baralho-cigano-page-primary))] text-[hsl(var(--baralho-cigano-page-primary))] hover:bg-[hsla(var(--baralho-cigano-page-primary)/0.1)] hover:text-[hsl(var(--baralho-cigano-page-primary))]"
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
              <h2 className="font-cinzel text-4xl md:text-5xl font-bold mb-6 baralho-cigano-page-text-gradient">
                Serviços de Baralho Cigano
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Descubra as mensagens e orientações que o Baralho Cigano tem para você.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {baralhoCiganoServices.map((service, index) => (
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
                <h2 className="font-cinzel text-4xl font-bold mb-6 baralho-cigano-page-text-gradient">
                  A Sabedoria do Baralho Cigano
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  O Baralho Cigano, também conhecido como Lenormand, é um sistema divinatório que carrega uma sabedoria ancestral. Com suas 36 cartas, cada uma representando aspectos específicos da vida, oferece orientações claras e diretas sobre questões do cotidiano.
                </p>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Diferente do Tarot, o Baralho Cigano é conhecido por suas respostas objetivas e práticas, sendo ideal para quem busca orientações concretas sobre amor, trabalho, família e decisões importantes.
                </p>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Nossa consulta com o Baralho Cigano é conduzida com respeito e intuição, seguindo a linha da Umbanda, oferecendo insights valiosos para sua jornada de vida.
                </p>
                <div className="space-y-4">
                  {[
                    "Respostas claras e objetivas",
                    "Intuição e conexão espiritual",
                    "Orientações práticas para o dia a dia"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{backgroundColor: 'hsl(var(--baralho-cigano-page-primary))'}}></div>
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
                    alt="Cartas do baralho cigano dispostas em mesa com elementos místicos em tons de verde e roxo"
                    src="https://images.unsplash.com/photo-1662227330385-5711640418cd" />
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
              <h2 className="font-cinzel text-3xl md:text-4xl font-bold mb-6 baralho-cigano-page-text-gradient">
                Conecte-se com a Sabedoria Cigana
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Agende sua consulta de Baralho Cigano e receba orientações claras para sua jornada.
              </p>
              <Button
                asChild
                size="lg"
                className="baralho-cigano-page-button-gradient hover:opacity-90 transition-opacity font-medium text-lg px-8 py-4 text-primary-foreground shadow-lg"
              >
                <a href="#contato">
                  <Sparkles className="w-5 h-5 mr-2" />
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

export default BaralhoCiganoPage;
