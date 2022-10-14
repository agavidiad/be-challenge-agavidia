USE master
GO
CREATE DATABASE Football
GO
USE Football
GO

--drop table  dbo.Competitions
CREATE TABLE dbo.Competitions(
	id INT NOT NULL PRIMARY KEY,
	code VARCHAR(50),
	name VARCHAR(350),
	areaName VARCHAR(350),
	createdAt DATETIME,
	updatedAt DATETIME
)
GO

--DROP TABLE dbo.Teams
CREATE TABLE dbo.Teams(
	idCompetition INT NOT NULL,
	id INT NOT NULL PRIMARY KEY,
	name VARCHAR(350),
	shortName VARCHAR(350),
	areaName VARCHAR(350),
	address VARCHAR(350),
	createdAt DATETIME,
	updatedAt DATETIME
)
GO
ALTER TABLE dbo.Teams WITH CHECK ADD  CONSTRAINT FK_Teams_idCompetition FOREIGN KEY(idCompetition)
REFERENCES dbo.Competitions(id)


CREATE TABLE dbo.Players(
	idTeam INT,
	id INT NOT NULL PRIMARY KEY,
	name VARCHAR(350),
	position VARCHAR(350),
	dateOfBirth DATETIME,
	nationality VARCHAR(350),
	createdAt DATETIME,
	updatedAt DATETIME
)
GO

CREATE TABLE dbo.CompetitionTeams(
idCompetition INT,
idTeam INT,
idStatus INT,
createdAt DATETIME,
updatedAt DATETIME
)
GO
ALTER TABLE dbo.CompetitionTeams WITH CHECK ADD  CONSTRAINT FK_CompetitionTeams_idCompetition FOREIGN KEY(idCompetition)
REFERENCES dbo.Competitions(id);
ALTER TABLE dbo.CompetitionTeams WITH CHECK ADD  CONSTRAINT FK_CompetitionTeams_idTeam FOREIGN KEY(idTeam)
REFERENCES dbo.Teams(id);
GO

CREATE TABLE dbo.Coaches(
	idTeam INT,
	id INT,
	name VARCHAR(350),
	dateOfBirth DATETIME,
	nationality VARCHAR(350),
	createdAt DATETIME,
	updatedAt DATETIME
)
GO