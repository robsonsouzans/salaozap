
import React from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { ServicesList } from '@/components/ServicesList';
import { ArrowLeft, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// Mock data - same as in Services.tsx
const servicesData = [
  {
    id: '1',
    name: 'Corte de Cabelo',
    description: 'Corte profissional para todos os tipos de cabelo',
    price: 60,
    duration: '45 min',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '2',
    name: 'Coloração',
    description: 'Tinturas de alta qualidade e durabilidade',
    price: 120,
    duration: '1h 30min',
    image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '3',
    name: 'Manicure',
    description: 'Tratamento completo para unhas',
    price: 45,
    duration: '40 min',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '4',
    name: 'Hidratação',
    description: 'Tratamento profundo para cabelos danificados',
    price: 80,
    duration: '1h',
    image: 'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  }
];

const Explore = () => {
  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Link to="/">
            <Button size="icon" variant="ghost" className="button-press">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-semibold">Explorar Serviços</h1>
        </div>
      </div>

      {/* Search bar */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
        <Input 
          type="text" 
          placeholder="Buscar serviços..." 
          className="pl-10 h-12"
        />
      </div>

      {/* Featured Services */}
      <h2 className="text-lg font-medium mb-4">Serviços em Destaque</h2>
      <ServicesList services={servicesData} />
    </MainLayout>
  );
};

export default Explore;
