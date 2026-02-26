-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: hotel_booking_db
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `booking_rooms`
--

DROP TABLE IF EXISTS `booking_rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking_rooms` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `booking_id` bigint NOT NULL,
  `room_id` bigint NOT NULL,
  `room_price` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_booking_id` (`booking_id`),
  KEY `idx_room_id` (`room_id`),
  CONSTRAINT `booking_rooms_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE CASCADE,
  CONSTRAINT `booking_rooms_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking_rooms`
--

LOCK TABLES `booking_rooms` WRITE;
/*!40000 ALTER TABLE `booking_rooms` DISABLE KEYS */;
INSERT INTO `booking_rooms` VALUES (1,1,2,3500.00,'2026-02-26 07:00:03'),(2,1,2,3500.00,'2026-02-26 10:25:11'),(3,1,2,3500.00,'2026-02-26 10:25:49');
/*!40000 ALTER TABLE `booking_rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `hotel_id` bigint NOT NULL,
  `booking_reference` varchar(255) NOT NULL,
  `check_in_date` date NOT NULL,
  `check_out_date` date NOT NULL,
  `total_nights` int NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `booking_status` varchar(255) DEFAULT NULL,
  `payment_status` varchar(255) DEFAULT NULL,
  `booking_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `special_requests` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `booking_reference` (`booking_reference`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_hotel_id` (`hotel_id`),
  KEY `idx_booking_ref` (`booking_reference`),
  KEY `idx_check_in` (`check_in_date`),
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (1,1,1,'BK2024-001','2024-03-15','2024-03-17',2,7000.00,'CONFIRMED','PAID','2026-02-26 07:00:03',NULL,'2026-02-26 07:00:03','2026-02-26 07:00:03');
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hotels`
--

DROP TABLE IF EXISTS `hotels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hotels` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `hotel_name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `pincode` varchar(255) DEFAULT NULL,
  `description` text,
  `amenities` text,
  `rating` decimal(2,1) DEFAULT '0.0',
  `image_url` varchar(255) DEFAULT NULL,
  `contact_number` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_location` (`location`),
  KEY `idx_city` (`city`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hotels`
--

LOCK TABLES `hotels` WRITE;
/*!40000 ALTER TABLE `hotels` DISABLE KEYS */;
INSERT INTO `hotels` VALUES (1,'Grand Plaza Hotel','MG Road, Bangalore','123 MG Road','Bangalore','Karnataka','India','560001','Luxury hotel in the heart of Bangalore','WiFi, Pool, Gym, Restaurant, Parking',4.5,NULL,'080-12345678','grand@hotel.com','2026-02-26 07:00:03','2026-02-26 07:00:03'),(2,'Taj Palace','Marine Drive, Mumbai','456 Marine Drive','Mumbai','Maharashtra','India','400001','Premium beachfront hotel','WiFi, Pool, Spa, Restaurant, Bar',4.8,NULL,'022-98765432','taj@hotel.com','2026-02-26 07:00:03','2026-02-26 07:00:03'),(3,'Royal Inn','Connaught Place, Delhi','789 CP Road','Delhi','Delhi','India','110001','Business hotel in central Delhi','WiFi, Conference Room, Restaurant',4.2,NULL,'011-55555555','royal@hotel.com','2026-02-26 07:00:03','2026-02-26 07:00:03'),(4,'Beach Resort','Baga Beach, Goa','321 Beach Road','Goa','Goa','India','403516','Beachside resort with ocean view','WiFi, Beach Access, Pool, Restaurant',4.6,NULL,'0832-123456','beach@resort.com','2026-02-26 07:00:03','2026-02-26 07:00:03'),(5,'Hill View Hotel','Mall Road, Shimla','654 Mall Road','Shimla','Himachal Pradesh','India','171001','Mountain view hotel','WiFi, Heater, Restaurant',4.3,NULL,'0177-987654','hillview@hotel.com','2026-02-26 07:00:03','2026-02-26 07:00:03'),(6,'Grand Plaza Hotel','MG Road, Bangalore','123 MG Road','Bangalore','Karnataka',NULL,'560001','Luxury hotel in the heart of Bangalore','WiFi, Pool, Gym, Restaurant, Parking',4.5,NULL,'080-12345678','grand@hotel.com','2026-02-26 10:25:11','2026-02-26 10:25:11'),(7,'Taj Palace','Marine Drive, Mumbai','456 Marine Drive','Mumbai','Maharashtra',NULL,'400001','Premium beachfront hotel','WiFi, Pool, Spa, Restaurant, Bar',4.8,NULL,'022-98765432','taj@hotel.com','2026-02-26 10:25:11','2026-02-26 10:25:11'),(8,'Royal Inn','Connaught Place, Delhi','789 CP Road','Delhi','Delhi',NULL,'110001','Business hotel in central Delhi','WiFi, Conference Room, Restaurant',4.2,NULL,'011-55555555','royal@hotel.com','2026-02-26 10:25:11','2026-02-26 10:25:11'),(9,'Beach Resort','Baga Beach, Goa','321 Beach Road','Goa','Goa',NULL,'403516','Beachside resort with ocean view','WiFi, Beach Access, Pool, Restaurant',4.6,NULL,'0832-123456','beach@resort.com','2026-02-26 10:25:11','2026-02-26 10:25:11'),(10,'Hill View Hotel','Mall Road, Shimla','654 Mall Road','Shimla','Himachal Pradesh',NULL,'171001','Mountain view hotel','WiFi, Heater, Restaurant',4.3,NULL,'0177-987654','hillview@hotel.com','2026-02-26 10:25:11','2026-02-26 10:25:11'),(11,'Grand Plaza Hotel','MG Road, Bangalore','123 MG Road','Bangalore','Karnataka',NULL,'560001','Luxury hotel in the heart of Bangalore','WiFi, Pool, Gym, Restaurant, Parking',4.5,NULL,'080-12345678','grand@hotel.com','2026-02-26 10:25:49','2026-02-26 10:25:49'),(12,'Taj Palace','Marine Drive, Mumbai','456 Marine Drive','Mumbai','Maharashtra',NULL,'400001','Premium beachfront hotel','WiFi, Pool, Spa, Restaurant, Bar',4.8,NULL,'022-98765432','taj@hotel.com','2026-02-26 10:25:49','2026-02-26 10:25:49'),(13,'Royal Inn','Connaught Place, Delhi','789 CP Road','Delhi','Delhi',NULL,'110001','Business hotel in central Delhi','WiFi, Conference Room, Restaurant',4.2,NULL,'011-55555555','royal@hotel.com','2026-02-26 10:25:49','2026-02-26 10:25:49'),(14,'Beach Resort','Baga Beach, Goa','321 Beach Road','Goa','Goa',NULL,'403516','Beachside resort with ocean view','WiFi, Beach Access, Pool, Restaurant',4.6,NULL,'0832-123456','beach@resort.com','2026-02-26 10:25:49','2026-02-26 10:25:49'),(15,'Hill View Hotel','Mall Road, Shimla','654 Mall Road','Shimla','Himachal Pradesh',NULL,'171001','Mountain view hotel','WiFi, Heater, Restaurant',4.3,NULL,'0177-987654','hillview@hotel.com','2026-02-26 10:25:49','2026-02-26 10:25:49');
/*!40000 ALTER TABLE `hotels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rooms` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `hotel_id` bigint NOT NULL,
  `room_number` varchar(255) NOT NULL,
  `room_type` varchar(255) NOT NULL,
  `bed_type` varchar(255) NOT NULL,
  `price_per_night` decimal(10,2) NOT NULL,
  `max_occupancy` int DEFAULT '2',
  `is_available` tinyint(1) DEFAULT '1',
  `amenities` text,
  `description` text,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_room` (`hotel_id`,`room_number`),
  KEY `idx_hotel_id` (`hotel_id`),
  KEY `idx_room_type` (`room_type`),
  KEY `idx_bed_type` (`bed_type`),
  KEY `idx_price` (`price_per_night`),
  CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (1,1,'101','Deluxe','Single Bed',2500.00,1,1,'TV, AC, WiFi',NULL,NULL,'2026-02-26 07:00:03','2026-02-26 07:00:03'),(2,1,'102','Deluxe','Double Bed',3500.00,2,1,'TV, AC, WiFi',NULL,NULL,'2026-02-26 07:00:03','2026-02-26 07:00:03'),(3,1,'103','Deluxe','Double Bed',3500.00,2,1,'TV, AC, WiFi',NULL,NULL,'2026-02-26 07:00:03','2026-02-26 07:00:03'),(4,1,'201','Suite','Double Bed',5000.00,3,1,'TV, AC, WiFi, Mini Bar',NULL,NULL,'2026-02-26 07:00:03','2026-02-26 07:00:03'),(5,1,'202','Suite','Double Bed',5000.00,3,1,'TV, AC, WiFi, Mini Bar',NULL,NULL,'2026-02-26 07:00:03','2026-02-26 07:00:03'),(6,1,'301','Standard','Single Bed',1500.00,1,1,'TV, AC',NULL,NULL,'2026-02-26 07:00:03','2026-02-26 07:00:03'),(7,1,'302','Standard','Single Bed',1500.00,1,1,'TV, AC',NULL,NULL,'2026-02-26 07:00:03','2026-02-26 07:00:03'),(8,1,'303','Standard','Double Bed',2000.00,2,1,'TV, AC',NULL,NULL,'2026-02-26 07:00:03','2026-02-26 07:00:03'),(9,2,'101','Ocean View','Double Bed',6000.00,2,1,'TV, AC, WiFi, Balcony',NULL,NULL,'2026-02-26 07:00:03','2026-02-26 07:00:03'),(10,2,'102','Ocean View','Double Bed',6000.00,2,1,'TV, AC, WiFi, Balcony',NULL,NULL,'2026-02-26 07:00:03','2026-02-26 07:00:03'),(11,2,'103','Ocean View','Single Bed',4500.00,1,1,'TV, AC, WiFi',NULL,NULL,'2026-02-26 07:00:03','2026-02-26 07:00:03'),(12,2,'201','Presidential Suite','Double Bed',12000.00,4,1,'TV, AC, WiFi, Mini Bar, Jacuzzi',NULL,NULL,'2026-02-26 07:00:03','2026-02-26 07:00:03'),(13,2,'202','Deluxe','Double Bed',5500.00,2,1,'TV, AC, WiFi',NULL,NULL,'2026-02-26 07:00:03','2026-02-26 07:00:03'),(14,3,'101','Business','Single Bed',2200.00,1,1,'TV, AC, WiFi, Desk',NULL,NULL,'2026-02-26 07:00:03','2026-02-26 07:00:03'),(15,3,'102','Business','Double Bed',3200.00,2,1,'TV, AC, WiFi, Desk',NULL,NULL,'2026-02-26 07:00:03','2026-02-26 07:00:03'),(16,3,'103','Business','Double Bed',3200.00,2,1,'TV, AC, WiFi, Desk',NULL,NULL,'2026-02-26 07:00:03','2026-02-26 07:00:03'),(17,3,'201','Executive','Double Bed',4500.00,2,1,'TV, AC, WiFi, Mini Bar',NULL,NULL,'2026-02-26 07:00:03','2026-02-26 07:00:03');
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_email` (`email`),
  KEY `idx_username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'john_doe','john@email.com','password123','John Doe','9876543210','2026-02-26 07:00:03','2026-02-26 07:00:03'),(2,'jane_smith','jane@email.com','password123','Jane Smith','9123456789','2026-02-26 07:00:03','2026-02-26 07:00:03'),(3,'admin','admin@hotel.com','admin123','Admin User','9999999999','2026-02-26 07:00:03','2026-02-26 07:00:03');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'hotel_booking_db'
--

--
-- Dumping routines for database 'hotel_booking_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-26 18:51:16
