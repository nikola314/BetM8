CREATE DATABASE  IF NOT EXISTS `db_betm8` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `db_betm8`;
-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: localhost    Database: db_betm8
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
-- Table structure for table `game`
--

DROP TABLE IF EXISTS `game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `game` (
  `idGame` int(11) NOT NULL AUTO_INCREMENT,
  `team1` varchar(20) NOT NULL,
  `team2` varchar(20) NOT NULL,
  `idLeague` int(11) NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`idGame`),
  KEY `fk_Utakmica_Liga1_idx` (`idLeague`),
  CONSTRAINT `fk_Utakmica_Liga1` FOREIGN KEY (`idLeague`) REFERENCES `league` (`idleague`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game`
--

LOCK TABLES `game` WRITE;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
INSERT INTO `game` VALUES (1,'Barcelona','Liverpool',1,'2019-07-07 21:00:00'),(2,'Mancheser City','Leicester',2,'2019-07-05 21:00:00');
/*!40000 ALTER TABLE `game` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `league`
--

DROP TABLE IF EXISTS `league`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `league` (
  `idLeague` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `sport` varchar(20) NOT NULL,
  PRIMARY KEY (`idLeague`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `league`
--

LOCK TABLES `league` WRITE;
/*!40000 ALTER TABLE `league` DISABLE KEYS */;
INSERT INTO `league` VALUES (1,'Champions League','Football'),(2,'Premier League','Football');
/*!40000 ALTER TABLE `league` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prediction`
--

DROP TABLE IF EXISTS `prediction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `prediction` (
  `idPrediction` int(11) NOT NULL AUTO_INCREMENT,
  `Prognoza` char(1) NOT NULL,
  `idGame` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `idRoom` int(11) NOT NULL,
  PRIMARY KEY (`idPrediction`),
  KEY `fk_Predikcija_Utakmica1_idx` (`idGame`),
  KEY `fk_Predikcija_KorisnikSoba1_idx` (`idUser`,`idRoom`),
  CONSTRAINT `fk_Predikcija_KorisnikSoba1` FOREIGN KEY (`idUser`, `idRoom`) REFERENCES `userroom` (`iduser`, `idroom`) ON DELETE CASCADE,
  CONSTRAINT `fk_Predikcija_Utakmica1` FOREIGN KEY (`idGame`) REFERENCES `game` (`idgame`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prediction`
--

LOCK TABLES `prediction` WRITE;
/*!40000 ALTER TABLE `prediction` DISABLE KEYS */;
INSERT INTO `prediction` VALUES (1,'1',1,1,1);
/*!40000 ALTER TABLE `prediction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `room` (
  `idRoom` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `visibility` tinyint(4) NOT NULL,
  `distributionType` int(11) NOT NULL,
  `scoringType` int(11) NOT NULL,
  `sport` int(11) NOT NULL,
  `minPlayers` int(11) NOT NULL,
  `maxPlayers` int(11) NOT NULL,
  `bet` int(11) NOT NULL,
  `dateBegin` datetime NOT NULL,
  `dateEnd` datetime NOT NULL,
  `dateCancel` datetime NOT NULL,
  `admin` int(11) NOT NULL,
  PRIMARY KEY (`idRoom`),
  KEY `fk_Soba_Korisnik1_idx` (`admin`),
  CONSTRAINT `fk_Soba_Korisnik1` FOREIGN KEY (`admin`) REFERENCES `user` (`iduser`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (1,'Najjaca room',1,1,1,1,1,4,500,'2019-06-01 12:00:00','2019-08-01 12:00:00','2019-05-29 12:00:00',1);
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roomleague`
--

DROP TABLE IF EXISTS `roomleague`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `roomleague` (
  `idLeague` int(11) NOT NULL,
  `idRoom` int(11) NOT NULL,
  PRIMARY KEY (`idLeague`,`idRoom`),
  KEY `fk_Liga_has_Soba_Soba1_idx` (`idRoom`),
  KEY `fk_Liga_has_Soba_Liga1_idx` (`idLeague`),
  CONSTRAINT `fk_Liga_has_Soba_Liga1` FOREIGN KEY (`idLeague`) REFERENCES `league` (`idleague`) ON DELETE CASCADE,
  CONSTRAINT `fk_Liga_has_Soba_Soba1` FOREIGN KEY (`idRoom`) REFERENCES `room` (`idroom`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roomleague`
--

LOCK TABLES `roomleague` WRITE;
/*!40000 ALTER TABLE `roomleague` DISABLE KEYS */;
INSERT INTO `roomleague` VALUES (1,1),(2,1);
/*!40000 ALTER TABLE `roomleague` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `idUser` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(20) NOT NULL,
  `lastName` varchar(20) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(40) NOT NULL,
  `mail` varchar(40) NOT NULL,
  `country` varchar(30) NOT NULL,
  `type` int(11) NOT NULL,
  `money` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `isAdmin` tinyint(4) NOT NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `mail_UNIQUE` (`mail`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Nikola','Kesic','nikola314','nikola','nikola.kesic97@gmail.com','Srbija',1,20000,1,1),(2,'Dimitrije','Milenkovic','dimce16578','dimce','dimitrije.milenkovic997@gmail.com','Srbija',1,20000,1,1),(3,'Nikola','Veljanovski','nikola_velja','velja','veljin.mail@gmail.com','Srbija',1,20000,1,0),(4,'Jelena','Ilic','cili97','cili','cili.mail@gmail.com','Srbija',1,20000,1,0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userroom`
--

DROP TABLE IF EXISTS `userroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `userroom` (
  `idUser` int(11) NOT NULL,
  `idRoom` int(11) NOT NULL,
  `points` int(11) NOT NULL,
  PRIMARY KEY (`idUser`,`idRoom`),
  KEY `fk_Korisnik_has_Soba_Soba1_idx` (`idRoom`),
  KEY `fk_Korisnik_has_Soba_Korisnik_idx` (`idUser`),
  CONSTRAINT `fk_Korisnik_has_Soba_Korisnik` FOREIGN KEY (`idUser`) REFERENCES `user` (`iduser`),
  CONSTRAINT `fk_Korisnik_has_Soba_Soba1` FOREIGN KEY (`idRoom`) REFERENCES `room` (`idroom`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userroom`
--

LOCK TABLES `userroom` WRITE;
/*!40000 ALTER TABLE `userroom` DISABLE KEYS */;
INSERT INTO `userroom` VALUES (1,1,0),(2,1,0),(3,1,0);
/*!40000 ALTER TABLE `userroom` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-07 13:13:16
