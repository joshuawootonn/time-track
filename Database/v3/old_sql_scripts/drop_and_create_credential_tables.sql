
DROP TABLE IF EXISTS `time-track`.`ACL` ;

CREATE TABLE IF NOT EXISTS `time-track`.`ACL` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `model` varchar(512) DEFAULT NULL,
 `property` varchar(512) DEFAULT NULL,
 `accessType` varchar(512) DEFAULT NULL,
 `permission` varchar(512) DEFAULT NULL,
 `principalType` varchar(512) DEFAULT NULL,
 `principalId` varchar(512) DEFAULT NULL,
 PRIMARY KEY (`id`)
 ) ENGINE=InnoDB;



DROP TABLE IF EXISTS `time-track`.`AccessToken` ;

CREATE TABLE IF NOT EXISTS `time-track`.`AccessToken` (
   `id` varchar(255) NOT NULL,
   `ttl` int(11) DEFAULT NULL,
   `scopes` text,
   `created` datetime DEFAULT NULL,
   `userId` int(11) DEFAULT NULL,
   PRIMARY KEY (`id`)
 ) ENGINE=InnoDB;


DROP TABLE IF EXISTS `time-track`.`User` ;

CREATE TABLE IF NOT EXISTS `time-track`.`User` (
   `id` int(11) NOT NULL AUTO_INCREMENT,
   `realm` varchar(512) DEFAULT NULL,
   `username` varchar(512) DEFAULT NULL,
   `password` varchar(512) NOT NULL,
   `email` varchar(512) NOT NULL,
   `emailVerified` tinyint(1) DEFAULT NULL,
   `verificationToken` varchar(512) DEFAULT NULL,
   PRIMARY KEY (`id`)
 ) ENGINE=InnoDB ;


DROP TABLE IF EXISTS `time-track`.`Role` ;

CREATE TABLE IF NOT EXISTS `time-track`.`Role` (
   `id` int(11) NOT NULL AUTO_INCREMENT,
   `name` varchar(512) NOT NULL,
   `description` varchar(512) DEFAULT NULL,
   `created` datetime DEFAULT NULL,
   `modified` datetime DEFAULT NULL,
   PRIMARY KEY (`id`)
 ) ENGINE=InnoDB ;


DROP TABLE IF EXISTS `time-track`.`RoleMapping` ;

CREATE TABLE IF NOT EXISTS `time-track`.`RoleMapping` (
   `id` int(11) NOT NULL AUTO_INCREMENT,
   `principalType` varchar(512) DEFAULT NULL,
   `principalId` varchar(255) DEFAULT NULL,
   `roleId` int(11) DEFAULT NULL,
   PRIMARY KEY (`id`),
   KEY `principalId` (`principalId`)
 ) ENGINE=InnoDB;