
import React, { useState } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, Save } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProtectedRoute } from '@/components/ProtectedRoute';

interface DaySchedule {
  enabled: boolean;
  openTime: string;
  closeTime: string;
  breakStart?: string;
  breakEnd?: string;
  hasBreak: boolean;
}

type WeekSchedule = {
  [key in 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday']: DaySchedule;
};

const dayNames = {
  monday: 'Segunda-feira',
  tuesday: 'Terça-feira',
  wednesday: 'Quarta-feira',
  thursday: 'Quinta-feira',
  friday: 'Sexta-feira',
  saturday: 'Sábado',
  sunday: 'Domingo'
};

const timeOptions = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', 
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
  '20:00', '20:30', '21:00', '21:30', '22:00'
];

const BusinessHours = () => {
  const { toast } = useToast();
  
  // Initialize with reasonable default schedules
  const [schedule, setSchedule] = useState<WeekSchedule>({
    monday: { enabled: true, openTime: '09:00', closeTime: '19:00', hasBreak: true, breakStart: '12:00', breakEnd: '13:00' },
    tuesday: { enabled: true, openTime: '09:00', closeTime: '19:00', hasBreak: true, breakStart: '12:00', breakEnd: '13:00' },
    wednesday: { enabled: true, openTime: '09:00', closeTime: '19:00', hasBreak: true, breakStart: '12:00', breakEnd: '13:00' },
    thursday: { enabled: true, openTime: '09:00', closeTime: '19:00', hasBreak: true, breakStart: '12:00', breakEnd: '13:00' },
    friday: { enabled: true, openTime: '09:00', closeTime: '19:00', hasBreak: true, breakStart: '12:00', breakEnd: '13:00' },
    saturday: { enabled: true, openTime: '09:00', closeTime: '16:00', hasBreak: false },
    sunday: { enabled: false, openTime: '09:00', closeTime: '16:00', hasBreak: false }
  });
  
  const handleToggleDay = (day: keyof WeekSchedule) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        enabled: !prev[day].enabled
      }
    }));
  };
  
  const handleToggleBreak = (day: keyof WeekSchedule) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        hasBreak: !prev[day].hasBreak
      }
    }));
  };
  
  const handleTimeChange = (day: keyof WeekSchedule, field: string, value: string) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }));
  };
  
  const handleSave = () => {
    // In a real app, this would save to a backend
    toast({
      title: "Horários salvos",
      description: "Os horários de atendimento foram atualizados com sucesso."
    });
  };
  
  const handleCopyToAll = (sourceDay: keyof WeekSchedule) => {
    const sourceSchedule = schedule[sourceDay];
    
    // Copy to all other days
    const newSchedule = { ...schedule };
    (Object.keys(schedule) as Array<keyof WeekSchedule>).forEach(day => {
      if (day !== sourceDay) {
        newSchedule[day] = { ...sourceSchedule };
      }
    });
    
    setSchedule(newSchedule);
    
    toast({
      title: "Horários copiados",
      description: `Os horários de ${dayNames[sourceDay]} foram copiados para todos os dias.`
    });
  };
  
  return (
    <ProtectedRoute allowedRoles={['salon']}>
      <MainLayout>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Link to="/settings">
              <Button size="icon" variant="ghost" className="button-press">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-semibold">Horários de Atendimento</h1>
          </div>
          <Button onClick={handleSave} className="button-press">
            <Save className="h-4 w-4 mr-2" />
            Salvar
          </Button>
        </div>
        
        <div className="space-y-6">
          {(Object.keys(schedule) as Array<keyof WeekSchedule>).map(day => (
            <div key={day} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Switch 
                    checked={schedule[day].enabled} 
                    onCheckedChange={() => handleToggleDay(day)}
                    id={`toggle-${day}`}
                  />
                  <Label htmlFor={`toggle-${day}`} className="font-medium">
                    {dayNames[day]}
                  </Label>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => handleCopyToAll(day)}
                  disabled={!schedule[day].enabled}
                >
                  Copiar para todos
                </Button>
              </div>
              
              {schedule[day].enabled && (
                <>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label htmlFor={`open-${day}`}>Horário de abertura</Label>
                      <Select 
                        value={schedule[day].openTime}
                        onValueChange={(value) => handleTimeChange(day, 'openTime', value)}
                      >
                        <SelectTrigger id={`open-${day}`}>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeOptions.map(time => (
                            <SelectItem key={`open-${day}-${time}`} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`close-${day}`}>Horário de fechamento</Label>
                      <Select 
                        value={schedule[day].closeTime}
                        onValueChange={(value) => handleTimeChange(day, 'closeTime', value)}
                      >
                        <SelectTrigger id={`close-${day}`}>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeOptions.map(time => (
                            <SelectItem key={`close-${day}-${time}`} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <Switch 
                      checked={schedule[day].hasBreak} 
                      onCheckedChange={() => handleToggleBreak(day)}
                      id={`break-${day}`}
                    />
                    <Label htmlFor={`break-${day}`}>
                      Intervalo de almoço/descanso
                    </Label>
                  </div>
                  
                  {schedule[day].hasBreak && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`break-start-${day}`}>Início do intervalo</Label>
                        <Select 
                          value={schedule[day].breakStart}
                          onValueChange={(value) => handleTimeChange(day, 'breakStart', value)}
                        >
                          <SelectTrigger id={`break-start-${day}`}>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeOptions.map(time => (
                              <SelectItem key={`break-start-${day}-${time}`} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`break-end-${day}`}>Fim do intervalo</Label>
                        <Select 
                          value={schedule[day].breakEnd}
                          onValueChange={(value) => handleTimeChange(day, 'breakEnd', value)}
                        >
                          <SelectTrigger id={`break-end-${day}`}>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeOptions.map(time => (
                              <SelectItem key={`break-end-${day}-${time}`} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-6 flex justify-end">
          <Button onClick={handleSave} className="button-press">
            <Save className="h-4 w-4 mr-2" />
            Salvar Alterações
          </Button>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
};

export default BusinessHours;
