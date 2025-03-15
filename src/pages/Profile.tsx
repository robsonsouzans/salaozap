
import React from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { ProfileSection } from '@/components/ProfileSection';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// Mock user data
const userData = {
  name: 'Maria Silva',
  email: 'maria.silva@example.com',
  avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80'
};

const Profile = () => {
  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Link to="/">
            <Button size="icon" variant="ghost" className="button-press">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-semibold">Perfil</h1>
        </div>
      </div>

      <ProfileSection user={userData} />
    </MainLayout>
  );
};

export default Profile;
