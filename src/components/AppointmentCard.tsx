
import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Scissors
} from 'lucide-react';
import { motion } from 'framer-motion';

interface AppointmentCardProps {
  date: string;
  time: string;
  service: string;
  professional: string;
  location: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  className?: string;
}

export function AppointmentCard({
  date,
  time,
  service,
  professional,
  location,
  status,
  className
}: AppointmentCardProps) {
  const statusColors = {
    upcoming: 'bg-indigo-50 border-indigo-200 text-indigo-700',
    completed: 'bg-green-50 border-green-200 text-green-700',
    cancelled: 'bg-red-50 border-red-200 text-red-700',
  };

  const statusText = {
    upcoming: 'Agendado',
    completed: 'Concluído',
    cancelled: 'Cancelado',
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'bg-white rounded-xl p-4 shadow-sm border card-hover',
        className
      )}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <Scissors className="h-5 w-5 text-indigo-600" />
          <span className="font-medium">{service}</span>
        </div>
        <div className={cn(
          'text-xs px-2 py-1 rounded-full font-medium',
          statusColors[status]
        )}>
          {statusText[status]}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{date}</span>
          <Clock className="h-4 w-4 ml-2" />
          <span>{time}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="h-4 w-4" />
          <span>{professional}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{location}</span>
        </div>
      </div>

      {status === 'upcoming' && (
        <div className="mt-4 flex gap-2">
          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800 animated-underline w-full text-center py-1">
            Reagendar
          </button>
          <button className="text-sm font-medium text-red-600 hover:text-red-800 animated-underline w-full text-center py-1">
            Cancelar
          </button>
        </div>
      )}
    </motion.div>
  );
}
