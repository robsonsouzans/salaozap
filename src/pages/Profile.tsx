
import React from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { ProfileSection } from '@/components/ProfileSection';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';

const Profile = () => {
  const { theme } = useAuth();
  
  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Link to="/">
              <Button size="icon" variant="ghost" className="button-press">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-semibold dark:text-gray-100">Perfil</h1>
          </div>
        </div>

        <ProfileSection />
      </MainLayout>
    </ProtectedRoute>
  );
};

export default Profile;
