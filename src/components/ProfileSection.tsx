
import React from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Camera,
  Edit2,
  LogOut,
  Settings,
  User,
  Star,
  Bookmark,
  CreditCard,
  Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProfileSectionProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  className?: string;
}

export function ProfileSection({ user, className }: ProfileSectionProps) {
  const menuItems = [
    { icon: User, label: 'Dados pessoais' },
    { icon: Bookmark, label: 'Meus agendamentos' },
    { icon: Star, label: 'Avaliações' },
    { icon: CreditCard, label: 'Métodos de pagamento' },
    { icon: Bell, label: 'Notificações' },
    { icon: Settings, label: 'Configurações' },
  ];

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
            <Button size="sm" variant="secondary" className="mt-14 button-press">
              <Camera className="h-4 w-4 mr-2" /> Alterar foto
            </Button>
          </div>
          <div className="mt-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <Button variant="ghost" size="icon" className="button-press">
                <Edit2 className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid gap-2">
            {menuItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className="justify-start h-12 px-3 button-press"
              >
                <item.icon className="mr-3 h-5 w-5 text-muted-foreground" />
                <span>{item.label}</span>
              </Button>
            ))}
            <Button variant="ghost" className="justify-start h-12 px-3 text-red-600 hover:text-red-700 hover:bg-red-50 button-press">
              <LogOut className="mr-3 h-5 w-5" />
              <span>Sair</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
