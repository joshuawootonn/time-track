-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: time-track-database
-- ------------------------------------------------------
-- Server version	5.7.18-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `dimensionlist`
--

DROP TABLE IF EXISTS `dimensionlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dimensionlist` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dimensionlist`
--

LOCK TABLES `dimensionlist` WRITE;
/*!40000 ALTER TABLE `dimensionlist` DISABLE KEYS */;
INSERT INTO `dimensionlist` VALUES (0,'AC'),(1,'EA'),(2,'LS'),(3,'TON'),(4,'LI'),(5,'LF'),(6,'LY'),(7,'SI'),(8,'SF'),(9,'SY'),(10,'CI'),(11,'CF'),(12,'CY');
/*!40000 ALTER TABLE `dimensionlist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employeelist`
--

DROP TABLE IF EXISTS `employeelist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employeelist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `pin` int(11) NOT NULL,
  `adminstatus` int(11) NOT NULL,
  `shiftcount` int(11) NOT NULL,
  `active` int(11) NOT NULL,
  `current` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employeelist`
--

LOCK TABLES `employeelist` WRITE;
/*!40000 ALTER TABLE `employeelist` DISABLE KEYS */;
INSERT INTO `employeelist` VALUES (64,'Admin',1111,1,1,0,1);
/*!40000 ALTER TABLE `employeelist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `itemlist`
--

DROP TABLE IF EXISTS `itemlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itemlist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `category` varchar(45) DEFAULT NULL,
  `subcategory` varchar(45) DEFAULT NULL,
  `dimension` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itemlist`
--

LOCK TABLES `itemlist` WRITE;
/*!40000 ALTER TABLE `itemlist` DISABLE KEYS */;
/*!40000 ALTER TABLE `itemlist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projectlist`
--

DROP TABLE IF EXISTS `projectlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projectlist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `current` varchar(45) NOT NULL,
  `date` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projectlist`
--

LOCK TABLES `projectlist` WRITE;
/*!40000 ALTER TABLE `projectlist` DISABLE KEYS */;
/*!40000 ALTER TABLE `projectlist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shiftlist`
--

DROP TABLE IF EXISTS `shiftlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shiftlist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employeeid` int(11) DEFAULT NULL,
  `projectid` int(11) DEFAULT NULL,
  `itemid` int(11) DEFAULT NULL,
  `employeename` varchar(45) DEFAULT NULL,
  `projectname` varchar(45) DEFAULT NULL,
  `itemname` varchar(45) DEFAULT NULL,
  `timein` time(3) DEFAULT NULL,
  `timeout` time(3) DEFAULT NULL,
  `datein` date DEFAULT NULL,
  `dateout` date DEFAULT NULL,
  `timelunch` varchar(45) DEFAULT NULL,
  `time` varchar(45) DEFAULT NULL,
  `shiftid` int(11) NOT NULL,
  `description` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shiftlist`
--

LOCK TABLES `shiftlist` WRITE;
/*!40000 ALTER TABLE `shiftlist` DISABLE KEYS */;
/*!40000 ALTER TABLE `shiftlist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `timelist`
--

DROP TABLE IF EXISTS `timelist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `timelist` (
  `idtimelist` int(11) NOT NULL AUTO_INCREMENT,
  `time` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idtimelist`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `timelist`
--

LOCK TABLES `timelist` WRITE;
/*!40000 ALTER TABLE `timelist` DISABLE KEYS */;
INSERT INTO `timelist` VALUES (0,'15'),(1,'30'),(2,'45'),(3,'60'),(4,'00'),(5,'01'),(6,'02'),(7,'03'),(8,'04'),(9,'05'),(10,'06'),(11,'07'),(12,'08'),(13,'09'),(14,'10'),(15,'11'),(16,'12');
/*!40000 ALTER TABLE `timelist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-06-28 14:12:46
