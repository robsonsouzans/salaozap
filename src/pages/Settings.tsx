
import React from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Clock, CreditCard, Bell, Shield, Paintbrush, ChevronRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SettingsItem = ({ 
  icon: Icon, 
  title, 
  description, 
  onClick 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string; 
  onClick?: () => void;
}) => (
  <div 
    className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg cursor-pointer transition-colors"
    onClick={onClick}
  >
    <div className="flex items-center">
      <div className="p-2 bg-primary/10 rounded-full mr-4">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
    <ChevronRight className="h-5 w-5 text-muted-foreground" />
  </div>
);

const Settings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isSalon = user?.role === 'salon';
  
  const generalSettings = [
    {
      icon: Paintbrush,
      title: "Aparência",
      description: "Personalize a aparência do aplicativo",
      path: "/settings/appearance"
    },
    {
      icon: Bell,
      title: "Notificações",
      description: "Configure como e quando recebe notificações",
      path: "/settings/notifications"
    },
    {
      icon: Shield,
      title: "Segurança",
      description: "Gerencia as configurações de segurança da sua conta",
      path: "/settings/security"
    }
  ];
  
  const salonSettings = [
    {
      icon: Clock,
      title: "Horários de Atendimento",
      description: "Defina os dias e horários de funcionamento",
      path: "/settings/business-hours"
    },
    {
      icon: CreditCard,
      title: "Métodos de Pagamento",
      description: "Configure quais formas de pagamento seu salão aceita",
      path: "/settings/payment-methods"
    }
  ];
  
  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Link to="/">
              <Button size="icon" variant="ghost" className="button-press">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-semibold">Configurações</h1>
          </div>
        </div>
        
        <Tabs defaultValue="general" className="mb-6">
          <TabsList className="grid grid-cols-2 w-full mb-4">
            <TabsTrigger value="general">Gerais</TabsTrigger>
            {isSalon && <TabsTrigger value="salon">Meu Salão</TabsTrigger>}
          </TabsList>
          
          <TabsContent value="general" className="space-y-2">
            {generalSettings.map((item, index) => (
              <SettingsItem 
                key={index}
                icon={item.icon}
                title={item.title}
                description={item.description}
                onClick={() => navigate(item.path)}
              />
            ))}
          </TabsContent>
          
          {isSalon && (
            <TabsContent value="salon" className="space-y-2">
              {salonSettings.map((item, index) => (
                <SettingsItem 
                  key={index}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  onClick={() => navigate(item.path)}
                />
              ))}
            </TabsContent>
          )}
        </Tabs>
      </MainLayout>
    </ProtectedRoute>
  );
};

export default Settings;
