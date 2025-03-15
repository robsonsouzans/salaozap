
import React from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Lock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <MainLayout className="flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md"
      >
        <div className="mb-6 bg-red-100 p-6 rounded-full inline-flex">
          <Lock className="h-12 w-12 text-red-600" />
        </div>
        
        <h1 className="text-2xl font-semibold mb-4">Acesso Não Autorizado</h1>
        
        <p className="text-muted-foreground mb-6">
          Você não tem permissão para acessar esta página. 
          Por favor, verifique seu tipo de conta.
        </p>
        
        <Button onClick={() => navigate(-1)} className="gap-2 button-press">
          <ArrowLeft className="h-4 w-4" /> Voltar
        </Button>
      </motion.div>
    </MainLayout>
  );
};

export default Unauthorized;
