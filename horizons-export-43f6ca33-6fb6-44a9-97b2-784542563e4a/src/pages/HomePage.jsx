
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Moon, Sun, ArrowRight, Sparkles, Users, Mail, Layers2 } from 'lucide-react';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import ContactForm from '@/components/ContactForm';
import { Button } from '@/components/ui/button';

const HomePage = () => {
  const services = [
    {
      title: 'Tarot',
      description: 'O tarot é um conselho guiado, ele vem quando precisamos pensar e ter uma ajuda no processo de reflexão, a fim de organizar dentro das suas demandas trilhando junto a você, caminhos que precisam de ajuda. Seus conselhos são como um amigo ou mãe após um desabafo, mostrando que sempre existe um caminho a trilhar.',
      icon: Moon,
      path: '/tarot',
      iconColor: 'hsl(var(--icon-tarot))'
    },
    {
      title: 'Astrologia',
      description: 'A astrologia é como um mapa do céu refletindo o que pulsa dentro de você. Ela não dita o destino, mas te mostra os caminhos, as marés, os momentos de recolhimento e de ação. É o espelho, revelando o que precisa ser visto, compreendido e acolhido.',
      icon: Sun,
      path: '/astrologia',
      iconColor: 'hsl(var(--icon-astrologia))'
    },
    {
      title: 'Baralho Cigano',
      description: 'O baralho cigano é uma palavra direta sobre seus questionamentos, aquele momento que você se vê perdido e precisa tanto refletir quando ouvir na cara o que precisa, colocando as respostas à sua frente e permitindo que você crie a sua própria reflexão e consiga voltar a trilhar seu caminho.',
      icon: Layers2,
      path: '/baralho-cigano',
      iconColor: 'hsl(var(--icon-baralho-cigano))'
    }
  ];

  const whatsappNumbers = [
    { display: "(21) 99642-4144", number: "5521996424144" },
    { display: "(21) 98678-9166", number: "5521986789166" },
  ];

  return (
    <div className="relative bg-gradient-to-br from-background via-purple-900/30 to-background">
      <div className="star-field"></div>
      
      <div className="relative z-10">
        <section className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <h1 className="font-cinzel text-5xl md:text-7xl font-bold mb-6 text-gradient">
                Caminho de Vênus
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
                Bem vindos ao nosso site! Aqui estará nossas descrições de tiragens, combos e demais elementos com explicações mais elaboradas. Se você chegou até aqui, não foi uma coincidência. O céu sempre sabe o que faz.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="floating-animation mb-8"
            >
              <img   
                className="w-52 h-52 md:w-64 md:h-64 mx-auto rounded-full object-cover glass-effect pulse-glow shadow-2xl"
                alt="Símbolos místicos de tarot e astrologia em tons de roxo e verde"
                src="https://images.unsplash.com/photo-1556739442-4c892bcbe8ba" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Button
                asChild
                size="lg"
                className="mystical-gradient hover:opacity-90 transition-opacity font-medium text-lg px-8 py-4 text-primary-foreground shadow-lg"
              >
                <a href="#servicos">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Descobrir Serviços
                </a>
              </Button>
            </motion.div>
          </div>
        </section>

        <section id="servicos" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="font-cinzel text-4xl md:text-5xl font-bold mb-6 text-gradient">
                Nossos Serviços
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Explore os caminhos do autoconhecimento através de nossas práticas ancestrais
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                
                return (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="group"
                  >
                    <Link to={service.path} className="block h-full">
                      <div className="glass-effect rounded-xl p-8 card-hover h-full flex flex-col">
                        <div 
                          className="w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-md"
                          style={{ backgroundColor: service.iconColor }}
                        >
                          <Icon className="w-8 h-8 text-primary-foreground" />
                        </div>
                        
                        <h3 className="font-cinzel text-2xl font-semibold mb-4 text-center text-primary">
                          {service.title}
                        </h3>
                        
                        <p className="text-muted-foreground text-center mb-6 leading-relaxed flex-grow">
                          {service.description}
                        </p>
                        
                        <div className="flex items-center justify-center text-accent group-hover:text-primary transition-colors mt-auto">
                          <span className="font-medium">Saiba mais</span>
                          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-card/50">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-cinzel text-4xl md:text-5xl font-bold mb-6 text-gradient">
                  Sobre Nós
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Beatriz e Juliana, sempre fomos apaixonadas pelo místico, pelo oculto que nos sussurra e a chama que queima em nosso peito e almas afins, uma hora se encontraram em cada passagem.
                  Assim, como amigas e irmãs nos alinhamos dentro do místico, cada uma com seus mistérios para trazer sempre o melhor a quem atendemos, buscamos sempre desenvolver nossa espiritualidade e ajudar quem chega até nós como se fosse nosso chamado. 
                </p>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Por meio desse chamado e união, nasceu a Vênus, uma casa para quem precisa de refúgio e um bengala para quem precisa de apoio, ajudando, acalentando e aconselhando em tempos difíceis, rindo em tempos bons e sempre buscando a evolução, crescimento e florescer.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="mystical-gradient hover:opacity-90 transition-opacity font-medium text-primary-foreground shadow-lg"
                >
                  <Link to="/sobre">
                    <Users className="w-5 h-5 mr-2" />
                    Conheça Nossa História Completa
                  </Link>
                </Button>
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
                    alt="Ambiente místico com cristais e cartas de tarot em tons de roxo e verde"
                    src="https://images.unsplash.com/photo-1556739442-4c892bcbe8ba" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <ContactForm />

        <footer className="bg-card/80 py-12 px-4 border-t border-border">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.7 }}
                className="w-10 h-10 cosmic-gradient rounded-full flex items-center justify-center shadow-md"
              >
                <Sparkles className="w-6 h-6 text-primary-foreground" />
              </motion.div>
              <span className="font-cinzel text-2xl font-bold text-gradient">
                Caminho de Vênus
              </span>
            </div>
            
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Conectando você com os mistérios do universo e a sabedoria ancestral para uma jornada de autoconhecimento e transformação.
            </p>

            <div className="flex justify-center space-x-6 mb-8">
              <a href="mailto:contato@caminhodevenus.com" className="text-muted-foreground hover:text-primary transition-colors group" aria-label="Enviar email">
                <Mail className="w-7 h-7" style={{ color: 'hsl(var(--icon-email))' }} />
                <span className="sr-only">Enviar email para contato@caminhodevenus.com</span>
              </a>
              {whatsappNumbers.map((item, index) => (
                <a 
                  key={index}
                  href={`https://wa.me/${item.number}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-muted-foreground hover:text-primary transition-colors group"
                  aria-label={`WhatsApp ${index + 1}: ${item.display}`}
                >
                  <FaWhatsapp className="w-7 h-7" style={{ color: 'hsl(var(--icon-whatsapp))' }} />
                   <span className="sr-only">Abrir WhatsApp para {item.display}</span>
                </a>
              ))}
               <a href="https://www.instagram.com/devenuscaminho?igsh=MXJobzZ6anVjMGozdA==" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors group" aria-label="Instagram">
                <FaInstagram className="w-7 h-7" style={{ color: 'hsl(330, 50%, 45%)' }} />
                <span className="sr-only">Visitar nosso Instagram @devenuscaminho</span>
              </a>
            </div>
            
            <p className="text-sm text-muted-foreground/70">
              © {new Date().getFullYear()} Caminho de Vênus. Todos os direitos reservados.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
