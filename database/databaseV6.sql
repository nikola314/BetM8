-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: localhost    Database: node-complete
-- ------------------------------------------------------
-- Server version	8.0.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `games`
--

DROP TABLE IF EXISTS `games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `games` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `team1` varchar(255) NOT NULL,
  `team2` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `result` int(11) DEFAULT NULL,
  `isProcessed` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `leagueId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `leagueId` (`leagueId`),
  CONSTRAINT `games_ibfk_1` FOREIGN KEY (`leagueId`) REFERENCES `leagues` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `games`
--

LOCK TABLES `games` WRITE;
/*!40000 ALTER TABLE `games` DISABLE KEYS */;
INSERT INTO `games` VALUES (1,'Liverpool','Tottenham','2019-09-29 00:38:55',NULL,0,'2019-01-30 00:38:55','2019-06-01 16:46:01',1),(2,'Barcelona','Ajax','2019-08-29 00:38:55',NULL,0,'2019-09-29 00:38:55','2019-09-29 00:38:55',1),(3,'Fulham','Wolverhampton','2019-09-13 00:38:55',NULL,0,'2019-09-29 00:38:55','2019-09-29 00:38:55',2),(4,'West Ham','Man Utd','2019-08-21 00:38:55',NULL,0,'2019-09-29 00:38:55','2019-09-29 00:38:55',2),(5,'Portland','Toronto','2019-07-10 00:38:55',NULL,0,'2019-09-29 00:38:55','2019-09-29 00:38:55',3),(6,'Denver','GSW','2019-06-29 00:38:55',NULL,0,'2019-09-29 00:38:55','2019-09-29 00:38:55',3),(7,'Novak Djokovic','Roger Federer','2019-08-05 00:38:55',NULL,0,'2019-09-29 00:38:55','2019-09-29 00:38:55',4),(8,'Rafael Nadal','Stanislas Wawrinka','2019-09-10 00:38:55',NULL,0,'2019-09-29 00:38:55','2019-09-29 00:38:55',4),(9,'Partizan','Crvena Zvezda','2019-09-02 00:38:55',NULL,0,'2019-09-29 00:38:55','2019-09-29 00:38:55',5),(10,'FMP','Mega','2019-07-12 00:38:55',NULL,0,'2019-09-29 00:38:55','2019-09-29 00:38:55',5);
/*!40000 ALTER TABLE `games` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leagues`
--

DROP TABLE IF EXISTS `leagues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `leagues` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `sport` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leagues`
--

LOCK TABLES `leagues` WRITE;
/*!40000 ALTER TABLE `leagues` DISABLE KEYS */;
INSERT INTO `leagues` VALUES (1,'Champions League','Football','2019-01-30 00:38:55','2019-01-30 00:38:55'),(2,'Premier League','Football','2019-01-30 00:38:55','2019-01-30 00:38:55'),(3,'NBA','Basketball','2019-01-30 00:38:55','2019-01-30 00:38:55'),(4,'Wimbledon','Tennis','2019-01-30 00:38:55','2019-01-30 00:38:55'),(5,'KLS','Basketball','2019-01-30 00:38:55','2019-01-30 00:38:55');
/*!40000 ALTER TABLE `leagues` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `senderId` int(11) NOT NULL,
  `receiverId` int(11) NOT NULL,
  `message` varchar(255) NOT NULL,
  `isRead` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,3,5,'New join request in private room: Vecikina tajna sobica',1,'2019-06-01 16:59:37','2019-06-01 17:01:32'),(2,2,3,'New join request in private room: dimcetova privatna soba',1,'2019-06-01 17:00:53','2019-06-01 17:10:25'),(3,5,2,'New join request in private room: Najjaca privatna soba na svetu',1,'2019-06-01 17:01:30','2019-06-01 17:02:41'),(4,5,3,'Your request to join private room Vecikina tajna sobica has been accepted!',1,'2019-06-01 17:01:46','2019-06-01 17:10:25'),(5,2,5,'Your request to join private room Najjaca privatna soba na svetu has been accepted!',1,'2019-06-01 17:02:52','2019-06-01 17:09:46');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `predictions`
--

DROP TABLE IF EXISTS `predictions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `predictions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `result` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `gameId` int(11) DEFAULT NULL,
  `roomId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `gameId` (`gameId`),
  KEY `roomId` (`roomId`),
  CONSTRAINT `predictions_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `predictions_ibfk_2` FOREIGN KEY (`gameId`) REFERENCES `games` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `predictions_ibfk_3` FOREIGN KEY (`roomId`) REFERENCES `rooms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `predictions`
--

LOCK TABLES `predictions` WRITE;
/*!40000 ALTER TABLE `predictions` DISABLE KEYS */;
INSERT INTO `predictions` VALUES (1,1,'2019-06-01 17:09:22','2019-06-06 16:57:45',2,1,7),(2,1,'2019-06-01 17:09:26','2019-06-06 16:57:51',2,2,7),(3,1,'2019-06-01 17:09:29','2019-06-06 16:57:54',2,3,7),(4,1,'2019-06-01 17:09:32','2019-06-06 16:57:56',2,4,7),(5,3,'2019-06-01 17:09:54','2019-06-01 17:09:54',5,1,7),(6,3,'2019-06-01 17:09:56','2019-06-01 17:09:56',5,2,7),(7,2,'2019-06-01 17:09:57','2019-06-01 17:09:57',5,3,7),(8,3,'2019-06-01 17:10:47','2019-06-06 16:58:21',3,1,7),(9,3,'2019-06-01 17:10:50','2019-06-01 17:10:50',3,2,7),(10,3,'2019-06-01 17:10:51','2019-06-01 17:10:51',3,3,7),(11,3,'2019-06-01 17:10:54','2019-06-06 16:58:26',3,4,7),(12,2,'2019-06-01 17:11:10','2019-06-06 16:58:53',4,4,7),(13,2,'2019-06-01 17:11:12','2019-06-06 16:58:52',4,3,7),(14,2,'2019-06-01 17:11:14','2019-06-06 16:58:51',4,2,7),(15,2,'2019-06-01 17:11:16','2019-06-06 16:58:48',4,1,7);
/*!40000 ALTER TABLE `predictions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `requests`
--

DROP TABLE IF EXISTS `requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `requests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `roomId` int(11) NOT NULL,
  `isActive` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `requests_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `requests`
--

LOCK TABLES `requests` WRITE;
/*!40000 ALTER TABLE `requests` DISABLE KEYS */;
INSERT INTO `requests` VALUES (1,6,0,'2019-06-01 16:59:37','2019-06-01 17:01:46',3),(2,2,1,'2019-06-01 17:00:53','2019-06-01 17:00:53',2),(3,4,0,'2019-06-01 17:01:30','2019-06-01 17:02:52',5);
/*!40000 ALTER TABLE `requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roomleagues`
--

DROP TABLE IF EXISTS `roomleagues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `roomleagues` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `roomId` int(11) DEFAULT NULL,
  `leagueId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roomleagues_leagueId_roomId_unique` (`roomId`,`leagueId`),
  KEY `leagueId` (`leagueId`),
  CONSTRAINT `roomleagues_ibfk_1` FOREIGN KEY (`roomId`) REFERENCES `rooms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `roomleagues_ibfk_2` FOREIGN KEY (`leagueId`) REFERENCES `leagues` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roomleagues`
--

LOCK TABLES `roomleagues` WRITE;
/*!40000 ALTER TABLE `roomleagues` DISABLE KEYS */;
INSERT INTO `roomleagues` VALUES (1,'2019-06-01 16:52:10','2019-06-01 16:52:10',1,3),(2,'2019-06-01 16:52:10','2019-06-01 16:52:10',1,5),(3,'2019-06-01 16:52:57','2019-06-01 16:52:57',2,4),(4,'2019-06-01 16:54:42','2019-06-01 16:54:42',3,1),(5,'2019-06-01 16:54:42','2019-06-01 16:54:42',3,2),(6,'2019-06-01 16:56:02','2019-06-01 16:56:02',4,3),(7,'2019-06-01 16:56:02','2019-06-01 16:56:02',4,5),(8,'2019-06-01 16:56:54','2019-06-01 16:56:54',5,4),(9,'2019-06-01 16:58:32','2019-06-01 16:58:32',6,3),(10,'2019-06-01 16:58:32','2019-06-01 16:58:32',6,5),(11,'2019-06-01 16:58:32','2019-06-01 16:58:32',7,1),(12,'2019-06-01 16:58:32','2019-06-01 16:58:32',7,2);
/*!40000 ALTER TABLE `roomleagues` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `rooms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `visibility` int(11) NOT NULL,
  `distributionType` int(11) NOT NULL,
  `scoringType` int(11) NOT NULL,
  `sport` int(11) NOT NULL,
  `minPlayers` int(11) NOT NULL,
  `maxPlayers` int(11) NOT NULL,
  `membersCount` int(11) NOT NULL,
  `entryFee` int(11) NOT NULL,
  `dateBegin` datetime NOT NULL,
  `dateEnd` datetime NOT NULL,
  `latestLeave` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (1,'dimcetova javna soba',1,2,3,2,3,10,2,100,'2019-07-04 00:00:00','2019-07-16 00:00:00','2019-06-03 00:00:00','2019-06-01 16:52:10','2019-06-01 16:59:58',3),(2,'dimcetova privatna soba',2,1,2,3,2,10,1,500,'2019-06-30 00:00:00','2019-07-31 00:00:00','2019-06-28 00:00:00','2019-06-01 16:52:57','2019-06-01 16:52:57',3),(3,'Najjaca soba na svetu',1,3,2,1,4,15,3,250,'2019-06-24 00:00:00','2019-07-25 00:00:00','2019-06-15 00:00:00','2019-06-01 16:54:42','2019-06-01 16:59:23',2),(4,'Najjaca privatna soba na svetu',2,1,3,2,2,15,2,200,'2019-07-17 00:00:00','2019-08-15 00:00:00','2019-06-30 00:00:00','2019-06-01 16:56:02','2019-06-01 17:02:52',2),(5,'Cili soba',1,2,1,3,3,10,2,150,'2019-06-16 00:00:00','2019-06-30 00:00:00','2019-06-04 00:00:00','2019-06-01 16:56:54','2019-06-01 17:00:29',4),(6,'Vecikina tajna sobica',2,2,2,2,3,10,2,1000,'2019-06-29 00:00:00','2019-07-28 00:00:00','2019-06-25 00:00:00','2019-06-01 16:58:32','2019-06-01 17:01:46',5),(7,'Sobica koja radi',1,2,2,1,3,10,4,500,'2019-06-01 19:12:00','2019-07-28 00:00:00','2019-05-25 00:00:00','2019-06-01 16:58:32','2019-06-01 16:58:32',NULL);
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userrooms`
--

DROP TABLE IF EXISTS `userrooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `userrooms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `points` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `roomId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `userrooms_roomId_userId_unique` (`userId`,`roomId`),
  KEY `roomId` (`roomId`),
  CONSTRAINT `userrooms_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `userrooms_ibfk_2` FOREIGN KEY (`roomId`) REFERENCES `rooms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userrooms`
--

LOCK TABLES `userrooms` WRITE;
/*!40000 ALTER TABLE `userrooms` DISABLE KEYS */;
INSERT INTO `userrooms` VALUES (1,0,'2019-06-01 16:52:10','2019-06-01 16:52:10',3,1),(2,0,'2019-06-01 16:52:57','2019-06-01 16:52:57',3,2),(3,0,'2019-06-01 16:54:42','2019-06-01 16:54:42',2,3),(4,0,'2019-06-01 16:56:02','2019-06-01 16:56:02',2,4),(5,0,'2019-06-01 16:56:54','2019-06-01 16:56:54',4,5),(6,0,'2019-06-01 16:58:32','2019-06-01 16:58:32',5,6),(7,0,'2019-06-01 16:58:53','2019-06-01 16:58:53',5,3),(8,0,'2019-06-01 16:59:23','2019-06-01 16:59:23',3,3),(9,0,'2019-06-01 16:59:58','2019-06-01 16:59:58',2,1),(10,0,'2019-06-01 17:00:29','2019-06-01 17:00:29',2,5),(11,0,'2019-06-01 17:01:46','2019-06-01 17:01:46',3,6),(12,0,'2019-06-01 17:02:52','2019-06-01 17:02:52',5,4),(13,0,'2019-06-01 16:58:32','2019-06-01 16:58:32',5,7),(14,0,'2019-06-01 16:58:32','2019-06-01 16:58:32',4,7),(15,0,'2019-06-01 16:58:32','2019-06-01 16:58:32',3,7),(16,0,'2019-06-01 16:58:32','2019-06-01 16:58:32',2,7);
/*!40000 ALTER TABLE `userrooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `country` varchar(255) DEFAULT NULL,
  `type` int(11) NOT NULL,
  `money` int(11) NOT NULL,
  `canCreateRoom` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin','Admin','admin','$2a$12$8CX68YyxmaVEfWEN.avx7OAJFuJqisLZuqFOrujnF17VEHusPUWo2','admin@gmail.com','Serbia',2,20000,1,1,'2019-06-06 16:46:32','2019-06-06 16:46:32'),(2,'Nikola','Kesic','nikola314','$2a$12$MPGoDadtlBhd/5t0MfqwhOsqATkXcGl19LmBakodRV3kbbbSsrNVG','nikola.kesic97@gmail.com','Saint Helena',2,19300,1,1,'2019-06-01 16:36:13','2019-06-01 17:00:29'),(3,'Dimitrije','Milenkovic','dimce16578','$2a$12$Ux4POqw.sR20GY179STiweb.VzF3RWNzOAjKpATlPcFqDkmxxN2Ma','dimce@gmail.com','Papua New Guinea',1,8150,1,1,'2019-06-01 16:47:45','2019-06-06 16:45:16'),(4,'Jelena','Ilic','cili','$2a$12$/FL2gmxpJHAos4MJlJzXEuA9rDw6F/Rapw6BzaY6RqEEMsvOkxzrC','cili@gmail.com','Guinea-bissau',1,9850,1,1,'2019-06-01 16:48:09','2019-06-01 16:56:55'),(5,'Nikola','Veljanoski','velja','$2a$12$m11AKWE2gC3Lsv4epE.pBeYsokJy3rASSL4tzYDvuKrghY.V25/lO','velja@gmail.com','Saint Helena',1,8550,1,1,'2019-06-01 16:48:33','2019-06-01 17:02:52'),(6,'Filip','Hadzic','hadzic','$2a$12$fmCKypxUoOL3kGm6wxp5t.txUexgScP/JbFJtEDkD22FvZDNSLP9q','hadzic@gmail.com','Pitcairn',0,0,1,1,'2019-06-01 16:48:58','2019-06-01 17:02:20');
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

-- Dump completed on 2019-06-06 19:00:01
