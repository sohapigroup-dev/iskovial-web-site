import { supabase } from './supabase';

/**
 * Script de test pour vérifier la configuration du Storage Supabase
 *
 * Comment l'utiliser :
 * 1. Importez cette fonction dans un composant admin
 * 2. Appelez-la depuis la console : testStorageConfig()
 * 3. Regardez les résultats dans la console
 */

export const testStorageConfig = async () => {
  console.log('🔍 Test de la configuration Supabase Storage...\n');

  const BUCKET_NAME = 'iskovial-images';

  try {
    // 1. Vérifier si le bucket existe
    console.log('1️⃣ Vérification du bucket...');
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();

    if (bucketsError) {
      console.error('❌ Erreur lors de la récupération des buckets:', bucketsError);
      return;
    }

    const bucket = buckets?.find(b => b.id === BUCKET_NAME);

    if (!bucket) {
      console.error('❌ Bucket "iskovial-images" introuvable !');
      console.log('📝 Solution : Exécutez le fichier supabase-storage-setup.sql dans SQL Editor');
      console.log('   👉 https://supabase.com/dashboard > SQL Editor');
      return;
    }

    console.log('✅ Bucket trouvé:', bucket.name);
    console.log('   - Public:', bucket.public ? '✅ Oui' : '❌ Non');
    console.log('   - ID:', bucket.id);

    // 2. Vérifier l'authentification
    console.log('\n2️⃣ Vérification de l\'authentification...');
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error('❌ Vous n\'êtes pas authentifié !');
      console.log('📝 Solution : Connectez-vous via /admin/login');
      return;
    }

    console.log('✅ Utilisateur authentifié:', user.email);
    console.log('   - ID:', user.id);
    console.log('   - Role:', user.role);

    // 3. Tester l'upload d'un fichier
    console.log('\n3️⃣ Test d\'upload...');
    const testFileName = `test/${Date.now()}-test.txt`;
    const testFile = new Blob(['Test file content'], { type: 'text/plain' });

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(testFileName, testFile);

    if (uploadError) {
      console.error('❌ Erreur lors de l\'upload:', uploadError);
      console.log('   Message:', uploadError.message);
      console.log('   Code:', uploadError.statusCode);

      if (uploadError.message?.includes('policy')) {
        console.log('\n📝 Solution : Les policies de sécurité ne sont pas configurées');
        console.log('   Exécutez le fichier supabase-storage-setup.sql dans SQL Editor');
      }
      return;
    }

    console.log('✅ Upload réussi !');
    console.log('   - Chemin:', uploadData.path);

    // 4. Récupérer l'URL publique
    console.log('\n4️⃣ Test de récupération de l\'URL publique...');
    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(testFileName);

    console.log('✅ URL publique générée:', publicUrl);

    // 5. Nettoyer le fichier de test
    console.log('\n5️⃣ Nettoyage...');
    const { error: deleteError } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([testFileName]);

    if (deleteError) {
      console.warn('⚠️ Impossible de supprimer le fichier de test:', deleteError.message);
    } else {
      console.log('✅ Fichier de test supprimé');
    }

    // Résultat final
    console.log('\n🎉 TOUS LES TESTS SONT PASSÉS !');
    console.log('✅ Votre configuration Supabase Storage est correcte.');
    console.log('✅ Vous pouvez maintenant uploader des images dans le backoffice.');

  } catch (error) {
    console.error('❌ Erreur inattendue:', error);
  }
};

// Rendre la fonction accessible dans la console
if (typeof window !== 'undefined') {
  (window as any).testStorageConfig = testStorageConfig;
}
