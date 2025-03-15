
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
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock appointments data
const upcomingAppointments = [
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

interface DashboardProps {
  className?: string;
  userName: string;
}

export function Dashboard({ className, userName }: DashboardProps) {
  // Quick action buttons
  const quickActions = [
    { 
      icon: Calendar, 
      label: 'Agendar', 
      color: 'bg-indigo-500 hover:bg-indigo-600', 
      path: '/services'
    },
    { 
      icon: Clock, 
      label: 'Histórico', 
      color: 'bg-violet-500 hover:bg-violet-600',
      path: '/appointments'
    },
    { 
      icon: User, 
      label: 'Perfil', 
      color: 'bg-pink-500 hover:bg-pink-600',
      path: '/profile'
    },
    { 
      icon: Search, 
      label: 'Explorar', 
      color: 'bg-teal-500 hover:bg-teal-600',
      path: '/explore'
    }
  ];

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
          <a 
            key={action.label} 
            href={action.path}
            className="no-underline"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
            >
              <Button 
                className={cn(
                  "w-full h-24 flex-col gap-2 button-press",
                  action.color
                )}
              >
                <action.icon className="h-6 w-6" />
                <span>{action.label}</span>
              </Button>
            </motion.div>
          </a>
        ))}
      </motion.div>

      {/* Upcoming appointments */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">Próximos agendamentos</CardTitle>
          <Button variant="ghost" size="sm" className="button-press">
            Ver todos <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((appointment, i) => (
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

      {/* Special Offers */}
      <Card className="overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
          <span className="text-white text-xl font-semibold">Ofertas Especiais</span>
        </div>
        <CardContent className="pt-4">
          <p className="text-center text-muted-foreground mb-4">
            Aproveite descontos exclusivos em serviços selecionados
          </p>
          <Button className="w-full button-press">
            Ver Promoções <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
