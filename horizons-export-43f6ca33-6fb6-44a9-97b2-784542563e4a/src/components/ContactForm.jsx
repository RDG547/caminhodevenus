
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, User, MessageSquare, MapPin } from 'lucide-react';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/;


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.service || !formData.message) {
       toast({
        title: "Campos incompletos",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Email inválido",
        description: "Por favor, insira um endereço de email válido.",
        variant: "destructive",
      });
      return;
    }

    if (!phoneRegex.test(formData.phone)) {
      toast({
        title: "Telefone inválido",
        description: "Por favor, insira um número de telefone válido (ex: (XX) XXXXX-XXXX).",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Mensagem enviada!",
      description: "Entraremos em contato em breve. O universo conspira a seu favor! ✨",
      className: "bg-secondary text-secondary-foreground border-accent",
    });
    
    setFormData({ name: '', email: '', phone: '', service: '', message: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    if (name === "phone") {
      formattedValue = formatPhoneNumber(value);
    }
    setFormData({
      ...formData,
      [name]: formattedValue
    });
  };

  const formatPhoneNumber = (value) => {
    const cleaned = ('' + value).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);
    if (!match) return value;
    let formatted = '';
    if (match[1]) formatted += `(${match[1]}`;
    if (match[2]) formatted += `) ${match[2]}`;
    if (match[3]) formatted += `-${match[3]}`;
    return formatted;
  };

  const whatsappNumbers = [
    { display: "(21) 99642-4144", number: "5521996424144" },
    { display: "(21) 98678-9166", number: "5521986789166" },
  ];

  return (
    <section id="contato" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold mb-6 text-gradient">
            Entre em Contato
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Estamos aqui para guiá-lo em sua jornada de autoconhecimento
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="glass-effect rounded-xl p-8">
              <h3 className="font-cinzel text-2xl font-semibold mb-6 text-primary">
                Informações de Contato
              </h3>
              
              <div className="space-y-6">
                  <a href="mailto:contato@caminhodevenus.com" className="flex items-start space-x-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'hsl(var(--icon-email))' }}>
                      <Mail className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-primary">Email</p>
                      <span className="text-muted-foreground group-hover:text-accent transition-colors duration-300 break-all underline underline-offset-2 decoration-dotted">
                        contato@caminhodevenus.com
                      </span>
                    </div>
                  </a>
                
                <a href="https://www.instagram.com/devenuscaminho?igsh=MXJobzZ6anVjMGozdA==" target="_blank" rel="noopener noreferrer" className="flex items-start space-x-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)' }}>
                      <FaInstagram className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-primary">Instagram</p>
                      <span className="text-muted-foreground group-hover:text-accent transition-colors duration-300 break-all underline underline-offset-2 decoration-dotted">
                        @devenuscaminho
                      </span>
                    </div>
                  </a>

                <div>
                    <div className="flex items-start space-x-4 mb-2">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'hsl(var(--icon-whatsapp))' }}>
                        <FaWhatsapp className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <p className="font-medium text-primary mt-3">WhatsApp</p>
                    </div>
                    {whatsappNumbers.map((item, index) => (
                    <a 
                        key={index}
                        href={`https://wa.me/${item.number}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center space-x-4 group cursor-pointer pl-16 mb-2"
                    >
                        <span className="block text-muted-foreground group-hover:text-accent transition-colors duration-300 underline underline-offset-2 decoration-dotted">
                        {item.display}
                        </span>
                    </a>
                    ))}
                </div>
                
                <div className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'hsl(var(--icon-map))' }}>
                    <MapPin className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-primary">Atendimento</p>
                    <p className="text-muted-foreground">Online</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="glass-effect rounded-xl p-8 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-primary">Nome Completo *</Label>
                <div className="input-group">
                    <User className="input-group-icon-external h-5 w-5" />
                    <Input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input-field-external-icon w-full px-4 py-3 bg-card/80 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
                    placeholder="Seu nome completo"
                    />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-primary">Email *</Label>
                 <div className="input-group">
                    <Mail className="input-group-icon-external h-5 w-5" />
                    <Input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-field-external-icon w-full px-4 py-3 bg-card/80 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
                    placeholder="seu@email.com"
                    />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-primary">Telefone/Celular *</Label>
                 <div className="input-group">
                    <FaWhatsapp className="input-group-icon-external h-5 w-5" />
                    <Input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="input-field-external-icon w-full px-4 py-3 bg-card/80 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
                    placeholder="(XX) XXXXX-XXXX"
                    maxLength="15"
                    />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="service" className="text-primary">Serviço de Interesse *</Label>
                <select
                  name="service"
                  id="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className={cn(
                    "w-full pl-3 pr-10 py-3 text-base bg-card/80 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground",
                    formData.service === "" ? "text-muted-foreground" : ""
                  )}
                >
                  <option value="" disabled>Selecione um serviço</option>
                  <option value="tarot">Tarot</option>
                  <option value="astrologia">Astrologia</option>
                  <option value="baralho-cigano">Baralho Cigano</option>
                  <option value="combo">Combo</option>
                  <option value="outro">Outro / Dúvida Geral</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message" className="text-primary">Mensagem *</Label>
                <div className="input-group">
                    <MessageSquare className="input-group-icon-external h-5 w-5 self-start mt-3" />
                    <Textarea
                        name="message"
                        id="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="input-field-external-icon w-full px-4 py-3 bg-card/80 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground resize-none"
                        placeholder="Conte-nos sobre sua consulta ou dúvida..."
                    />
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full mystical-gradient hover:opacity-90 transition-opacity font-medium py-3 text-lg"
              >
                <Send className="w-5 h-5 mr-2" />
                Enviar Mensagem
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
