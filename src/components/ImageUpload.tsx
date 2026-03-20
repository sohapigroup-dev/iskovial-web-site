import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { uploadImage } from '@/lib/storage';
import { toast } from 'sonner';

interface ImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  folder: 'properties' | 'terrains' | 'vehicles' | 'materials';
  maxImages?: number;
}

const ImageUpload = ({ images, onImagesChange, folder, maxImages = 10 }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Vérifier le nombre maximum d'images
    if (images.length + files.length > maxImages) {
      toast.error(`Vous pouvez uploader maximum ${maxImages} images`);
      return;
    }

    // Vérifier la taille des fichiers (max 45MB par image)
    const oversizedFiles = files.filter(file => file.size > 45 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      toast.error('Certaines images dépassent 45MB');
      return;
    }

    // Vérifier le type de fichier
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const invalidFiles = files.filter(file => !validTypes.includes(file.type));
    if (invalidFiles.length > 0) {
      toast.error('Seuls les fichiers JPG, PNG et WebP sont acceptés');
      return;
    }

    setUploading(true);
    toast.loading(`Upload de ${files.length} image(s)...`);

    try {
      const uploadPromises = files.map(file => uploadImage(file, folder));
      const uploadedUrls = await Promise.all(uploadPromises);

      const successfulUploads = uploadedUrls.filter((url): url is string => url !== null);

      if (successfulUploads.length > 0) {
        onImagesChange([...images, ...successfulUploads]);
        toast.dismiss();
        toast.success(`${successfulUploads.length} image(s) uploadée(s) avec succès`);
      } else {
        toast.dismiss();
        toast.error('Erreur lors de l\'upload des images');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.dismiss();
      toast.error('Erreur lors de l\'upload');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
    toast.success('Image supprimée');
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block">
          Images ({images.length}/{maxImages})
        </label>

        {/* Bouton d'upload */}
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading || images.length >= maxImages}
            className="gap-2"
          >
            <Upload className="w-4 h-4" />
            {uploading ? 'Upload en cours...' : 'Uploader des images'}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        <p className="text-xs text-gray-500 mt-1">
          JPG, PNG ou WebP - Max 45MB par image - {maxImages} images maximum
        </p>
      </div>

      {/* Grille d'images */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((imageUrl, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200">
                <img
                  src={imageUrl}
                  alt={`Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Badge numéro */}
              <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                {index + 1}
              </div>

              {/* Bouton supprimer */}
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Indicateur image principale */}
              {index === 0 && (
                <div className="absolute bottom-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">
                  Image principale
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Message si aucune image */}
      {images.length === 0 && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-500">Aucune image uploadée</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
