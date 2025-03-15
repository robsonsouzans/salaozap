
import React, { useState } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { ServicesList } from '@/components/ServicesList';
import { ArrowLeft, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// Mock data
const servicesData = [
  {
    id: '1',
    name: 'Corte de Cabelo',
    description: 'Corte profissional para todos os tipos de cabelo',
    price: 60,
    duration: '45 min',
    category: 'Cabelo',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '2',
    name: 'Coloração',
    description: 'Tinturas de alta qualidade e durabilidade',
    price: 120,
    duration: '1h 30min',
    category: 'Cabelo',
    image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '3',
    name: 'Manicure',
    description: 'Tratamento completo para unhas',
    price: 45,
    duration: '40 min',
    category: 'Unhas',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '4',
    name: 'Hidratação',
    description: 'Tratamento profundo para cabelos danificados',
    price: 80,
    duration: '1h',
    category: 'Cabelo',
    image: 'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '5',
    name: 'Barba Completa',
    description: 'Tratamento e modelagem de barba',
    price: 35,
    duration: '30 min',
    category: 'Barba',
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '6',
    name: 'Limpeza de Pele',
    description: 'Tratamento completo de limpeza facial',
    price: 90,
    duration: '50 min',
    category: 'Estética',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '7',
    name: 'Maquiagem Social',
    description: 'Maquiagem para eventos e ocasiões especiais',
    price: 120,
    duration: '1h',
    category: 'Maquiagem',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  }
];

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  
  // All available categories plus "Todos"
  const categories = ['Todos', 'Cabelo', 'Unhas', 'Barba', 'Estética', 'Maquiagem'];
  
  // Filter services based on selected category and search term
  const filteredServices = servicesData.filter(service => {
    const matchesCategory = selectedCategory === 'Todos' || service.category === selectedCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          service.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Link to="/">
            <Button size="icon" variant="ghost" className="button-press">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-semibold">Serviços</h1>
        </div>
      </div>

      {/* Search bar */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
        <Input 
          type="text" 
          placeholder="Buscar serviços..." 
          className="pl-10 h-12"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Categories */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((category) => (
          <Button 
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className="whitespace-nowrap button-press"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Services list */}
      {filteredServices.length > 0 ? (
        <ServicesList services={filteredServices} />
      ) : (
        <div className="text-center py-10">
          <p className="text-muted-foreground">Nenhum serviço encontrado.</p>
        </div>
      )}
    </MainLayout>
  );
};

export default Services;
