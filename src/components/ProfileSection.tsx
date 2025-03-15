
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import {
  Camera,
  Edit2,
  LogOut,
  Settings,
  User,
  Star,
  Bookmark,
  CreditCard,
  Bell,
  Calendar,
  Users,
  Scissors,
  BarChart
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface ProfileSectionProps {
  className?: string;
}

export function ProfileSection({ className }: ProfileSectionProps) {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  if (!user) return null;

  const isSalon = user.role === 'salon';

  const clientMenuItems = [
    { icon: User, label: 'Dados pessoais' },
    { icon: Bookmark, label: 'Meus agendamentos' },
    { icon: Star, label: 'Avaliações' },
    { icon: CreditCard, label: 'Métodos de pagamento' },
    { icon: Bell, label: 'Notificações' },
    { icon: Settings, label: 'Configurações' },
  ];
  
  const salonMenuItems = [
    { icon: User, label: 'Dados do salão' },
    { icon: Calendar, label: 'Agenda' },
    { icon: Users, label: 'Funcionários' },
    { icon: Scissors, label: 'Serviços' },
    { icon: BarChart, label: 'Relatórios' },
    { icon: Bell, label: 'Notificações' },
    { icon: Settings, label: 'Configurações' },
  ];

  const menuItems = isSalon ? salonMenuItems : clientMenuItems;

  const handleLogout = () => {
    toast({
      title: "Sessão encerrada",
      description: "Você saiu da sua conta com sucesso."
    });
    logout();
    navigate('/');
  };

  const handleMenuItemClick = (label: string) => {
    toast({
      title: "Funcionalidade selecionada",
      description: `Você selecionou: ${label}`
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn('space-y-6', className)}
    >
      {/* Profile header */}
      <Card>
        <CardHeader className="relative pb-0">
          <div className="h-32 -mx-6 -mt-6 bg-gradient-to-r from-indigo-500 to-purple-600" />
          <div className="flex justify-between -mt-12 px-2">
            <Avatar className="h-24 w-24 border-4 border-background shadow-md">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-primary text-xl">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <Button 
              size="sm" 
              variant="secondary" 
              className="mt-14 button-press"
              onClick={() => {
                toast({
                  title: "Alterar foto",
                  description: "Esta funcionalidade estará disponível em breve."
                });
              }}
            >
              <Camera className="h-4 w-4 mr-2" /> Alterar foto
            </Button>
          </div>
          <div className="mt-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <Button 
                variant="ghost" 
                size="icon" 
                className="button-press"
                onClick={() => {
                  setIsEditing(!isEditing);
                  toast({
                    title: isEditing ? "Modo de edição desativado" : "Modo de edição ativado",
                    description: isEditing 
                      ? "Suas alterações foram salvas" 
                      : "Agora você pode editar seu perfil"
                  });
                }}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <p className="text-xs px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full inline-block mt-2">
              {isSalon ? 'Salão de Beleza' : 'Cliente'}
            </p>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid gap-2">
            {menuItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className="justify-start h-12 px-3 button-press"
                onClick={() => handleMenuItemClick(item.label)}
              >
                <item.icon className="mr-3 h-5 w-5 text-muted-foreground" />
                <span>{item.label}</span>
              </Button>
            ))}
            <Button 
              variant="ghost" 
              className="justify-start h-12 px-3 text-red-600 hover:text-red-700 hover:bg-red-50 button-press"
              onClick={handleLogout}
            >
              <LogOut className="mr-3 h-5 w-5" />
              <span>Sair</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
