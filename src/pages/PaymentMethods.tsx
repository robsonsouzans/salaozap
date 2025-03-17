
import React, { useState } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Save, CreditCard, DollarSign, Receipt, QrCode, CreditCardIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProtectedRoute } from '@/components/ProtectedRoute';

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  icon: React.ElementType;
  hasDiscount?: boolean;
  discount?: number;
  hasFee?: boolean;
  fee?: number;
  installments?: boolean;
  maxInstallments?: number;
  minAmount?: number;
}

const PaymentMethods = () => {
  const { toast } = useToast();
  
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: 'cash',
      name: 'Dinheiro',
      description: 'Pagamentos em espécie',
      enabled: true,
      icon: DollarSign,
      hasDiscount: true,
      discount: 5
    },
    {
      id: 'credit',
      name: 'Cartão de Crédito',
      description: 'Pagamentos com cartão de crédito',
      enabled: true,
      icon: CreditCard,
      hasFee: true,
      fee: 2,
      installments: true,
      maxInstallments: 3,
      minAmount: 100
    },
    {
      id: 'debit',
      name: 'Cartão de Débito',
      description: 'Pagamentos com cartão de débito',
      enabled: true,
      icon: CreditCardIcon,
      hasFee: true,
      fee: 1
    },
    {
      id: 'pix',
      name: 'PIX',
      description: 'Pagamentos via PIX',
      enabled: true,
      icon: QrCode,
      hasDiscount: true,
      discount: 3
    },
    {
      id: 'invoice',
      name: 'Faturamento',
      description: 'Pagamento via boleto/faturamento',
      enabled: false,
      icon: Receipt
    }
  ]);
  
  const handleToggleMethod = (id: string) => {
    setPaymentMethods(methods => 
      methods.map(method => 
        method.id === id ? { ...method, enabled: !method.enabled } : method
      )
    );
  };
  
  const handleToggleOption = (id: string, option: 'hasDiscount' | 'hasFee' | 'installments') => {
    setPaymentMethods(methods => 
      methods.map(method => 
        method.id === id ? { ...method, [option]: !method[option] } : method
      )
    );
  };
  
  const handleValueChange = (id: string, field: string, value: string) => {
    const numValue = value === '' ? 0 : Number(value);
    
    setPaymentMethods(methods => 
      methods.map(method => 
        method.id === id ? { ...method, [field]: numValue } : method
      )
    );
  };
  
  const handleSave = () => {
    // In a real app, this would save to a backend
    toast({
      title: "Configurações salvas",
      description: "As configurações de pagamento foram atualizadas com sucesso."
    });
  };
  
  return (
    <ProtectedRoute allowedRoles={['salon']}>
      <MainLayout>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Link to="/settings">
              <Button size="icon" variant="ghost" className="button-press">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-semibold">Métodos de Pagamento</h1>
          </div>
          <Button onClick={handleSave} className="button-press">
            <Save className="h-4 w-4 mr-2" />
            Salvar
          </Button>
        </div>
        
        <div className="text-sm text-muted-foreground mb-6">
          Configure quais formas de pagamento seu salão aceita e suas respectivas configurações
        </div>
        
        <div className="space-y-4">
          {paymentMethods.map(method => (
            <Card key={method.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-4 bg-primary/5 flex items-center justify-between border-b">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <method.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{method.name}</h3>
                      <p className="text-sm text-muted-foreground">{method.description}</p>
                    </div>
                  </div>
                  <Switch 
                    checked={method.enabled} 
                    onCheckedChange={() => handleToggleMethod(method.id)}
                  />
                </div>
                
                {method.enabled && (
                  <div className="p-4 space-y-4">
                    {/* Discount option */}
                    {method.hasDiscount !== undefined && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="cursor-pointer" htmlFor={`discount-${method.id}`}>
                            Oferecer desconto
                          </Label>
                          <Switch 
                            id={`discount-${method.id}`}
                            checked={method.hasDiscount} 
                            onCheckedChange={() => handleToggleOption(method.id, 'hasDiscount')}
                          />
                        </div>
                        
                        {method.hasDiscount && (
                          <div className="flex items-center">
                            <Input 
                              type="number"
                              min="0"
                              max="100"
                              value={method.discount}
                              onChange={(e) => handleValueChange(method.id, 'discount', e.target.value)}
                              className="max-w-[80px]"
                            />
                            <span className="ml-2">%</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Fee option */}
                    {method.hasFee !== undefined && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="cursor-pointer" htmlFor={`fee-${method.id}`}>
                            Cobrar taxa
                          </Label>
                          <Switch 
                            id={`fee-${method.id}`}
                            checked={method.hasFee} 
                            onCheckedChange={() => handleToggleOption(method.id, 'hasFee')}
                          />
                        </div>
                        
                        {method.hasFee && (
                          <div className="flex items-center">
                            <Input 
                              type="number"
                              min="0"
                              max="100"
                              value={method.fee}
                              onChange={(e) => handleValueChange(method.id, 'fee', e.target.value)}
                              className="max-w-[80px]"
                            />
                            <span className="ml-2">%</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Installments option */}
                    {method.installments !== undefined && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="cursor-pointer" htmlFor={`installments-${method.id}`}>
                            Permitir parcelamento
                          </Label>
                          <Switch 
                            id={`installments-${method.id}`}
                            checked={method.installments} 
                            onCheckedChange={() => handleToggleOption(method.id, 'installments')}
                          />
                        </div>
                        
                        {method.installments && (
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <Label className="text-sm">Máx. parcelas</Label>
                              <Input 
                                type="number"
                                min="2"
                                max="12"
                                value={method.maxInstallments}
                                onChange={(e) => handleValueChange(method.id, 'maxInstallments', e.target.value)}
                              />
                            </div>
                            <div className="space-y-1">
                              <Label className="text-sm">Valor mín. (R$)</Label>
                              <Input 
                                type="number"
                                min="0"
                                value={method.minAmount}
                                onChange={(e) => handleValueChange(method.id, 'minAmount', e.target.value)}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
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

export default PaymentMethods;
