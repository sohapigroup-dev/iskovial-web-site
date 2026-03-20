import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LayoutDashboard,
  Building2,
  MapPin,
  Car,
  Package,
  LogOut,
  TrendingUp,
  Users,
  Eye,
} from 'lucide-react';
import { toast } from 'sonner';
import logo from '@/assets/logo-iskovial.png';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    properties: 0,
    terrains: 0,
    vehicles: 0,
    materials: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/iskovial-admin/login');
      return;
    }

    fetchStats();
  }, [user, navigate]);

  const fetchStats = async () => {
    try {
      const [propertiesRes, terrainsRes, vehiclesRes, materialsRes] = await Promise.all([
        supabase.from('properties').select('id', { count: 'exact', head: true }),
        supabase.from('terrains').select('id', { count: 'exact', head: true }),
        supabase.from('vehicles').select('id', { count: 'exact', head: true }),
        supabase.from('materials').select('id', { count: 'exact', head: true }),
      ]);

      setStats({
        properties: propertiesRes.count || 0,
        terrains: terrainsRes.count || 0,
        vehicles: vehiclesRes.count || 0,
        materials: materialsRes.count || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Déconnexion réussie');
      navigate('/iskovial-admin/login');
    } catch (error) {
      toast.error('Erreur lors de la déconnexion');
    }
  };

  const menuItems = [
    {
      title: 'Propriétés',
      icon: Building2,
      count: stats.properties,
      link: '/iskovial-admin/properties',
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Terrains',
      icon: MapPin,
      count: stats.terrains,
      link: '/iskovial-admin/terrains',
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Véhicules',
      icon: Car,
      count: stats.vehicles,
      link: '/iskovial-admin/vehicles',
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Matériaux',
      icon: Package,
      count: stats.materials,
      link: '/iskovial-admin/materials',
      color: 'from-orange-500 to-orange-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-3 md:px-4 py-3 md:py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 md:gap-4 min-w-0">
              <img src={logo} alt="ISKOVIAL" className="h-8 md:h-12 rounded-lg flex-shrink-0" />
              <div className="min-w-0">
                <h1 className="text-sm md:text-2xl font-bold text-gray-900 truncate">
                  ISKOVIAL GROUP
                </h1>
                <p className="text-xs md:text-sm text-gray-600 hidden sm:block">
                  Administration de la plateforme
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 md:gap-4 flex-shrink-0">
              <Link to="/" target="_blank">
                <Button variant="outline" size="sm" className="h-8 md:h-9">
                  <Eye className="w-3 h-3 md:w-4 md:h-4 md:mr-2" />
                  <span className="hidden md:inline">Voir le site</span>
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleSignOut} className="h-8 md:h-9">
                <LogOut className="w-3 h-3 md:w-4 md:h-4 md:mr-2" />
                <span className="hidden md:inline">Déconnexion</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-3 md:px-4 py-4 md:py-8">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 md:mb-8"
        >
          <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-1 md:mb-2">
            Tableau de bord
          </h2>
          <p className="text-sm md:text-base text-gray-600 truncate">
            Bienvenue, {user?.email}
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-4 md:mb-8">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={item.link}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader className="flex flex-row items-center justify-between pb-2 p-3 md:p-6">
                    <CardTitle className="text-xs md:text-sm font-medium text-gray-600">
                      {item.title}
                    </CardTitle>
                    <div className={`p-1.5 md:p-2 rounded-lg bg-gradient-to-br ${item.color}`}>
                      <item.icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-3 md:p-6 pt-0">
                    <div className="text-2xl md:text-3xl font-bold text-gray-900">
                      {loading ? '...' : item.count}
                    </div>
                    <p className="text-xs md:text-sm text-gray-600 mt-1 group-hover:text-primary transition-colors">
                      Gérer →
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader className="p-3 md:p-6">
              <CardTitle className="flex items-center gap-2 text-sm md:text-base">
                <LayoutDashboard className="w-4 h-4 md:w-5 md:h-5" />
                Actions rapides
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
                {menuItems.map((item) => (
                  <Link key={item.title} to={item.link}>
                    <Button variant="outline" className="w-full justify-start text-xs md:text-sm h-8 md:h-10">
                      <item.icon className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                      Gérer {item.title}
                    </Button>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-4 md:mt-8"
        >
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-start gap-2 md:gap-4">
                <div className="p-2 md:p-3 bg-blue-100 rounded-lg flex-shrink-0">
                  <TrendingUp className="w-4 h-4 md:w-6 md:h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1 text-sm md:text-base">
                    Plateforme opérationnelle
                  </h3>
                  <p className="text-xs md:text-sm text-blue-800">
                    Le backoffice ISKOVIAL est prêt. Vous pouvez maintenant gérer vos propriétés, terrains, véhicules et matériaux depuis cette interface.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
