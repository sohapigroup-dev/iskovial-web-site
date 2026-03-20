-- -- ============================================
-- -- SCHEMA SQL POUR ISKOVIAL PLATFORM
-- -- À exécuter dans l'éditeur SQL de Supabase
-- -- ============================================

-- -- Enable UUID extension
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -- ============================================
-- -- TABLE: properties (Propriétés)
-- -- ============================================
-- CREATE TABLE IF NOT EXISTS properties (
--   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
--   title TEXT NOT NULL,
--   type TEXT NOT NULL CHECK (type IN ('Maison', 'Appartement', 'Villa', 'Studio', 'Duplex')),
--   price BIGINT NOT NULL,
--   location TEXT NOT NULL,
--   surface INTEGER NOT NULL,
--   rooms INTEGER,
--   bedrooms INTEGER NOT NULL,
--   bathrooms INTEGER NOT NULL,
--   description TEXT NOT NULL,
--   features TEXT[] NOT NULL DEFAULT '{}',
--   images TEXT[] NOT NULL DEFAULT '{}',
--   featured BOOLEAN DEFAULT false,
--   status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'sold', 'reserved')),
--   transaction_type TEXT NOT NULL DEFAULT 'sale' CHECK (transaction_type IN ('sale', 'rent')),
--   created_at TIMESTAMPTZ DEFAULT NOW(),
--   updated_at TIMESTAMPTZ DEFAULT NOW()
-- );

-- -- ============================================
-- -- TABLE: terrains (Terrains)
-- -- ============================================
-- CREATE TABLE IF NOT EXISTS terrains (
--   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
--   title TEXT NOT NULL,
--   location TEXT NOT NULL,
--   surface INTEGER NOT NULL,
--   price BIGINT NOT NULL,
--   zoning TEXT NOT NULL CHECK (zoning IN ('Résidentiel', 'Commercial', 'Industriel', 'Agricole')),
--   description TEXT NOT NULL,
--   image TEXT,
--   images TEXT[] DEFAULT '{}',
--   featured BOOLEAN DEFAULT false,
--   status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'sold', 'reserved')),
--   created_at TIMESTAMPTZ DEFAULT NOW(),
--   updated_at TIMESTAMPTZ DEFAULT NOW()
-- );

-- -- ============================================
-- -- TABLE: vehicles (Véhicules)
-- -- ============================================
-- CREATE TABLE IF NOT EXISTS vehicles (
--   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
--   title TEXT NOT NULL,
--   category TEXT NOT NULL CHECK (category IN ('Personnel', 'Camion', 'Car')),
--   brand TEXT NOT NULL,
--   model TEXT NOT NULL,
--   year INTEGER NOT NULL,
--   price BIGINT NOT NULL,
--   transaction_type TEXT NOT NULL CHECK (transaction_type IN ('sale', 'rent', 'both')),
--   rental_price_per_day BIGINT,
--   description TEXT NOT NULL,
--   features TEXT[] NOT NULL DEFAULT '{}',
--   mileage TEXT NOT NULL,
--   fuel_type TEXT NOT NULL CHECK (fuel_type IN ('Essence', 'Diesel', 'Électrique', 'Hybride')),
--   transmission TEXT NOT NULL CHECK (transmission IN ('Manuelle', 'Automatique')),
--   seats INTEGER NOT NULL,
--   color TEXT NOT NULL,
--   condition TEXT NOT NULL CHECK (condition IN ('Neuf', 'Occasion')),
--   images TEXT[] NOT NULL DEFAULT '{}',
--   featured BOOLEAN DEFAULT false,
--   status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'sold', 'rented', 'reserved')),
--   created_at TIMESTAMPTZ DEFAULT NOW(),
--   updated_at TIMESTAMPTZ DEFAULT NOW()
-- );

-- -- ============================================
-- -- TABLE: materials (Matériaux de construction)
-- -- ============================================
-- CREATE TABLE IF NOT EXISTS materials (
--   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
--   name TEXT NOT NULL,
--   category TEXT NOT NULL CHECK (category IN ('Ciment', 'Briques', 'Fer', 'Sable', 'Gravier', 'Peinture', 'Autre')),
--   price BIGINT NOT NULL,
--   unit TEXT NOT NULL,
--   description TEXT NOT NULL,
--   image TEXT,
--   in_stock BOOLEAN DEFAULT true,
--   stock_quantity INTEGER DEFAULT 0,
--   created_at TIMESTAMPTZ DEFAULT NOW(),
--   updated_at TIMESTAMPTZ DEFAULT NOW()
-- );

-- -- ============================================
-- -- ENABLE ROW LEVEL SECURITY (RLS)
-- -- ============================================
-- ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE terrains ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE materials ENABLE ROW LEVEL SECURITY;

-- -- ============================================
-- -- RLS POLICIES - Lecture publique
-- -- ============================================

-- -- Properties: Tout le monde peut lire
-- CREATE POLICY "Public can read properties" ON properties
--   FOR SELECT USING (true);

-- -- Terrains: Tout le monde peut lire
-- CREATE POLICY "Public can read terrains" ON terrains
--   FOR SELECT USING (true);

-- -- Vehicles: Tout le monde peut lire
-- CREATE POLICY "Public can read vehicles" ON vehicles
--   FOR SELECT USING (true);

-- -- Materials: Tout le monde peut lire
-- CREATE POLICY "Public can read materials" ON materials
--   FOR SELECT USING (true);

-- -- ============================================
-- -- RLS POLICIES - Écriture (Admins seulement)
-- -- ============================================

-- -- Properties: Admins peuvent tout faire
-- CREATE POLICY "Authenticated can insert properties" ON properties
--   FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- CREATE POLICY "Authenticated can update properties" ON properties
--   FOR UPDATE USING (auth.role() = 'authenticated');

-- CREATE POLICY "Authenticated can delete properties" ON properties
--   FOR DELETE USING (auth.role() = 'authenticated');

-- -- Terrains: Admins peuvent tout faire
-- CREATE POLICY "Authenticated can insert terrains" ON terrains
--   FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- CREATE POLICY "Authenticated can update terrains" ON terrains
--   FOR UPDATE USING (auth.role() = 'authenticated');

-- CREATE POLICY "Authenticated can delete terrains" ON terrains
--   FOR DELETE USING (auth.role() = 'authenticated');

-- -- Vehicles: Admins peuvent tout faire
-- CREATE POLICY "Authenticated can insert vehicles" ON vehicles
--   FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- CREATE POLICY "Authenticated can update vehicles" ON vehicles
--   FOR UPDATE USING (auth.role() = 'authenticated');

-- CREATE POLICY "Authenticated can delete vehicles" ON vehicles
--   FOR DELETE USING (auth.role() = 'authenticated');

-- -- Materials: Admins peuvent tout faire
-- CREATE POLICY "Authenticated can insert materials" ON materials
--   FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- CREATE POLICY "Authenticated can update materials" ON materials
--   FOR UPDATE USING (auth.role() = 'authenticated');

-- CREATE POLICY "Authenticated can delete materials" ON materials
--   FOR DELETE USING (auth.role() = 'authenticated');

-- -- ============================================
-- -- TRIGGERS - Updated_at automatique
-- -- ============================================

-- CREATE OR REPLACE FUNCTION update_updated_at_column()
-- RETURNS TRIGGER AS $$
-- BEGIN
--    NEW.updated_at = NOW();
--    RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

-- CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON properties
--   FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- CREATE TRIGGER update_terrains_updated_at BEFORE UPDATE ON terrains
--   FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- CREATE TRIGGER update_vehicles_updated_at BEFORE UPDATE ON vehicles
--   FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- CREATE TRIGGER update_materials_updated_at BEFORE UPDATE ON materials
--   FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- -- ============================================
-- -- INDEX pour améliorer les performances
-- -- ============================================

-- CREATE INDEX idx_properties_featured ON properties(featured);
-- CREATE INDEX idx_properties_status ON properties(status);
-- CREATE INDEX idx_properties_type ON properties(type);

-- CREATE INDEX idx_terrains_featured ON terrains(featured);
-- CREATE INDEX idx_terrains_status ON terrains(status);
-- CREATE INDEX idx_terrains_zoning ON terrains(zoning);

-- CREATE INDEX idx_vehicles_featured ON vehicles(featured);
-- CREATE INDEX idx_vehicles_status ON vehicles(status);
-- CREATE INDEX idx_vehicles_category ON vehicles(category);

-- CREATE INDEX idx_materials_category ON materials(category);
-- CREATE INDEX idx_materials_in_stock ON materials(in_stock);
