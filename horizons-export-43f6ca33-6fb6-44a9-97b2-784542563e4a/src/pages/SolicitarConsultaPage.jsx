import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, ArrowLeft, Moon, Sun, Layers2, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth, useNotifications } from '@/contexts/AuthContext';
import { Calendar as CalendarUI } from '@/components/ui/calendar';
import { supabase } from '@/lib/supabaseClient';
import { format, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const SolicitarConsultaPage = () => {
  const { serviceName } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addNotification } = useNotifications();

  const decodedServiceName = decodeURIComponent(serviceName);
  const serviceType = decodedServiceName.toLowerCase().replace(/ /g, '-');

  const [name, setName] = useState(user?.profile?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.profile?.phone || '');
  const [message, setMessage] = useState(`Olá! Gostaria de agendar uma consulta para o serviço: "${decodedServiceName}".`);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingSlots, setIsFetchingSlots] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const pageConfig = {
    tarot: { primaryColor: 'hsl(var(--tarot-page-primary))', accentColor: 'hsl(var(--tarot-page-accent))', bgColorStart: 'hsl(var(--tarot-page-bg-start))', bgColorEnd: 'hsl(var(--tarot-page-bg-end))', icon: Moon, pageTitle: 'Solicitar Consulta de Tarot' },
    astrologia: { primaryColor: 'hsl(var(--astrologia-page-primary))', accentColor: 'hsl(var(--astrologia-page-accent))', bgColorStart: 'hsl(var(--astrologia-page-bg-start))', bgColorEnd: 'hsl(var(--astrologia-page-bg-end))', icon: Sun, pageTitle: 'Solicitar Consulta de Astrologia' },
    'baralho-cigano': { primaryColor: 'hsl(var(--baralho-cigano-page-primary))', accentColor: 'hsl(var(--baralho-cigano-page-accent))', bgColorStart: 'hsl(var(--baralho-cigano-page-bg-start))', bgColorEnd: 'hsl(var(--baralho-cigano-page-bg-end))', icon: Layers2, pageTitle: 'Solicitar Consulta de Baralho Cigano' },
    geral: { primaryColor: 'hsl(var(--primary))', accentColor: 'hsl(var(--accent))', bgColorStart: 'hsl(var(--background))', bgColorEnd: 'hsl(var(--background))', icon: Send, pageTitle: 'Solicitar Consulta' }
  };
  const currentConfig = pageConfig[serviceType] || pageConfig.geral;
  const PageIcon = currentConfig.icon;

  const fetchAvailableSlots = useCallback(async (date) => {
    if (!date) return;
    setIsFetchingSlots(true);
    setAvailableSlots([]);
    setSelectedSlot(null);
    const formattedDate = format(date, 'yyyy-MM-dd');
    const { data, error } = await supabase
      .from('admin_availability')
      .select('*')
      .eq('available_date', formattedDate)
      .eq('is_booked', false)
      .order('start_time');

    if (error) {
      addNotification({ type: 'error', title: 'Erro ao buscar horários', message: 'Não foi possível carregar os horários. Tente novamente.' });
    } else {
      setAvailableSlots(data);
    }
    setIsFetchingSlots(false);
  }, [addNotification]);

  useEffect(() => {
    if(selectedDate) {
      fetchAvailableSlots(selectedDate);
    }
  }, [selectedDate, fetchAvailableSlots]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !selectedDate || !selectedSlot) {
      addNotification({type: "error", title: "Dados Incompletos", message: "Por favor, preencha seus dados e selecione uma data e horário."});
      return;
    }
    setIsLoading(true);

    const appointmentData = {
      user_id: user.id,
      user_name: name,
      user_email: email,
      user_phone: phone.replace(/\D/g, ''),
      service_name: decodedServiceName,
      appointment_date: format(selectedDate, 'yyyy-MM-dd'),
      appointment_time: selectedSlot.start_time,
      availability_slot_id: selectedSlot.id,
      message: message,
      status: 'confirmado',
    };
    
    const { error } = await supabase.from('appointments').insert(appointmentData);

    if (error) {
      addNotification({ type: 'error', title: 'Erro no Agendamento', message: error.message });
      setIsLoading(false);
      return;
    }

    addNotification({ type: 'success', title: 'Consulta Agendada!', message: `Sua consulta de ${decodedServiceName} foi agendada para ${format(selectedDate, 'dd/MM/yyyy')} às ${format(parse(selectedSlot.start_time, 'HH:mm:ss', new Date()), 'HH:mm')}.` });
    
    const adminNotification = {
        title: 'Nova Consulta Agendada!',
        message: `${name} agendou ${decodedServiceName} para ${format(selectedDate, 'dd/MM/yy')} às ${format(parse(selectedSlot.start_time, 'HH:mm:ss', new Date()), 'HH:mm')}.`,
        type: 'success',
        link_to: '/admin-dashboard'
    };
    await supabase.from('admin_notifications').insert(adminNotification);

    setIsLoading(false);
    navigate('/perfil');
  };

  return (
    <div className="min-h-screen scroll-smooth text-foreground relative" style={{ background: `linear-gradient(135deg, ${currentConfig.bgColorStart} 0%, ${currentConfig.bgColorEnd} 100%)`}}>
      <div className="star-field"></div>
      <div className="flex items-center justify-center min-h-screen px-4 pt-24 pb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl p-8 space-y-8 glass-effect rounded-xl shadow-2xl"
        >
          <div className="text-center">
            <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="inline-block p-3 mb-6 rounded-full shadow-lg" style={{ background: `linear-gradient(135deg, ${currentConfig.primaryColor} 0%, ${currentConfig.accentColor} 100%)`}}>
              <PageIcon className="w-10 h-10 text-primary-foreground" />
            </motion.div>
            <h1 className="font-cinzel text-4xl font-bold mb-2" style={{ background: `linear-gradient(135deg, ${currentConfig.primaryColor}, ${currentConfig.accentColor})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {currentConfig.pageTitle}
            </h1>
            <p className="text-lg font-semibold" style={{color: currentConfig.primaryColor}}>Serviço: {decodedServiceName}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <Label style={{color: currentConfig.primaryColor}}>1. Seus Dados</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg bg-black/20">
                    <Input id="name" type="text" placeholder="Seu nome" value={name} onChange={(e) => setName(e.target.value)} required className="bg-card/80 border-input" />
                    <Input id="email" type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-card/80 border-input" />
                    <Input id="phone" type="tel" placeholder="(XX) XXXXX-XXXX" value={phone} onChange={(e) => setPhone(e.target.value)} required maxLength="15" className="col-span-1 md:col-span-2 bg-card/80 border-input" />
                </div>
            </div>
            
            <div className="space-y-2">
                <Label style={{color: currentConfig.primaryColor}}>2. Escolha a Data e Hora</Label>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-lg bg-black/20">
                    <div>
                        <CalendarUI mode="single" selected={selectedDate} onSelect={setSelectedDate} className="rounded-md bg-card/80" locale={ptBR} disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))} />
                    </div>
                    <div className="max-h-64 overflow-y-auto pr-2">
                        {isFetchingSlots && <p className="text-center text-sm text-muted-foreground">Carregando horários...</p>}
                        {!isFetchingSlots && selectedDate && availableSlots.length === 0 && <p className="text-center text-sm text-muted-foreground">Nenhum horário disponível para esta data.</p>}
                        {!isFetchingSlots && !selectedDate && <p className="text-center text-sm text-muted-foreground">Selecione uma data para ver os horários.</p>}
                        {availableSlots.length > 0 && (
                            <div className="grid grid-cols-2 gap-2">
                                {availableSlots.map(slot => (
                                    <Button key={slot.id} type="button" variant={selectedSlot?.id === slot.id ? "default" : "outline"} onClick={() => setSelectedSlot(slot)} className="w-full" style={selectedSlot?.id === slot.id ? {backgroundColor: currentConfig.primaryColor} : {}}>
                                        <Clock className="mr-2 h-4 w-4" />
                                        {format(parse(slot.start_time, 'HH:mm:ss', new Date()), 'HH:mm')}
                                    </Button>
                                ))}
                            </div>
                        )}
                    </div>
                 </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" style={{color: currentConfig.primaryColor}}>3. Mensagem Adicional (Opcional)</Label>
              <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} className="bg-card/80 border-input min-h-[100px]" />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button type="button" variant="outline" onClick={() => navigate(-1)} className="w-full sm:w-auto flex-1 text-lg py-3" style={{borderColor: currentConfig.primaryColor, color: currentConfig.primaryColor}} >
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Voltar
                </Button>
                <Button type="submit" disabled={isLoading || !selectedSlot} className="w-full sm:w-auto flex-1 text-primary-foreground hover:opacity-90 text-lg py-3 disabled:opacity-50" style={{ background: `linear-gradient(135deg, ${currentConfig.primaryColor} 0%, ${currentConfig.accentColor} 100%)`}}>
                    <Send className="mr-2 h-5 w-5" />
                    {isLoading ? 'Agendando...' : 'Agendar Consulta'}
                </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default SolicitarConsultaPage;