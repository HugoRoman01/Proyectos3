-- MariaDB dump 10.19  Distrib 10.5.12-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: sportDB
-- ------------------------------------------------------
-- Server version	10.5.12-MariaDB-1

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
-- Table structure for table `Deportes`
--

DROP TABLE IF EXISTS `Deportes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Deportes` (
  `ID_deporte` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_deporte` varchar(100) NOT NULL,
  `modalidad_deporte` varchar(100) NOT NULL,
  PRIMARY KEY (`ID_deporte`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Deportes`
--

LOCK TABLES `Deportes` WRITE;
/*!40000 ALTER TABLE `Deportes` DISABLE KEYS */;
/*!40000 ALTER TABLE `Deportes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Evento_pista`
--

DROP TABLE IF EXISTS `Evento_pista`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Evento_pista` (
  `ID_evento` int(11) NOT NULL,
  `ID_pista` int(11) NOT NULL,
  PRIMARY KEY (`ID_evento`,`ID_pista`),
  KEY `Evento_pista_Pistas_FK` (`ID_pista`),
  CONSTRAINT `Evento_pista_Eventos_FK` FOREIGN KEY (`ID_evento`) REFERENCES `Eventos` (`ID_evento`),
  CONSTRAINT `Evento_pista_Pistas_FK` FOREIGN KEY (`ID_pista`) REFERENCES `Pistas` (`ID_pista`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Evento_pista`
--

LOCK TABLES `Evento_pista` WRITE;
/*!40000 ALTER TABLE `Evento_pista` DISABLE KEYS */;
/*!40000 ALTER TABLE `Evento_pista` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Eventos`
--

DROP TABLE IF EXISTS `Eventos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Eventos` (
  `ID_evento` int(11) NOT NULL AUTO_INCREMENT,
  `ID_usuario` int(11) NOT NULL,
  `ID_deporte` int(11) NOT NULL,
  `n_participantes` int(11) NOT NULL,
  `participantes_actual` int(11) NOT NULL,
  `evento_activo` tinyint(1) NOT NULL,
  `fecha_ini` datetime NOT NULL,
  `fecha_fin` datetime NOT NULL,
  `fecha_evento` datetime NOT NULL,
  PRIMARY KEY (`ID_evento`),
  KEY `Eventos_Usuarios_FK` (`ID_usuario`),
  KEY `Eventos_Deportes_FK` (`ID_deporte`),
  CONSTRAINT `Eventos_Deportes_FK` FOREIGN KEY (`ID_deporte`) REFERENCES `Deportes` (`ID_deporte`),
  CONSTRAINT `Eventos_Usuarios_FK` FOREIGN KEY (`ID_usuario`) REFERENCES `Usuarios` (`ID_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Eventos`
--

LOCK TABLES `Eventos` WRITE;
/*!40000 ALTER TABLE `Eventos` DISABLE KEYS */;
/*!40000 ALTER TABLE `Eventos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Integrantes`
--

DROP TABLE IF EXISTS `Integrantes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Integrantes` (
  `ID_usuario` int(11) NOT NULL,
  `ID_evento` int(11) NOT NULL,
  PRIMARY KEY (`ID_usuario`,`ID_evento`),
  KEY `Integrantes_Eventos_FK` (`ID_evento`),
  CONSTRAINT `Integrantes_Eventos_FK` FOREIGN KEY (`ID_evento`) REFERENCES `Eventos` (`ID_evento`),
  CONSTRAINT `Integrantes_Usuarios_FK` FOREIGN KEY (`ID_usuario`) REFERENCES `Usuarios` (`ID_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Integrantes`
--

LOCK TABLES `Integrantes` WRITE;
/*!40000 ALTER TABLE `Integrantes` DISABLE KEYS */;
/*!40000 ALTER TABLE `Integrantes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Pistas`
--

DROP TABLE IF EXISTS `Pistas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Pistas` (
  `ID_pista` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_pista` varchar(100) NOT NULL,
  PRIMARY KEY (`ID_pista`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Pistas`
--

LOCK TABLES `Pistas` WRITE;
/*!40000 ALTER TABLE `Pistas` DISABLE KEYS */;
/*!40000 ALTER TABLE `Pistas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Usuarios`
--

DROP TABLE IF EXISTS `Usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Usuarios` (
  `ID_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `nombreYapellido` varchar(150) NOT NULL,
  `nombreUsuario` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`ID_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Usuarios`
--

LOCK TABLES `Usuarios` WRITE;
/*!40000 ALTER TABLE `Usuarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `Usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'sportDB'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-28 13:50:24
