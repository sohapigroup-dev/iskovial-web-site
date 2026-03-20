import { supabase } from './supabase';

const BUCKET_NAME = 'iskovial-images';

// Helper pour uploader une image
export const uploadImage = async (file: File, folder: 'properties' | 'terrains' | 'vehicles' | 'materials'): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    console.log(`Uploading file: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB) to ${fileName}`);

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Supabase upload error:', error);
      throw error;
    }

    // Obtenir l'URL publique
    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileName);

    console.log(`Upload successful: ${publicUrl}`);
    return publicUrl;
  } catch (error: any) {
    console.error('Error uploading image:', error);
    console.error('Error details:', {
      message: error?.message,
      statusCode: error?.statusCode,
      error: error?.error,
    });
    return null;
  }
};

// Helper pour uploader plusieurs images
export const uploadMultipleImages = async (
  files: File[],
  folder: 'properties' | 'terrains' | 'vehicles' | 'materials'
): Promise<string[]> => {
  const uploadPromises = files.map(file => uploadImage(file, folder));
  const results = await Promise.all(uploadPromises);
  return results.filter((url): url is string => url !== null);
};

// Helper pour supprimer une image
export const deleteImage = async (imageUrl: string): Promise<boolean> => {
  try {
    // Extraire le chemin du fichier depuis l'URL
    const urlParts = imageUrl.split('/');
    const bucketIndex = urlParts.findIndex(part => part === BUCKET_NAME);
    if (bucketIndex === -1) return false;

    const filePath = urlParts.slice(bucketIndex + 1).join('/');

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filePath]);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting image:', error);
    return false;
  }
};
