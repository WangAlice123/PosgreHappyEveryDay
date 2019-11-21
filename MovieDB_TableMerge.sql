

CREATE DATABASE CSI2132PJ;

CREATE SCHEMA MOVEDB;
SET SEARCH_PATH='movedb';

DROP TABLE USERS;
/*Users*****************************************************/
CREATE SEQUENCE your_seq;
CREATE TABLE IF NOT EXISTS "category" (
  "id" integer PRIMARY KEY default nextval('your_seq'),
  "name" varchar(30) DEFAULT NULL
);



CREATE TABLE USERS(
  user_id SERIAL PRIMARY KEY,
  password CHAR(20) NOT NULL,
  last_name CHAR(20) NOT NULL,
  first_name CHAR(20) NOT NULL,
  Email CHAR(40) NOT NULL UNIQUE,
  City CHAR(40),
  Province CHAR(40),
  Country CHAR(40)
);

SELECT * FROM USERS;

INSERT INTO USERS("password","last_name","first_name","email","city","province","country")
VALUES('214','Liu','Ray','rogerliuray@gmail.com','nanjing','jiangsu','China');
INSERT INTO USERS("password","last_name","first_name","email","city","province","country")
VALUES('321','Liu','fei','fei@gmail.com','nanjing','jiangsu','China');

/*Profile************************************/
CREATE TABLE PROFILE(
     user_id INT NOT NULL,
  CONSTRAINT profile_fkey FOREIGN KEY (user_id)
    REFERENCES USERS (user_id)
    ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT profile_pkey PRIMARY KEY (user_id),
    age_range char(20) CHECK(age_range IN('Youth','Adult','Senior')),
    year_born char(4),
    gender    char(20) CHECK(gender IN('Male','Female','Unknown')),
    occupation char(40),
    device_used char(40));

SELECT * FROM PROFILE;
INSERT INTO profile
VALUES(1,'Adult','1994','Male','Software Engineer','Mac book pro');
INSERT INTO profile
VALUES(2,'Adult','1995','Male','Software Engineer','Mac book pro');

CREATE FUNCTION  check_password()
  RETURNS trigger AS
  $BODY$
  BEGIN
  IF
  NEW.password LIKE '%123%' THEN
     RAISE EXCEPTION 'Sorry the password you entered is too simple.';
  END IF;
  RETURN NEW;
  END
  $BODY$ LANGUAGE plpgsql;

 CREATE TRIGGER check_password
  BEFORE INSERT OR UPDATE
  ON USERS
  FOR EACH ROW
  EXECUTE PROCEDURE check_password();

  /*Topics******************************/
CREATE TABLE TOPICS(
  topic_id serial PRIMARY key,
  description char(40) NOT NULL
);


/*MOVIES*******************************/

CREATE TABLE MOVIE
(
  movie_id serial PRIMARY key,
  name char(50) NOT NULL UNIQUE,
  date_released DATE NOT NULL,
  Language VARCHAR(20),
  Subtitles CHAR(1) NOT NULL,
  Country VARCHAR(20)
  Check (Subtitles = 'True' or Subtitles = 'False')
);

/*WATCHED*****************************/
CREATE TABLE WATCHES(
  user_id INT NOT NULL,
  movie_id INT NOT NULL,
  rating FLOAT check (rating>0 and rating<10),
  date DATE NOT NULL,
  Primary Key (user_id,movie_id)

);

/*Kyle's Table***********************************************/
/*Director*/
CREATE TABLE DIRECTOR
	(director_id serial NOT NULL ,
	lastname character varying(20),
	firstname character varying(20),
    country character varying(20),
	CONSTRAINT Directors_pkey PRIMARY KEY (director_id)
	);


/*Directs*/


CREATE TABLE DIRECTS
	(director_id integer NOT NULL,
	 movie_id integer NOT NULL,

	CONSTRAINT Direct_pkey PRIMARY KEY (director_id,movie_id),
		CONSTRAINT Directs_Director_fkey FOREIGN KEY (director_id)
		REFERENCES Director (director_id)
		ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT Directs_movies_fkey FOREIGN KEY (movie_id)
		REFERENCES MOVIE (movie_id)
		ON UPDATE CASCADE ON DELETE CASCADE
	);


/*Studio*/


	CREATE TABLE STUDIO
	(studio_id serial NOT NULL,
	name character varying(20),
    country character varying(20),
	CONSTRAINT Studio_pkey PRIMARY KEY (studio_id)
	);
/*Sponsors*/

CREATE TABLE Sponsors
	(studio_id integer NOT NULL,
	 movie_id integer NOT NULL,

	CONSTRAINT Directs_pkey PRIMARY KEY (studio_id,movie_id),
		CONSTRAINT Sponsors_StudioID_fkey FOREIGN KEY (studio_id)
		REFERENCES STUDIO (studio_id)
		ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT Sponsors_movies_fkey FOREIGN KEY (movie_id)
		REFERENCES MOVIE (movie_id)
		ON UPDATE CASCADE ON DELETE CASCADE
	);


	/*Alice's tables*/
/*Movie Topics*/

Create Table MovieTopics (
topic_id INT NOT NULL,
movie_id INT NOT NULL,
Primary Key (topic_id, movie_id)
);



/*Actor*/
Create Table Actor (
actor_id INT NOT NULL,
last_name VARCHAR(20),
first_name VARCHAR(20),
date_of_birth DATE,
Primary key (actor_id)
);


/*Role*/
Create Table Role(
role_id serial NOT NULL,
name VARCHAR(20),
movie_id INT NOT NULL,
Primary Key(role_id)
Foreign Key (movie_id) References movie
);


/*ActorPlays*/
Create Table ActorPlays(
movie_id INT NOT NULL,
actor_id INT NOT NULL,
role_id INT NOT NULL,
Primary Key (movie_id, actor_id),
Foreign Key (role_id) References Role
);
