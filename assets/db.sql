CREATE TABLE companysqlsetup (
	moduleid INTEGER NOT NULL, 
	tabmapid INTEGER, 
	stname VARCHAR(60), 
	ttname VARCHAR(60) NOT NULL, 
	url VARCHAR(60), 
	dependson VARCHAR(60), 
	orderno INTEGER, 
	wherecon VARCHAR(60), 
	modeofinsert VARCHAR(60), 
	action VARCHAR(60), 
	"view" VARCHAR(160), 
	button VARCHAR(60), 
	project_slug VARCHAR(60) NOT NULL, 
	conditiontype VARCHAR(30), 
	sync_type VARCHAR(30), 
	sync_sql VARCHAR(2000), 
	src_sqlite_tab VARCHAR(30), 
	PRIMARY KEY (moduleid)
);

CREATE TABLE globalsqlsetup (
	moduleid INTEGER NOT NULL, 
	tabmapid INTEGER, 
	stname VARCHAR(60), 
	ttname VARCHAR(60) NOT NULL, 
	url VARCHAR(60), 
	dependson VARCHAR(60), 
	orderno INTEGER, 
	wherecon VARCHAR(60), 
	modeofinsert VARCHAR(60), 
	action VARCHAR(60), 
	"view" VARCHAR(160), 
	button VARCHAR(60), 
	project_slug VARCHAR(60) NOT NULL, 
	conditiontype VARCHAR(30), 
	sync_type VARCHAR(30), 
	sync_sql VARCHAR(2000), 
	src_sqlite_tab VARCHAR(30), 
	PRIMARY KEY (moduleid)
);
CREATE TABLE mastermap (
	moduleid INTEGER NOT NULL, 
	tabmapid INTEGER, 
	stname VARCHAR(60), 
	ttname VARCHAR(60) NOT NULL, 
	url VARCHAR(60), 
	dependson VARCHAR(60), 
	orderno INTEGER, 
	wherecon VARCHAR(60), 
	modeofinsert VARCHAR(60), 
	action VARCHAR(60), 
	"view" VARCHAR(160), 
	button VARCHAR(60), 
	project_slug VARCHAR(60) NOT NULL, 
	conditiontype VARCHAR(30), 
	sync_type VARCHAR(30), 
	sync_sql VARCHAR(2000), 
	src_sqlite_tab VARCHAR(30), 
	PRIMARY KEY (moduleid)
);
CREATE TABLE mastermapdetail (
	mastermapdetailid INTEGER NOT NULL, 
	moduleid INTEGER NOT NULL, 
	sfname VARCHAR(60) NOT NULL, 
	tfname VARCHAR(60) NOT NULL, 
	shortid INTEGER, 
	project_slug VARCHAR(60) NOT NULL, 
	colmapid INTEGER, 
	PRIMARY KEY (mastermapdetailid), 
	FOREIGN KEY(moduleid) REFERENCES mastermap (moduleid)
);

CREATE TABLE mcontrol (
	mcontrolid INTEGER NOT NULL, 
	"key" VARCHAR(60) NOT NULL, 
	value VARCHAR(60) NOT NULL, 
	projectid BIGINT, 
	PRIMARY KEY (mcontrolid)
);

INSERT INTO "mcontrol" VALUES(1,'companysetup','true',42);
INSERT INTO "mcontrol" VALUES(2,'globalsetup','true',42);
INSERT INTO "mcontrol" VALUES(3,'offlinesync','false',42);
INSERT INTO "mcontrol" VALUES(4,'forgetpassword','true',42);
INSERT INTO "mcontrol" VALUES(5,'deviceId','true',42);

CREATE TABLE euser (
  userid INTEGER NOT NULL,
  username varchar(100) DEFAULT NULL,
  password varchar(512) DEFAULT NULL,
  app_device_id varchar(100) DEFAULT NULL,
  firstname varchar(256) DEFAULT NULL,
  lastname varchar(256) DEFAULT NULL,
  emailid varchar(200) DEFAULT NULL,
  createdon date DEFAULT NULL,
  enabled varchar(20) DEFAULT NULL,
  firstlogin varchar(10) DEFAULT NULL,
  projectid INTEGER DEFAULT NULL,
  eviewtype varchar(30) DEFAULT NULL,
  usertype varchar(20) DEFAULT NULL,
  mobilenumber decimal(10,0) DEFAULT NULL,
  auvitid varchar(100) DEFAULT NULL,
  countrycode varchar(150) DEFAULT NULL,
  userphoto longblob DEFAULT NULL,
  usersign blob DEFAULT NULL,
  userip varchar(100) DEFAULT NULL,
  enable_mobile varchar(10) DEFAULT NULL,
  rolename varchar(100) DEFAULT NULL,
  onesignalplayer_id varchar(200) DEFAULT NULL,
  PRIMARY KEY (userid)
);

INSERT INTO "euser"
(userid, username, password, app_device_id, firstname, lastname, emailid, createdon, enabled, firstlogin, projectid, eviewtype, usertype, mobilenumber, auvitid, countrycode, userphoto, usersign, userip, enable_mobile, rolename, onesignalplayer_id)
VALUES(1670836123437, 'gokul@elixir.com', 'P@ssw0rd123', '44dd32f841030778', 'Gokul', 'P', 'gokul@elixir.com', '2022-12-12', 'T', 'N', 1666434181933, 'merge', 'CU', 8667449894, NULL, '91', NULL, NULL, NULL, 'T', NULL, 'playerId');
INSERT INTO "euser"
(userid, username, password, app_device_id, firstname, lastname, emailid, createdon, enabled, firstlogin, projectid, eviewtype, usertype, mobilenumber, auvitid, countrycode, userphoto, usersign, userip, enable_mobile, rolename, onesignalplayer_id)
VALUES(1670836123438, 'goku@elixir.com', 'P@ssw0rd', '44dd32f841030778', 'Gokul', 'P', 'goku@elixir.com', '2022-12-12', 'T', 'N', 1666434181933, 'merge', 'CU', 8667449894, NULL, '91', NULL, NULL, NULL, 'T', NULL, 'playerId');
INSERT INTO "euser"
(userid, username, password, app_device_id, firstname, lastname, emailid, createdon, enabled, firstlogin, projectid, eviewtype, usertype, mobilenumber, auvitid, countrycode, userphoto, usersign, userip, enable_mobile, rolename, onesignalplayer_id)
VALUES(1670836123439, 'test', 'test1', '44dd32f841030778', 'Gokul', 'P', 'goku@elixir.com', '2022-12-12', 'T', 'N', 1666434181933, 'merge', 'CU', 8667449894, NULL, '91', NULL, NULL, NULL, 'T', NULL, 'playerId');

