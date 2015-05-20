-- 05/19/15
CREATE TABLE `incident` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `referenceId` int(11) NOT NULL,
  `date` date NOT NULL,
  `timeOfDay` int(11) DEFAULT NULL,
  `incidentType` int(11) DEFAULT NULL,
  `incidentAction` int(11) DEFAULT NULL,
  `latitude` float NOT NULL,
  `longitude` float NOT NULL,
  `closestCountry` int(11) DEFAULT NULL,
  `waterCountry` int(11) DEFAULT NULL,
  `locationDescription` varchar(255) DEFAULT NULL,
  `vesselName` varchar(255) DEFAULT NULL,
  `vesselType` int(11) DEFAULT NULL,
  `vesselCountry` int(11) DEFAULT NULL,
  `vesselStatus` int(11) DEFAULT NULL,
  `violenceDummy` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `referenceId` (`referenceId`)
) ENGINE=InnoDB AUTO_INCREMENT=6342 DEFAULT CHARSET=latin1;
