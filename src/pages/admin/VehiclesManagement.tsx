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
  Car,
  Search,
} from 'lucide-react';
import { toast } from 'sonner';
import logo from '@/assets/logo-iskovial.png';
import ImageUpload from '@/components/ImageUpload';

interface Vehicle {
  id: string;
  title: string;
  category: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  transaction_type: string;
  rental_price_per_day?: number;
  description: string;
  features: string[];
  mileage: string;
  fuel_type: string;
  transmission: string;
  seats: number;
  color: string;
  condition: string;
  images: string[];
  featured: boolean;
  status: string;
  created_at: string;
  updated_at: string;
}

const VehiclesManagement = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Personnel',
    brand: '',
    model: '',
    year: '',
    price: '',
    transaction_type: 'rent',
    rental_price_per_day: '',
    description: '',
    features: '',
    mileage: '',
    fuel_type: 'Diesel',
    transmission: 'Automatique',
    seats: '',
    color: '',
    condition: 'Occasion',
    images: [] as string[],
    featured: false,
    status: 'available',
  });

  useEffect(() => {
    if (!user) {
      navigate('/iskovial-admin/login');
      return;
    }
    fetchVehicles();
  }, [user, navigate]);

  const fetchVehicles = async () => {
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVehicles(data || []);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      toast.error('Erreur lors du chargement des véhicules');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (vehicle?: Vehicle) => {
    if (vehicle) {
      setSelectedVehicle(vehicle);
      setFormData({
        title: vehicle.title,
        category: vehicle.category,
        brand: vehicle.brand,
        model: vehicle.model,
        year: vehicle.year.toString(),
        price: vehicle.price.toString(),
        transaction_type: vehicle.transaction_type,
        rental_price_per_day: vehicle.rental_price_per_day?.toString() || '',
        description: vehicle.description,
        features: vehicle.features.join(', '),
        mileage: vehicle.mileage,
        fuel_type: vehicle.fuel_type,
        transmission: vehicle.transmission,
        seats: vehicle.seats.toString(),
        color: vehicle.color,
        condition: vehicle.condition,
        images: vehicle.images || [],
        featured: vehicle.featured,
        status: vehicle.status,
      });
    } else {
      setSelectedVehicle(null);
      setFormData({
        title: '',
        category: 'Personnel',
        brand: '',
        model: '',
        year: '',
        price: '',
        transaction_type: 'rent',
        rental_price_per_day: '',
        description: '',
        features: '',
        mileage: '',
        fuel_type: 'Diesel',
        transmission: 'Automatique',
        seats: '',
        color: '',
        condition: 'Occasion',
        images: [],
        featured: false,
        status: 'available',
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const vehicleData = {
      title: formData.title,
      category: formData.category,
      brand: formData.brand,
      model: formData.model,
      year: parseInt(formData.year) || new Date().getFullYear(),
      price: formData.price ? parseInt(formData.price) : 0,
      transaction_type: formData.transaction_type,
      rental_price_per_day: formData.rental_price_per_day ? parseInt(formData.rental_price_per_day) : 0,
      description: formData.description,
      features: formData.features ? formData.features.split(',').map(f => f.trim()).filter(f => f) : [],
      mileage: formData.mileage || '0 km',
      fuel_type: formData.fuel_type,
      transmission: formData.transmission,
      seats: formData.seats ? parseInt(formData.seats) : 5,
      color: formData.color || 'Non spécifié',
      condition: formData.condition,
      images: formData.images,
      featured: formData.featured,
      status: formData.status,
    };

    console.log('Saving vehicle data:', vehicleData);

    try {
      if (selectedVehicle) {
        const { error } = await supabase
          .from('vehicles')
          .update(vehicleData)
          .eq('id', selectedVehicle.id);

        if (error) throw error;
        toast.success('Véhicule mis à jour avec succès');
      } else {
        const { error } = await supabase
          .from('vehicles')
          .insert([vehicleData]);

        if (error) throw error;
        toast.success('Véhicule créé avec succès');
      }

      setIsDialogOpen(false);
      fetchVehicles();
    } catch (error: any) {
      console.error('Error saving vehicle:', error);
      toast.error(`Erreur: ${error.message || 'Erreur lors de l\'enregistrement'}`);
    }
  };

  const handleDelete = async () => {
    if (!selectedVehicle) return;

    try {
      const { error } = await supabase
        .from('vehicles')
        .delete()
        .eq('id', selectedVehicle.id);

      if (error) throw error;
      toast.success('Véhicule supprimé avec succès');
      setIsDeleteDialogOpen(false);
      fetchVehicles();
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-3 md:px-4 py-3 md:py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 md:gap-4 min-w-0">
              <Link to="/iskovial-admin/dashboard">
                <Button variant="ghost" size="sm" className="h-8 md:h-9 px-2 md:px-3">
                  <ArrowLeft className="w-4 h-4 md:mr-2" />
                  <span className="hidden md:inline">Retour</span>
                </Button>
              </Link>
              <img src={logo} alt="ISKOVIAL" className="h-8 md:h-10 rounded-xl flex-shrink-0" />
              <div className="min-w-0">
                <h1 className="text-sm md:text-xl font-bold text-gray-900 truncate">
                  Gestion des Véhicules
                </h1>
              </div>
            </div>

            <Button onClick={() => handleOpenDialog()} size="sm" className="h-8 md:h-9 flex-shrink-0">
              <Plus className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">Nouveau Véhicule</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-3 md:px-4 py-4 md:py-8">
        <Card>
          <CardHeader className="p-3 md:p-6">
            <CardTitle className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm md:text-base">
                <Car className="w-4 h-4 md:w-5 md:h-5" />
                Véhicules ({filteredVehicles.length})
              </div>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-9 text-sm"
                />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 md:p-6">
            {loading ? (
              <div className="text-center py-8">Chargement...</div>
            ) : filteredVehicles.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Aucun véhicule trouvé
              </div>
            ) : (
              <>
                {/* Mobile: Card view */}
                <div className="md:hidden space-y-3">
                  {filteredVehicles.map((vehicle) => (
                    <div key={vehicle.id} className="border rounded-lg p-3 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <h3 className="font-medium text-sm truncate">{vehicle.title}</h3>
                          {vehicle.featured && (
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                              Featured
                            </span>
                          )}
                        </div>
                        <span className={`px-2 py-0.5 rounded text-xs flex-shrink-0 ${
                          vehicle.status === 'available'
                            ? 'bg-green-100 text-green-800'
                            : vehicle.status === 'sold'
                            ? 'bg-red-100 text-red-800'
                            : vehicle.status === 'rented'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {vehicle.status === 'available' ? 'Disponible' :
                           vehicle.status === 'sold' ? 'Vendu' :
                           vehicle.status === 'rented' ? 'Loué' : 'Réservé'}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                        <div><span className="font-medium">Catégorie:</span> {vehicle.category}</div>
                        <div><span className="font-medium">Année:</span> {vehicle.year}</div>
                        <div className="col-span-2"><span className="font-medium">Marque:</span> {vehicle.brand} {vehicle.model}</div>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="font-bold text-primary text-sm">{vehicle.price.toLocaleString()} FCFA</span>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleOpenDialog(vehicle)}
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => {
                              setSelectedVehicle(vehicle);
                              setIsDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 className="w-3.5 h-3.5 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop: Table view */}
                <div className="hidden md:block overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Titre</TableHead>
                        <TableHead>Catégorie</TableHead>
                        <TableHead>Marque</TableHead>
                        <TableHead>Année</TableHead>
                        <TableHead>Prix</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredVehicles.map((vehicle) => (
                        <TableRow key={vehicle.id}>
                          <TableCell className="font-medium">
                            {vehicle.title}
                            {vehicle.featured && (
                              <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                                Featured
                              </span>
                            )}
                          </TableCell>
                          <TableCell>{vehicle.category}</TableCell>
                          <TableCell>{vehicle.brand}</TableCell>
                          <TableCell>{vehicle.year}</TableCell>
                          <TableCell>{vehicle.price.toLocaleString()} FCFA</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded text-xs ${
                              vehicle.status === 'available'
                                ? 'bg-green-100 text-green-800'
                                : vehicle.status === 'sold'
                                ? 'bg-red-100 text-red-800'
                                : vehicle.status === 'rented'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-orange-100 text-orange-800'
                            }`}>
                              {vehicle.status === 'available' ? 'Disponible' :
                               vehicle.status === 'sold' ? 'Vendu' :
                               vehicle.status === 'rented' ? 'Loué' : 'Réservé'}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleOpenDialog(vehicle)}
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedVehicle(vehicle);
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
              </>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedVehicle ? 'Modifier' : 'Nouveau'} Véhicule
            </DialogTitle>
            <DialogDescription>
              Remplissez les informations du véhicule
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
                <Label htmlFor="category">Catégorie *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Personnel">Personnel</SelectItem>
                    <SelectItem value="Camion">Camion</SelectItem>
                    <SelectItem value="Car">Car</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="brand">Marque *</Label>
                <Input
                  id="brand"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="model">Modèle *</Label>
                <Input
                  id="model"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="year">Année *</Label>
                <Input
                  id="year"
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="transaction_type">Type de transaction *</Label>
                <Select value={formData.transaction_type} onValueChange={(value) => setFormData({ ...formData, transaction_type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rent">Location</SelectItem>
                    <SelectItem value="sale">Vente</SelectItem>
                    <SelectItem value="both">Vente et Location</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(formData.transaction_type === 'rent' || formData.transaction_type === 'both') && (
                <div>
                  <Label htmlFor="rental_price_per_day">Prix location/jour (FCFA) *</Label>
                  <Input
                    id="rental_price_per_day"
                    type="number"
                    value={formData.rental_price_per_day}
                    onChange={(e) => setFormData({ ...formData, rental_price_per_day: e.target.value })}
                    required
                  />
                </div>
              )}

              {(formData.transaction_type === 'sale' || formData.transaction_type === 'both') && (
                <div>
                  <Label htmlFor="price">Prix de vente (FCFA) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>
              )}

              <div>
                <Label htmlFor="fuel_type">Carburant *</Label>
                <Select value={formData.fuel_type} onValueChange={(value) => setFormData({ ...formData, fuel_type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Essence">Essence</SelectItem>
                    <SelectItem value="Diesel">Diesel</SelectItem>
                    <SelectItem value="Électrique">Électrique</SelectItem>
                    <SelectItem value="Hybride">Hybride</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="transmission">Transmission *</Label>
                <Select value={formData.transmission} onValueChange={(value) => setFormData({ ...formData, transmission: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Manuelle">Manuelle</SelectItem>
                    <SelectItem value="Automatique">Automatique</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="mileage">Kilométrage</Label>
                <Input
                  id="mileage"
                  value={formData.mileage}
                  onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                  placeholder="ex: 50 000 km"
                />
              </div>

              <div>
                <Label htmlFor="seats">Places</Label>
                <Input
                  id="seats"
                  type="number"
                  value={formData.seats}
                  onChange={(e) => setFormData({ ...formData, seats: e.target.value })}
                  placeholder="ex: 5"
                />
              </div>

              <div>
                <Label htmlFor="color">Couleur</Label>
                <Input
                  id="color"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  placeholder="ex: Noir"
                />
              </div>

              <div>
                <Label htmlFor="condition">État *</Label>
                <Select value={formData.condition} onValueChange={(value) => setFormData({ ...formData, condition: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Neuf">Neuf</SelectItem>
                    <SelectItem value="Occasion">Occasion</SelectItem>
                  </SelectContent>
                </Select>
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
                    <SelectItem value="rented">Loué</SelectItem>
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
                <Label htmlFor="features">Caractéristiques (séparées par des virgules)</Label>
                <Input
                  id="features"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  placeholder="Climatisation, GPS, etc."
                />
              </div>

              <div className="col-span-2">
                <ImageUpload
                  images={formData.images}
                  onImagesChange={(images) => setFormData({ ...formData, images })}
                  folder="vehicles"
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
                {selectedVehicle ? 'Mettre à jour' : 'Créer'}
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
              Êtes-vous sûr de vouloir supprimer "{selectedVehicle?.title}" ?
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

export default VehiclesManagement;
