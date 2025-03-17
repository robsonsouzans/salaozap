import React from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Save, Sun, Moon, Laptop } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth, ThemePreference } from '@/contexts/AuthContext';

const Appearance = () => {
  const { toast } = useToast();
  const { theme, setTheme } = useAuth();
  
  const handleSave = () => {
    toast({
      title: "Aparência salva",
      description: "As configurações de aparência foram atualizadas com sucesso."
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
            <h1 className="text-2xl font-semibold">Aparência</h1>
          </div>
          <Button onClick={handleSave} className="button-press">
            <Save className="h-4 w-4 mr-2" />
            Salvar
          </Button>
        </div>
        
        <div className="text-sm text-muted-foreground mb-6">
          Personalize a aparência do aplicativo
        </div>
        
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Tema</h2>
            <p className="text-sm text-muted-foreground">
              Escolha entre tema claro, escuro ou automático
            </p>
            
            <RadioGroup 
              defaultValue={theme} 
              className="grid grid-cols-3 gap-4 pt-2"
              onValueChange={(value) => {
                const themeValue = value as ThemePreference;
                setTheme(themeValue);
                toast({
                  title: `Tema ${themeValue === 'light' ? 'Claro' : 'Escuro'} ativado`,
                  description: `O tema do aplicativo foi alterado para ${themeValue === 'light' ? 'claro' : 'escuro'}.`
                });
              }}
            >
              <div>
                <RadioGroupItem 
                  value="light" 
                  id="theme-light" 
                  className="peer sr-only" 
                />
                <Label
                  htmlFor="theme-light"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Sun className="mb-3 h-6 w-6" />
                  <span className="text-center">Claro</span>
                </Label>
              </div>
              
              <div>
                <RadioGroupItem 
                  value="dark" 
                  id="theme-dark" 
                  className="peer sr-only" 
                />
                <Label
                  htmlFor="theme-dark"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Moon className="mb-3 h-6 w-6" />
                  <span className="text-center">Escuro</span>
                </Label>
              </div>
              
              <div>
                <RadioGroupItem 
                  value="system" 
                  id="theme-system" 
                  className="peer sr-only" 
                />
                <Label
                  htmlFor="theme-system"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Laptop className="mb-3 h-6 w-6" />
                  <span className="text-center">Sistema</span>
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Outras opções</h2>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="animations" className="cursor-pointer">
                  Animações
                </Label>
                <Switch 
                  id="animations" 
                  defaultChecked={true}
                  onCheckedChange={(checked) => {
                    toast({
                      title: checked ? "Animações ativadas" : "Animações desativadas",
                      description: `As animações do aplicativo foram ${checked ? "ativadas" : "desativadas"}.`
                    });
                  }}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Ativar ou desativar animações da interface
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="reduced-motion" className="cursor-pointer">
                  Movimento reduzido
                </Label>
                <Switch 
                  id="reduced-motion"
                  onCheckedChange={(checked) => {
                    toast({
                      title: checked ? "Movimento reduzido ativado" : "Movimento reduzido desativado",
                      description: `O movimento reduzido foi ${checked ? "ativado" : "desativado"}.`
                    });
                  }}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Reduzir o movimento para maior acessibilidade
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="high-contrast" className="cursor-pointer">
                  Alto contraste
                </Label>
                <Switch 
                  id="high-contrast"
                  onCheckedChange={(checked) => {
                    toast({
                      title: checked ? "Alto contraste ativado" : "Alto contraste desativado",
                      description: `O modo de alto contraste foi ${checked ? "ativado" : "desativado"}.`
                    });
                  }}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Aumentar o contraste para melhor legibilidade
              </p>
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

export default Appearance;
