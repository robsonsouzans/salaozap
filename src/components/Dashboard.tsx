
import React from 'react';
import { motion } from 'framer-motion';
import { AppointmentCard } from './AppointmentCard';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  ArrowRight, 
  Calendar, 
  Clock,
  Search,
  Sparkles,
  User,
  Scissors,
  Users,
  PlusCircle,
  BarChart
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

// Mock appointments data for clients
const clientAppointments = [
  {
    id: 1,
    date: '12 de Junho, 2023',
    time: '14:30',
    service: 'Corte de Cabelo',
    professional: 'Ana Silva',
    location: 'Salão Beleza Natural',
    status: 'upcoming' as const
  },
  {
    id: 2,
    date: '15 de Junho, 2023',
    time: '10:00',
    service: 'Manicure',
    professional: 'Carla Oliveira',
    location: 'Salão Beleza Natural',
    status: 'upcoming' as const
  }
];

// Mock appointments data for salons
const salonAppointments = [
  {
    id: 1,
    date: '12 de Junho, 2023',
    time: '14:30',
    service: 'Corte de Cabelo',
    professional: 'Ana Silva',
    location: 'Salão Beleza Natural',
    client: 'Maria Silva',
    status: 'upcoming' as const
  },
  {
    id: 2,
    date: '15 de Junho, 2023',
    time: '10:00',
    service: 'Manicure',
    professional: 'Carla Oliveira',
    location: 'Salão Beleza Natural',
    client: 'João Santos',
    status: 'upcoming' as const
  },
  {
    id: 3,
    date: '15 de Junho, 2023',
    time: '11:30',
    service: 'Barba',
    professional: 'Pedro Rocha',
    location: 'Salão Beleza Natural',
    client: 'Carlos Ferreira',
    status: 'upcoming' as const
  }
];

interface DashboardProps {
  className?: string;
  userName: string;
}

export function Dashboard({ className, userName }: DashboardProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isSalon = user?.role === 'salon';
  
  // Client quick action buttons
  const clientQuickActions = [
    { 
      icon: Calendar, 
      label: 'Agendar', 
      color: 'bg-indigo-500 hover:bg-indigo-600', 
      onClick: () => navigate('/services')
    },
    { 
      icon: Clock, 
      label: 'Histórico', 
      color: 'bg-violet-500 hover:bg-violet-600',
      onClick: () => navigate('/appointments')
    },
    { 
      icon: User, 
      label: 'Perfil', 
      color: 'bg-pink-500 hover:bg-pink-600',
      onClick: () => navigate('/profile')
    },
    { 
      icon: Search, 
      label: 'Explorar', 
      color: 'bg-teal-500 hover:bg-teal-600',
      onClick: () => navigate('/explore')
    }
  ];
  
  // Salon quick action buttons
  const salonQuickActions = [
    { 
      icon: Scissors, 
      label: 'Serviços', 
      color: 'bg-indigo-500 hover:bg-indigo-600', 
      onClick: () => navigate('/salon/services')
    },
    { 
      icon: Calendar, 
      label: 'Agenda', 
      color: 'bg-violet-500 hover:bg-violet-600',
      onClick: () => navigate('/appointments')
    },
    { 
      icon: Users, 
      label: 'Equipe', 
      color: 'bg-pink-500 hover:bg-pink-600',
      onClick: () => navigate('/team')
    },
    { 
      icon: BarChart, 
      label: 'Relatórios', 
      color: 'bg-teal-500 hover:bg-teal-600',
      onClick: () => navigate('/reports')
    }
  ];
  
  const quickActions = isSalon ? salonQuickActions : clientQuickActions;
  const upcomingAppointments = isSalon ? salonAppointments : clientAppointments;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn('space-y-6', className)}
    >
      {/* Welcome header */}
      <div className="flex justify-between items-center">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="text-2xl font-display font-semibold"
          >
            Olá, {userName}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="text-muted-foreground"
          >
            Bem-vindo ao seu dashboard
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <Button className="button-press">
            <Sparkles className="h-4 w-4 mr-2" /> Luna IA
          </Button>
        </motion.div>
      </div>

      {/* Quick actions */}
      <motion.div 
        className="grid grid-cols-4 gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        {quickActions.map((action, index) => (
          <motion.div
            key={action.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
          >
            <Button 
              className={cn(
                "w-full h-24 flex-col gap-2 button-press",
                action.color
              )}
              onClick={action.onClick}
            >
              <action.icon className="h-6 w-6" />
              <span>{action.label}</span>
            </Button>
          </motion.div>
        ))}
      </motion.div>

      {/* Upcoming appointments */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">
            {isSalon ? 'Próximos agendamentos' : 'Seus agendamentos'}
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            className="button-press"
            onClick={() => navigate('/appointments')}
          >
            Ver todos <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((appointment) => (
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
              <p className="text-center text-muted-foreground py-6">
                Você não tem agendamentos próximos
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Special Offers for clients / Quick stats for salons */}
      {isSalon ? (
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">15</div>
              <p className="text-muted-foreground">Agendamentos hoje</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                R$ 980
              </div>
              <p className="text-muted-foreground">Faturamento do dia</p>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card className="overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
            <span className="text-white text-xl font-semibold">Ofertas Especiais</span>
          </div>
          <CardContent className="pt-4">
            <p className="text-center text-muted-foreground mb-4">
              Aproveite descontos exclusivos em serviços selecionados
            </p>
            <Button 
              className="w-full button-press"
              onClick={() => navigate('/services')}
            >
              Ver Promoções <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}
      
      {/* New appointment button for salons */}
      {isSalon && (
        <div className="fixed bottom-24 right-4">
          <Button 
            className="h-14 w-14 rounded-full shadow-xl button-press"
            onClick={() => navigate('/new-appointment')}
          >
            <PlusCircle className="h-6 w-6" />
          </Button>
        </div>
      )}
    </motion.div>
  );
}
