
import React, { useState } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { AppointmentCard } from '@/components/AppointmentCard';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';

// Mock data
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

const Appointments = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

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
          <TabsTrigger value="completed">Concluídos</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelados</TabsTrigger>
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

        <TabsContent value="cancelled" className="space-y-4 mt-2">
          {appointmentsData.cancelled.length > 0 ? (
            appointmentsData.cancelled.map((appointment) => (
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
              <p>Nenhum agendamento cancelado</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Appointments;
