
import React, { useState } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
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
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Shield, Key, Smartphone, ShieldAlert, Lock, EyeOff, Eye, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProtectedRoute } from '@/components/ProtectedRoute';

const Security = () => {
  const { toast } = useToast();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [show2FADialog, setShow2FADialog] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [phone, setPhone] = useState('(11) 98765-4321');
  
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  
  const resetPasswordForm = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setShowPasswordDialog(false);
  };
  
  const handlePasswordChange = () => {
    // Form validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos para continuar",
        variant: "destructive"
      });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Senhas diferentes",
        description: "A nova senha e a confirmação não correspondem",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would call an API to change the password
    toast({
      title: "Senha alterada com sucesso",
      description: "Sua senha foi atualizada"
    });
    
    resetPasswordForm();
  };
  
  const handle2FASetup = () => {
    // Validate verification code
    if (!verificationCode || verificationCode.length !== 6) {
      toast({
        title: "Código inválido",
        description: "Digite o código de 6 dígitos recebido via SMS",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would verify the code with an API
    toast({
      title: "Autenticação de dois fatores ativada",
      description: "Sua conta agora está mais segura"
    });
    
    setVerificationCode('');
    setShow2FADialog(false);
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
            <h1 className="text-2xl font-semibold">Segurança</h1>
          </div>
        </div>
        
        <div className="text-sm text-muted-foreground mb-6">
          Gerencie as configurações de segurança da sua conta
        </div>
        
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <Key className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Senha</CardTitle>
                  <CardDescription>Altere sua senha de acesso</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardFooter>
              <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full button-press">
                    Alterar
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Alterar Senha</DialogTitle>
                    <DialogDescription>
                      Crie uma senha forte usando letras, números e símbolos
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 py-2">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Senha atual</Label>
                      <div className="relative">
                        <Input 
                          id="current-password"
                          type={passwordVisible ? "text" : "password"}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="absolute right-0 top-0 h-full"
                          onClick={togglePasswordVisibility}
                        >
                          {passwordVisible ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Nova senha</Label>
                      <div className="relative">
                        <Input 
                          id="new-password"
                          type={passwordVisible ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirme a nova senha</Label>
                      <div className="relative">
                        <Input 
                          id="confirm-password"
                          type={passwordVisible ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                      {newPassword && confirmPassword && newPassword !== confirmPassword && (
                        <div className="flex items-center text-destructive text-sm mt-1">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          <span>As senhas não correspondem</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={resetPasswordForm}>
                      Cancelar
                    </Button>
                    <Button onClick={handlePasswordChange}>
                      Salvar
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <Smartphone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Autenticação de dois fatores</CardTitle>
                  <CardDescription>
                    Adicione uma camada extra de proteção ao seu login
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardFooter>
              <Dialog open={show2FADialog} onOpenChange={setShow2FADialog}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full button-press">
                    Configurar
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Configurar autenticação de dois fatores</DialogTitle>
                    <DialogDescription>
                      Receba um código por SMS para maior segurança
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 py-2">
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-md border border-green-200 dark:border-green-800">
                      <p className="text-sm text-green-800 dark:text-green-300">
                        Um código de verificação será enviado para o seu telefone cada vez que você fizer login
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone celular</Label>
                      <Input 
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="verification-code">Código de verificação</Label>
                      <Input 
                        id="verification-code"
                        placeholder="Digite o código de 6 dígitos"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        maxLength={6}
                      />
                      <div className="flex justify-end">
                        <Button variant="link" size="sm" className="h-auto py-0">
                          Enviar código
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShow2FADialog(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handle2FASetup}>
                      Ativar
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <ShieldAlert className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Dispositivos conectados</CardTitle>
                  <CardDescription>
                    Revise os dispositivos conectados à sua conta
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardFooter>
              <Button variant="outline" className="w-full button-press">
                Visualizar
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <Lock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Registros de atividade</CardTitle>
                  <CardDescription>
                    Visualize o histórico de atividades da sua conta
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardFooter>
              <Button variant="outline" className="w-full button-press">
                Visualizar
              </Button>
            </CardFooter>
          </Card>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
};

export default Security;
