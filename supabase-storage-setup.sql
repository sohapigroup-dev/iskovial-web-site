-- -- ============================================
-- -- CONFIGURATION SUPABASE STORAGE
-- -- À exécuter dans l'éditeur SQL de Supabase
-- -- ============================================

-- -- Créer le bucket pour les images
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('iskovial-images', 'iskovial-images', true)
-- ON CONFLICT (id) DO NOTHING;


-- -- Permettre à tout le monde de lire les images (lecture publique)
-- CREATE POLICY "Public Access"
-- ON storage.objects FOR SELECT
-- USING (bucket_id = 'iskovial-images');

-- -- Permettre aux utilisateurs authentifiés d'uploader des images
-- CREATE POLICY "Authenticated users can upload images"
-- ON storage.objects FOR INSERT
-- WITH CHECK (
--   bucket_id = 'iskovial-images'
--   AND auth.role() = 'authenticated'
-- );

-- -- Permettre aux utilisateurs authentifiés de mettre à jour leurs images
-- CREATE POLICY "Authenticated users can update images"
-- ON storage.objects FOR UPDATE
-- USING (
--   bucket_id = 'iskovial-images'
--   AND auth.role() = 'authenticated'
-- );

-- -- Permettre aux utilisateurs authentifiés de supprimer des images
-- CREATE POLICY "Authenticated users can delete images"
-- ON storage.objects FOR DELETE
-- USING (
--   bucket_id = 'iskovial-images'
--   AND auth.role() = 'authenticated'
-- );
