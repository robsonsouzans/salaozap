
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import {
  Home,
  Calendar,
  User,
  Search,
  PlusCircle,
  Scissors,
  Users,
  Settings,
  LogOut,
} from 'lucide-react';

export function WebSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  
  const isSalon = user?.role === 'salon';
  
  const clientNavItems = [
    { title: 'Início', icon: Home, path: '/' },
    { title: 'Explorar Salões', icon: Search, path: '/search' },
    { title: 'Agendar', icon: PlusCircle, path: '/services' },
    { title: 'Minha Agenda', icon: Calendar, path: '/appointments' },
  ];
  
  const salonNavItems = [
    { title: 'Início', icon: Home, path: '/' },
    { title: 'Agenda', icon: Calendar, path: '/appointments' },
    { title: 'Serviços', icon: Scissors, path: '/salon/services' },
    { title: 'Equipe', icon: Users, path: '/team' },
  ];
  
  const navItems = isSalon ? salonNavItems : clientNavItems;
  
  const profileItems = [
    { title: 'Perfil', icon: User, path: '/profile' },
    { title: 'Configurações', icon: Settings, path: '/settings' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Sidebar>
      <SidebarHeader className="flex justify-center py-4">
        <h1 className="text-xl font-bold text-indigo-600">SalãoZap</h1>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    isActive={location.pathname === item.path}
                    onClick={() => navigate(item.path)}
                    tooltip={item.title}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarSeparator />
        
        <SidebarGroup>
          <SidebarGroupLabel>Sua Conta</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {profileItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    isActive={location.pathname === item.path}
                    onClick={() => navigate(item.path)}
                    tooltip={item.title}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenuButton onClick={handleLogout} tooltip="Sair">
              <LogOut />
              <span>Sair</span>
            </SidebarMenuButton>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
