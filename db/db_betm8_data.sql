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
-- Table structure for table `korisnik`
--

DROP TABLE IF EXISTS `korisnik`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `korisnik` (
  `idKorisnik` int(11) NOT NULL AUTO_INCREMENT,
  `Ime` varchar(20) NOT NULL,
  `Prezime` varchar(20) NOT NULL,
  `KorisnickoIme` varchar(20) NOT NULL,
  `Sifra` varchar(40) NOT NULL,
  `Email` varchar(40) NOT NULL,
  `Zemlja` varchar(30) NOT NULL,
  `Tip` int(11) NOT NULL,
  `Pare` int(11) NOT NULL,
  `Status` int(11) NOT NULL,
  PRIMARY KEY (`idKorisnik`),
  UNIQUE KEY `KorisnickoIme_UNIQUE` (`KorisnickoIme`),
  UNIQUE KEY `Email_UNIQUE` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `korisnik`
--

LOCK TABLES `korisnik` WRITE;
/*!40000 ALTER TABLE `korisnik` DISABLE KEYS */;
INSERT INTO `korisnik` VALUES (1,'Nikola','Kesic','nikola314','nikola','nikola.kesic97@gmail.com','Srbija',1,20000,1),(2,'Dimitrije','Milenkovic','dimce16578','dimce','dimitrije.milenkovic997@gmail.com','Srbija',1,20000,1),(3,'Nikola','Veljanovski','nikola_velja','velja','veljin.mail@gmail.com','Srbija',1,20000,1),(4,'Jelena','Ilic','cili97','cili','cili.mail@gmail.com','Srbija',1,20000,1);
/*!40000 ALTER TABLE `korisnik` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `korisniksoba`
--

DROP TABLE IF EXISTS `korisniksoba`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `korisniksoba` (
  `idKorisnik` int(11) NOT NULL,
  `idSoba` int(11) NOT NULL,
  `Poeni` int(11) NOT NULL,
  PRIMARY KEY (`idKorisnik`,`idSoba`),
  KEY `fk_Korisnik_has_Soba_Soba1_idx` (`idSoba`),
  KEY `fk_Korisnik_has_Soba_Korisnik_idx` (`idKorisnik`),
  CONSTRAINT `fk_Korisnik_has_Soba_Korisnik` FOREIGN KEY (`idKorisnik`) REFERENCES `korisnik` (`idkorisnik`),
  CONSTRAINT `fk_Korisnik_has_Soba_Soba1` FOREIGN KEY (`idSoba`) REFERENCES `soba` (`idsoba`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `korisniksoba`
--

LOCK TABLES `korisniksoba` WRITE;
/*!40000 ALTER TABLE `korisniksoba` DISABLE KEYS */;
INSERT INTO `korisniksoba` VALUES (1,1,0),(2,1,0),(3,1,0);
/*!40000 ALTER TABLE `korisniksoba` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `liga`
--

DROP TABLE IF EXISTS `liga`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `liga` (
  `idLiga` int(11) NOT NULL AUTO_INCREMENT,
  `Ime` varchar(20) NOT NULL,
  `Sport` varchar(20) NOT NULL,
  PRIMARY KEY (`idLiga`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `liga`
--

LOCK TABLES `liga` WRITE;
/*!40000 ALTER TABLE `liga` DISABLE KEYS */;
INSERT INTO `liga` VALUES (1,'Champions League','Football'),(2,'Premier League','Football');
/*!40000 ALTER TABLE `liga` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `predikcija`
--

DROP TABLE IF EXISTS `predikcija`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `predikcija` (
  `idPredikcija` int(11) NOT NULL AUTO_INCREMENT,
  `Prognoza` char(1) NOT NULL,
  `idUtakmica` int(11) NOT NULL,
  `idKorisnik` int(11) NOT NULL,
  `idSoba` int(11) NOT NULL,
  PRIMARY KEY (`idPredikcija`),
  KEY `fk_Predikcija_Utakmica1_idx` (`idUtakmica`),
  KEY `fk_Predikcija_KorisnikSoba1_idx` (`idKorisnik`,`idSoba`),
  CONSTRAINT `fk_Predikcija_KorisnikSoba1` FOREIGN KEY (`idKorisnik`, `idSoba`) REFERENCES `korisniksoba` (`idkorisnik`, `idsoba`) ON DELETE CASCADE,
  CONSTRAINT `fk_Predikcija_Utakmica1` FOREIGN KEY (`idUtakmica`) REFERENCES `utakmica` (`idutakmica`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `predikcija`
--

LOCK TABLES `predikcija` WRITE;
/*!40000 ALTER TABLE `predikcija` DISABLE KEYS */;
INSERT INTO `predikcija` VALUES (1,'1',1,1,1);
/*!40000 ALTER TABLE `predikcija` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `soba`
--

DROP TABLE IF EXISTS `soba`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `soba` (
  `idSoba` int(11) NOT NULL AUTO_INCREMENT,
  `Ime` varchar(20) NOT NULL,
  `Vidljivost` tinyint(4) NOT NULL,
  `NacinRaspodele` int(11) NOT NULL,
  `NacinBodovanja` int(11) NOT NULL,
  `Sport` int(11) NOT NULL,
  `MinBrIgraca` int(11) NOT NULL,
  `MaxBrIgraca` int(11) NOT NULL,
  `Ulog` int(11) NOT NULL,
  `DatumPocetka` datetime NOT NULL,
  `DatumKraja` datetime NOT NULL,
  `PoslednjiDanZaOdustajanje` datetime NOT NULL,
  `Admin` int(11) NOT NULL,
  PRIMARY KEY (`idSoba`),
  KEY `fk_Soba_Korisnik1_idx` (`Admin`),
  CONSTRAINT `fk_Soba_Korisnik1` FOREIGN KEY (`Admin`) REFERENCES `korisnik` (`idkorisnik`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `soba`
--

LOCK TABLES `soba` WRITE;
/*!40000 ALTER TABLE `soba` DISABLE KEYS */;
INSERT INTO `soba` VALUES (1,'Najjaca soba',1,1,1,1,1,4,500,'2019-06-01 12:00:00','2019-08-01 12:00:00','2019-05-29 12:00:00',1);
/*!40000 ALTER TABLE `soba` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sobaliga`
--

DROP TABLE IF EXISTS `sobaliga`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `sobaliga` (
  `idLiga` int(11) NOT NULL,
  `idSoba` int(11) NOT NULL,
  PRIMARY KEY (`idLiga`,`idSoba`),
  KEY `fk_Liga_has_Soba_Soba1_idx` (`idSoba`),
  KEY `fk_Liga_has_Soba_Liga1_idx` (`idLiga`),
  CONSTRAINT `fk_Liga_has_Soba_Liga1` FOREIGN KEY (`idLiga`) REFERENCES `liga` (`idliga`) ON DELETE CASCADE,
  CONSTRAINT `fk_Liga_has_Soba_Soba1` FOREIGN KEY (`idSoba`) REFERENCES `soba` (`idsoba`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sobaliga`
--

LOCK TABLES `sobaliga` WRITE;
/*!40000 ALTER TABLE `sobaliga` DISABLE KEYS */;
INSERT INTO `sobaliga` VALUES (1,1),(2,1);
/*!40000 ALTER TABLE `sobaliga` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utakmica`
--

DROP TABLE IF EXISTS `utakmica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `utakmica` (
  `idUtakmica` int(11) NOT NULL AUTO_INCREMENT,
  `Tim1` varchar(20) NOT NULL,
  `Tim2` varchar(20) NOT NULL,
  `idLiga` int(11) NOT NULL,
  `Datum` datetime NOT NULL,
  PRIMARY KEY (`idUtakmica`),
  KEY `fk_Utakmica_Liga1_idx` (`idLiga`),
  CONSTRAINT `fk_Utakmica_Liga1` FOREIGN KEY (`idLiga`) REFERENCES `liga` (`idliga`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utakmica`
--

LOCK TABLES `utakmica` WRITE;
/*!40000 ALTER TABLE `utakmica` DISABLE KEYS */;
INSERT INTO `utakmica` VALUES (1,'Barcelona','Liverpool',1,'2019-07-07 21:00:00'),(2,'Mancheser City','Leicester',2,'2019-07-05 21:00:00');
/*!40000 ALTER TABLE `utakmica` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-06 20:50:36
