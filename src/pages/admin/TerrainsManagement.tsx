import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  MapPin,
  Search,
} from 'lucide-react';
import { toast } from 'sonner';
import logo from '@/assets/logo-iskovial.png';
import ImageUpload from '@/components/ImageUpload';

interface Terrain {
  id: string;
  title: string;
  location: string;
  surface: number;
  price: number;
  zoning: string;
  description: string;
  image?: string;
  images: string[];
  featured: boolean;
  status: string;
  created_at: string;
  updated_at: string;
}

const TerrainsManagement = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [terrains, setTerrains] = useState<Terrain[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTerrain, setSelectedTerrain] = useState<Terrain | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    surface: '',
    price: '',
    zoning: 'Résidentiel',
    description: '',
    image: '',
    images: [] as string[],
    featured: false,
    status: 'available',
  });

  useEffect(() => {
    if (!user) {
      navigate('/iskovial-admin/login');
      return;
    }
    fetchTerrains();
  }, [user, navigate]);

  const fetchTerrains = async () => {
    try {
      const { data, error } = await supabase
        .from('terrains')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTerrains(data || []);
    } catch (error) {
      console.error('Error fetching terrains:', error);
      toast.error('Erreur lors du chargement des terrains');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (terrain?: Terrain) => {
    if (terrain) {
      setSelectedTerrain(terrain);
      setFormData({
        title: terrain.title,
        location: terrain.location,
        surface: terrain.surface.toString(),
        price: terrain.price.toString(),
        zoning: terrain.zoning,
        description: terrain.description,
        image: terrain.image || '',
        images: terrain.images || [],
        featured: terrain.featured,
        status: terrain.status,
      });
    } else {
      setSelectedTerrain(null);
      setFormData({
        title: '',
        location: '',
        surface: '',
        price: '',
        zoning: 'Résidentiel',
        description: '',
        image: '',
        images: [],
        featured: false,
        status: 'available',
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const terrainData = {
      title: formData.title,
      location: formData.location,
      surface: parseInt(formData.surface),
      price: parseInt(formData.price),
      zoning: formData.zoning,
      description: formData.description,
      image: formData.images.length > 0 ? formData.images[0] : null,
      images: formData.images,
      featured: formData.featured,
      status: formData.status,
    };

    try {
      if (selectedTerrain) {
        const { error } = await supabase
          .from('terrains')
          .update(terrainData)
          .eq('id', selectedTerrain.id);

        if (error) throw error;
        toast.success('Terrain mis à jour avec succès');
      } else {
        const { error } = await supabase
          .from('terrains')
          .insert([terrainData]);

        if (error) throw error;
        toast.success('Terrain créé avec succès');
      }

      setIsDialogOpen(false);
      fetchTerrains();
    } catch (error) {
      console.error('Error saving terrain:', error);
      toast.error('Erreur lors de l\'enregistrement');
    }
  };

  const handleDelete = async () => {
    if (!selectedTerrain) return;

    try {
      const { error } = await supabase
        .from('terrains')
        .delete()
        .eq('id', selectedTerrain.id);

      if (error) throw error;
      toast.success('Terrain supprimé avec succès');
      setIsDeleteDialogOpen(false);
      fetchTerrains();
    } catch (error) {
      console.error('Error deleting terrain:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  const filteredTerrains = terrains.filter(terrain =>
    terrain.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    terrain.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/iskovial-admin/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour
                </Button>
              </Link>
              <img src={logo} alt="ISKOVIAL" className="h-10 rounded-xl" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Gestion des Terrains
                </h1>
              </div>
            </div>

            <Button onClick={() => handleOpenDialog()}>
              <Plus className="w-4 h-4 mr-2" />
              Nouveau Terrain
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Terrains ({filteredTerrains.length})
              </div>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Chargement...</div>
            ) : filteredTerrains.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Aucun terrain trouvé
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Titre</TableHead>
                      <TableHead>Zonage</TableHead>
                      <TableHead>Prix</TableHead>
                      <TableHead>Localisation</TableHead>
                      <TableHead>Surface</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTerrains.map((terrain) => (
                      <TableRow key={terrain.id}>
                        <TableCell className="font-medium">
                          {terrain.title}
                          {terrain.featured && (
                            <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                              Featured
                            </span>
                          )}
                        </TableCell>
                        <TableCell>{terrain.zoning}</TableCell>
                        <TableCell>{terrain.price.toLocaleString()} FCFA</TableCell>
                        <TableCell>{terrain.location}</TableCell>
                        <TableCell>{terrain.surface} m²</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded text-xs ${
                            terrain.status === 'available'
                              ? 'bg-green-100 text-green-800'
                              : terrain.status === 'sold'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-orange-100 text-orange-800'
                          }`}>
                            {terrain.status === 'available' ? 'Disponible' :
                             terrain.status === 'sold' ? 'Vendu' : 'Réservé'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleOpenDialog(terrain)}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedTerrain(terrain);
                                setIsDeleteDialogOpen(true);
                              }}
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedTerrain ? 'Modifier' : 'Nouveau'} Terrain
            </DialogTitle>
            <DialogDescription>
              Remplissez les informations du terrain
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="title">Titre *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="zoning">Zonage *</Label>
                <Select value={formData.zoning} onValueChange={(value) => setFormData({ ...formData, zoning: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Résidentiel">Résidentiel</SelectItem>
                    <SelectItem value="Commercial">Commercial</SelectItem>
                    <SelectItem value="Industriel">Industriel</SelectItem>
                    <SelectItem value="Agricole">Agricole</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="price">Prix (FCFA) *</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="location">Localisation *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="surface">Surface (m²) *</Label>
                <Input
                  id="surface"
                  type="number"
                  value={formData.surface}
                  onChange={(e) => setFormData({ ...formData, surface: e.target.value })}
                  required
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="status">Statut *</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Disponible</SelectItem>
                    <SelectItem value="sold">Vendu</SelectItem>
                    <SelectItem value="reserved">Réservé</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div className="col-span-2">
                <ImageUpload
                  images={formData.images}
                  onImagesChange={(images) => setFormData({ ...formData, images })}
                  folder="terrains"
                  maxImages={10}
                />
              </div>

              <div className="col-span-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="rounded"
                />
                <Label htmlFor="featured" className="cursor-pointer">
                  Mettre en avant sur la page d'accueil
                </Label>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Annuler
              </Button>
              <Button type="submit">
                {selectedTerrain ? 'Mettre à jour' : 'Créer'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer "{selectedTerrain?.title}" ?
              Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TerrainsManagement;
