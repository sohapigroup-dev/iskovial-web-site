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
  Package,
  Search,
} from 'lucide-react';
import { toast } from 'sonner';
import logo from '@/assets/logo-iskovial.png';
import ImageUpload from '@/components/ImageUpload';

interface Material {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  description: string;
  image?: string;
  in_stock: boolean;
  stock_quantity: number;
  created_at: string;
  updated_at: string;
}

const MaterialsManagement = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Ciment',
    price: '',
    unit: '',
    description: '',
    image: [] as string[],
    in_stock: true,
    stock_quantity: '',
  });

  useEffect(() => {
    if (!user) {
      navigate('/iskovial-admin/login');
      return;
    }
    fetchMaterials();
  }, [user, navigate]);

  const fetchMaterials = async () => {
    try {
      const { data, error } = await supabase
        .from('materials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMaterials(data || []);
    } catch (error) {
      console.error('Error fetching materials:', error);
      toast.error('Erreur lors du chargement des matériaux');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (material?: Material) => {
    if (material) {
      setSelectedMaterial(material);
      setFormData({
        name: material.name,
        category: material.category,
        price: material.price.toString(),
        unit: material.unit,
        description: material.description,
        image: material.image ? [material.image] : [],
        in_stock: material.in_stock,
        stock_quantity: material.stock_quantity.toString(),
      });
    } else {
      setSelectedMaterial(null);
      setFormData({
        name: '',
        category: 'Ciment',
        price: '',
        unit: '',
        description: '',
        image: [],
        in_stock: true,
        stock_quantity: '',
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const materialData = {
      name: formData.name,
      category: formData.category,
      price: parseInt(formData.price),
      unit: formData.unit,
      description: formData.description,
      image: formData.image.length > 0 ? formData.image[0] : null,
      in_stock: formData.in_stock,
      stock_quantity: parseInt(formData.stock_quantity),
    };

    try {
      if (selectedMaterial) {
        const { error } = await supabase
          .from('materials')
          .update(materialData)
          .eq('id', selectedMaterial.id);

        if (error) throw error;
        toast.success('Matériau mis à jour avec succès');
      } else {
        const { error } = await supabase
          .from('materials')
          .insert([materialData]);

        if (error) throw error;
        toast.success('Matériau créé avec succès');
      }

      setIsDialogOpen(false);
      fetchMaterials();
    } catch (error) {
      console.error('Error saving material:', error);
      toast.error('Erreur lors de l\'enregistrement');
    }
  };

  const handleDelete = async () => {
    if (!selectedMaterial) return;

    try {
      const { error } = await supabase
        .from('materials')
        .delete()
        .eq('id', selectedMaterial.id);

      if (error) throw error;
      toast.success('Matériau supprimé avec succès');
      setIsDeleteDialogOpen(false);
      fetchMaterials();
    } catch (error) {
      console.error('Error deleting material:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  const filteredMaterials = materials.filter(material =>
    material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.category.toLowerCase().includes(searchTerm.toLowerCase())
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
                  Gestion des Matériaux
                </h1>
              </div>
            </div>

            <Button onClick={() => handleOpenDialog()}>
              <Plus className="w-4 h-4 mr-2" />
              Nouveau Matériau
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
                <Package className="w-5 h-5" />
                Matériaux ({filteredMaterials.length})
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
            ) : filteredMaterials.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Aucun matériau trouvé
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Catégorie</TableHead>
                      <TableHead>Prix</TableHead>
                      <TableHead>Unité</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Disponibilité</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMaterials.map((material) => (
                      <TableRow key={material.id}>
                        <TableCell className="font-medium">
                          {material.name}
                        </TableCell>
                        <TableCell>{material.category}</TableCell>
                        <TableCell>{material.price.toLocaleString()} FCFA</TableCell>
                        <TableCell>{material.unit}</TableCell>
                        <TableCell>{material.stock_quantity}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded text-xs ${
                            material.in_stock
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {material.in_stock ? 'En stock' : 'Rupture'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleOpenDialog(material)}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedMaterial(material);
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
              {selectedMaterial ? 'Modifier' : 'Nouveau'} Matériau
            </DialogTitle>
            <DialogDescription>
              Remplissez les informations du matériau
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="name">Nom *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Catégorie *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ciment">Ciment</SelectItem>
                    <SelectItem value="Briques">Briques</SelectItem>
                    <SelectItem value="Fer">Fer</SelectItem>
                    <SelectItem value="Sable">Sable</SelectItem>
                    <SelectItem value="Gravier">Gravier</SelectItem>
                    <SelectItem value="Peinture">Peinture</SelectItem>
                    <SelectItem value="Autre">Autre</SelectItem>
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
                <Label htmlFor="unit">Unité *</Label>
                <Input
                  id="unit"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  placeholder="ex: sac, tonne, m³"
                  required
                />
              </div>

              <div>
                <Label htmlFor="stock_quantity">Quantité en stock *</Label>
                <Input
                  id="stock_quantity"
                  type="number"
                  value={formData.stock_quantity}
                  onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                  required
                />
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
                  images={formData.image}
                  onImagesChange={(images) => setFormData({ ...formData, image: images })}
                  folder="materials"
                  maxImages={5}
                />
              </div>

              <div className="col-span-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="in_stock"
                  checked={formData.in_stock}
                  onChange={(e) => setFormData({ ...formData, in_stock: e.target.checked })}
                  className="rounded"
                />
                <Label htmlFor="in_stock" className="cursor-pointer">
                  En stock
                </Label>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Annuler
              </Button>
              <Button type="submit">
                {selectedMaterial ? 'Mettre à jour' : 'Créer'}
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
              Êtes-vous sûr de vouloir supprimer "{selectedMaterial?.name}" ?
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

export default MaterialsManagement;
