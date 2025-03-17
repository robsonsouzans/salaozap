
import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';
import { 
  ArrowLeft, 
  Search, 
  MapPin, 
  Star, 
  Clock, 
  Phone, 
  Calendar, 
  Filter, 
  Scissors, 
  Heart,
  X,
  Sliders,
  Check
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { useIsMobile } from '@/hooks/use-mobile';

// Mock data for salons
const salonsData = [
  {
    id: '1',
    name: 'Salão Belle Hair',
    description: 'Salão especializado em cortes femininos e coloração',
    address: 'Rua das Flores, 123 - Centro',
    distance: '1.2 km',
    rating: 4.8,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    services: ['Corte', 'Coloração', 'Manicure'],
    phone: '(11) 99876-5432',
    openNow: true
  },
  {
    id: '2',
    name: 'Barbearia Vintage',
    description: 'Barbearia tradicional com ambiente vintage',
    address: 'Av. Paulista, 1578 - Bela Vista',
    distance: '2.5 km',
    rating: 4.6,
    reviews: 98,
    image: 'https://images.unsplash.com/photo-1512690459411-b9245aed614b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    services: ['Corte Masculino', 'Barba', 'Tratamento Capilar'],
    phone: '(11) 99765-4321',
    openNow: true
  },
  {
    id: '3',
    name: 'Studio Nail Art',
    description: 'Especializado em unhas decoradas e tratamentos',
    address: 'Rua Augusta, 789 - Consolação',
    distance: '3.8 km',
    rating: 4.9,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1610582839880-ea31a05f0abe?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    services: ['Manicure', 'Pedicure', 'Nail Art'],
    phone: '(11) 98765-4321',
    openNow: false
  },
  {
    id: '4',
    name: 'Spa & Beauty Center',
    description: 'Centro de estética e bem-estar completo',
    address: 'Al. Santos, 456 - Jardim Paulista',
    distance: '4.1 km',
    rating: 4.7,
    reviews: 175,
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    services: ['Massagem', 'Limpeza de Pele', 'Hidratação'],
    phone: '(11) 97654-3210',
    openNow: true
  }
];

const services = [
  { id: 'haircut', label: 'Corte de Cabelo' },
  { id: 'coloring', label: 'Coloração' },
  { id: 'manicure', label: 'Manicure' },
  { id: 'pedicure', label: 'Pedicure' },
  { id: 'barber', label: 'Barbearia' },
  { id: 'makeup', label: 'Maquiagem' },
  { id: 'facial', label: 'Limpeza de Pele' },
  { id: 'massage', label: 'Massagem' },
];

interface FilterValues {
  services: string[];
  priceRange: [number, number];
  rating: number;
  distance: number;
  openNow: boolean;
}

const SalonCard = ({ salon }: { salon: typeof salonsData[0] }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(false);
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removido dos favoritos" : "Adicionado aos favoritos",
      description: `${salon.name} foi ${isFavorite ? "removido dos" : "adicionado aos"} seus favoritos`
    });
  };
  
  const handleSchedule = () => {
    // Store selected salon in localStorage for the appointments page
    localStorage.setItem('selectedSalon', JSON.stringify(salon));
    
    // Show confirmation toast
    toast({
      title: "Salão selecionado",
      description: `Você selecionou ${salon.name}. Continue para agendar.`,
      duration: 3000,
    });
    
    // Navigate to appointments page
    navigate('/services');
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden card-hover">
        <div 
          className="h-40 w-full bg-cover bg-center relative"
          style={{ backgroundImage: `url(${salon.image})` }}
        >
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-2 right-2 bg-white/80 hover:bg-white/90 text-primary"
            onClick={toggleFavorite}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
          {salon.openNow && (
            <Badge className="absolute bottom-2 left-2 bg-green-500 text-white">
              Aberto agora
            </Badge>
          )}
        </div>
        
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg font-medium">{salon.name}</CardTitle>
              <CardDescription>{salon.description}</CardDescription>
            </div>
            <div className="flex items-center bg-primary/10 px-2 py-1 rounded">
              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 mr-1" />
              <span className="font-medium">{salon.rating}</span>
              <span className="text-xs ml-1 text-muted-foreground">({salon.reviews})</span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pb-2 space-y-2">
          <div className="flex items-center gap-1 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{salon.address}</span>
            <span className="text-xs text-muted-foreground ml-1">({salon.distance})</span>
          </div>
          
          <div className="flex items-center gap-1 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{salon.phone}</span>
          </div>
          
          <div className="flex flex-wrap gap-1 mt-2">
            {salon.services.map(service => (
              <Badge key={service} variant="secondary" className="text-xs">
                {service}
              </Badge>
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="pt-2">
          <Button 
            className="w-full button-press"
            onClick={handleSchedule}
          >
            <Calendar className="h-4 w-4 mr-2" /> Agendar
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const SalonSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSalons, setFilteredSalons] = useState(salonsData);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const form = useForm<FilterValues>({
    defaultValues: {
      services: [],
      priceRange: [0, 300],
      rating: 0,
      distance: 10,
      openNow: false
    }
  });
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value) {
      const filtered = salonsData.filter(salon => 
        salon.name.toLowerCase().includes(value.toLowerCase()) ||
        salon.description.toLowerCase().includes(value.toLowerCase()) ||
        salon.services.some(service => service.toLowerCase().includes(value.toLowerCase()))
      );
      setFilteredSalons(filtered);
    } else {
      setFilteredSalons(salonsData);
    }
  };
  
  const applyFilters = (values: FilterValues) => {
    let filtered = [...salonsData];
    const newActiveFilters: string[] = [];
    
    // Filter by services
    if (values.services.length > 0) {
      filtered = filtered.filter(salon => 
        salon.services.some(service => 
          values.services.some(s => service.toLowerCase().includes(s.toLowerCase()))
        )
      );
      newActiveFilters.push(`${values.services.length} serviços`);
    }
    
    // Filter by rating
    if (values.rating > 0) {
      filtered = filtered.filter(salon => salon.rating >= values.rating);
      newActiveFilters.push(`${values.rating}+ estrelas`);
    }
    
    // Filter by distance
    if (values.distance < 10) {
      filtered = filtered.filter(salon => 
        parseFloat(salon.distance.replace(' km', '')) <= values.distance
      );
      newActiveFilters.push(`${values.distance}km ou menos`);
    }
    
    // Filter by open now
    if (values.openNow) {
      filtered = filtered.filter(salon => salon.openNow);
      newActiveFilters.push('Aberto agora');
    }
    
    setFilteredSalons(filtered);
    setActiveFilters(newActiveFilters);
    setDrawerOpen(false);
    
    toast({
      title: "Filtros aplicados",
      description: `${filtered.length} salões encontrados`
    });
  };
  
  const removeFilter = (filter: string) => {
    setActiveFilters(prev => prev.filter(f => f !== filter));
    
    if (filter.includes('serviços')) {
      form.setValue('services', []);
    } else if (filter.includes('estrelas')) {
      form.setValue('rating', 0);
    } else if (filter.includes('km')) {
      form.setValue('distance', 10);
    } else if (filter === 'Aberto agora') {
      form.setValue('openNow', false);
    }
    
    // Re-apply filters
    applyFilters(form.getValues());
  };
  
  const resetFilters = () => {
    form.reset();
    setFilteredSalons(salonsData);
    setActiveFilters([]);
    
    toast({
      title: "Filtros limpos",
      description: "Todos os filtros foram removidos"
    });
  };
  
  const handleFilter = (filter: string) => {
    let filtered;
    
    switch(filter) {
      case 'all':
        filtered = salonsData;
        break;
      case 'nearby':
        filtered = [...salonsData].sort((a, b) => 
          parseFloat(a.distance.replace(' km', '')) - parseFloat(b.distance.replace(' km', ''))
        );
        break;
      case 'rating':
        filtered = [...salonsData].sort((a, b) => b.rating - a.rating);
        break;
      case 'open':
        filtered = salonsData.filter(salon => salon.openNow);
        break;
      default:
        filtered = salonsData;
    }
    
    setFilteredSalons(filtered);
    
    toast({
      title: "Filtro aplicado",
      description: `Mostrando salões ${
        filter === 'all' ? 'todos' : 
        filter === 'nearby' ? 'mais próximos' : 
        filter === 'rating' ? 'melhor avaliados' : 
        'abertos agora'
      }`
    });
  };
  
  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Link to="/">
            <Button size="icon" variant="ghost" className="button-press">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-semibold">Buscar Salões</h1>
        </div>
        
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline" size="icon" className="button-press">
              <Sliders className="h-5 w-5" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className={isMobile ? "h-[80vh]" : "max-h-[90vh]"}>
            <DrawerHeader>
              <DrawerTitle>Filtros Avançados</DrawerTitle>
              <DrawerDescription>
                Encontre o salão perfeito para você
              </DrawerDescription>
            </DrawerHeader>
            <div className="px-4 py-2 overflow-y-auto">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(applyFilters)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="services"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold">Serviços</FormLabel>
                        <FormDescription>
                          Selecione os serviços que você está procurando
                        </FormDescription>
                        <div className="grid grid-cols-2 gap-3 mt-2">
                          {services.map(service => (
                            <div key={service.id} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`service-${service.id}`} 
                                checked={field.value.includes(service.id)}
                                onCheckedChange={(checked) => {
                                  const newValue = checked 
                                    ? [...field.value, service.id]
                                    : field.value.filter(val => val !== service.id);
                                  field.onChange(newValue);
                                }}
                              />
                              <label 
                                htmlFor={`service-${service.id}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {service.label}
                              </label>
                            </div>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold">Avaliação</FormLabel>
                        <FormDescription>
                          Escolha a avaliação mínima
                        </FormDescription>
                        <div className="flex items-center space-x-2 pt-2">
                          {[1, 2, 3, 4, 5].map(rating => (
                            <Button 
                              key={rating}
                              type="button"
                              variant={field.value >= rating ? "default" : "outline"}
                              size="sm"
                              className={`rounded-full w-10 h-10 p-0 flex items-center justify-center ${
                                field.value >= rating ? "bg-yellow-500 hover:bg-yellow-600 border-none" : ""
                              }`}
                              onClick={() => field.onChange(rating === field.value ? 0 : rating)}
                            >
                              <Star className={`h-5 w-5 ${
                                field.value >= rating ? "fill-white text-white" : "text-muted-foreground"
                              }`} />
                            </Button>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="distance"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold">Distância</FormLabel>
                        <FormDescription>
                          Até {field.value} km de distância
                        </FormDescription>
                        <FormControl>
                          <Slider
                            value={[field.value]}
                            min={1}
                            max={10}
                            step={1}
                            onValueChange={(vals) => field.onChange(vals[0])}
                            className="mt-2"
                          />
                        </FormControl>
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>1 km</span>
                          <span>5 km</span>
                          <span>10 km</span>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="openNow"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between space-x-2 space-y-0 rounded-md border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Aberto agora</FormLabel>
                          <FormDescription>
                            Mostrar apenas salões abertos no momento
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </div>
            <DrawerFooter>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={resetFilters} className="flex-1">
                  Limpar
                </Button>
                <Button 
                  onClick={() => applyFilters(form.getValues())} 
                  className="flex-1"
                >
                  Aplicar Filtros
                </Button>
              </div>
              <DrawerClose asChild>
                <Button variant="ghost">Cancelar</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
      
      {/* Search bar */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
        <Input 
          type="text" 
          placeholder="Buscar por nome, serviço..." 
          className="pl-10 h-12"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      
      {/* Active filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {activeFilters.map(filter => (
            <Badge 
              key={filter} 
              variant="secondary"
              className="px-3 py-1 cursor-pointer flex items-center"
              onClick={() => removeFilter(filter)}
            >
              {filter}
              <X className="ml-1 h-3 w-3" />
            </Badge>
          ))}
          <Badge 
            variant="outline" 
            className="px-3 py-1 cursor-pointer"
            onClick={resetFilters}
          >
            Limpar todos
          </Badge>
        </div>
      )}
      
      {/* Filter tabs */}
      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="grid grid-cols-4 w-full mb-4">
          <TabsTrigger value="all" onClick={() => handleFilter('all')}>Todos</TabsTrigger>
          <TabsTrigger value="nearby" onClick={() => handleFilter('nearby')}>Próximos</TabsTrigger>
          <TabsTrigger value="rating" onClick={() => handleFilter('rating')}>Avaliados</TabsTrigger>
          <TabsTrigger value="open" onClick={() => handleFilter('open')}>Abertos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          {filteredSalons.map(salon => (
            <SalonCard key={salon.id} salon={salon} />
          ))}
        </TabsContent>
        
        <TabsContent value="nearby" className="space-y-4">
          {filteredSalons.map(salon => (
            <SalonCard key={salon.id} salon={salon} />
          ))}
        </TabsContent>
        
        <TabsContent value="rating" className="space-y-4">
          {filteredSalons.map(salon => (
            <SalonCard key={salon.id} salon={salon} />
          ))}
        </TabsContent>
        
        <TabsContent value="open" className="space-y-4">
          {filteredSalons.map(salon => (
            <SalonCard key={salon.id} salon={salon} />
          ))}
        </TabsContent>
      </Tabs>
      
      {filteredSalons.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed rounded-lg border-gray-300">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Nenhum salão encontrado</h3>
          <p className="text-muted-foreground mb-4">
            Tente ajustar sua busca ou filtros
          </p>
          <Button 
            onClick={() => {
              setSearchTerm('');
              resetFilters();
            }}
            className="button-press"
          >
            Limpar Busca
          </Button>
        </div>
      )}
    </MainLayout>
  );
};

export default SalonSearch;
