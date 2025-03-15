
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
  BarChart,
  Sun,
  Moon,
  Upload,
  Save
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

interface ProfileSectionProps {
  className?: string;
}

export function ProfileSection({ className }: ProfileSectionProps) {
  const { user, logout, theme, setTheme } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [photoHover, setPhotoHover] = useState(false);
  
  // Form state
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');

  if (!user) return null;

  const isSalon = user.role === 'salon';

  const clientMenuItems = [
    { icon: User, label: 'Dados pessoais', action: () => handleMenuItemClick('Dados pessoais') },
    { icon: Bookmark, label: 'Meus agendamentos', action: () => navigate('/appointments') },
    { icon: Star, label: 'Avaliações', action: () => handleMenuItemClick('Avaliações') },
    { icon: CreditCard, label: 'Métodos de pagamento', action: () => handleMenuItemClick('Métodos de pagamento') },
    { icon: Bell, label: 'Notificações', action: () => handleMenuItemClick('Notificações') },
    { icon: Settings, label: 'Configurações', action: () => handleMenuItemClick('Configurações') },
  ];
  
  const salonMenuItems = [
    { icon: User, label: 'Dados do salão', action: () => handleMenuItemClick('Dados do salão') },
    { icon: Calendar, label: 'Agenda', action: () => navigate('/appointments') },
    { icon: Users, label: 'Funcionários', action: () => navigate('/team') },
    { icon: Scissors, label: 'Serviços', action: () => navigate('/salon/services') },
    { icon: BarChart, label: 'Relatórios', action: () => handleMenuItemClick('Relatórios') },
    { icon: Bell, label: 'Notificações', action: () => handleMenuItemClick('Notificações') },
    { icon: Settings, label: 'Configurações', action: () => handleMenuItemClick('Configurações') },
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
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    toast({
      title: `Tema ${newTheme === 'light' ? 'Claro' : 'Escuro'} ativado`,
      description: `O tema do aplicativo foi alterado para ${newTheme === 'light' ? 'claro' : 'escuro'}.`
    });
  };
  
  const saveProfile = () => {
    // In a real app, this would update the server
    toast({
      title: "Perfil atualizado",
      description: "Seus dados foram salvos com sucesso."
    });
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn('space-y-6', className)}
    >
      {/* Profile header */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader className="relative pb-0">
          <div className="h-32 -mx-6 -mt-6 bg-gradient-to-r from-indigo-500 to-purple-600" />
          <div className="flex justify-between -mt-12 px-2">
            <div 
              className="relative"
              onMouseEnter={() => setPhotoHover(true)}
              onMouseLeave={() => setPhotoHover(false)}
            >
              <Avatar className="h-24 w-24 border-4 border-background dark:border-gray-800 shadow-md">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="bg-primary text-xl">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {photoHover && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer">
                  <Upload className="h-6 w-6 text-white" />
                </div>
              )}
            </div>
            {isEditing ? (
              <Button 
                size="sm" 
                variant="default" 
                className="mt-14 button-press"
                onClick={saveProfile}
              >
                <Save className="h-4 w-4 mr-2" /> Salvar
              </Button>
            ) : (
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
            )}
          </div>
          <div className="mt-3">
            <div className="flex items-center justify-between">
              {isEditing ? (
                <Input 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="text-xl font-semibold h-9"
                />
              ) : (
                <h2 className="text-xl font-semibold dark:text-gray-100">{user.name}</h2>
              )}
              <Button 
                variant="ghost" 
                size="icon" 
                className="button-press"
                onClick={() => {
                  setIsEditing(!isEditing);
                  if (isEditing) {
                    toast({
                      title: "Modo de edição desativado",
                      description: "Suas alterações foram salvas"
                    });
                  } else {
                    toast({
                      title: "Modo de edição ativado",
                      description: "Agora você pode editar seu perfil"
                    });
                  }
                }}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
            </div>
            {isEditing ? (
              <div className="space-y-2 mt-2">
                <Input 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  placeholder="Telefone/WhatsApp"
                  className="text-sm"
                />
                <Input 
                  value={bio} 
                  onChange={(e) => setBio(e.target.value)} 
                  placeholder="Bio/Descrição"
                  className="text-sm"
                />
              </div>
            ) : (
              <>
                <p className="text-sm text-muted-foreground dark:text-gray-400">{user.email}</p>
                <p className="text-xs px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-100 rounded-full inline-block mt-2">
                  {isSalon ? 'Salão de Beleza' : 'Cliente'}
                </p>
              </>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid gap-2">
            {/* Theme Toggle */}
            <div className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors">
              <div className="flex items-center">
                {theme === 'light' ? (
                  <Sun className="mr-3 h-5 w-5 text-yellow-500" />
                ) : (
                  <Moon className="mr-3 h-5 w-5 text-blue-400" />
                )}
                <span className="dark:text-gray-100">Tema {theme === 'light' ? 'Claro' : 'Escuro'}</span>
              </div>
              <Switch 
                checked={theme === 'dark'}
                onCheckedChange={toggleTheme}
              />
            </div>
          
            {menuItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className="justify-start h-12 px-3 button-press dark:text-gray-200 dark:hover:bg-gray-700"
                onClick={item.action}
              >
                <item.icon className="mr-3 h-5 w-5 text-muted-foreground dark:text-gray-400" />
                <span>{item.label}</span>
              </Button>
            ))}
            <Button 
              variant="ghost" 
              className="justify-start h-12 px-3 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 button-press"
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
