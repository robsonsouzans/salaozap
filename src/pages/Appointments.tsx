import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { AppointmentCard } from '@/components/AppointmentCard';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const appointmentsData = {
  upcoming: [
    {
      id: '1',
      date: '12 de Junho, 2023',
      time: '14:30',
      service: 'Corte de Cabelo',
      professional: 'Ana Silva',
      location: 'Salão Beleza Natural',
      status: 'upcoming' as const
    },
    {
      id: '2',
      date: '15 de Junho, 2023',
      time: '10:00',
      service: 'Manicure',
      professional: 'Carla Oliveira',
      location: 'Salão Beleza Natural',
      status: 'upcoming' as const
    }
  ],
  completed: [
    {
      id: '3',
      date: '5 de Junho, 2023',
      time: '11:30',
      service: 'Hidratação',
      professional: 'Ana Silva',
      location: 'Salão Beleza Natural',
      status: 'completed' as const
    },
    {
      id: '4',
      date: '1 de Junho, 2023',
      time: '16:00',
      service: 'Corte e Barba',
      professional: 'João Santos',
      location: 'Salão Beleza Natural',
      status: 'completed' as const
    }
  ],
  cancelled: [
    {
      id: '5',
      date: '8 de Maio, 2023',
      time: '09:30',
      service: 'Coloração',
      professional: 'Ana Silva',
      location: 'Salão Beleza Natural',
      status: 'cancelled' as const
    }
  ]
};

const timeSlots = [
  "08:00", "09:00", "10:00", "11:00", 
  "13:00", "14:00", "15:00", "16:00", "17:00"
];

const Appointments = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const serviceData = localStorage.getItem('selectedService');
    if (serviceData) {
      setSelectedService(JSON.parse(serviceData));
      setActiveTab('booking');
    }
  }, []);

  const handleBookAppointment = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Informações incompletas",
        description: "Por favor, selecione data e horário para agendar.",
        variant: "destructive",
      });
      return;
    }

    const newAppointment = {
      id: Math.random().toString(36).substring(7),
      date: format(selectedDate, 'dd \'de\' MMMM, yyyy'),
      time: selectedTime,
      service: selectedService?.name || "Serviço selecionado",
      professional: "Profissional disponível",
      location: "Salão Beleza Natural",
      status: "upcoming" as const
    };

    const storedAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    localStorage.setItem('appointments', JSON.stringify([...storedAppointments, newAppointment]));

    localStorage.removeItem('selectedService');
    setSelectedService(null);
    
    setSelectedDate(undefined);
    setSelectedTime(undefined);
    
    toast({
      title: "Agendamento confirmado!",
      description: `Seu agendamento para ${format(selectedDate, 'dd/MM/yyyy')} às ${selectedTime} foi confirmado.`,
    });
    
    setActiveTab('upcoming');
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Link to="/">
            <Button size="icon" variant="ghost" className="button-press">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-semibold">Meus Agendamentos</h1>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="upcoming">Agendados</TabsTrigger>
          <TabsTrigger value="booking">Novo Agendamento</TabsTrigger>
          <TabsTrigger value="completed">Histórico</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4 mt-2">
          {appointmentsData.upcoming.length > 0 ? (
            appointmentsData.upcoming.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                date={appointment.date}
                time={appointment.time}
                service={appointment.service}
                professional={appointment.professional}
                location={appointment.location}
                status={appointment.status}
              />
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>Nenhum agendamento futuro</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="booking" className="space-y-4 mt-2">
          {selectedService ? (
            <Card className="mb-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Agendar Serviço</CardTitle>
                <CardDescription>
                  {selectedService.name} - R$ {selectedService.price.toFixed(2)}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Selecione uma data</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : <span>Selecione uma data</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                        disabled={(date) => 
                          date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                          date.getDay() === 0
                        }
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Selecione um horário</label>
                  <Select onValueChange={setSelectedTime} value={selectedTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um horário" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full button-press" 
                  onClick={handleBookAppointment}
                  disabled={!selectedDate || !selectedTime}
                >
                  Confirmar Agendamento
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                Escolha um serviço na página de serviços para agendar
              </p>
              <Link to="/services">
                <Button>Ver Serviços Disponíveis</Button>
              </Link>
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4 mt-2">
          {appointmentsData.completed.length > 0 ? (
            appointmentsData.completed.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                date={appointment.date}
                time={appointment.time}
                service={appointment.service}
                professional={appointment.professional}
                location={appointment.location}
                status={appointment.status}
              />
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>Nenhum agendamento concluído</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Appointments;
