-- ==========================================================
-- STAYLUX - SAMPLE SEED DATA
-- This file is auto-run by Spring Boot on startup (H2 mode)
-- ==========================================================

-- Hotels
INSERT INTO hotels (hotel_name, location, address, city, state, country, pincode, description, amenities, rating, image_url, contact_number, email)
VALUES
('The Grand Maharaja Palace', 'South Delhi', '12 Rajpath Marg, Connaught Place', 'New Delhi', 'Delhi', 'India', '110001',
 'A regal five-star experience in the heart of the capital. The Grand Maharaja Palace blends Mughal architecture with modern luxury, offering impeccable service and breathtaking views of the city.',
 'Free WiFi,Swimming Pool,Spa & Wellness,Fine Dining,Rooftop Bar,24/7 Concierge,Airport Shuttle,Valet Parking', 4.8,
 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80', '+91-11-2345-6789', 'reservations@grandmaharaja.in'),

('The Sea Pearl Resort', 'Marine Drive', '7 Marine Drive Boulevard', 'Mumbai', 'Maharashtra', 'India', '400020',
 'Perched along Mumbai''s iconic Marine Drive, The Sea Pearl Resort offers stunning Arabian Sea views with contemporary luxury. Experience the best of the city of dreams in unparalleled comfort.',
 'Sea View Rooms,Infinity Pool,Beach Access,Spa,Multiple Restaurants,Business Center,Kids Club,Free WiFi', 4.7,
 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80', '+91-22-4567-8901', 'stay@seapearlresort.com'),

('Rajputana Heritage Hotel', 'Old City', '1 Palace Road, Near City Palace', 'Jaipur', 'Rajasthan', 'India', '302001',
 'Nestled within a restored 18th-century haveli, Rajputana Heritage Hotel transports you to a golden era of Rajput grandeur. Ornate architecture, traditional art, and warm hospitality await.',
 'Heritage Architecture,Courtyard Pool,Ayurvedic Spa,Cultural Shows,Camel Safari,Rooftop Dining,Free WiFi,Parking', 4.9,
 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80', '+91-141-234-5678', 'info@rajputanaheritage.in'),

('Backwaters Bliss Resort', 'Alleppey Backwaters', 'NH-66, Near KSRTC Boat Jetty', 'Alleppey', 'Kerala', 'India', '688001',
 'Floating amidst the legendary Kerala backwaters, this exclusive eco-resort offers houseboat experiences and private cottages. Surrender to nature''s serenity with world-class amenities.',
 'Houseboat Experience,Private Pool Villas,Ayurvedic Center,Canoe Rides,Organic Restaurant,Yoga,Free WiFi,Airport Transfer', 4.6,
 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80', '+91-477-345-6789', 'book@backwatersbliss.com'),

('The Himalayan Retreat', 'Mall Road', '5 Scandal Point, Mall Road', 'Shimla', 'Himachal Pradesh', 'India', '171001',
 'Perched at 7,000 feet in the Himalayas, this colonial-era retreat offers panoramic mountain views, crisp mountain air, and timeless elegance. A perfect escape from the urban hustle.',
 'Mountain View,Indoor Heated Pool,Bonfire Area,Adventure Sports,Pine Forest Walks,Multi-Cuisine Restaurant,Free WiFi,Helipad', 4.5,
 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80', '+91-177-456-7890', 'stay@himalayanretreat.in'),

('Cyber Park Business Hotel', 'HITEC City', 'Plot 12, Cyber Towers Road, HITEC City', 'Hyderabad', 'Telangana', 'India', '500081',
 'The premium choice for business travelers in Tech City. Ultra-modern facilities, high-speed connectivity, and seamless meeting infrastructure make this the ideal corporate hub in Hyderabad.',
 'Free High-Speed WiFi,Business Center,Conference Rooms,Rooftop Pool,24/7 Gym,Express Laundry,Airport Shuttle,EV Charging', 4.3,
 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80', '+91-40-5678-9012', 'bookings@cyberparkhotel.com');

-- Rooms for Hotel 1 (Grand Maharaja Palace, Delhi)
INSERT INTO rooms (hotel_id, room_number, room_type, bed_type, price_per_night, max_occupancy, is_available, amenities, description, image_url)
VALUES
(1, '101', 'Deluxe Room', 'King', 8500.00, 2, TRUE, 'Smart TV,Mini Bar,Air Conditioning,Safe,Free WiFi,Room Service', 'Spacious deluxe room with a King-size bed, city view, and modern amenities.', 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80'),
(1, '102', 'Deluxe Room', 'Twin', 7800.00, 2, TRUE, 'Smart TV,Mini Bar,Air Conditioning,Safe,Free WiFi,Room Service', 'Comfortable twin room perfect for friends or colleagues.', 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600&q=80'),
(1, '201', 'Superior Suite', 'King', 15000.00, 2, TRUE, 'Smart TV,Mini Bar,Jacuzzi,Lounge Area,Butler Service,Free WiFi,Pillow Menu', 'Elegant superior suite with separate living area and panoramic city views.', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80'),
(1, '301', 'Presidential Suite', 'King', 35000.00, 4, TRUE, 'Smart TV,Full Bar,Private Pool,Butler Service,Gym Access,Private Dining,Panoramic Views', 'The pinnacle of luxury — a sprawling 3-bedroom suite with private pool and 360° city views.', 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=600&q=80');

-- Rooms for Hotel 2 (Sea Pearl Resort, Mumbai)
INSERT INTO rooms (hotel_id, room_number, room_type, bed_type, price_per_night, max_occupancy, is_available, amenities, description, image_url)
VALUES
(2, '101', 'Sea View Room', 'King', 12000.00, 2, TRUE, 'Sea View,Smart TV,Mini Bar,Air Conditioning,Balcony,Free WiFi,Room Service', 'Wake up to breathtaking Arabian Sea views from your private balcony.', 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80'),
(2, '102', 'City View Room', 'Queen', 9500.00, 2, TRUE, 'City View,Smart TV,Mini Bar,Air Conditioning,Free WiFi', 'Modern room with stunning Marine Drive city views.', 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600&q=80'),
(2, '201', 'Sea View Suite', 'King', 22000.00, 2, TRUE, 'Panoramic Sea View,Jacuzzi,Smart TV,Private Bar,Lounge,Butler Service,Free WiFi', 'Luxurious suite with floor-to-ceiling windows overlooking the sea.', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80'),
(2, '301', 'Penthouse Suite', 'King', 48000.00, 4, FALSE, 'Sea View,Private Terrace,Plunge Pool,Bar,Dining Room,Butler,Piano,Panoramic Windows', 'An exclusive penthouse spanning 3000 sq ft with a plunge pool overlooking the Arabian Sea.', 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=600&q=80');

-- Rooms for Hotel 3 (Rajputana Heritage, Jaipur)
INSERT INTO rooms (hotel_id, room_number, room_type, bed_type, price_per_night, max_occupancy, is_available, amenities, description, image_url)
VALUES
(3, '101', 'Heritage Room', 'King', 9000.00, 2, TRUE, 'Heritage Decor,Smart TV,Mini Bar,Courtyard View,Free WiFi,Room Service', 'Ornately decorated heritage room with authentic Rajasthani artwork and furniture.', 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80'),
(3, '102', 'Heritage Room', 'Twin', 8200.00, 2, TRUE, 'Heritage Decor,Smart TV,Mini Bar,Garden View,Free WiFi', 'Twin heritage room with a serene garden view.', 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600&q=80'),
(3, '201', 'Royal Suite', 'King', 20000.00, 2, TRUE, 'Royal Decor,Canopy Bed,Jacuzzi,Private Courtyard,Butler Service,Free WiFi', 'A maharaja-worthy suite with antique furnishings, canopy bed, and private courtyard.', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80'),
(3, '301', 'Maharaja Suite', 'King', 45000.00, 6, TRUE, 'Multiple Rooms,Private Pool,Royal Dining,Elephant Experience,Butler,Antique Decor', 'The legendary Maharaja Suite - a palace within a hotel with private pool and royal dining.', 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=600&q=80');

-- Rooms for Hotel 4 (Backwaters Bliss, Alleppey)
INSERT INTO rooms (hotel_id, room_number, room_type, bed_type, price_per_night, max_occupancy, is_available, amenities, description, image_url)
VALUES
(4, '101', 'Lagoon Cottage', 'King', 11000.00, 2, TRUE, 'Backwater View,Private Deck,Free WiFi,Room Service,AC,Outdoor Shower', 'Romantic lakeside cottage with a private deck overlooking the backwaters.', 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80'),
(4, '102', 'Garden Villa', 'Queen', 8500.00, 2, TRUE, 'Garden View,Plunge Pool,Free WiFi,Outdoor Seating,AC,Ayurvedic Kit', 'Lush garden villa with a private plunge pool nestled amongst tropical flora.', 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600&q=80'),
(4, '201', 'Houseboat Suite', 'King', 25000.00, 2, TRUE, 'On-Water,Private Kitchen,Deck,Canoe,Personal Chef,Butler,Stargazing Deck', 'Exclusive floating houseboat suite for an authentic Kerala backwater experience.', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80');

-- Rooms for Hotel 5 (Himalayan Retreat, Shimla)
INSERT INTO rooms (hotel_id, room_number, room_type, bed_type, price_per_night, max_occupancy, is_available, amenities, description, image_url)
VALUES
(5, '101', 'Mountain View Room', 'King', 7500.00, 2, TRUE, 'Mountain View,Fireplace,Free WiFi,Mini Bar,Balcony,Room Service', 'Cozy room with a roaring fireplace and sweeping Himalayan mountain views.', 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80'),
(5, '102', 'Valley View Room', 'Twin', 6800.00, 2, TRUE, 'Valley View,Free WiFi,Mini Bar,Wooden Decor', 'Traditional wooden room with panoramic valley views.', 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600&q=80'),
(5, '201', 'Alpine Suite', 'King', 18000.00, 2, TRUE, 'Panoramic Mountain View,Private Deck,Fireplace,Jacuzzi,Butler,Free WiFi', 'Luxurious suite with 270° mountain views, private deck and outdoor jacuzzi.', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80'),
(5, '301', 'Colonial Penthouse', 'King', 28000.00, 4, TRUE, 'Heritage,Multiple Bedrooms,Terrace,Fireplace,Private Dining,Chef on Request', 'A restored colonial-era penthouse with multiple rooms and private mountain terrace.', 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=600&q=80');

-- Rooms for Hotel 6 (Cyber Park, Hyderabad)
INSERT INTO rooms (hotel_id, room_number, room_type, bed_type, price_per_night, max_occupancy, is_available, amenities, description, image_url)
VALUES
(6, '101', 'Executive Room', 'King', 6500.00, 1, TRUE, 'Free WiFi,Work Desk,Smart TV,AC,Mini Bar,Coffee Maker,Room Service', 'A sleek executive room designed for productivity with a dedicated work area.', 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80'),
(6, '102', 'Business Twin', 'Twin', 6000.00, 2, TRUE, 'Free WiFi,Dual Work Desks,Smart TV,AC,Mini Bar,Room Service', 'Twin room ideal for business colleagues sharing accommodation.', 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600&q=80'),
(6, '201', 'Club Suite', 'King', 13500.00, 2, TRUE, 'Club Lounge Access,Free WiFi,Meeting Setup,Smart TV,Butler,Mini Bar,City View', 'Premium suite with Club Lounge access and full business amenities.', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80');
