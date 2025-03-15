
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Mail, 
  Lock, 
  User, 
  Phone, 
  ArrowRight,
  MessageSquare,
  Building,
  UserCheck,
  HelpCircle,
  LogIn
} from 'lucide-react';
import { AnimatedLogo } from './ui/AnimatedLogo';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

// Demo user data
const DEMO_USERS = {
  client: {
    email: 'demo@example.com',
    password: 'demo',
    name: 'Maria Silva',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    role: 'client' as UserRole,
    id: 'demo123'
  },
  salon: {
    email: 'salao@example.com',
    password: 'salao',
    name: 'Salão Beleza Natural',
    avatar: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    role: 'salon' as UserRole,
    id: 'salon123'
  }
};

export function AuthScreen() {
  const [activeTab, setActiveTab] = useState('login');
  const [userType, setUserType] = useState<UserRole>('client');
  
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  
  const { login } = useAuth();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginEmail || !loginPassword) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos para fazer login",
        variant: "destructive"
      });
      return;
    }
    
    // Check for demo users first
    let demoUser = null;
    if (userType === 'client' && 
        loginEmail === DEMO_USERS.client.email && 
        loginPassword === DEMO_USERS.client.password) {
      demoUser = DEMO_USERS.client;
    } else if (userType === 'salon' && 
               loginEmail === DEMO_USERS.salon.email && 
               loginPassword === DEMO_USERS.salon.password) {
      demoUser = DEMO_USERS.salon;
    }
    
    if (demoUser) {
      login(demoUser);
      toast({
        title: "Login realizado",
        description: `Bem-vindo, ${demoUser.name}!`,
      });
      return;
    }
    
    // For other users - simulate login
    // In a real app, this would call an API
    const mockUser = {
      id: '1',
      name: userType === 'client' ? 'Maria Silva' : 'Salão Beleza Natural',
      email: loginEmail,
      role: userType,
      avatar: userType === 'client' 
        ? 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80'
        : 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80'
    };
    
    login(mockUser);
    
    toast({
      title: "Login realizado",
      description: `Bem-vindo, ${mockUser.name}!`,
    });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!registerName || !registerEmail || !registerPhone || !registerPassword) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos para criar sua conta",
        variant: "destructive"
      });
      return;
    }
    
    // For demo purposes - simulate registration and auto login
    const newUser = {
      id: Math.random().toString(36).substring(2, 11),
      name: registerName,
      email: registerEmail,
      role: userType,
      avatar: userType === 'client' 
        ? 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80'
        : 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80'
    };
    
    login(newUser);
    
    toast({
      title: "Conta criada com sucesso",
      description: `Bem-vindo, ${newUser.name}!`,
    });
  };

  const loginWithDemo = (type: 'client' | 'salon') => {
    const demoUser = type === 'client' ? DEMO_USERS.client : DEMO_USERS.salon;
    setUserType(type);
    login(demoUser);
    toast({
      title: "Login de demonstração",
      description: `Bem-vindo, ${demoUser.name}!`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <AnimatedLogo className="mb-6" size="md" />
          <h1 className="text-2xl font-display font-semibold text-primary mb-2">
            {activeTab === 'login' ? 'Bem-vindo de volta' : 'Crie sua conta'}
          </h1>
          <p className="text-muted-foreground">
            {activeTab === 'login' 
              ? 'Acesse sua conta para gerenciar seus agendamentos' 
              : 'Cadastre-se para agendar serviços de beleza'}
          </p>
        </div>

        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm mb-6">
          <div className="flex justify-center space-x-4 mb-6">
            <Button 
              variant={userType === 'client' ? "default" : "outline"} 
              className="gap-2 flex-1 button-press"
              onClick={() => setUserType('client')}
            >
              <UserCheck size={16} />
              Cliente
            </Button>
            <Button 
              variant={userType === 'salon' ? "default" : "outline"} 
              className="gap-2 flex-1 button-press"
              onClick={() => setUserType('salon')}
            >
              <Building size={16} />
              Salão
            </Button>
          </div>

          <Tabs 
            defaultValue="login" 
            className="w-full" 
            value={activeTab} 
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Entrar</TabsTrigger>
              <TabsTrigger value="register">Cadastrar</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input 
                    type="email" 
                    placeholder="Email" 
                    className="pl-10"
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input 
                    type="password" 
                    placeholder="Senha" 
                    className="pl-10"
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                  />
                </div>
                <div className="flex justify-end">
                  <a href="#" className="text-sm text-primary font-medium hover:underline">
                    Esqueci minha senha
                  </a>
                </div>
                
                <Button type="submit" className="w-full gap-2 button-press">
                  Entrar <ArrowRight size={16} />
                </Button>
              </form>
              
              <div className="relative flex items-center justify-center mt-6 mb-6">
                <div className="border-t border-gray-300 dark:border-gray-600 absolute w-full"></div>
                <span className="bg-background px-2 text-sm text-muted-foreground relative">
                  ou continue com
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  className="button-press gap-2"
                  onClick={() => loginWithDemo('client')}
                >
                  <LogIn className="w-4 h-4" />
                  Demo Cliente
                </Button>
                <Button 
                  variant="outline" 
                  className="button-press gap-2"
                  onClick={() => loginWithDemo('salon')}
                >
                  <LogIn className="w-4 h-4" />
                  Demo Salão
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-2">
                <Button variant="outline" className="button-press">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                    <path d="M1 1h22v22H1z" fill="none" />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" className="button-press">
                  <MessageSquare className="w-5 h-5 mr-2 text-green-500" />
                  WhatsApp
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="register" className="space-y-4">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input 
                    type="text" 
                    placeholder={userType === 'client' ? "Nome completo" : "Nome do salão"} 
                    className="pl-10"
                    value={registerName}
                    onChange={e => setRegisterName(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input 
                    type="email" 
                    placeholder="Email" 
                    className="pl-10"
                    value={registerEmail}
                    onChange={e => setRegisterEmail(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input 
                    type="tel" 
                    placeholder="WhatsApp" 
                    className="pl-10"
                    value={registerPhone}
                    onChange={e => setRegisterPhone(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input 
                    type="password" 
                    placeholder="Senha" 
                    className="pl-10"
                    value={registerPassword}
                    onChange={e => setRegisterPassword(e.target.value)}
                  />
                </div>
                
                <Button type="submit" className="w-full gap-2 button-press">
                  Cadastrar <ArrowRight size={16} />
                </Button>
              </form>
              
              <div className="relative flex items-center justify-center mt-6 mb-6">
                <div className="border-t border-gray-300 dark:border-gray-600 absolute w-full"></div>
                <span className="bg-background px-2 text-sm text-muted-foreground relative">
                  ou continue com
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="button-press">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                    <path d="M1 1h22v22H1z" fill="none" />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" className="button-press">
                  <MessageSquare className="w-5 h-5 mr-2 text-green-500" />
                  WhatsApp
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </div>
  );
}
