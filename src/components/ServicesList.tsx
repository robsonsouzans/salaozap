
import React from 'react';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  image: string;
}

interface ServicesListProps {
  services: Service[];
  className?: string;
}

export function ServicesList({ services, className }: ServicesListProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className={cn("grid grid-cols-1 md:grid-cols-2 gap-4", className)}
    >
      {services.map((service) => (
        <motion.div key={service.id} variants={item}>
          <Card className="overflow-hidden h-full card-hover">
            <div 
              className="h-40 w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${service.image})` }}
            />
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">{service.name}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
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
            <CardFooter>
              <Button className="w-full button-press">
                Agendar <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
