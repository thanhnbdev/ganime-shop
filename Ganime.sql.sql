-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: shopganime
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `authority`
--

DROP TABLE IF EXISTS `authority`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authority` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `roles_id` (`role_id`),
  CONSTRAINT `roles_id` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authority`
--

LOCK TABLES `authority` WRITE;
/*!40000 ALTER TABLE `authority` DISABLE KEYS */;
INSERT INTO `authority` VALUES (4,3,3),(19,4,3),(22,5,3),(23,7,3),(38,1,2),(41,1,1),(42,11,3),(43,12,3),(44,13,3),(45,3,1),(46,7,2),(47,3,1),(48,8,2),(49,7,1),(50,14,3),(51,15,3),(52,16,3),(53,17,3),(54,18,3),(57,19,3),(58,64,3),(59,65,3),(61,66,3),(62,67,3),(63,68,3),(64,69,3),(65,70,3),(66,71,3),(67,72,3),(68,73,3),(69,74,3),(70,75,3),(71,76,3),(72,77,3),(73,78,3),(74,79,3),(75,80,3),(76,81,3),(77,82,3),(78,83,3),(79,84,3),(80,85,3),(81,86,3),(82,87,3),(83,88,3),(84,89,3),(85,90,3),(86,91,3),(87,92,3),(88,93,3),(89,94,3),(90,95,3),(91,96,3),(92,97,3),(93,98,3),(94,99,3),(95,100,3),(96,101,3),(97,102,3),(98,103,3),(99,104,3),(100,105,3),(101,106,3),(102,93,2);
/*!40000 ALTER TABLE `authority` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `status` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Áo thun Zero Two','Thun Poly ( Thun lạnh ). \n\nHình trên áo là hình in lụa. \nÁo form rộng nhé các bạn, bạn mẫu trong hình 1m65 45kg mặc size M khá rộng.\n\nCác bạn nên nhắn tin chiều cao + cân nặng trước khi đặt hoặc ghi chú trong đơn hàng để shop tư vấn size phù hợp.',1),(2,'Áo thun in hình','Áo thích hợp cho cả nam lẫn nữ.\n\nChất liệu: Cotton 65/35 , mặc thoáng mát.',1),(3,'Áo thun anime Darling ','Áo thích hợp cho cả nam lẫn nữ.\n\nChất liệu: Cotton 65/35 , mặc thoáng mát.\n\nMàu áo: Trắng.\n\nÁo in 1 mặt trước, khổ in A3.\n\nHình in chìm lên áo, không bung tróc/không phai màu khi giặt.',1),(4,'Áo thun anime Bungo Stray Dogs','Áo thích hợp cho cả nam lẫn nữ.\n\nChất liệu: Cotton 65/35 , mặc thoáng mát.\n\nMàu áo: Trắng.\n\nÁo in 1 mặt trước, khổ in A3.\n\nHình in chìm lên áo, không bung tróc/không phai màu khi giặt.',1),(5,'Áo thun anime Kantai Collection','Chất liệu : Thun Cotton. \n\nHình trên áo là hình in lụa. ',1),(6,'Áo thun anime Sword Art Online','Chất liệu : Thun Poly ( Thun lạnh ). \n\nHình trên áo là hình in lụa.',1),(7,'Áo thun Monokuma','Áo có 2 loại vải : Thun cotton và Thun Poly ( Thun lạnh ). \n\nHình trên áo là hình thêu ( bên cánh tay là hình in lụa )',1),(9,'Áo thun anime Chuunibyou','Chất liệu bền đẹp thoải mái khi mặc',1),(11,'Áo thun anime Ansatsu Kyoushitsu','Áo thích hợp cho cả nam lẫn nữ.\n\nChất liệu: Cotton 65/35 , mặc thoáng mát.',1);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `color`
--

DROP TABLE IF EXISTS `color`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `color` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `descriptions` varchar(255) NOT NULL,
  `status` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `color`
--

LOCK TABLES `color` WRITE;
/*!40000 ALTER TABLE `color` DISABLE KEYS */;
INSERT INTO `color` VALUES (1,'Xanh ngọc','#7ed6df',1),(2,'Hồng','#ff7979',1),(3,'Đen xám','#57606f',1),(4,'Xanh dương','#1e90ff',1),(5,'Xanh lá cây','#2ed573',1),(6,'Cam','#ffa502',1),(7,'Xám','#f1f2f6',1),(8,'Tím nhẹ','#a55eea',1),(9,'Vàng','#fff200',1),(10,'Đỏ','#ff3838',1),(11,'Đen','#000000',1);
/*!40000 ALTER TABLE `color` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact`
--

DROP TABLE IF EXISTS `contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `status` int NOT NULL,
  `content` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact`
--

LOCK TABLES `contact` WRITE;
/*!40000 ALTER TABLE `contact` DISABLE KEYS */;
INSERT INTO `contact` VALUES (1,'Nguyễn Văn Nam','namg@gmail.com','Hà Nội','Cộng tác bán hàng',0,'Liên hệ trao đổi hợp tác','032456859'),(2,'Kim Nam','namkim@gmail.com','Sơn Tây, Hà Nội','Liên kết quảng cáo',1,'Liên kết quảng bá sản phẩm','0237547555'),(3,'abc','ac@gmail.com','mn','abc',1,'mn','11111'),(4,'check','check@gmail.com','','check',0,'check','123456789'),(5,'check','check@gmail.com','','check',0,'','123456789'),(6,'check','check@gmail.com','','check',0,'','123456789'),(7,'abc','abc@gmail.com','oke','abc',0,'oke','123456789'),(8,'abc','abc@gmail.com','oke','abc',0,'oke','123456789'),(9,'abc','abc@gmail.com','oke','abc',0,'oke','123456789'),(10,'oke','ok@gmail.com','checkk','okeok',0,'oke','123456789'),(11,'chekc2','chekc2@gmail.com','chekc2','chekc2',0,'chekc2','123456789');
/*!40000 ALTER TABLE `contact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favourite`
--

DROP TABLE IF EXISTS `favourite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favourite` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `u_id` (`user_id`),
  KEY `p_id` (`product_id`),
  CONSTRAINT `p_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `u_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favourite`
--

LOCK TABLES `favourite` WRITE;
/*!40000 ALTER TABLE `favourite` DISABLE KEYS */;
INSERT INTO `favourite` VALUES (2,3,3),(11,2,1),(12,2,3),(15,3,6),(16,3,17),(17,3,18),(18,3,5),(19,5,1),(20,5,3),(25,12,1),(26,1,1),(27,1,9),(28,1,13),(29,17,1),(30,17,9),(31,17,13);
/*!40000 ALTER TABLE `favourite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `content` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `status` int NOT NULL,
  `product_id` int NOT NULL,
  `rate` int NOT NULL,
  `quality` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id2` (`user_id`),
  KEY `product_id3` (`product_id`),
  CONSTRAINT `product_id3` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `user_id2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
INSERT INTO `feedback` VALUES (1,1,'sản phẩm tốt','2023-01-04 00:00:00',1,17,4,'Tốt'),(4,1,'Sản phẩm chất lượng, đúng mô tả.','2023-02-21 23:14:11',0,12,4,'Tốt'),(5,1,'Sản phẩm tốt 5 sao','2023-06-30 18:46:17',0,6,5,'Tuyệt vời'),(6,1,'CHECKKK','2023-07-02 08:30:58',0,5,4,'Tốt'),(7,1,'ok','2023-07-02 22:08:07',0,5,4,'Tốt'),(8,12,'ĐÁNH GIÁ 5 SAO','2023-07-09 08:33:48',0,6,4,'Tốt');
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_detail`
--

DROP TABLE IF EXISTS `order_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_detail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `quantity` int NOT NULL,
  `fee` float NOT NULL,
  `status` int NOT NULL,
  `size` varchar(10) NOT NULL,
  `color` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `order_id` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=191 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_detail`
--

LOCK TABLES `order_detail` WRITE;
/*!40000 ALTER TABLE `order_detail` DISABLE KEYS */;
INSERT INTO `order_detail` VALUES (1,15,7,0,2,'M',''),(2,16,3,0,2,'L',''),(3,17,1,0,3,'S',''),(4,18,1,0,1,'XL',''),(5,19,3,0,3,'L',''),(6,20,1,0,2,'M',''),(7,21,1,0,4,'S',''),(8,22,3,0,4,'M',''),(9,23,4,0,4,'L',''),(10,24,1,0,3,'M',''),(11,25,5,0,2,'L',''),(12,32,3,0,2,'M',''),(13,33,2,0,2,'M',''),(14,34,2,0,2,'XL',''),(15,35,6,0,0,'S',''),(16,36,2,0,2,'XL',''),(19,39,2,0,3,'XL',''),(21,41,9,0,3,'XL',''),(22,42,1,0,3,'M',''),(23,43,3,0,3,'XL',''),(24,44,2,0,3,'S',''),(25,45,1,0,3,'S',''),(26,46,1,0,3,'S',''),(27,47,2,0,3,'XL',''),(28,48,1,0,3,'S',''),(29,49,1,0,3,'S',''),(30,50,1,0,0,'S',''),(31,51,1,0,0,'S',''),(32,52,1,0,0,'S',''),(33,53,1,0,0,'S',''),(34,54,2,0,3,'S',''),(35,55,1,0,3,'M',''),(36,56,1,0,3,'M',''),(37,57,2,0,3,'XL',''),(38,58,1,0,3,'M',''),(39,59,1,0,3,'S',''),(40,60,5,0,3,'M',''),(41,61,1,0,2,'XL',''),(42,62,3,0,1,'XL',''),(43,63,1,0,2,'XL',''),(44,64,1,0,2,'XL',''),(45,65,32,0,2,'L',''),(46,66,1,0,2,'S',''),(47,67,1,0,2,'M',''),(48,68,1,0,2,'XL',''),(49,69,1,0,2,'M',''),(50,70,1,0,2,'XL',''),(51,71,1,0,2,'M',''),(52,72,1,0,2,'L',''),(53,73,1,0,2,'XL',''),(54,74,1,0,2,'M',''),(55,75,1,0,2,'M',''),(56,76,1,0,2,'XL',''),(57,77,1,0,2,'M',''),(58,78,1,0,2,'XL',''),(59,79,1,0,1,'S',''),(60,80,1,0,1,'XL',''),(61,81,1,0,1,'XL',''),(62,82,1,0,1,'S',''),(63,83,1,0,1,'XL',''),(64,84,1,0,1,'S',''),(65,85,1,0,1,'XL',''),(66,86,1,0,1,'XL',''),(67,87,1,0,1,'S',''),(68,88,1,0,1,'M',''),(69,89,1,0,2,'S',''),(70,90,1,0,2,'M',''),(71,91,1,0,2,'XL',''),(72,92,1,0,2,'M',''),(73,93,1,0,2,'L',''),(74,94,1,0,2,'XL',''),(75,95,1,0,2,'L',''),(76,96,1,0,2,'L',''),(77,97,2,0,2,'XL',''),(78,98,1,0,2,'M',''),(79,99,1,0,2,'M',''),(80,100,1,0,2,'XL',''),(81,101,2,0,2,'M',''),(82,102,1,0,2,'L',''),(83,103,1,0,2,'M',''),(84,104,2,0,1,'XL',''),(85,105,2,0,1,'L',''),(86,106,2,0,1,'L',''),(87,107,1,0,1,'XL',''),(88,108,1,0,0,'M',''),(89,109,1,0,0,'L',''),(90,110,2,0,1,'S',''),(91,111,1,0,2,'M',''),(92,112,1,0,1,'XL',''),(93,113,1,0,3,'L',''),(94,114,1,0,3,'XL',''),(95,115,1,0,3,'S',''),(96,116,1,0,3,'S',''),(97,117,3,0,3,'M',''),(98,118,8,0,2,'L',''),(99,119,1,0,2,'M',''),(100,120,1,0,2,'XL',''),(101,121,1,0,2,'M',''),(102,122,1,0,2,'M',''),(103,123,1,0,2,'XL',''),(104,124,1,0,2,'L',''),(105,125,1,0,2,'M',''),(106,126,1,0,2,'M',''),(107,127,1,0,1,'M',''),(108,128,4,0,2,'M',''),(109,129,1,0,2,'XL',''),(110,130,1,0,2,'M',''),(111,131,1,0,2,'M',''),(112,132,1,0,2,'L',''),(113,133,2,0,2,'M',''),(114,134,1,0,1,'S','Đỏ'),(115,135,2,0,3,'S','Đỏ'),(116,136,10,0,3,'M','Xanh ngọc'),(117,137,81,0,4,'M','Xanh ngọc'),(118,138,96,0,3,'M','Hồng'),(119,139,10,0,4,'M','Xanh ngọc'),(120,140,1,0,3,'XL','Đen xám'),(121,141,1,0,4,'M','Xanh dương'),(122,142,2,0,4,'XS','Xanh ngọc'),(123,143,3,0,4,'L','Xanh lá cây'),(124,144,5,0,4,'XL','Tím nhẹ'),(125,145,1,0,4,'XL','Đen xám'),(126,146,1,0,4,'M','Xanh lá cây'),(127,147,1,0,4,'XS','Xanh ngọc'),(128,148,1,0,4,'M','Cam'),(129,149,1,0,4,'XS','Đen xám'),(130,150,3,0,4,'M','Xanh lá cây'),(131,151,2,0,4,'XL','Tím nhẹ'),(132,152,1,0,4,'M','Tím nhẹ'),(133,153,2,0,4,'XL','Xanh ngọc'),(134,154,1,0,4,'S','Xanh ngọc'),(135,155,1,0,4,'L','Xanh ngọc'),(136,156,1,0,4,'XL','Tím nhẹ'),(137,157,8,0,3,'L','Xanh ngọc'),(138,158,8,0,3,'L','Xanh ngọc'),(139,159,1,0,4,'M','Hồng'),(140,160,1,0,4,'L','Xanh dương'),(141,161,1,0,4,'L','Xanh lá cây'),(142,162,2,0,4,'XL','Hồng'),(143,163,2,0,4,'XL','Hồng'),(144,164,1,0,4,'M','Hồng'),(145,165,1,0,4,'M','Hồng'),(146,166,1,0,4,'M','Hồng'),(147,167,1,0,4,'M','Hồng'),(148,168,1,0,4,'M','Hồng'),(149,169,1,0,4,'M','Hồng'),(150,170,1,0,4,'M','Hồng'),(151,171,1,0,4,'M','Hồng'),(152,172,1,0,4,'M','Hồng'),(153,173,1,0,4,'M','Hồng'),(154,174,1,0,4,'M','Hồng'),(155,175,1,0,4,'M','Hồng'),(156,176,1,0,4,'M','Hồng'),(157,177,2,0,4,'M','Hồng'),(158,178,2,0,4,'M','Hồng'),(159,179,2,0,4,'M','Hồng'),(160,180,2,0,4,'M','Hồng'),(161,181,2,0,4,'M','Hồng'),(162,182,2,0,4,'M','Hồng'),(163,183,2,0,4,'M','Hồng'),(164,184,2,0,4,'M','Hồng'),(165,185,2,0,4,'M','Hồng'),(166,186,1,0,4,'M','Hồng'),(167,187,1,0,4,'M','Hồng'),(168,188,1,0,4,'M','Hồng'),(169,189,1,0,4,'M','Hồng'),(170,190,1,0,4,'XL','Hồng'),(171,191,1,0,4,'XL','Hồng'),(172,192,1,0,4,'XL','Hồng'),(173,193,1,0,4,'XL','Hồng'),(174,194,1,0,4,'M','Xanh lá cây'),(175,195,93,0,3,'L','Xanh dương'),(176,196,2,0,3,'S','Hồng'),(177,197,1,0,3,'S','Hồng'),(178,198,1,0,3,'M','Xanh ngọc'),(179,199,1,0,4,'L','Xanh dương'),(180,200,14,0,4,'XL','Xanh lá cây'),(181,201,2,0,4,'S','Đỏ'),(182,202,2,51500,4,'L','Xanh dương'),(183,203,4,51500,4,'S','Hồng'),(184,204,6,0,4,'M','Xanh ngọc'),(185,205,1,0,1,'L','Hồng'),(186,206,1,-1,4,'L','Xanh dương'),(187,207,3,0,4,'L','Xanh dương'),(188,208,2,0,4,'S','Đỏ'),(189,209,4,0,4,'M','Xanh dương'),(190,210,3,0,4,'XS','Xanh lá cây');
/*!40000 ALTER TABLE `order_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `address` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `status` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `phone` varchar(20) NOT NULL,
  `size` varchar(5) NOT NULL,
  `color` varchar(20) NOT NULL,
  `date_end` varchar(255) NOT NULL,
  `code` int NOT NULL,
  `selected` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id3` (`user_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `user_id3` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=211 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (15,1,'check voucher','2023-02-01 10:00:00',2,5,7,'123456789','M','','2023-07-08 10:39:08',20,0),(16,2,'check','2023-01-03 00:00:00',2,6,3,'123456789','L','','2023-07-05 21:47:58',0,0),(17,2,'check','2023-02-02 00:00:00',3,1,1,'123456789','S','','2023-07-05 21:47:58',0,0),(18,2,'pending','2023-01-02 00:00:00',1,1,1,'032457859','L','','Đang giao',0,0),(19,2,'check','2023-02-02 00:00:00',3,9,3,'123456789','XL','','2023-07-05 21:47:58',0,0),(20,1,'check voucher','2023-03-08 00:00:00',2,5,1,'123456789','M','','2023-07-08 10:39:08',20,0),(21,1,'check voucher','2023-02-02 00:00:00',4,1,1,'123456789','S','','2023-07-08 10:39:08',20,0),(22,1,'check voucher','2023-02-04 00:00:00',4,12,3,'123456789','L','','2023-07-08 10:39:08',20,0),(23,1,'check voucher','2023-02-04 00:00:00',4,9,4,'123456789','L','','2023-07-08 10:39:08',20,0),(24,1,'check voucher','2023-02-07 00:00:00',3,5,1,'123456789','M','','2023-07-08 10:39:08',20,0),(25,1,'check voucher','2023-02-09 00:00:00',2,1,5,'123456789','M','','2023-07-08 10:39:08',20,0),(32,1,'check voucher','2023-02-11 00:00:00',2,13,3,'123456789','L','','2023-07-08 10:39:08',20,0),(33,1,'check voucher','2023-02-19 11:03:00',2,16,2,'123456789','S','','2023-07-08 10:39:08',20,0),(34,2,'check','2023-02-22 21:24:00',2,1,2,'123456789','L','','2023-07-05 21:47:58',0,0),(35,2,'pending','2023-02-22 21:40:00',0,3,6,'pending','','','pending',0,0),(36,1,'check voucher','2023-02-23 22:58:00',2,1,2,'123456789','XL','','2023-07-08 10:39:08',20,0),(39,3,'Long Biên, Hà Nội','2023-02-28 22:19:00',3,7,2,'123456789','XL','','2023-03-15 22:04:25',3,1),(41,3,'Long Biên, Hà Nội','2023-03-01 21:26:00',3,10,9,'123456789','XL','','2023-03-15 22:04:25',2,1),(42,3,'Long Biên, Hà Nội','2023-03-01 21:28:00',3,1,1,'123456789','M','','2023-03-15 22:04:25',2,1),(43,3,'Long Biên, Hà Nội','2023-03-04 19:46:00',3,1,3,'123456789','XL','','2023-03-15 22:04:25',0,1),(44,3,'Long Biên, Hà Nội','2023-03-04 19:46:00',3,3,2,'123456789','S','','2023-03-15 22:04:25',0,1),(45,3,'Long Biên, Hà Nội','2023-03-11 21:51:00',3,18,1,'123456789','S','','2023-03-15 22:04:25',0,1),(46,3,'Long Biên, Hà Nội','2023-03-11 22:00:00',3,6,1,'123456789','S','','2023-03-15 22:04:25',0,1),(47,3,'Long Biên, Hà Nội','2023-03-11 22:00:00',3,15,2,'123456789','XL','','2023-03-15 22:04:25',0,1),(48,3,'Long Biên, Hà Nội','2023-03-11 22:02:00',3,3,1,'123456789','S','','2023-03-15 22:04:25',0,1),(49,3,'Long Biên, Hà Nội','2023-03-11 22:02:00',3,6,1,'123456789','S','','2023-03-15 22:04:25',0,1),(50,3,'pending','2023-03-14 21:36:00',0,18,1,'pending','S','','pending',0,0),(51,3,'pending','2023-03-14 21:38:00',0,18,1,'pending','S','','pending',0,0),(52,3,'pending','2023-03-14 21:40:00',0,18,1,'pending','S','','pending',0,0),(53,3,'pending','2023-03-14 21:42:00',0,18,1,'pending','S','','pending',0,0),(54,3,'Long Biên, Hà Nội','2023-03-14 21:49:00',3,18,2,'123456789','S','','2023-03-15 22:04:25',0,1),(55,3,'Long Biên, Hà Nội','2023-03-14 22:33:00',3,17,1,'123456789','M','','2023-03-15 22:04:25',0,1),(56,3,'Long Biên, Hà Nội','2023-03-14 22:33:00',3,9,1,'123456789','M','','2023-03-15 22:04:25',0,1),(57,3,'Long Biên, Hà Nội','2023-03-14 22:33:00',3,7,1,'123456789','XL','','2023-03-15 22:04:25',0,1),(58,3,'Long Biên, Hà Nội','2023-03-15 20:39:00',3,10,1,'123456789','M','','2023-03-15 22:04:25',0,1),(59,3,'Long Biên, Hà Nội','2023-03-15 20:39:00',3,6,1,'123456789','S','','2023-03-15 22:04:25',0,1),(60,5,'Hà Nội','2023-05-15 22:23:00',3,1,5,'123456789','M','','2023-05-15 22:25:39',0,1),(61,1,'check voucher','2023-05-19 16:38:00',2,12,1,'123456789','XL','','2023-07-08 10:39:08',20,0),(62,5,'pending','2023-06-27 06:33:00',1,12,3,'pending','XL','','pending',0,0),(63,1,'check voucher','2023-06-27 06:46:00',2,1,1,'123456789','XL','','2023-07-08 10:39:08',20,0),(64,1,'check voucher','2023-06-27 06:55:00',2,1,1,'123456789','XL','','2023-07-08 10:39:08',20,0),(65,1,'check voucher','2023-06-27 06:59:00',2,2,32,'123456789','L','','2023-07-08 10:39:08',20,0),(66,1,'check voucher','2023-06-27 06:59:00',2,3,1,'123456789','S','','2023-07-08 10:39:08',20,0),(67,1,'check voucher','2023-06-27 21:39:00',2,1,1,'123456789','M','','2023-07-08 10:39:08',20,0),(68,1,'check voucher','2023-06-27 21:45:00',2,1,1,'123456789','XL','','2023-07-08 10:39:08',20,0),(69,1,'check voucher','2023-06-28 14:11:00',2,9,1,'123456789','M','','2023-07-08 10:39:08',20,0),(70,1,'check voucher','2023-06-28 14:11:00',2,7,1,'123456789','XL','','2023-07-08 10:39:08',20,0),(71,1,'check voucher','2023-06-28 14:12:00',2,17,1,'123456789','M','','2023-07-08 10:39:08',20,0),(72,1,'check voucher','2023-06-30 10:17:00',2,2,1,'123456789','L','','2023-07-08 10:39:08',20,0),(73,1,'check voucher','2023-06-30 10:31:00',2,1,1,'123456789','XL','','2023-07-08 10:39:08',20,0),(74,1,'check voucher','2023-06-30 10:34:00',2,5,1,'123456789','M','','2023-07-08 10:39:08',20,0),(75,1,'check voucher','2023-06-30 10:35:00',2,5,1,'123456789','M','','2023-07-08 10:39:08',20,0),(76,1,'check voucher','2023-06-30 10:38:00',2,12,1,'123456789','XL','','2023-07-08 10:39:08',20,0),(77,1,'check voucher','2023-06-30 10:38:00',2,19,1,'123456789','M','','2023-07-08 10:39:08',20,0),(78,1,'check voucher','2023-06-30 10:41:00',2,7,1,'123456789','XL','','2023-07-08 10:39:08',20,0),(79,2,'pending','2023-07-01 16:33:00',0,6,1,'pending','S','','pending',0,0),(80,2,'pending','2023-07-01 16:33:00',0,7,1,'pending','XL','','pending',0,0),(81,2,'pending','2023-07-01 16:38:00',0,1,1,'pending','XL','','pending',0,0),(82,2,'pending','2023-07-01 16:45:00',0,6,1,'pending','S','','pending',0,0),(83,2,'pending','2023-07-01 16:54:00',0,1,1,'pending','XL','','pending',0,0),(84,2,'pending','2023-07-01 16:56:00',0,6,1,'pending','S','','pending',0,0),(85,2,'pending','2023-07-01 16:57:00',0,7,1,'pending','XL','','pending',0,0),(86,2,'pending','2023-07-01 16:57:00',0,13,1,'pending','XL','','pending',0,0),(87,2,'pending','2023-07-01 16:58:00',0,6,1,'pending','S','','pending',0,0),(88,2,'pending','2023-07-01 16:58:00',0,5,1,'pending','M','','pending',0,0),(89,1,'check voucher','2023-07-01 21:01:00',2,18,1,'123456789','S','','2023-07-08 10:39:08',20,0),(90,1,'check voucher','2023-07-01 21:01:00',2,9,1,'123456789','M','','2023-07-08 10:39:08',20,0),(91,1,'check voucher','2023-07-01 21:01:00',2,7,1,'123456789','XL','','2023-07-08 10:39:08',20,0),(92,1,'check voucher','2023-07-01 21:01:00',2,9,1,'123456789','M','','2023-07-08 10:39:08',20,0),(93,1,'check voucher','2023-07-01 21:01:00',2,2,1,'123456789','L','','2023-07-08 10:39:08',20,0),(94,1,'check voucher','2023-07-01 21:01:00',2,7,1,'123456789','XL','','2023-07-08 10:39:08',20,0),(95,1,'check voucher','2023-07-01 21:01:00',2,20,1,'123456789','L','','2023-07-08 10:39:08',20,0),(96,1,'check voucher','2023-07-01 21:01:00',2,2,1,'123456789','L','','2023-07-08 10:39:08',20,0),(97,1,'check voucher','2023-07-01 21:01:00',2,15,2,'123456789','XL','','2023-07-08 10:39:08',20,0),(98,1,'check voucher','2023-07-01 21:01:00',2,17,1,'123456789','M','','2023-07-08 10:39:08',20,0),(99,1,'check voucher','2023-07-01 21:18:00',2,17,1,'123456789','M','','2023-07-08 10:39:08',20,0),(100,1,'check voucher','2023-07-01 21:24:00',2,7,1,'123456789','XL','','2023-07-08 10:39:08',20,0),(101,1,'check voucher','2023-07-01 21:24:00',2,10,2,'123456789','M','','2023-07-08 10:39:08',20,0),(102,1,'check voucher','2023-07-01 21:26:00',2,2,1,'123456789','L','','2023-07-08 10:39:08',20,0),(103,1,'check voucher','2023-07-01 21:26:00',2,17,1,'123456789','M','','2023-07-08 10:39:08',20,0),(104,10,'pending','2023-07-01 21:45:00',1,13,2,'pending','XL','','pending',0,0),(105,10,'pending','2023-07-01 21:48:00',0,2,2,'pending','L','','2023-07-01 21:48',0,0),(106,9,'pending','2023-07-01 22:01:00',0,2,2,'pending','L','','2023-07-01 22:01',0,0),(107,9,'pending','2023-07-01 22:01:00',0,13,1,'pending','XL','','2023-07-01 22:01',0,0),(108,9,'pending','2023-07-01 22:01:00',0,10,1,'pending','M','','2023-07-01 22:01',0,0),(109,9,'pending','2023-07-01 22:10:00',0,20,1,'pending','L','','2023-07-01 22:10',0,0),(110,9,'pending','2023-07-01 22:12:00',0,6,2,'pending','S','','2023-07-01 22:12',0,1),(111,1,'check voucher','2023-07-01 22:14:00',2,5,1,'123456789','M','','2023-07-08 10:39:08',20,0),(112,9,'pending','2023-07-01 22:14:00',1,13,1,'pending','XL','','2023-07-01 22:14',0,1),(113,8,'MRT2','2023-07-01 22:17:00',3,2,1,'MRT','L','','2023-07-01 22:19:44',0,0),(114,8,'CHECKK','2023-07-01 22:17:00',3,7,1,'123456789','XL','','2023-07-01 22:37:55',0,0),(115,8,'CHECKK','2023-07-01 22:36:00',3,18,1,'123456789','S','','2023-07-01 22:37:55',0,0),(116,8,'HNNN','2023-07-02 07:08:00',3,18,1,'123456789','S','','2023-07-02 08:36:03',0,0),(117,8,'CHECK CHECK','2023-07-02 07:08:00',3,5,3,'123456789','M','','2023-07-08 21:25:03',20,0),(118,1,'check voucher','2023-07-02 16:57:00',2,2,8,'123456789','L','','2023-07-08 10:39:08',20,0),(119,1,'check voucher','2023-07-05 07:58:00',2,5,1,'123456789','M','','2023-07-08 10:39:08',20,0),(120,1,'check voucher','2023-07-05 07:58:00',2,13,1,'123456789','XL','','2023-07-08 10:39:08',20,0),(121,1,'check voucher','2023-07-05 07:58:00',2,17,1,'123456789','M','','2023-07-08 10:39:08',20,0),(122,1,'check voucher','2023-07-05 08:39:00',2,19,1,'123456789','M','','2023-07-08 10:39:08',20,0),(123,1,'check voucher','2023-07-05 08:39:00',2,15,1,'123456789','XL','','2023-07-08 10:39:08',20,0),(124,1,'check voucher','2023-07-05 08:39:00',2,2,1,'123456789','L','','2023-07-08 10:39:08',20,0),(125,1,'check voucher','2023-07-05 08:39:00',2,5,1,'123456789','M','','2023-07-08 10:39:08',20,0),(126,1,'check voucher','2023-07-05 08:39:00',2,9,1,'123456789','M','','2023-07-08 10:39:08',20,0),(127,2,'pending','2023-07-05 09:02:00',0,17,1,'pending','M','','2023-07-05 09:02',0,0),(128,2,'check','2023-07-05 09:02:00',2,19,4,'123456789','M','','2023-07-05 21:47:58',0,0),(129,1,'check voucher','2023-07-05 11:20:00',2,7,1,'123456789','XL','','2023-07-08 10:39:08',20,0),(130,1,'check voucher','2023-07-05 11:20:00',2,17,1,'123456789','M','','2023-07-08 10:39:08',20,0),(131,1,'check voucher','2023-07-05 11:20:00',2,19,1,'123456789','M','','2023-07-08 10:39:08',20,0),(132,2,'OKEEE','2023-07-05 13:46:00',2,2,1,'11111111111','L','','2023-07-05 21:53:24',0,0),(133,1,'Trịnh Văn Bô','2023-07-08 13:25:00',2,9,2,'1231231232','M','','2023-08-01 20:20:17',0,0),(134,1,'MISSING','2023-07-09 08:26:00',0,6,1,'MISSING','S','Đỏ','2023-07-09 08:26',0,0),(135,12,'Hà Nội','2023-07-09 08:28:00',3,6,1,'123456789','S','Đỏ','2023-07-09 08:30:27',20,0),(136,17,'HN','2023-07-26 10:49:00',3,9,10,'0912312312','M','Xanh ngọc','2023-08-14 21:07:36',0,0),(137,1,'Trịnh Văn Bô','2023-08-01 20:19:00',4,9,81,'1231231232','M','Xanh ngọc','2023-08-01 20:20:17',0,0),(138,17,'HN','2023-08-01 20:54:00',3,1,100,'0912312312','M','Hồng','2023-08-14 21:07:36',0,0),(139,18,'Hà Nội','2023-08-01 21:14:00',4,9,10,'0912312319','M','Xanh ngọc','2023-08-01 21:15:06',0,0),(140,17,'HN','2023-08-02 10:24:00',3,13,1,'0912312312','XL','Đen xám','2023-08-14 21:07:36',0,0),(141,35,'AT STORE','2023-08-05 21:09:50',4,8,1,'0931231233','M','Xanh dương','2023-08-05T21:09:49.660400900',0,0),(142,35,'AT STORE','2023-08-05 21:09:50',4,2,2,'0931231233','XS','Xanh ngọc','2023-08-05T21:09:49.690366900',0,0),(143,35,'AT STORE','2023-08-05 21:09:50',4,19,3,'0931231233','L','Xanh lá cây','2023-08-05T21:09:49.705389700',0,0),(144,35,'AT STORE','2023-08-05 21:09:50',4,17,5,'0931231233','XL','Tím nhẹ','2023-08-05T21:09:49.705389700',0,0),(145,42,'AT STORE','2023-08-05 21:13:02',4,8,1,'0931231233','XL','Đen xám','2023-08-05T21:13:02.322618900',0,0),(146,42,'AT STORE','2023-08-05 21:13:02',4,1,1,'0931231233','M','Xanh lá cây','2023-08-05T21:13:02.322618900',0,0),(147,60,'AT STORE','2023-08-05 21:16:52',4,5,1,'0931231888','XS','Xanh ngọc','2023-08-05T21:16:51.706037100',0,0),(148,60,'AT STORE','2023-08-05 21:16:52',4,8,1,'0931231888','M','Cam','2023-08-05T21:16:51.715036600',0,0),(149,61,'AT STORE','2023-08-05 21:21:28',4,2,1,'0900231199','XS','Đen xám','2023-08-05T21:21:28.350944900',0,0),(150,61,'AT STORE','2023-08-05 21:21:28',4,9,3,'0900231199','M','Xanh lá cây','2023-08-05T21:21:28.358889900',0,0),(151,61,'AT STORE','2023-08-05 21:21:28',4,20,2,'0900231199','XL','Tím nhẹ','2023-08-05T21:21:28.366025',0,0),(152,62,'AT STORE','2023-08-05 21:22:31',4,9,1,'0900266177','M','Tím nhẹ','2023-08-05T21:22:30.877577500',0,0),(153,62,'AT STORE','2023-08-05 21:22:31',4,1,2,'0900266177','XL','Xanh ngọc','2023-08-05T21:22:30.877577500',0,0),(154,63,'AT STORE','2023-08-05 21:26:27',4,8,1,'0931231888','S','Xanh ngọc','2023-08-05T21:26:27.036867800',0,0),(155,63,'AT STORE','2023-08-05 21:26:27',4,1,1,'0931231888','L','Xanh ngọc','2023-08-05T21:26:27.036867800',0,0),(156,63,'AT STORE','2023-08-05 21:26:27',4,5,1,'0931231888','XL','Tím nhẹ','2023-08-05T21:26:27.051880100',0,0),(157,17,'HN','2023-08-05 22:47:00',3,20,8,'0912312312','L','Xanh ngọc','2023-08-14 21:07:36',0,0),(158,17,'HN','2023-08-06 21:56:00',3,20,8,'0912312312','L','Xanh ngọc','2023-08-14 21:07:36',0,0),(159,64,'AT STORE','2023-08-06 22:02:55',4,1,1,'0931231233','M','Hồng','2023-08-06T22:02:54.822779500',0,0),(160,64,'AT STORE','2023-08-06 22:02:55',4,2,1,'0931231233','L','Xanh dương','2023-08-06T22:02:54.831292300',0,0),(161,64,'AT STORE','2023-08-06 22:02:55',4,8,1,'0931231233','L','Xanh lá cây','2023-08-06T22:02:54.837803400',0,0),(162,66,'AT STORE','2023-08-07 20:25:39',4,1,2,'0931231233','XL','Hồng','2023-08-07T20:25:38.802643800',0,0),(163,67,'AT STORE','2023-08-07 20:25:40',4,1,2,'0931231233','XL','Hồng','2023-08-07T20:25:40.326850500',0,0),(164,68,'AT STORE','2023-08-07 20:26:13',4,1,1,'0931231233','M','Hồng','2023-08-07T20:26:12.932314700',0,0),(165,69,'AT STORE','2023-08-07 20:26:14',4,1,1,'0931231233','M','Hồng','2023-08-07T20:26:14.091721200',0,0),(166,70,'AT STORE','2023-08-07 20:26:14',4,1,1,'0931231233','M','Hồng','2023-08-07T20:26:14.278579',0,0),(167,71,'AT STORE','2023-08-07 20:26:14',4,1,1,'0931231233','M','Hồng','2023-08-07T20:26:14.453188900',0,0),(168,72,'AT STORE','2023-08-07 20:33:07',4,1,1,'0931231888','M','Hồng','2023-08-07T20:33:06.501345100',0,0),(169,73,'AT STORE','2023-08-07 20:33:07',4,1,1,'0931231888','M','Hồng','2023-08-07T20:33:07.464693600',0,0),(170,74,'AT STORE','2023-08-07 20:33:08',4,1,1,'0931231888','M','Hồng','2023-08-07T20:33:08.023258200',0,0),(171,75,'AT STORE','2023-08-07 20:33:08',4,1,1,'0931231888','M','Hồng','2023-08-07T20:33:08.222074300',0,0),(172,76,'AT STORE','2023-08-07 20:33:08',4,1,1,'0931231888','M','Hồng','2023-08-07T20:33:08.419801',0,0),(173,77,'AT STORE','2023-08-07 20:33:09',4,1,1,'0931231888','M','Hồng','2023-08-07T20:33:09.152963900',0,0),(174,78,'AT STORE','2023-08-07 20:33:09',4,1,1,'0931231888','M','Hồng','2023-08-07T20:33:09.335130500',0,0),(175,79,'AT STORE','2023-08-07 20:33:10',4,1,1,'0931231888','M','Hồng','2023-08-07T20:33:09.537187700',0,0),(176,80,'AT STORE','2023-08-07 20:33:10',4,1,1,'0931231888','M','Hồng','2023-08-07T20:33:09.724582700',0,0),(177,83,'AT STORE','2023-08-07 20:39:30',4,1,2,'0900231199','M','Hồng','2023-08-07T20:39:29.962778300',0,0),(178,84,'AT STORE','2023-08-07 20:39:31',4,1,2,'0900231199','M','Hồng','2023-08-07T20:39:31.121844700',0,0),(179,85,'AT STORE','2023-08-07 20:39:32',4,1,2,'0900231199','M','Hồng','2023-08-07T20:39:31.553090200',0,0),(180,86,'AT STORE','2023-08-07 20:39:32',4,1,2,'0900231199','M','Hồng','2023-08-07T20:39:31.744391500',0,0),(181,87,'AT STORE','2023-08-07 20:39:32',4,1,2,'0900231199','M','Hồng','2023-08-07T20:39:31.931938400',0,0),(182,88,'AT STORE','2023-08-07 20:39:32',4,1,2,'0900231199','M','Hồng','2023-08-07T20:39:32.110483',0,0),(183,89,'AT STORE','2023-08-07 20:39:32',4,1,2,'0900231199','M','Hồng','2023-08-07T20:39:32.276432400',0,0),(184,90,'AT STORE','2023-08-07 20:39:32',4,1,2,'0900231199','M','Hồng','2023-08-07T20:39:32.470197300',0,0),(185,91,'AT STORE','2023-08-07 20:39:33',4,1,2,'0900231199','M','Hồng','2023-08-07T20:39:32.596974200',0,0),(186,92,'AT STORE','2023-08-07 20:43:47',4,1,1,'0931231233','M','Hồng','2023-08-07T20:43:46.771408700',0,0),(187,99,'AT STORE','2023-08-07 20:58:53',4,1,1,'0931231233','M','Hồng','2023-08-07T20:58:53.282092700',0,0),(188,100,'AT STORE','2023-08-07 20:58:54',4,1,1,'0931231233','M','Hồng','2023-08-07T20:58:53.872182400',0,0),(189,101,'AT STORE','2023-08-07 20:59:52',4,1,1,'0931231233','M','Hồng','2023-08-07T20:59:52.058807700',0,0),(190,102,'AT STORE','2023-08-07 21:00:51',4,1,1,'0931231233','XL','Hồng','2023-08-07T21:00:51.420651',0,0),(191,103,'AT STORE','2023-08-07 21:00:53',4,1,1,'0931231233','XL','Hồng','2023-08-07T21:00:52.537628200',0,0),(192,104,'AT STORE','2023-08-07 21:00:53',4,1,1,'0931231233','XL','Hồng','2023-08-07T21:00:52.700777100',0,0),(193,105,'AT STORE','2023-08-07 21:00:53',4,1,1,'0931231233','XL','Hồng','2023-08-07T21:00:52.884446200',0,0),(194,106,'AT STORE','2023-08-07 21:27:20',4,5,1,'0931231233','M','Xanh lá cây','2023-08-07T21:27:19.646367600',0,0),(195,17,'HN','2023-08-07 21:37:00',3,2,93,'0912312312','L','Xanh dương','2023-08-14 21:07:36',0,0),(196,17,'HN','2023-08-09 21:33:00',3,3,2,'0912312312','S','Hồng','2023-08-14 21:07:36',0,0),(197,17,'HN','2023-08-09 21:33:00',3,3,1,'0912312312','S','Hồng','2023-08-14 21:07:36',0,0),(198,17,'HN','2023-08-09 21:33:00',3,9,1,'0912312312','M','Xanh ngọc','2023-08-14 21:07:36',0,0),(199,2,'AT STORE','2023-08-14 21:03:15',4,2,1,'0931231233','L','Xanh dương','2023-08-14T21:03:14.555366500',0,0),(200,17,'HN','2023-08-14 21:05:00',4,13,10,'0912312312','XL','Xanh lá cây','2023-08-14 21:07:36',0,0),(201,17,'HN','2023-08-14 21:05:00',4,6,2,'0912312312','S','Đỏ','2023-08-14 21:07:36',0,0),(202,1,'Quan Hoa','2023-08-21 15:48:04',4,2,2,'0912968656','L','Xanh dương','2023-08-21T15:48:03.887222',0,0),(203,1,'Quan Hoa','2023-08-21 15:48:04',4,3,4,'0912968656','S','Hồng','2023-08-21T15:48:04.086755700',0,0),(204,17,'Ba Đình-Hà Nội','2023-08-21 20:59:00',4,9,6,'0969798055','M','Xanh ngọc','2023-08-21 21:00:50',0,0),(205,17,'MISSING','2023-08-21 20:59:00',0,2,1,'MISSING','L','Hồng','2023-08-21 20:59',0,0),(206,1,'Giao hàng','2023-08-21 21:22:25',4,2,1,'0912968656','L','Xanh dương','2023-08-21T21:22:25.406339',0,0),(207,3,'Số nhà 12','2023-08-21 21:23:24',4,2,3,'0912300111','L','Xanh dương','2023-08-21T21:23:23.941543',0,0),(208,3,'Số nhà 12','2023-08-21 21:23:24',4,6,2,'0912300111','S','Đỏ','2023-08-21T21:23:23.948957',0,0),(209,18,'Số nhà 80','2023-08-21 21:40:00',4,10,4,'0969798096','M','Xanh dương','2023-08-21T21:40:04.458511500',0,0),(210,18,'Số nhà 80','2023-08-21 21:40:00',4,26,3,'0969798096','XS','Xanh lá cây','2023-08-21T21:40:04.494316',0,0);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `price` float NOT NULL,
  `description` varchar(255) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `status` int NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,2,'Áo thun Zero Two - anime Darling In The Franxx','https://product.hstatic.net/1000273792/product/0_59ce04b3329546c29fb5e2416e818807_grande.jpg',299000,'Chất lượng cao, cotton.','UNISEX',0,399),(2,2,'Áo thun anime Date A Live (Có nhiều mẫu)','https://product.hstatic.net/1000273792/product/1_451c53fd550d4408a047589c146904ff_grande.jpg',320000,'Chất liệu mát, thoải mái.','Polo',1,1187),(3,3,'Áo thun anime Darling in the FranXX (Có nhiều mẫu)','https://product.hstatic.net/1000273792/product/1_a6deaea470a7432fbc920cab9618eb95_grande.jpg',385000,'Chất liệu cotton thoải mái.','Ideals',1,488),(5,4,'Áo thun anime Bungo Stray Dogs (Có nhiều mẫu)','https://product.hstatic.net/1000273792/product/1_a74441a97d2844c5958267d497fba228_grande.jpg',425000,'Chất liệu jean thoải mái.','Slimfit',1,386),(6,9,'Áo thun anime Chuunibyou (Có nhiều mẫu)','	https://product.hstatic.net/1000273792/product/1_5a87431eb30b4d2f932a6b84f1b8a8f1_grande.jpg',285000,'Chất liệu thoải mái.','Friends',1,40),(7,11,'Áo thun anime Ansatsu Kyoushitsu (Có nhiều mẫu)','	https://product.hstatic.net/1000273792/product/1_4eec421588c94b879901499ef4d20f31_grande.jpg',365000,'Chất liệu thoải mái.','Unisex',1,67),(8,7,'Áo thun Monokuma - Mẫu 1 - anime Danganronpa','https://product.hstatic.net/1000273792/product/28a-vang_grande.jpg',450000,'Chất lượng cao, cotton.','Xsport',1,195),(9,5,'Áo thun anime Kantai Collection','https://product.hstatic.net/1000273792/product/48a_master.jpg',600000,'Chất lượng cao, cotton.','Xsport',1,960),(10,2,'Áo thun Accelerate','https://product.hstatic.net/1000273792/product/1a_grande.jpg',385000,'Chất liệu bền đẹp','FLANNEL',1,550),(12,6,'Áo thun anime Sword Art Online','https://product.hstatic.net/1000273792/product/52a_grande.jpg',245000,'Chất liệu len ấm áp','No brand',1,-12),(13,3,'Áo thun anime Gintama - Mẫu 2','https://product.hstatic.net/1000273792/product/38a_master.jpg',245000,'Chất liệu cao cấp, bền đẹp','ADORABLE',1,197),(15,11,'Áo thun anime Attack On Titan','https://product.hstatic.net/1000273792/product/4b_e176416a086b49328e1f0363dbe9fa07_grande.jpg',425000,'Chất liệu cao cấp, thoải mái','STRAIGHT',1,88),(16,4,'Áo thun anime Bleach (Có nhiều mẫu)','https://product.hstatic.net/1000273792/product/1_d2a6a4fcf7c144bb8cf6d9c48e739ae3_grande.jpg',205000,'Chất liệu bền đẹp, thoải mái','W2ATN09205FOSHT',1,80),(17,5,'Áo thun anime My Hero Academia (Có nhiều mẫu)  Tình trạng: Còn hàng','	https://product.hstatic.net/1000273792/product/1_d830dbeb2bdb485d97d5ac1d52165902_grande.jpg',180000,'Hàng chất lượng cao, bền đẹp','Unisex',1,91),(18,3,'Áo thun anime Black Rock Shooter (Có nhiều mẫu)','https://product.hstatic.net/1000273792/product/1_eeeaa2bacc9f4df8b6ba5bf4248230f7_grande.jpg',130000,'Màu sắc hiện đại, chất liệu cao cấp','Unisex',1,86),(19,2,'Áo thun anime Attack on Titan (Có nhiều mẫu)','	https://product.hstatic.net/1000273792/product/1_8bec1b2fcea14d688859f6020c2df53f_grande.jpg',265000,'Chất liệu cao cấp, bền đẹp','W2SMD05201FOSCR',1,597),(20,1,'Áo thun anime Date A Live- Mẫu 2','	https://product.hstatic.net/1000273792/product/2_f75298f5942648c3b37c5220b5980b82_grande.jpg',295000,'88% Polyester, 12% spandex, co giãn 4 chiều','ICADO',1,198),(22,1,'Hangnt','http://res.cloudinary.com/dyrc9s2gx/image/upload/v1691945748/mcxbgrglsyav1l5lbg2t.jpg',2334000,'ok','nam',0,455),(23,1,'Hangnt','http://res.cloudinary.com/dyrc9s2gx/image/upload/v1691945730/xzbj1s2tzym9uqnetcte.jpg',2334000,'ok','nam',0,455),(24,2,'Hangnt','http://res.cloudinary.com/dyrc9s2gx/image/upload/v1691945712/e03yjdzzstlqvt35nchd.jpg',299000,'Áo thun nam','Áo Nam',0,999),(25,7,'Áo ABC','http://res.cloudinary.com/dyrc9s2gx/image/upload/v1692021213/xm8hwpyrkjh2shilza3y.jpg',290000,'Áo thun nam','Áo Nam',1,100),(26,6,'Áo Thun Nam','http://res.cloudinary.com/dyrc9s2gx/image/upload/v1692626159/xjbmq866kto5itqgupsc.jpg',499000,'Áo Nam','Adidas',1,996);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_color`
--

DROP TABLE IF EXISTS `product_color`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_color` (
  `id` int NOT NULL AUTO_INCREMENT,
  `color_id` int NOT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_product_fk` (`product_id`),
  KEY `id_color` (`color_id`),
  CONSTRAINT `id_color` FOREIGN KEY (`color_id`) REFERENCES `color` (`id`),
  CONSTRAINT `id_product_fk` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_color`
--

LOCK TABLES `product_color` WRITE;
/*!40000 ALTER TABLE `product_color` DISABLE KEYS */;
INSERT INTO `product_color` VALUES (2,2,2),(3,4,2),(4,5,8),(5,4,10),(6,7,7),(7,3,7),(8,5,5),(9,9,15),(10,6,15),(11,1,9),(12,2,3),(13,10,6),(14,5,13),(15,3,13),(16,11,16),(17,3,17),(18,8,18),(19,11,19),(20,1,20),(25,1,25),(26,2,25),(27,3,25),(28,4,25),(29,5,25),(30,1,26),(31,2,26),(32,3,26),(33,4,26),(34,5,26);
/*!40000 ALTER TABLE `product_color` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_size`
--

DROP TABLE IF EXISTS `product_size`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_size` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_product` int NOT NULL,
  `id_size` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_product` (`id_product`),
  KEY `id_size` (`id_size`),
  CONSTRAINT `id_product` FOREIGN KEY (`id_product`) REFERENCES `product` (`id`),
  CONSTRAINT `id_size` FOREIGN KEY (`id_size`) REFERENCES `size` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_size`
--

LOCK TABLES `product_size` WRITE;
/*!40000 ALTER TABLE `product_size` DISABLE KEYS */;
INSERT INTO `product_size` VALUES (1,8,4),(2,8,3),(3,17,3),(4,18,2),(5,15,5),(6,5,3),(7,7,5),(8,9,3),(9,3,2),(10,12,5),(11,2,4),(12,10,3),(13,1,5),(14,1,3),(15,16,5),(16,16,3),(17,13,5),(18,6,2),(19,20,4),(21,19,3),(22,22,3),(23,23,3),(24,24,1),(25,24,2),(26,25,1),(27,25,2),(28,25,3),(29,25,4),(30,25,5),(31,26,1),(32,26,2),(33,26,3),(34,26,4),(35,26,5);
/*!40000 ALTER TABLE `product_size` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'QUẢN LÝ'),(2,'NHÂN VIÊN'),(3,'KHÁCH HÀNG');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `size`
--

DROP TABLE IF EXISTS `size`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `size` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(10) NOT NULL,
  `descriptions` varchar(255) NOT NULL,
  `status` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `size`
--

LOCK TABLES `size` WRITE;
/*!40000 ALTER TABLE `size` DISABLE KEYS */;
INSERT INTO `size` VALUES (1,'XS','Size XS (Extra Small): Kích thước quần áo siêu nhỏ',1),(2,'S','Size S (Small): Kích thước quần áo nhỏ',1),(3,'M','Size M (Medium): Kích thước quần áo vừa phải',1),(4,'L','Size L (Large): Kích thước quần áo lớn',1),(5,'XL','Size XL, XXL, XXXL: Kích thước quần áo cực lớn.',1);
/*!40000 ALTER TABLE `size` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` int NOT NULL,
  `avatar` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Nguyễn Thúy Hằng','hangnt','admin@gmail.com','0912968656','$2a$10$dhFunF5Ov9tR/zemJXEKAe4xvj9tr5z.fc8pWNlNW9Ws9gpe4KUOC',1,'https://kynguyenlamdep.com/wp-content/uploads/2022/08/anh-dai-dien-anime-cho-nam.jpg'),(2,'Văn Văn Hùng','hungnv','hungnv@gmail.com','','$2a$10$PnAz1zTRtTw./YNGf27tWOLQ9.QPVts8DLmxiDy6TYIUq9FqPuHq2',1,'https://tourchaua.net/wp-content/uploads/2021/12/avatar-buon-tam-trang-cho-nam.jpg'),(3,'Nguyễn Văn Lâm','lamnv','trinv@gmail.com','0912300111','$2a$10$wIqmicLd4oGqZcc3u59Mr.exzg35Vw/WDNIcoP6Bb/AD1ViOjiXEm',1,'https://anhdepfree.com/wp-content/uploads/2019/08/anh-dai-dien-boy.jpg'),(4,'Lê Thị Kim','kimlt','lekim@gmail.com','0912300222','$2a$12$XUuWbQTk25KqRukGlM63euTHHmwlkiImBYSXJAlCpNx7XOG87V8bG',1,'https://khoinguonsangtao.vn/wp-content/uploads/2022/05/anh-avatar-dep-ngau-hinh-dai-dien.jpg'),(5,'Văn Phong','phongnv','phongnv@gmail.com','0912300333','$2a$10$SPd9CWZHDaRkN8BJ9SCu0e0udbhKxMugypA3JP.gsoNM/6h14YeOe',1,'https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg'),(7,'Kiệt Nguyễn','kietnv','kietnv@gmail.com','0912123123','$2a$10$lklJFzd.6A2jhpz.3hKYmeEu9.5QHi8jh2wcbHPfLV4kd6Mw1bnyC',1,'https://antimatter.vn/wp-content/uploads/2023/01/hinh-anh-avatar-dep-cute-ngau.jpg'),(8,'Mr T','mrt','mrt@gmail.com','0912345345','$2a$10$s.qyYo0pJasbUGMbw75/ieiPDRT7j/jCBkrVlagQAsp0OCtXhPEWW',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=avatar'),(9,'Mr T2','mrt2','mrt2@gmail.com','','$2a$10$hzpkihHMD/bDu/PwD2Yu2uXnXgzfYkayXhfAuNXo91Xy/3WSbrZSa',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=avatar'),(10,'Mr T3','mrt3','mrt3@gmail.com','','$2a$10$i0QZWXzYXaZF/tB8.unvr.R24bqt.d3iUXI3u1lsLXqRJT2MY0oem',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=avatar'),(11,'thanhyou00','namlv22222','oke@gmail.com','0912300444','$2a$10$IWBewV7lHLZjHXJA/g1ww.B7pzHjzuseI1Ss6NGb.YoojYMwzw1DG',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=avatar'),(12,'thanhyou00','namlv2222','oke@gmail.com','','$2a$10$qwmX0SCTeBZ7jPKwjlqkWe0gswGGoNr/R1WFpG0bHV47i5JAj6XhC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=avatar'),(13,'Trinh Van Nam2','namlvokkk','keke@gmail.com','','$2a$10$kw9R4T9PCuABJQTKvB7HEOMJlZhG6zEAItzfcVJ6sbOopxR5QlqZW',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=avatar'),(14,'thanhyou00222','thanhyou00222','thanhyou00@gmail.com','','$2a$10$Vun2JezPwTmrFlH4Kq5Za.txEUmycGSxGZ.8ILLWgQy.an31mATaS',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=avatar'),(15,'thanhyou00222','thanhyou00222','thanhyou00@gmail.com','','$2a$10$2CRMQeTF0L/VlR/rpDhQ9epGRwXbSAjByA8Av6vub5283VCGesr/O',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=avatar'),(16,'thanhyou00222','thanhyou00222','thanhyou00@gmail.com','','$2a$10$nJxE/UdIwwlyV3aFONfcdu77/f9vsorUJKD.kgpRcBoRQ1K43nI1i',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=avatar'),(17,'Nguyễn Anh Dũng','dungna29','dungna29@gmail.com','0969798029','$2a$10$TygI4kBZ.6aygAGjx.Ml0.jRjx8niaji9yBf8MNccIjzRIEm17JYC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=avatar'),(18,'Bùi Ngọc Sinh','sinhbn','s2ngocsinh97@gmail.com','0969798096','$2a$10$iKcgkU.UB8WwDdsiVpHqBuYV/wh7yxGn8EF2U0im2vdx.DO1Ja2de',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=avatar'),(19,'////////////////','////////////////','abc@gmail.com','','$2a$10$Av7IBpjfdDettkbyDPG8Z.j8gBIv9khjobQGo/LDnMuhxn/e.76SG',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=avatar'),(20,'Thầy Dũng','atstore','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(21,'Thầy Dũng','atstore','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(22,'Thầy Dũng','atstore','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(23,'Thầy Dũng','atstore','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(24,'Thầy Dũng','atstore','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(25,'Thầy Dũng','atstore','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(26,'Thầy Dũng','atstore','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(27,'Thầy Dũng','atstore','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(28,'Thầy Dũng','atstore','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(29,'Thầy Dũng','atstore','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(30,'Thầy Dũng','atstore','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(31,'Thầy Dũng','atstore','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(32,'Thầy Dũng','atstore','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(33,'Thầy Dũng','atstore','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(34,'Thầy Dũng','atstore','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(35,'Thầy Dũng','atstore','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(36,'Thầy Dũng','atstore','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(37,'Thầy Dũng','atstore','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(38,'Thầy Dũng','atstore','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(39,'Thầy Dũng','atstore','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(40,'Thầy Dũng','atstore','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(41,'Thầy Dũng','atstore','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(42,'Thầy Dũng','atstore','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(43,'Cô Hằng','atstore','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(44,'Cô Hằng','atstore','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(45,'Cô Hằng','atstore','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(46,'Cô Hằng','atstore','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(47,'Cô Hằng','atstore','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(48,'Cô Hằng','atstore','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(49,'Cô Hằng','atstore','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(50,'Cô Hằng','atstore','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(51,'Cô Hằng','atstore','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(52,'Cô Hằng','atstore','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(53,'Cô Hằng','atstore','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(54,'Cô Hằng','atstore','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(55,'Cô Hằng','atstore','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(56,'Cô Hằng','atstore','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(57,'Cô Hằng','atstore','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(58,'Cô Hằng','atstore','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(59,'Cô Hằng','atstore','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(60,'Cô Hằng','atstore','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(61,'Thầy Tiến','atstore','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(62,'Thầy Nguyên','atstore','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(63,'Cô Hằng','atstore','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(64,'Thầy Dũng','0931231233','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(65,'Lê A','........','a@gmail.com','','$2a$10$p6cKbjaP0UM6mWCTUkmJze2eKLqTs8YEet/ZnBt.S9VsJzyIQzJvO',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=avatar'),(66,'Thầy Dũng','0931231233','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(67,'Thầy Dũng','0931231233','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(68,'Thầy Dũng','0931231233','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(69,'Thầy Dũng','0931231233','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(70,'Thầy Dũng','0931231233','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(71,'Thầy Dũng','0931231233','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(72,'Thầy Dũng','0931231888','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(73,'Thầy Dũng','0931231888','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(74,'Thầy Dũng','0931231888','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(75,'Thầy Dũng','0931231888','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(76,'Thầy Dũng','0931231888','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(77,'Thầy Dũng','0931231888','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(78,'Thầy Dũng','0931231888','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(79,'Thầy Dũng','0931231888','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(80,'Thầy Dũng','0931231888','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(81,'Thầy Tiến','0931231888','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(82,'Thầy Tiến','0931231888','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(83,'Thầy Tiến','0900231199','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(84,'Thầy Tiến','0900231199','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(85,'Thầy Tiến','0900231199','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(86,'Thầy Tiến','0900231199','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(87,'Thầy Tiến','0900231199','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(88,'Thầy Tiến','0900231199','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(89,'Thầy Tiến','0900231199','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(90,'Thầy Tiến','0900231199','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(91,'Thầy Tiến','thaytien','atstore@gmail.com','0900231199','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(92,'Thầy Dũng','0931231233','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(93,'Cô Hằng','0931231233','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(94,'Cô Hằng','0931231233','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(95,'Cô Hằng','0931231233','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(96,'Cô Hằng','thaydung','atstore@gmail.com','0931231233','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(97,'Cô Hằng','0931231233','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(98,'Thầy Dũng','0931231233','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(99,'Thầy Dũng','0931231233','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(100,'Thầy Dũng','0931231233','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(101,'Thầy Dũng','0931231233','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(102,'Thầy Dũng','0931231233','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(103,'Thầy Dũng','0931231233','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(104,'Thầy Dũng','0931231233','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(105,'Thầy Dũng','0931231233','atstore@gmail.com','','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore'),(106,'Thầy Phong','thayphong','atstore@gmail.com','0912300000','$2a$10$qh53E47bAgrcoE5U5ba/zOr3eyawgORvHXOkw0qmQTPHkhHAC09aC',1,'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=atStore');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vouchers`
--

DROP TABLE IF EXISTS `vouchers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vouchers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(12) NOT NULL,
  `sale` int NOT NULL,
  `date_start` datetime NOT NULL,
  `date_end` datetime NOT NULL,
  `user_id` int NOT NULL,
  `quantity` int NOT NULL,
  `status` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id33` (`user_id`),
  CONSTRAINT `user_id33` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vouchers`
--

LOCK TABLES `vouchers` WRITE;
/*!40000 ALTER TABLE `vouchers` DISABLE KEYS */;
INSERT INTO `vouchers` VALUES (1,'A2NCB56KMNM8',40,'2023-02-27 11:07:00','2023-05-28 11:07:00',1,100,0),(2,'A4NCB56KKNM8',20,'2023-02-27 16:33:00','2023-03-08 16:33:00',1,2,0),(3,'NV928CMNSJK2',50,'2023-02-27 16:44:00','2023-03-16 16:45:00',1,76,0),(4,'ABCDEFGHJK12',20,'2023-07-01 20:32:00','2023-07-29 20:33:00',1,20,0),(5,'ABCDEFGHJK00',20,'2023-08-07 14:39:13','2023-08-12 14:39:18',1,10,0),(6,'ABCDEFGHJK11',30,'2023-08-06 14:40:01','2023-08-10 14:40:05',1,5,0),(7,'ABCDEFGHJK11',10,'2023-08-14 14:06:32','2023-08-20 14:06:40',1,2,0),(8,'A2NCB56KMN99',20,'2023-08-21 14:04:34','2023-08-31 14:04:40',1,10,1);
/*!40000 ALTER TABLE `vouchers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'shopganime'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-05 15:39:39
