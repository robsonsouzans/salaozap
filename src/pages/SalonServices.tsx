
import React, { useState } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Plus, Edit, Trash2, Clock, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';

// Mock data for salon services
const initialServices = [
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
  }
];

interface ServiceFormData {
  name: string;
  description: string;
  price: string;
  duration: string;
  image: string;
}

const SalonServices = () => {
  const [services, setServices] = useState(initialServices);
  const [isAddingService, setIsAddingService] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ServiceFormData>({
    name: '',
    description: '',
    price: '',
    duration: '',
    image: ''
  });
  
  const { toast } = useToast();
  
  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      duration: '',
      image: ''
    });
    setIsAddingService(false);
    setEditingServiceId(null);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.duration) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }
    
    if (editingServiceId) {
      // Update existing service
      setServices(prev => 
        prev.map(service => 
          service.id === editingServiceId 
            ? { 
                ...service, 
                name: formData.name,
                description: formData.description,
                price: parseFloat(formData.price),
                duration: formData.duration,
                image: formData.image || service.image
              } 
            : service
        )
      );
      
      toast({
        title: "Serviço atualizado",
        description: `O serviço ${formData.name} foi atualizado com sucesso`
      });
    } else {
      // Add new service
      const newService = {
        id: Math.random().toString(36).substring(2, 11),
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        duration: formData.duration,
        image: formData.image || 'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
      };
      
      setServices(prev => [...prev, newService]);
      
      toast({
        title: "Serviço adicionado",
        description: `O serviço ${formData.name} foi adicionado com sucesso`
      });
    }
    
    resetForm();
  };
  
  const handleEdit = (id: string) => {
    const serviceToEdit = services.find(service => service.id === id);
    
    if (serviceToEdit) {
      setFormData({
        name: serviceToEdit.name,
        description: serviceToEdit.description,
        price: serviceToEdit.price.toString(),
        duration: serviceToEdit.duration,
        image: serviceToEdit.image
      });
      
      setEditingServiceId(id);
      setIsAddingService(true);
    }
  };
  
  const handleDelete = (id: string) => {
    setServices(prev => prev.filter(service => service.id !== id));
    
    toast({
      title: "Serviço removido",
      description: "O serviço foi removido com sucesso"
    });
  };
  
  return (
    <ProtectedRoute allowedRoles={['salon']}>
      <MainLayout>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Link to="/">
              <Button size="icon" variant="ghost" className="button-press">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-semibold">Gerenciar Serviços</h1>
          </div>
          <Dialog open={isAddingService} onOpenChange={setIsAddingService}>
            <DialogTrigger asChild>
              <Button className="button-press">
                <Plus className="h-4 w-4 mr-2" /> Adicionar
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingServiceId ? 'Editar Serviço' : 'Adicionar Novo Serviço'}
                </DialogTitle>
                <DialogDescription>
                  Preencha os detalhes do serviço abaixo
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do serviço *</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    placeholder="Ex: Corte de Cabelo"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    value={formData.description} 
                    onChange={handleInputChange} 
                    placeholder="Descreva o serviço"
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Preço (R$) *</Label>
                    <Input 
                      id="price" 
                      name="price" 
                      type="number" 
                      min="0" 
                      step="0.01" 
                      value={formData.price} 
                      onChange={handleInputChange} 
                      placeholder="0.00"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duração *</Label>
                    <Input 
                      id="duration" 
                      name="duration" 
                      value={formData.duration} 
                      onChange={handleInputChange} 
                      placeholder="Ex: 45 min"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="image">URL da imagem</Label>
                  <Input 
                    id="image" 
                    name="image" 
                    value={formData.image} 
                    onChange={handleInputChange} 
                    placeholder="https://exemplo.com/imagem.jpg"
                  />
                </div>
                
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancelar
                  </Button>
                  <Button type="submit">
                    {editingServiceId ? 'Atualizar' : 'Adicionar'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="space-y-4">
          {services.map(service => (
            <Card key={service.id} className="overflow-hidden">
              <div 
                className="h-40 w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${service.image})` }}
              />
              <CardHeader className="pb-2">
                <CardTitle>{service.name}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{service.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 font-medium">
                    <DollarSign className="h-4 w-4" />
                    <span>R$ {service.price.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between gap-4">
                <Button 
                  variant="outline" 
                  className="flex-1 button-press"
                  onClick={() => handleEdit(service.id)}
                >
                  <Edit className="h-4 w-4 mr-2" /> Editar
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 button-press text-red-500 hover:text-red-700 hover:bg-red-50 border-red-200"
                  onClick={() => handleDelete(service.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" /> Excluir
                </Button>
              </CardFooter>
            </Card>
          ))}
          
          {services.length === 0 && (
            <div className="text-center py-12 border-2 border-dashed rounded-lg border-gray-300">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Nenhum serviço cadastrado</h3>
              <p className="text-muted-foreground mb-4">
                Clique no botão "Adicionar" para cadastrar seus serviços
              </p>
              <Button 
                onClick={() => setIsAddingService(true)} 
                className="button-press"
              >
                <Plus className="h-4 w-4 mr-2" /> Adicionar Serviço
              </Button>
            </div>
          )}
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
};

export default SalonServices;
