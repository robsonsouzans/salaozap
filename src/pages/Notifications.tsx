
import React, { useState } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Save, Bell, Mail, MessageSquare, Phone, BellRing } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProtectedRoute } from '@/components/ProtectedRoute';

interface NotificationChannel {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  enabled: boolean;
}

interface NotificationType {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  channels: {
    [key: string]: boolean;
  }
}

const Notifications = () => {
  const { toast } = useToast();
  
  const [channels, setChannels] = useState<NotificationChannel[]>([
    {
      id: 'email',
      title: 'Email',
      description: 'Receba notificações por email sobre agendamentos e promoções',
      icon: Mail,
      enabled: true
    },
    {
      id: 'sms',
      title: 'SMS',
      description: 'Receba lembretes por SMS sobre seus agendamentos',
      icon: MessageSquare,
      enabled: true
    },
    {
      id: 'push',
      title: 'Push',
      description: 'Receba notificações push no seu dispositivo',
      icon: Bell,
      enabled: false
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp',
      description: 'Receba mensagens pelo WhatsApp',
      icon: Phone,
      enabled: true
    }
  ]);
  
  const [notificationTypes, setNotificationTypes] = useState<NotificationType[]>([
    {
      id: 'appointments',
      title: 'Agendamentos',
      description: 'Notificações sobre confirmação, lembretes e alterações de agendamentos',
      icon: BellRing,
      channels: {
        email: true,
        sms: true,
        push: true,
        whatsapp: true
      }
    },
    {
      id: 'promotions',
      title: 'Promoções e Novidades',
      description: 'Novidades, promoções especiais e eventos',
      icon: BellRing,
      channels: {
        email: true,
        sms: false,
        push: true,
        whatsapp: false
      }
    },
    {
      id: 'system',
      title: 'Sistema',
      description: 'Informações sobre o sistema, manutenções e atualizações',
      icon: BellRing,
      channels: {
        email: true,
        sms: false,
        push: false,
        whatsapp: false
      }
    }
  ]);
  
  const handleToggleChannel = (id: string) => {
    setChannels(prev => 
      prev.map(channel => 
        channel.id === id ? { ...channel, enabled: !channel.enabled } : channel
      )
    );
  };
  
  const handleToggleTypeChannel = (typeId: string, channelId: string) => {
    setNotificationTypes(prev => 
      prev.map(type => 
        type.id === typeId 
          ? { 
              ...type, 
              channels: { 
                ...type.channels, 
                [channelId]: !type.channels[channelId] 
              } 
            } 
          : type
      )
    );
  };
  
  const handleSave = () => {
    // In a real app, this would save to a backend
    toast({
      title: "Preferências salvas",
      description: "Suas preferências de notificações foram atualizadas com sucesso."
    });
  };
  
  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Link to="/settings">
              <Button size="icon" variant="ghost" className="button-press">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-semibold">Notificações</h1>
          </div>
          <Button onClick={handleSave} className="button-press">
            <Save className="h-4 w-4 mr-2" />
            Salvar
          </Button>
        </div>
        
        <div className="text-sm text-muted-foreground mb-6">
          Configure como e quando você recebe notificações
        </div>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium mb-4">Canais de Notificação</h2>
            <div className="space-y-4">
              {channels.map(channel => (
                <Card key={channel.id}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-primary/10">
                        <channel.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{channel.title}</h3>
                        <p className="text-sm text-muted-foreground">{channel.description}</p>
                      </div>
                    </div>
                    <Switch 
                      checked={channel.enabled} 
                      onCheckedChange={() => handleToggleChannel(channel.id)}
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-medium mb-4">Tipos de Notificação</h2>
            <div className="space-y-4">
              {notificationTypes.map(type => (
                <Card key={type.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-full bg-primary/10">
                        <type.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{type.title}</h3>
                        <p className="text-sm text-muted-foreground">{type.description}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      {channels.map(channel => (
                        <div 
                          key={`${type.id}-${channel.id}`} 
                          className={`flex items-center justify-between p-2 rounded-md ${!channel.enabled ? 'opacity-50' : ''}`}
                        >
                          <div className="flex items-center gap-2">
                            <channel.icon className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{channel.title}</span>
                          </div>
                          <Switch 
                            checked={type.channels[channel.id]} 
                            onCheckedChange={() => handleToggleTypeChannel(type.id, channel.id)}
                            disabled={!channel.enabled}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
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

export default Notifications;
