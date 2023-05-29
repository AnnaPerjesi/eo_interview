CREATE TABLE `department` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `employee` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `phoneNumber` varchar(125) DEFAULT NULL,
  `userName` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `supervisorId` int DEFAULT NULL,
  `departmentId` int DEFAULT NULL,
  `isSupervisor` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `departmentId_idx` (`departmentId`),
  KEY `supervisorId_idx` (`supervisorId`),
  CONSTRAINT `FK_Department_departmentId` FOREIGN KEY (`departmentId`) REFERENCES `department` (`id`),
  CONSTRAINT `FK_Employee_supercisorId` FOREIGN KEY (`supervisorId`) REFERENCES `employee` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
