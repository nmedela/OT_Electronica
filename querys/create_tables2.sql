CREATE DATABASE `ot_ebs_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

CREATE TABLE `clients` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `tel` varchar(15) DEFAULT NULL,
  `tel2` varchar(15) DEFAULT NULL,
  `mail` varchar(100) DEFAULT NULL,
  `mail2` varchar(100) DEFAULT NULL,
  `direction` varchar(50) DEFAULT NULL,
  `location` varchar(50) DEFAULT NULL,
  `cancel` tinyint(1) DEFAULT '0',
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `equipments` (
  `id` int(10) unsigned NOT NULL,
  `title` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `status` (
  `id` int(10) unsigned NOT NULL,
  `title` varchar(25) DEFAULT NULL,
  `icon` varchar(15) DEFAULT NULL,
  `color` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `work_orders` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `insert_time` datetime DEFAULT NULL,
  `code` varchar(32) DEFAULT NULL,
  `client_id` bigint(20) unsigned DEFAULT NULL,
  `admission_date` date DEFAULT NULL,
  `equipment_id` int(10) unsigned DEFAULT NULL,
  `brand` varchar(20) DEFAULT NULL,
  `model` varchar(20) DEFAULT NULL,
  `serial_number` varchar(32) DEFAULT NULL,
  `failure` varchar(100) DEFAULT NULL,
  `last_status` int(10) unsigned DEFAULT NULL,
  `last_observation` varchar(100) DEFAULT NULL,
  `deliver_date` date DEFAULT NULL,
  `warranty` int(11) DEFAULT NULL,
  `final_amount` double DEFAULT NULL,
  `cancel` tinyint(1) DEFAULT '0',
  UNIQUE KEY `id` (`id`),
  KEY `client_id` (`client_id`),
  KEY `last_status` (`last_status`),
  KEY `equipment_id` (`equipment_id`),
  CONSTRAINT `client_id` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `equipment_id` FOREIGN KEY (`equipment_id`) REFERENCES `equipments` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `last_status` FOREIGN KEY (`last_status`) REFERENCES `status` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `history` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `id_wo` bigint(20) unsigned DEFAULT NULL,
  `date_status` date DEFAULT NULL,
  `id_status` int(10) unsigned DEFAULT NULL,
  `observation` varchar(100) DEFAULT NULL,
  `insert_time` datetime DEFAULT NULL,
  UNIQUE KEY `id` (`id`),
  KEY `id_wo` (`id_wo`),
  KEY `id_status` (`id_status`),
  CONSTRAINT `id_status` FOREIGN KEY (`id_status`) REFERENCES `status` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `id_wo` FOREIGN KEY (`id_wo`) REFERENCES `work_orders` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO `ot_ebs_db`.`clients`
(`name`,
`tel`,
`mail`,
`direction`,
`location`)
VALUES(
'Nicolas Medela',
'1564509652',
'medela.nicolas@gmail.com',
'Guzman 3327',
'Ricardo Rojas');

insert into ot_ebs_db.equipments (id,title) values (0,'TV');
insert into ot_ebs_db.equipments (id,title) values (1,'Microondas');
insert into ot_ebs_db.equipments (id,title) values (2,'Equipo de audio');
insert into ot_ebs_db.equipments (id,title) values (3,'Hornito Electrico');
insert into ot_ebs_db.equipments (id,title) values (4,'Horno Microondas');
insert into ot_ebs_db.equipments (id,title) values (5,'Otro');

insert into ot_ebs_db.status (id,title,icon,color) values (0,'Generada', 'access_time','orange');
insert into ot_ebs_db.status (id,title,icon,color) values (2,'Devuelto','close','red');
insert into ot_ebs_db.status(id,title,icon,color) values (3,'Reparado','check','green');
insert into ot_ebs_db.status(id,title,icon,color) values (4,'Reclamo','error_outline','orange');
insert into ot_ebs_db.status(id,title,icon,color) values (5,'Reclamo resuelto','done_outline','green' );
insert into ot_ebs_db.status(id,title,icon,color) values (6,'Reclamo devuelto','highlight_off','brown');

select * from status;

CREATE USER 'nmelectronics'@'localhost' IDENTIFIED BY 'creo1304';
GRANT ALL PRIVILEGES ON * . * TO 'nmelectronics'@'localhost';
FLUSH PRIVILEGES;

use mysql;
UPDATE user 
SET 
    authentication_string = '',
    plugin = 'mysql_native_password'
WHERE
    user = 'nmelectronics';
flush privileges;
