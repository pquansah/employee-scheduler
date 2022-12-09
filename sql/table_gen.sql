CREATE SCHEMA emp_001;

-- emp_001.employee definition

-- Drop table

-- DROP TABLE emp_001.employee;

CREATE TABLE emp_001.employee (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	fname varchar NOT NULL,
	lname varchar NOT NULL,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NOT NULL DEFAULT now(),
	CONSTRAINT employee_pk PRIMARY KEY (id)
);


-- emp_001.employee_quals definition

-- Drop table

-- DROP TABLE emp_001.employee_quals;

CREATE TABLE emp_001.employee_quals (
	employee_id int4 NOT NULL,
	qual_id int4 NOT NULL,
	CONSTRAINT employee_quals_pk PRIMARY KEY (employee_id, qual_id)
);


-- emp_001.qualifications definition

-- Drop table

-- DROP TABLE emp_001.qualifications;

CREATE TABLE emp_001.qualifications (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"label" varchar NOT NULL,
	CONSTRAINT qualifications_pk PRIMARY KEY (id)
);


-- emp_001.jobs definition

-- Drop table

-- DROP TABLE emp_001.jobs;

CREATE TABLE emp_001.jobs (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	description varchar NOT NULL,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NOT NULL DEFAULT now(),
	CONSTRAINT jobs_pk PRIMARY KEY (id)
);


-- emp_001.job_posts definition

-- Drop table

-- DROP TABLE emp_001.job_posts;

CREATE TABLE emp_001.job_posts (
	job_id int4 NOT NULL,
	post_id int4 NOT NULL
);


-- emp_001.posts definition

-- Drop table

-- DROP TABLE emp_001.posts;

CREATE TABLE emp_001.posts (
	id int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	description varchar NOT NULL,
	shift_start timetz NOT NULL,
	shift_end timetz NOT NULL,
	CONSTRAINT posts_pk PRIMARY KEY (id)
);


-- emp_001.post_quals definition

-- Drop table

-- DROP TABLE emp_001.post_quals;

CREATE TABLE emp_001.post_quals (
	post_id int4 NOT NULL,
	qual_id int4 NOT NULL,
	CONSTRAINT post_quals_pk PRIMARY KEY (post_id, qual_id)
);


-- emp_001.schedule definition

-- Drop table

-- DROP TABLE emp_001.schedule;

CREATE TABLE emp_001.schedule (
	post_id int4 NOT NULL,
	work_date date NOT NULL,
	employee_id int4 NULL,
	CONSTRAINT schedule_pk PRIMARY KEY (post_id, work_date)
);

INSERT INTO emp_001.employee (fname,lname,created_at,updated_at) VALUES 
('John','Smith','2021-03-30 14:25:17.302','2021-03-30 14:25:17.302')
,('Sarah','Connors','2021-03-30 14:25:17.302','2021-03-30 14:25:17.302')
,('Neo','Bluepill','2021-03-30 14:25:17.302','2021-03-30 14:25:17.302')
,('Foghorn','Leghorn','2021-03-30 14:25:17.302','2021-03-30 14:25:17.302')
,('Danny','Zuko','2021-03-30 14:25:17.302','2021-03-30 14:25:17.302')
,('Tomb','Raider','2021-03-30 14:25:17.302','2021-03-30 14:25:17.302')
;

INSERT INTO emp_001.qualifications ("label") VALUES 
('CPR')
,('Firearms')
,('Fire Control Panel')
,('Security System')
,('Customer Service')
,('Detainment')
;

INSERT INTO emp_001.employee_quals (employee_id,qual_id) VALUES 
(2,2)
,(2,5)
,(2,6)
,(3,4)
,(3,3)
,(6,2)
,(6,5)
,(6,6)
,(6,3)
,(6,4)
;

INSERT INTO emp_001.jobs (description,created_at,updated_at) VALUES 
('Wells Fargo #11','2021-03-30 14:39:21.646','2021-03-30 14:39:21.646')
,('Wells Fargo #12','2021-03-30 14:39:21.646','2021-03-30 14:39:21.646')
;

INSERT INTO emp_001.posts (description,shift_start,shift_end) VALUES 
('Internal Armed Guard','22:00:00','04:00:00')
,('Internal Armed Guard','04:00:00','10:00:00')
,('Security Panel Operator','16:00:00','00:00:00')
,('Security Panel Operator','00:00:00','08:00:00')
,('Security Panel Operator','08:00:00','16:00:00')
,('Parking Garage','16:00:00','00:00:00')
,('Parking Garage','00:00:00','08:00:00')
,('Parking Garage','08:00:00','16:00:00')
;

INSERT INTO emp_001.job_posts (job_id,post_id) VALUES 
(1,1)
,(1,2)
,(1,3)
,(1,4)
,(1,5)
,(1,6)
,(1,7)
,(1,8)
,(2,1)
,(2,2)
;

INSERT INTO emp_001.job_posts (job_id,post_id) VALUES 
(2,3)
,(2,4)
,(2,5)
,(2,6)
,(2,7)
,(2,8)
;
INSERT INTO emp_001.post_quals (post_id,qual_id) VALUES 
(1,1)
,(1,2)
,(1,5)
,(1,6)
,(2,1)
,(2,2)
,(2,5)
,(2,6)
,(3,3)
,(3,4)
,(4,3)
,(4,4)
,(5,3)
,(5,4)
;

INSERT INTO emp_001.schedule (post_id,work_date,employee_id) VALUES 
(1,'2021-04-07',NULL)
,(4,'2021-04-07',NULL)
,(4,'2021-04-09',NULL)
,(5,'2021-04-06',NULL)
,(5,'2021-04-08',NULL)
,(5,'2021-04-10',NULL)
,(6,'2021-04-05',NULL)
,(7,'2021-04-07',NULL)
,(7,'2021-04-09',NULL)
,(7,'2021-04-11',NULL)
;
INSERT INTO emp_001.schedule (post_id,work_date,employee_id) VALUES 
(8,'2021-04-07',NULL)
,(8,'2021-04-08',NULL)
,(8,'2021-04-09',NULL)
,(8,'2021-04-10',NULL)
,(8,'2021-04-11',NULL)
,(1,'2021-04-05',2)
,(1,'2021-04-06',2)
,(1,'2021-04-08',2)
,(1,'2021-04-09',2)
,(2,'2021-04-05',1)
;
INSERT INTO emp_001.schedule (post_id,work_date,employee_id) VALUES 
(2,'2021-04-06',1)
,(2,'2021-04-07',6)
,(2,'2021-04-08',1)
,(2,'2021-04-09',NULL)
,(3,'2021-04-05',3)
,(3,'2021-04-06',3)
,(3,'2021-04-07',3)
,(3,'2021-04-08',6)
,(3,'2021-04-09',3)
,(3,'2021-04-10',6)
;
INSERT INTO emp_001.schedule (post_id,work_date,employee_id) VALUES 
(3,'2021-04-11',6)
,(4,'2021-04-05',6)
,(4,'2021-04-06',6)
,(4,'2021-04-08',3)
,(4,'2021-04-10',3)
,(4,'2021-04-11',3)
,(5,'2021-04-05',5)
,(5,'2021-04-07',5)
,(5,'2021-04-09',5)
,(5,'2021-04-11',5)
;
INSERT INTO emp_001.schedule (post_id,work_date,employee_id) VALUES 
(7,'2021-04-06',1)
,(7,'2021-04-08',1)
,(7,'2021-04-10',1)
,(8,'2021-04-06',NULL)
;