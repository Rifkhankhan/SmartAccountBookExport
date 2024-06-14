CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `password` text NOT NULL,
  `expansePermission` varchar(45) NOT NULL DEFAULT 'no',
  `expanseEditPermission` varchar(45) NOT NULL DEFAULT 'no',
  `expanseDeletePermission` varchar(45) NOT NULL DEFAULT 'no',
  `receiptPermission` varchar(45) NOT NULL DEFAULT 'no',
  `receiptEditPermission` varchar(45) NOT NULL DEFAULT 'no',
  `receiptDeletePermission` varchar(45) NOT NULL DEFAULT 'no',
  `advancePermission` varchar(45) NOT NULL DEFAULT 'no',
  `advanceEditPermission` varchar(45) NOT NULL DEFAULT 'no',
  `advanceDeletePermission` varchar(45) NOT NULL DEFAULT 'no',
  `loanPermission` varchar(45) NOT NULL DEFAULT 'no',
  `loanEditPermission` varchar(45) NOT NULL DEFAULT 'no',
  `loanDeletePermission` varchar(45) NOT NULL DEFAULT 'no',
  `status` tinyint NOT NULL DEFAULT '1',
  `isAdmin` tinyint NOT NULL DEFAULT '0',
  `authToken` varchar(150) DEFAULT NULL,
  `loggedIpAddress` varchar(45) DEFAULT NULL,
  `isLoggedIn` tinyint(1) NOT NULL DEFAULT '0',
  `cp` varchar(45) NOT NULL DEFAULT 'no',
  `pp` varchar(45) DEFAULT 'no',
  `epp` varchar(45) DEFAULT 'no',
  PRIMARY KEY (`id`)
);

CREATE TABLE `company` (
  `cid` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `location` varchar(100) DEFAULT NULL,
  `createdAt` varchar(100) DEFAULT NULL,
  `deletedAt` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`cid`)
) ;

CREATE TABLE `accountrequest` (
  `arid` int NOT NULL AUTO_INCREMENT,
  `amount` varchar(45) NOT NULL,
  `requestType` varchar(45) NOT NULL,
  `requestForm` varchar(45) NOT NULL,
  `date` varchar(45) NOT NULL,
  `narration` varchar(45) NOT NULL,
  `id` int NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `methode` varchar(45) DEFAULT NULL,
  `filename` varchar(100) DEFAULT NULL,
  `filepath` varchar(100) DEFAULT NULL,
  `createAt` varchar(100) DEFAULT NULL,
  `deleteAt` varchar(100) DEFAULT NULL,
  `cid` int DEFAULT NULL,
  PRIMARY KEY (`arid`),
  KEY `id` (`id`),
  KEY `cid` (`cid`),
  CONSTRAINT `accountrequest_ibfk_1` FOREIGN KEY (`id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `accountrequest_ibfk_2` FOREIGN KEY (`cid`) REFERENCES `company` (`cid`) ON DELETE CASCADE ON UPDATE CASCADE
);



CREATE TABLE `usercompany` (
  `usid` int NOT NULL AUTO_INCREMENT,
  `uid` int NOT NULL,
  `cid` int NOT NULL,
  `createdAt` varchar(100) DEFAULT NULL,
  `deletedAt` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`usid`),
  KEY `uid` (`uid`),
  KEY `cid` (`cid`),
  CONSTRAINT `usercompany_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `usercompany_ibfk_2` FOREIGN KEY (`cid`) REFERENCES `company` (`cid`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `useractivities` (
  `aid` int NOT NULL AUTO_INCREMENT,
  `id` int NOT NULL,
  `logintime` datetime DEFAULT NULL,
  `logouttime` datetime DEFAULT NULL,
  `duration` int DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`aid`),
  KEY `id` (`id`),
  CONSTRAINT `useractivities_ibfk_1` FOREIGN KEY (`id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `requests` (
  `rid` int NOT NULL AUTO_INCREMENT,
  `date` varchar(45) NOT NULL,
  `amount` varchar(45) NOT NULL,
  `narration` varchar(45) NOT NULL,
  `requestType` varchar(45) NOT NULL,
  `requestForm` varchar(45) NOT NULL,
  `status` varchar(45) NOT NULL DEFAULT '1',
  `arid` int NOT NULL,
  `id` int NOT NULL,
  `methode` varchar(45) DEFAULT NULL,
  `createAt` varchar(100) DEFAULT NULL,
  `updateAt` varchar(100) DEFAULT NULL,
  `deleteAt` varchar(100) DEFAULT NULL,
  `filepath` varchar(100) DEFAULT NULL,
  `filename` varchar(100) DEFAULT NULL,
  `date_reset` varchar(100) DEFAULT NULL,
  `cid` int DEFAULT NULL,
  PRIMARY KEY (`rid`),
  KEY `acid` (`arid`),
  KEY `cid` (`cid`),
  CONSTRAINT `acid` FOREIGN KEY (`arid`) REFERENCES `accountrequest` (`arid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `requests_ibfk_1` FOREIGN KEY (`cid`) REFERENCES `company` (`cid`) ON DELETE CASCADE ON UPDATE CASCADE
);