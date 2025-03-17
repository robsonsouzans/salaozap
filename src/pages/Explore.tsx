
import React, { useState } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { ServicesList } from '@/components/ServicesList';
import { ArrowLeft, Search, Filter, MapPin, Star, Clock, DollarSign, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetFooter,
  SheetClose
} from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

// Mock data - same as in Services.tsx
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
    name: 'Pedicure',
    description: 'Tratamento completo para seus pés',
    price: 55,
    duration: '50 min',
    category: 'Unhas',
    image: 'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  },
  {
    id: '6',
    name: 'Barba',
    description: 'Corte e modelagem de barba',
    price: 40,
    duration: '30 min',
    category: 'Barba',
    image: 'https://images.unsplash.com/photo-1590246513699-5857e9c4a31a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
  }
];

// Categories for filtering
const categories = [
  { id: 'cabelo', label: 'Cabelo' },
  { id: 'unhas', label: 'Unhas' },
  { id: 'barba', label: 'Barba' },
  { id: 'maquiagem', label: 'Maquiagem' },
  { id: 'spa', label: 'Spa' },
  { id: 'depilacao', label: 'Depilação' },
];

interface FilterState {
  categories: string[];
  priceRange: [number, number];
  rating: number;
  distance: number;
  availability: boolean;
}

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredServices, setFilteredServices] = useState(servicesData);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 200],
    rating: 0,
    distance: 10,
    availability: false
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Filter services based on search term
    if (value) {
      const filtered = servicesData.filter(service => 
        service.name.toLowerCase().includes(value.toLowerCase()) ||
        service.description.toLowerCase().includes(value.toLowerCase()) ||
        service.category?.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredServices(filtered);
    } else {
      setFilteredServices(servicesData);
    }
  };

  const handleCategoryChange = (category: string) => {
    setFilters(prev => {
      const newCategories = prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category];
      
      return {
        ...prev,
        categories: newCategories
      };
    });
  };

  const applyFilters = () => {
    let filtered = servicesData;
    const newActiveFilters: string[] = [];
    
    // Filter by categories
    if (filters.categories.length > 0) {
      filtered = filtered.filter(service => 
        filters.categories.includes(service.category?.toLowerCase() || '')
      );
      newActiveFilters.push(`${filters.categories.length} categorias`);
    }
    
    // Filter by price
    filtered = filtered.filter(service => 
      service.price >= filters.priceRange[0] && service.price <= filters.priceRange[1]
    );
    
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 200) {
      newActiveFilters.push(`R$${filters.priceRange[0]}-R$${filters.priceRange[1]}`);
    }
    
    // More filters would be applied here in a real app
    if (filters.rating > 0) {
      newActiveFilters.push(`${filters.rating}+ estrelas`);
    }
    
    if (filters.distance < 10) {
      newActiveFilters.push(`${filters.distance}km`);
    }
    
    if (filters.availability) {
      newActiveFilters.push('Disponível hoje');
    }
    
    setFilteredServices(filtered);
    setActiveFilters(newActiveFilters);
    setShowFilters(false);
    
    toast({
      title: "Filtros aplicados",
      description: `${filtered.length} serviços encontrados`
    });
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      priceRange: [0, 200],
      rating: 0,
      distance: 10,
      availability: false
    });
    setFilteredServices(servicesData);
    setActiveFilters([]);
    
    toast({
      title: "Filtros limpos",
      description: "Todos os filtros foram removidos"
    });
  };

  const removeFilter = (filter: string) => {
    setActiveFilters(prev => prev.filter(f => f !== filter));
    
    // Logic to actually remove the filter would go here
    // For this demo, we'll just clear all filters
    if (filter.includes('categorias')) {
      setFilters(prev => ({ ...prev, categories: [] }));
    } else if (filter.includes('R$')) {
      setFilters(prev => ({ ...prev, priceRange: [0, 200] }));
    } else if (filter.includes('estrelas')) {
      setFilters(prev => ({ ...prev, rating: 0 }));
    } else if (filter.includes('km')) {
      setFilters(prev => ({ ...prev, distance: 10 }));
    } else if (filter === 'Disponível hoje') {
      setFilters(prev => ({ ...prev, availability: false }));
    }
    
    // Reapply filters
    applyFilters();
  };

  const FilterPanel = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Categorias</h3>
        <div className="grid grid-cols-2 gap-2">
          {categories.map(category => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox 
                id={category.id} 
                checked={filters.categories.includes(category.id)}
                onCheckedChange={() => handleCategoryChange(category.id)}
              />
              <Label htmlFor={category.id}>{category.label}</Label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Preço</h3>
        <div className="space-y-2">
          <Slider 
            value={filters.priceRange} 
            min={0} 
            max={200} 
            step={10}
            onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value as [number, number] }))}
          />
          <div className="flex justify-between">
            <span>R$ {filters.priceRange[0]}</span>
            <span>R$ {filters.priceRange[1]}</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Avaliação</h3>
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4, 5].map(rating => (
            <Button 
              key={rating}
              variant={filters.rating >= rating ? "default" : "outline"}
              size="sm"
              className={cn(
                "rounded-full w-10 h-10 p-0 flex items-center justify-center",
                filters.rating >= rating && "bg-yellow-500 hover:bg-yellow-600 border-none"
              )}
              onClick={() => setFilters(prev => ({ ...prev, rating: rating }))}
            >
              <Star className={cn(
                "h-5 w-5",
                filters.rating >= rating ? "fill-white text-white" : "text-muted-foreground"
              )} />
            </Button>
          ))}
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Distância</h3>
        <div className="space-y-2">
          <Slider 
            value={[filters.distance]} 
            min={1} 
            max={10} 
            step={1}
            onValueChange={(value) => setFilters(prev => ({ ...prev, distance: value[0] }))}
          />
          <div className="flex justify-between">
            <span>1 km</span>
            <span>Até {filters.distance} km</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="availability" 
          checked={filters.availability}
          onCheckedChange={(checked) => setFilters(prev => ({ ...prev, availability: checked as boolean }))}
        />
        <Label htmlFor="availability">Disponível hoje</Label>
      </div>
    </div>
  );

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

      {/* Search and filter bar */}
      <div className="flex gap-2 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input 
            type="text" 
            placeholder="Buscar serviços..." 
            className="pl-10 h-12"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        
        <Sheet open={showFilters} onOpenChange={setShowFilters}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="h-12 w-12">
              <Filter className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side={isMobile ? "bottom" : "right"} className={isMobile ? "h-[80vh]" : ""}>
            <SheetHeader>
              <SheetTitle>Filtros Avançados</SheetTitle>
            </SheetHeader>
            <div className="py-4">
              <FilterPanel />
            </div>
            <SheetFooter className="flex flex-row gap-2 mt-4">
              <Button variant="outline" onClick={clearFilters} className="flex-1">
                Limpar
              </Button>
              <SheetClose asChild>
                <Button onClick={applyFilters} className="flex-1">
                  Aplicar
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        
        <Link to="/search">
          <Button variant="outline" size="icon" className="h-12 w-12">
            <MapPin className="h-5 w-5" />
          </Button>
        </Link>
      </div>
      
      {/* Active filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {activeFilters.map(filter => (
            <Badge 
              key={filter} 
              variant="secondary"
              className="px-3 py-1 cursor-pointer"
              onClick={() => removeFilter(filter)}
            >
              {filter}
              <X className="ml-1 h-3 w-3" />
            </Badge>
          ))}
          <Badge 
            variant="outline" 
            className="px-3 py-1 cursor-pointer"
            onClick={clearFilters}
          >
            Limpar todos
          </Badge>
        </div>
      )}

      {/* Featured Services */}
      <h2 className="text-lg font-medium mb-4">Serviços Encontrados</h2>
      {filteredServices.length > 0 ? (
        <ServicesList services={filteredServices} />
      ) : (
        <div className="text-center py-8 border-2 border-dashed rounded-lg border-gray-300">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Nenhum serviço encontrado</h3>
          <p className="text-muted-foreground mb-4">
            Tente ajustar seus filtros ou buscar por outro termo
          </p>
          <Button 
            onClick={clearFilters}
            className="button-press"
          >
            Limpar Filtros
          </Button>
        </div>
      )}
    </MainLayout>
  );
};

export default Explore;
