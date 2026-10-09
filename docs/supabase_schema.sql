-- ==============================================================================
-- HomeLink: Housing Rental Without Middlemen
-- Supabase PostgreSQL Database Schema & Initial Seed Script
-- Project Ref: rtccdmkzgwkebbxmbfjx
-- ==============================================================================

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    phone VARCHAR(50),
    avatar_url VARCHAR(500),
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 2. PROPERTIES TABLE
CREATE TABLE IF NOT EXISTS properties (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    property_type VARCHAR(50) NOT NULL,
    furnishing VARCHAR(50) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100),
    pincode VARCHAR(20),
    rent_price DOUBLE PRECISION NOT NULL,
    deposit_amount DOUBLE PRECISION,
    bedrooms INTEGER NOT NULL,
    bathrooms INTEGER NOT NULL,
    area_sq_ft INTEGER,
    is_available BOOLEAN DEFAULT TRUE NOT NULL,
    owner_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 3. PROPERTY IMAGES TABLE
CREATE TABLE IF NOT EXISTS property_images (
    property_id BIGINT NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    image_url VARCHAR(1000) NOT NULL
);

-- 4. PROPERTY AMENITIES TABLE
CREATE TABLE IF NOT EXISTS property_amenities (
    property_id BIGINT NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    amenity VARCHAR(100) NOT NULL
);

-- 5. INQUIRIES & VISITS TABLE
CREATE TABLE IF NOT EXISTS inquiries (
    id BIGSERIAL PRIMARY KEY,
    property_id BIGINT NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    tenant_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    message VARCHAR(1000) NOT NULL,
    phone VARCHAR(50),
    preferred_visit_date DATE,
    status VARCHAR(50) DEFAULT 'PENDING' NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 6. FAVORITES TABLE
CREATE TABLE IF NOT EXISTS favorites (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    property_id BIGINT NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT unique_user_property_favorite UNIQUE (user_id, property_id)
);

-- ==============================================================================
-- INITIAL SAMPLE DATA SEEDING (Optional if running Spring Boot DataSeeder)
-- ==============================================================================

-- Seed Demo Users (BCrypt Encrypted Passwords)
-- Password for all demo accounts: 'Owner@123' / 'Tenant@123'
INSERT INTO users (id, name, email, password, role, phone, avatar_url)
VALUES 
(1, 'Rajesh Sharma (Direct Owner)', 'owner@homelink.com', '$2a$10$wN9aL4f5xJ9X0M8tT8aL3.R3R1vJ4E9K9tQ4q1m4e9t9q1m4e9t9q', 'ROLE_OWNER', '+91 98765 43210', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'),
(2, 'Priya Deshmukh (Direct Owner)', 'priya.owner@homelink.com', '$2a$10$wN9aL4f5xJ9X0M8tT8aL3.R3R1vJ4E9K9tQ4q1m4e9t9q1m4e9t9q', 'ROLE_OWNER', '+91 91234 56789', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'),
(3, 'Aarav Mehta (Tenant)', 'tenant@homelink.com', '$2a$10$wN9aL4f5xJ9X0M8tT8aL3.R3R1vJ4E9K9tQ4q1m4e9t9q1m4e9t9q', 'ROLE_TENANT', '+91 98888 77777', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80')
ON CONFLICT (email) DO NOTHING;

-- Seed Sample Properties
INSERT INTO properties (id, title, description, property_type, furnishing, address, city, state, pincode, rent_price, deposit_amount, bedrooms, bathrooms, area_sq_ft, is_available, owner_id)
VALUES 
(1, 'Sunlit 2BHK Near Tech Park & Metro Station', 'Spacious, well-ventilated 2BHK apartment directly from owner. Zero broker fees. Features modular Italian kitchen, high-speed fiber internet ready, 24/7 power backup, and quiet gated community.', 'APARTMENT', 'FURNISHED', '402, Green Glen Heights, Bellandur Outer Ring Rd', 'Bangalore', 'Karnataka', '560103', 32000.0, 64000.0, 2, 2, 1150, TRUE, 1),
(2, 'Modern 1BHK Studio Apartment with Sea Breeze', 'Fully furnished stylish 1BHK studio located in peaceful residential lane. Within walking distance to cafes and suburban railway. Directly listed by owner without brokerage hassle.', 'STUDIO', 'FURNISHED', 'Flat 3B, Palm View Enclave, Bandra West', 'Mumbai', 'Maharashtra', '400050', 42000.0, 84000.0, 1, 1, 650, TRUE, 2),
(3, 'Premium 3BHK Independent Villa with Private Lawn', 'Serene 3-bedroom independent duplex villa surrounded by greenery. Zero broker involved — deal directly with the owner. Ample parking for 2 cars, solar water heating, and pet friendly.', 'VILLA', 'SEMI_FURNISHED', 'Villa 18, Whispering Palms, Baner Pashan Link Rd', 'Pune', 'Maharashtra', '411045', 45000.0, 90000.0, 3, 3, 2200, TRUE, 1)
ON CONFLICT (id) DO NOTHING;

-- Seed Images
INSERT INTO property_images (property_id, image_url)
VALUES 
(1, 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80'),
(1, 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'),
(2, 'https://images.unsplash.com/photo-1502005229762-ae1b464002b4?auto=format&fit=crop&w=1200&q=80'),
(3, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80')
ON CONFLICT DO NOTHING;

-- Seed Amenities
INSERT INTO property_amenities (property_id, amenity)
VALUES 
(1, 'High-Speed WiFi'), (1, '24/7 Power Backup'), (1, 'Covered Car Parking'), (1, 'Modular Kitchen'),
(2, 'Air Conditioning'), (2, 'High-Speed WiFi'), (2, 'Elevator'),
(3, 'Private Garden'), (3, 'Pet Friendly'), (3, 'Solar Water Heater')
ON CONFLICT DO NOTHING;

-- Reset sequence counters
SELECT setval('users_id_seq', (SELECT COALESCE(MAX(id), 1) FROM users));
SELECT setval('properties_id_seq', (SELECT COALESCE(MAX(id), 1) FROM properties));
