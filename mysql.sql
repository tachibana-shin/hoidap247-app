-- MariaDB dump 10.18  Distrib 10.5.8-MariaDB, for Android (aarch64)
--
-- Host: localhost    Database: hoc247
-- ------------------------------------------------------
-- Server version	10.5.8-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuidPoster` int(11) NOT NULL,
  `contents` text NOT NULL,
  `url` text DEFAULT NULL,
  `uuid` varchar(36) NOT NULL,
  `lastModifier` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,1,'Hh',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-29 11:06:13'),(2,1,'Vgv',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 03:12:08'),(3,1,'Socket',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 03:20:27'),(4,1,'Man',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 03:21:06'),(5,1,'Js',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 03:26:51'),(6,1,'shin_dev',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 03:28:52'),(7,1,'shin_dev',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 03:29:02'),(8,1,'shin_dev',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 03:29:08'),(9,1,'shin_dev 2',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 03:29:13'),(10,1,'shin_dev 3',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 03:29:17'),(11,1,'Ffff',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 03:35:04'),(12,1,'Ffffx',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 03:35:09'),(13,1,'Hello',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 03:37:47'),(14,1,'Hello&nbsp;',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 03:38:00'),(15,1,'Shin',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 03:42:31'),(16,1,'Socket',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 03:46:21'),(17,1,'Shin nè',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 03:46:29'),(18,1,'Hi',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 03:50:17'),(19,1,'Shin',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 03:59:50'),(20,1,'Hello',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 03:59:55'),(21,1,'Hello',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 04:01:12'),(22,1,'Hello',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 04:01:16'),(23,1,'Hello',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 04:01:20'),(24,1,'Hello',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 04:04:47'),(25,1,'Hello',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 04:04:53'),(26,1,'Xin chào',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 04:04:59'),(27,1,'Hello',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 04:05:40'),(28,1,'Hlo',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 04:05:45'),(29,1,'Kk',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 04:06:27'),(30,1,'Vhji',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 04:07:02'),(31,1,'Ccg',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 04:07:34'),(32,1,'Ghj',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 04:08:02'),(33,1,'Bbvjgkfthdufkjj',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 04:11:54'),(34,1,'Bhj',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 04:12:00'),(35,1,'Bnj',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 04:12:05'),(36,1,'Socket ping 1!',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 04:26:56'),(37,1,'Ping 2!',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 05:28:59'),(38,1,'Ping 3!',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 05:32:29'),(39,1,'Ping 4!',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 05:33:34'),(40,1,'Ping 5!',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 05:33:43'),(41,1,'Ping 6!',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 05:35:38'),(42,1,'Ping&nbsp;',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 05:35:43'),(43,1,'Ping 7;',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 05:35:49'),(44,1,'Ping 10!',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 05:40:58'),(45,1,'Ping 11',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 05:42:22'),(46,1,'Ping 16',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 05:42:30'),(47,1,'47',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 05:59:03'),(48,1,'5999',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 05:59:14'),(49,1,'10',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 06:35:08'),(50,1,'1245790',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 07:07:48'),(51,1,'Nnn',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 07:07:53'),(52,1,'',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 07:08:05'),(53,1,'','http://localhost:3000/api/uploaded/37c12d10-7ffa-42a7-a05e-46c4493e6984.jpg','5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 07:13:04'),(54,1,'','http://localhost:3000/api/uploaded/2b61fe05-5c31-43de-87ab-11bb4d01b1b6.jpg','5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 07:22:08'),(55,1,'Beautifull','http://localhost:3000/api/uploaded/370e678a-175d-4347-9783-9d40aed45151.jpg','5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 07:22:27'),(56,1,'Hello World!',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 08:40:44'),(57,1,'Xin chào&nbsp;',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-30 08:42:13'),(58,28,'Hhj',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-02-01 01:00:18'),(59,28,'Nnn',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-02-01 01:00:23'),(60,28,'nodejs',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-02-01 01:42:25'),(61,28,'Nodejs v14',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-02-01 01:42:33'),(62,28,'V15',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-02-01 01:42:38'),(63,28,'V16',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-02-01 01:42:43'),(64,28,'Hel',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-02-01 14:40:37'),(65,28,'Jelo',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-02-01 14:40:42'),(66,28,'Nc',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-02-01 14:40:46');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commentsInComment`
--

DROP TABLE IF EXISTS `commentsInComment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `commentsInComment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuidComment` int(11) NOT NULL,
  `contents` text NOT NULL,
  `url` text DEFAULT NULL,
  `uuid` varchar(36) NOT NULL,
  `lastModifier` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commentsInComment`
--

LOCK TABLES `commentsInComment` WRITE;
/*!40000 ALTER TABLE `commentsInComment` DISABLE KEYS */;
INSERT INTO `commentsInComment` VALUES (1,1,'hello',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-29 12:49:10'),(2,63,'Cxđ',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-02-01 11:30:27'),(3,63,'Yt',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-02-01 13:05:30'),(4,63,'Fv',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-02-01 13:42:21'),(5,63,'C',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-02-01 13:43:17'),(6,63,'S',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-02-01 13:44:06'),(7,63,'X',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-02-01 13:45:55'),(8,63,'X','http://localhost:3000/api/uploaded/7b695de5-7099-4486-9ce1-a5de74dd2d2c.jpg','5c808573-5be3-11eb-be24-3a066e16236d','2021-02-01 13:47:45'),(9,63,'2',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-02-01 13:52:47'),(10,63,'78',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-02-01 13:52:51'),(11,63,'B',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-02-01 14:28:55'),(12,63,'M',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-02-01 14:28:59'),(13,63,'Mm',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-02-01 14:29:05'),(14,63,'Gg',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-02-01 14:30:38'),(15,63,'V',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-02-01 14:30:46'),(16,63,'Fg',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-02-01 14:30:50'),(17,63,'Gg',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-02-01 14:30:55'),(18,63,'V',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-02-01 14:31:00'),(19,63,'V',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-02-01 14:31:04'),(20,63,'V',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-02-01 14:31:07'),(21,63,'1',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-02-01 14:31:33'),(22,63,'2',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-02-01 14:31:36'),(23,63,'3',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-02-01 14:31:40'),(24,63,'4',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-02-01 14:31:44'),(25,63,'5',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-02-01 14:31:48'),(26,63,'6',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-02-01 14:31:53'),(27,63,'8',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-02-01 14:31:56'),(28,63,'9',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-02-01 14:31:59'),(29,63,'10',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-02-01 14:32:02'),(30,63,'11',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-02-01 14:32:05'),(31,63,'12',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-02-01 14:32:09'),(32,63,'Good',NULL,'5c808573-5be3-11eb-be24-3a066e16236d','2021-02-01 14:40:22');
/*!40000 ALTER TABLE `commentsInComment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jwt_evict`
--

DROP TABLE IF EXISTS `jwt_evict`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jwt_evict` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jwt_evict`
--

LOCK TABLES `jwt_evict` WRITE;
/*!40000 ALTER TABLE `jwt_evict` DISABLE KEYS */;
/*!40000 ALTER TABLE `jwt_evict` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `liked`
--

DROP TABLE IF EXISTS `liked`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `liked` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuidPoster` int(11) NOT NULL,
  `uuid` varchar(36) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=108 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `liked`
--

LOCK TABLES `liked` WRITE;
/*!40000 ALTER TABLE `liked` DISABLE KEYS */;
INSERT INTO `liked` VALUES (57,3,'5c808573-5be3-11eb-be24-3a066e16236d'),(58,23,'5c808573-5be3-11eb-be24-3a066e16236d'),(60,24,'5c808573-5be3-11eb-be24-3a066e16236d'),(64,25,'5c808573-5be3-11eb-be24-3a066e16236d'),(105,1,'5c808573-5be3-11eb-be24-3a066e16236d'),(107,28,'5c808573-5be3-11eb-be24-3a066e16236d');
/*!40000 ALTER TABLE `liked` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likedAnswer`
--

DROP TABLE IF EXISTS `likedAnswer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `likedAnswer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuidAnswer` int(11) NOT NULL,
  `uuid` varchar(36) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likedAnswer`
--

LOCK TABLES `likedAnswer` WRITE;
/*!40000 ALTER TABLE `likedAnswer` DISABLE KEYS */;
/*!40000 ALTER TABLE `likedAnswer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likedInComment`
--

DROP TABLE IF EXISTS `likedInComment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `likedInComment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuidComment` int(11) NOT NULL,
  `uuid` varchar(36) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likedInComment`
--

LOCK TABLES `likedInComment` WRITE;
/*!40000 ALTER TABLE `likedInComment` DISABLE KEYS */;
INSERT INTO `likedInComment` VALUES (7,55,'5c808573-5be3-11eb-be24-3a066e16236d'),(8,54,'5c808573-5be3-11eb-be24-3a066e16236d'),(9,53,'5c808573-5be3-11eb-be24-3a066e16236d'),(10,52,'5c808573-5be3-11eb-be24-3a066e16236d'),(11,51,'5c808573-5be3-11eb-be24-3a066e16236d'),(12,50,'5c808573-5be3-11eb-be24-3a066e16236d'),(13,49,'5c808573-5be3-11eb-be24-3a066e16236d'),(14,57,'5c808573-5be3-11eb-be24-3a066e16236d'),(16,58,'5c808573-5be3-11eb-be24-3a066e16236d'),(33,61,'5c808573-5be3-11eb-be24-3a066e16236d'),(41,20,'5c808573-5be3-11eb-be24-3a066e16236d'),(42,19,'5c808573-5be3-11eb-be24-3a066e16236d'),(43,18,'5c808573-5be3-11eb-be24-3a066e16236d'),(44,17,'5c808573-5be3-11eb-be24-3a066e16236d'),(45,16,'5c808573-5be3-11eb-be24-3a066e16236d'),(46,15,'5c808573-5be3-11eb-be24-3a066e16236d'),(49,59,'5c808573-5be3-11eb-be24-3a066e16236d');
/*!40000 ALTER TABLE `likedInComment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oldPassword`
--

DROP TABLE IF EXISTS `oldPassword`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `oldPassword` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) NOT NULL,
  `hash` varchar(40) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oldPassword`
--

LOCK TABLES `oldPassword` WRITE;
/*!40000 ALTER TABLE `oldPassword` DISABLE KEYS */;
/*!40000 ALTER TABLE `oldPassword` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `photos`
--

DROP TABLE IF EXISTS `photos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `photos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` text NOT NULL,
  `uuidPoster` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photos`
--

LOCK TABLES `photos` WRITE;
/*!40000 ALTER TABLE `photos` DISABLE KEYS */;
INSERT INTO `photos` VALUES (2,'http://localhost:3000/api/posts/upload/b7cc42a4-495f-4289-b534-21ad48a30ea6.jpg',20),(3,'http://localhost:3000/api/posts/upload/b239efd9-facd-478e-9175-3c3601db4c9c.jpg',23),(4,'http://localhost:3000/api/posts/upload/2f35bbb9-5334-42b8-abde-a0bc32c8dc49.png',23),(5,'http://localhost:3000/api/posts/upload/cab2f48a-3f9e-462d-9f4f-e49a5e9865be.jpg',24),(6,'http://localhost:3000/api/posts/upload/b53be1a0-7b9f-4559-9a66-d57113e72f87.jpg',25),(7,'http://localhost:3000/api/posts/upload/97b4c8c8-cc69-45d4-9c5c-69df8eb4eb7e.jpg',26),(8,'http://localhost:3000/api/posts/upload/d67e8bbc-30a7-40c8-9354-b75c0b8ccadd.jpg',26),(9,'http://localhost:3000/api/posts/upload/f912232d-7f36-4b25-8582-162682388633.jpg',1),(10,'http://localhost:3000/api/posts/upload/06a574db-a85f-4248-94c7-d7d11db1913e.jpg',1),(11,'http://localhost:3000/api/posts/upload/a30a6970-7067-4579-b49d-911708023320.jpg',2),(12,'http://localhost:3000/api/posts/upload/2d770387-4fca-4ebd-9cef-c28df1bae8bc.jpg',2),(13,'http://localhost:3000/api/posts/upload/6263c5f1-be2c-4b6f-a368-3122b9480afb.jpg',28),(14,'http://localhost:3000/api/posts/upload/c50d1cfa-199b-4efe-aa36-d49ad7f20245.jpg',28);
/*!40000 ALTER TABLE `photos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) NOT NULL,
  `lastModifier` timestamp NOT NULL DEFAULT current_timestamp(),
  `contents` text DEFAULT '',
  `subject` tinytext NOT NULL DEFAULT 'OTHER',
  `point` int(3) NOT NULL DEFAULT 10,
  `class` int(2) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-21 13:10:24','Good','OTHER',100,12),(3,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-22 19:31:26','Hello','LITERATURE',10,1),(4,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-22 19:33:17','Hello','LITERATURE',10,1),(5,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-22 19:36:09','Nxnxnxnxmxm','LITERATURE',10,1),(6,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-22 19:49:51','Mxmmxmx','LITERATURE',10,1),(7,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-22 19:50:59','M','LITERATURE',10,1),(8,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-22 20:15:11','Fjffjfjf','LITERATURE',10,1),(9,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-22 20:48:55','Gsgss','LITERATURE',10,1),(10,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-22 20:52:12','Jdjdjdjd','LITERATURE',10,1),(11,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-22 20:58:10','DksksksN','LITERATURE',10,1),(12,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-22 21:00:34','<a href=\"https://google.com\" target=\"_blank\">https://google.com</a>','LITERATURE',10,1),(13,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-22 21:01:10','<a href=\"https://facebook.com\" target=\"_blank\">https://facebook.com</a>','LITERATURE',10,1),(14,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-22 21:04:06','Cujf','LITERATURE',10,1),(15,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-22 21:04:42','Hh','LITERATURE',10,1),(16,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-22 21:06:08','Gggg','LITERATURE',10,1),(17,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-23 06:47:09','<a href=\"Https://google.com/search?q=hello+world\" target=\"_blank\"><a href=\"Https://google.com/search?q=hello+world\" target=\"_blank\">Https://google.com/search?q=hello+world</a></a><div><br></div>','LITERATURE',10,1),(18,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-23 06:47:56','<a href=\"http://google.com/search?q=hallo\" target=\"_blank\">http://google.com/search?q=hallo</a>','LITERATURE',10,1),(19,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-23 08:04:58','undefined','LITERATURE',10,1),(20,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-23 08:05:46','Kxkxlslslslslsksks','LITERATURE',10,3),(21,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-23 08:59:12','Nbvjhh','LITERATURE',10,1),(22,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-23 08:59:55','Zjjz','LITERATURE',10,1),(23,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-23 09:00:51','.','LITERATURE',10,1),(24,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-26 10:21:38','Good','MUSIC_ART',10,12),(25,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-26 10:22:57','good','MUSIC_ART',100,12),(26,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-26 11:42:25','Good','MUSIC_ART',100,12),(27,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-27 04:41:01','Nxkdkdkodld<div><br></div><div>Kdkd</div>','LITERATURE',10,1),(28,'5c808573-5be3-11eb-be24-3a066e16236d','2021-01-27 04:43:53','Bnnn','LITERATURE',10,1);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) NOT NULL DEFAULT uuid(),
  `name` varchar(255) NOT NULL DEFAULT concat('user_',`uuid`),
  `email` varchar(255) NOT NULL,
  `class` varchar(4) DEFAULT NULL,
  `schoolName` mediumtext DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `password` varchar(40) NOT NULL,
  `city` mediumtext DEFAULT NULL,
  `typeLogin` mediumtext DEFAULT NULL,
  `avatar` mediumtext DEFAULT NULL,
  `lastModifier` timestamp NOT NULL DEFAULT current_timestamp(),
  `phone` varchar(10) DEFAULT NULL,
  `point` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'5c808573-5be3-11eb-be24-3a066e16236d','Nguyễn Thành','thanhnguyennguyen1995@gmail.com','12a9','THPT Đan Phượng','2003-11-28','4ac513323aab87c75a5f168675fbe3702519c5e6','Hà Nội',NULL,'http://localhost:3000/api/auth/upload/5c808573-5be3-11eb-be24-3a066e16236d.png','2021-01-21 12:57:27',NULL,770);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-01 22:11:05
