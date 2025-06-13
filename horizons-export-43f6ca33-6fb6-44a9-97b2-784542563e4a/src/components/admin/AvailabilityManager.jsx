import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import { useNotifications } from '@/contexts/AuthContext';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Trash2, PlusCircle } from 'lucide-react';
import { format, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const AvailabilityManager = () => {
  const { addNotification } = useNotifications();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [slotsForDate, setSlotsForDate] = useState([]);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('18:00');
  const [interval, setInterval] = useState(60); // in minutes
  const [isLoading, setIsLoading] = useState(false);

  const fetchSlotsForDate = useCallback(async (date) => {
    setIsLoading(true);
    const formattedDate = format(date, 'yyyy-MM-dd');
    const { data, error } = await supabase
      .from('admin_availability')
      .select('*')
      .eq('available_date', formattedDate)
      .order('start_time', { ascending: true });

    if (error) {
      addNotification({ type: 'error', title: 'Erro ao buscar horários', message: error.message });
      setSlotsForDate([]);
    } else {
      setSlotsForDate(data);
    }
    setIsLoading(false);
  }, [addNotification]);

  useEffect(() => {
    fetchSlotsForDate(selectedDate);
  }, [selectedDate, fetchSlotsForDate]);

  const handleGenerateSlots = async () => {
    setIsLoading(true);
    const formattedDate = format(selectedDate, 'yyyy-MM-dd');
    let currentTime = parse(startTime, 'HH:mm', new Date());
    const finalTime = parse(endTime, 'HH:mm', new Date());
    
    const newSlots = [];
    while (currentTime < finalTime) {
      const slotStartTime = format(currentTime, 'HH:mm:ss');
      const slotEndTime = format(new Date(currentTime.getTime() + interval * 60000), 'HH:mm:ss');
      newSlots.push({
        available_date: formattedDate,
        start_time: slotStartTime,
        end_time: slotEndTime,
        is_booked: false
      });
      currentTime = new Date(currentTime.getTime() + interval * 60000);
    }

    if (newSlots.length > 0) {
      const { error } = await supabase.from('admin_availability').insert(newSlots);
      if (error) {
        addNotification({ type: 'error', title: 'Erro ao gerar horários', message: error.message });
      } else {
        addNotification({ type: 'success', title: 'Sucesso!', message: `${newSlots.length} horários gerados para ${format(selectedDate, 'dd/MM/yyyy')}.` });
        fetchSlotsForDate(selectedDate);
      }
    } else {
      addNotification({ type: 'info', title: 'Aviso', message: 'Nenhum horário gerado. Verifique os horários de início e fim.' });
    }
    setIsLoading(false);
  };

  const handleDeleteSlot = async (slotId) => {
    setIsLoading(true);
    const { error } = await supabase
      .from('admin_availability')
      .delete()
      .eq('id', slotId);
    
    if (error) {
      addNotification({ type: 'error', title: 'Erro ao excluir horário', message: error.message });
    } else {
      addNotification({ type: 'success', title: 'Sucesso!', message: 'Horário excluído.' });
      fetchSlotsForDate(selectedDate);
    }
    setIsLoading(false);
  };
  
  const handleDeleteAllSlotsForDate = async () => {
    setIsLoading(true);
    const formattedDate = format(selectedDate, 'yyyy-MM-dd');
    const { error } = await supabase
      .from('admin_availability')
      .delete()
      .eq('available_date', formattedDate)
      .eq('is_booked', false); // Only delete unbooked slots
      
    if (error) {
      addNotification({ type: 'error', title: 'Erro ao excluir horários', message: error.message });
    } else {
      addNotification({ type: 'success', title: 'Sucesso!', message: 'Todos horários livres foram excluídos para esta data.' });
      fetchSlotsForDate(selectedDate);
    }
    setIsLoading(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h2 className="text-3xl font-bold font-cinzel text-slate-200 mb-6">Gerenciador de Disponibilidade</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 bg-slate-800/80 border-slate-700 text-slate-200">
          <CardHeader>
            <CardTitle>Adicionar Horários</CardTitle>
            <CardDescription>Selecione uma data e gere os horários de atendimento.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border border-slate-700 bg-slate-900/50"
              locale={ptBR}
              disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start-time">Início</Label>
                <Input id="start-time" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="bg-slate-900 border-slate-700" />
              </div>
              <div>
                <Label htmlFor="end-time">Fim</Label>
                <Input id="end-time" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="bg-slate-900 border-slate-700" />
              </div>
            </div>
             <div>
                <Label htmlFor="interval">Intervalo (minutos)</Label>
                <Input id="interval" type="number" step="15" value={interval} onChange={(e) => setInterval(Number(e.target.value))} className="bg-slate-900 border-slate-700" />
              </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleGenerateSlots} disabled={isLoading} className="w-full bg-purple-600 hover:bg-purple-700">
              <PlusCircle className="mr-2 h-4 w-4" />
              {isLoading ? 'Gerando...' : 'Gerar Horários'}
            </Button>
          </CardFooter>
        </Card>

        <Card className="lg:col-span-2 bg-slate-800/80 border-slate-700 text-slate-200">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Horários para {format(selectedDate, 'PPP', { locale: ptBR })}</CardTitle>
                <CardDescription>Veja e gerencie os horários disponíveis para a data selecionada.</CardDescription>
              </div>
               {slotsForDate.some(slot => !slot.is_booked) && (
                <Button onClick={handleDeleteAllSlotsForDate} variant="destructive" size="sm" disabled={isLoading}>
                    <Trash2 className="mr-2 h-4 w-4" /> Excluir Livres
                </Button>
               )}
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p>Carregando horários...</p>
            ) : slotsForDate.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {slotsForDate.map(slot => (
                  <div
                    key={slot.id}
                    className={`p-3 rounded-md text-center border ${
                      slot.is_booked
                        ? 'bg-red-900/50 border-red-700 cursor-not-allowed'
                        : 'bg-green-900/50 border-green-700'
                    }`}
                  >
                    <p className="font-semibold">{format(parse(slot.start_time, 'HH:mm:ss', new Date()), 'HH:mm')}</p>
                    <p className="text-xs text-slate-400">
                      {slot.is_booked ? 'Agendado' : 'Disponível'}
                    </p>
                    {!slot.is_booked && (
                       <Button variant="ghost" size="icon" className="h-6 w-6 mt-1 mx-auto text-slate-400 hover:text-red-400 hover:bg-red-900/30" onClick={() => handleDeleteSlot(slot.id)}>
                         <Trash2 className="h-4 w-4"/>
                       </Button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Clock className="mx-auto h-12 w-12 text-slate-500" />
                <p className="mt-4 text-slate-400">Nenhum horário de atendimento definido para esta data.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default AvailabilityManager;