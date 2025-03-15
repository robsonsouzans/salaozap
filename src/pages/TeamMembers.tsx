
import React, { useState } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent,
  CardFooter,
  CardHeader
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
import { useToast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Plus, Edit, Trash2, Mail, Phone, Scissors } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProtectedRoute } from '@/components/ProtectedRoute';

// Mock data for team members
const initialTeamMembers = [
  {
    id: '1',
    name: 'Ana Silva',
    role: 'Cabeleireira',
    email: 'ana.silva@exemplo.com',
    phone: '(11) 98765-4321',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80',
    services: ['Corte', 'Coloração', 'Penteado']
  },
  {
    id: '2',
    name: 'Carlos Oliveira',
    role: 'Barbeiro',
    email: 'carlos.oliveira@exemplo.com',
    phone: '(11) 91234-5678',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80',
    services: ['Corte Masculino', 'Barba', 'Sobrancelha']
  }
];

interface MemberFormData {
  name: string;
  role: string;
  email: string;
  phone: string;
  avatar: string;
  services: string;
}

const TeamMembers = () => {
  const [members, setMembers] = useState(initialTeamMembers);
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [formData, setFormData] = useState<MemberFormData>({
    name: '',
    role: '',
    email: '',
    phone: '',
    avatar: '',
    services: ''
  });
  
  const { toast } = useToast();
  
  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      email: '',
      phone: '',
      avatar: '',
      services: ''
    });
    setIsAddingMember(false);
    setEditingMemberId(null);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.role || !formData.email || !formData.phone) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }
    
    const servicesList = formData.services
      .split(',')
      .map(service => service.trim())
      .filter(Boolean);
    
    if (editingMemberId) {
      // Update existing member
      setMembers(prev => 
        prev.map(member => 
          member.id === editingMemberId 
            ? { 
                ...member, 
                name: formData.name,
                role: formData.role,
                email: formData.email,
                phone: formData.phone,
                avatar: formData.avatar || member.avatar,
                services: servicesList
              } 
            : member
        )
      );
      
      toast({
        title: "Membro atualizado",
        description: `${formData.name} foi atualizado(a) com sucesso`
      });
    } else {
      // Add new member
      const newMember = {
        id: Math.random().toString(36).substring(2, 11),
        name: formData.name,
        role: formData.role,
        email: formData.email,
        phone: formData.phone,
        avatar: formData.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + formData.name.replace(' ', ''),
        services: servicesList
      };
      
      setMembers(prev => [...prev, newMember]);
      
      toast({
        title: "Membro adicionado",
        description: `${formData.name} foi adicionado(a) à equipe`
      });
    }
    
    resetForm();
  };
  
  const handleEdit = (id: string) => {
    const memberToEdit = members.find(member => member.id === id);
    
    if (memberToEdit) {
      setFormData({
        name: memberToEdit.name,
        role: memberToEdit.role,
        email: memberToEdit.email,
        phone: memberToEdit.phone,
        avatar: memberToEdit.avatar,
        services: memberToEdit.services.join(', ')
      });
      
      setEditingMemberId(id);
      setIsAddingMember(true);
    }
  };
  
  const handleDelete = (id: string) => {
    const memberToDelete = members.find(member => member.id === id);
    
    setMembers(prev => prev.filter(member => member.id !== id));
    
    toast({
      title: "Membro removido",
      description: memberToDelete 
        ? `${memberToDelete.name} foi removido(a) da equipe` 
        : "O membro foi removido da equipe"
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
            <h1 className="text-2xl font-semibold">Gerenciar Equipe</h1>
          </div>
          <Dialog open={isAddingMember} onOpenChange={setIsAddingMember}>
            <DialogTrigger asChild>
              <Button className="button-press">
                <Plus className="h-4 w-4 mr-2" /> Adicionar
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingMemberId ? 'Editar Membro' : 'Adicionar Novo Membro'}
                </DialogTitle>
                <DialogDescription>
                  Preencha os detalhes do membro da equipe abaixo
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome *</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    placeholder="Nome completo"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="role">Função *</Label>
                  <Input 
                    id="role" 
                    name="role" 
                    value={formData.role} 
                    onChange={handleInputChange} 
                    placeholder="Ex: Cabeleireiro(a)"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    placeholder="email@exemplo.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone *</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleInputChange} 
                    placeholder="(11) 98765-4321"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="services">Serviços (separados por vírgula)</Label>
                  <Input 
                    id="services" 
                    name="services" 
                    value={formData.services} 
                    onChange={handleInputChange} 
                    placeholder="Corte, Coloração, Manicure"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="avatar">URL da foto</Label>
                  <Input 
                    id="avatar" 
                    name="avatar" 
                    value={formData.avatar} 
                    onChange={handleInputChange} 
                    placeholder="https://exemplo.com/foto.jpg"
                  />
                </div>
                
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancelar
                  </Button>
                  <Button type="submit">
                    {editingMemberId ? 'Atualizar' : 'Adicionar'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="space-y-4">
          {members.map(member => (
            <Card key={member.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 border-2 border-background shadow-sm">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-medium">{member.name}</h3>
                    <p className="text-muted-foreground">{member.role}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 pb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{member.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{member.phone}</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <Scissors className="h-4 w-4 text-muted-foreground mt-1" />
                  <div className="flex flex-wrap gap-1">
                    {member.services.map(service => (
                      <span 
                        key={service} 
                        className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between gap-4">
                <Button 
                  variant="outline" 
                  className="flex-1 button-press"
                  onClick={() => handleEdit(member.id)}
                >
                  <Edit className="h-4 w-4 mr-2" /> Editar
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 button-press text-red-500 hover:text-red-700 hover:bg-red-50 border-red-200"
                  onClick={() => handleDelete(member.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" /> Excluir
                </Button>
              </CardFooter>
            </Card>
          ))}
          
          {members.length === 0 && (
            <div className="text-center py-12 border-2 border-dashed rounded-lg border-gray-300">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Nenhum membro cadastrado</h3>
              <p className="text-muted-foreground mb-4">
                Clique no botão "Adicionar" para cadastrar os membros da sua equipe
              </p>
              <Button 
                onClick={() => setIsAddingMember(true)} 
                className="button-press"
              >
                <Plus className="h-4 w-4 mr-2" /> Adicionar Membro
              </Button>
            </div>
          )}
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
};

export default TeamMembers;
