create database SENA_CHAT;
	use SENA_CHAT;

create table ficha
(
	id_ficha INT NOT NULL,
	programa_formacion VARCHAR(50) NOT NULL,
	PRIMARY KEY (id_ficha)
);

create table roles
(
	id_rol INT NOT NULL,
	nombre_rol VARCHAR(20) NOT NULL,
	PRIMARY KEY (id_rol)
);

create table tipo_documento
(
	id_tipodoc INT NOT NULL,
	descripcion_tipodoc VARCHAR (60) NOT NULL,
	PRIMARY KEY (id_tipodoc)
);

create table mensaje 
(
	id_mensaje INT NOT NULL AUTO_INCREMENT,
	fecha DATE NOT NULL,
	hora TIME NOT NULL,
	contenido_mensaje VARCHAR(10000) NOT NULL,
	numerodoc VARCHAR(20) NOT NULL,
	id_tipo INT NOT NULL,
	fk_id_grupos INT NOT NULL,
	PRIMARY KEY (id_mensaje)
);

create table tipo_mensaje
(
	id_tipo INT NOT NULL,
	Nom_tipo VARCHAR(20) NOT NULL,
	descripcion_mensaje VARCHAR (200) NULL,
	PRIMARY KEY (id_tipo)
);

create table grupos
(
	id_grupos INT NOT NULL,
	nom_grupos VARCHAR(20) NOT NULL,
	descripcion_grupos VARCHAR(50) NOT NULL,
	id_ficha INT NOT NULL,
	PRIMARY KEY (id_grupos)
); 

create table usuarios
(
	correo VARCHAR(100) NOT NULL,
	primer_nom VARCHAR(20) NOT NULL,
	segundo_nom VARCHAR(20) NULL,
	primer_apellido VARCHAR(20) NOT NULL,
	segundo_apellido VARCHAR(20) NULL,
	contrasena VARCHAR(100) NOT NULL,
	nombre_usuario VARCHAR(50) NOT NULL,
	foto VARCHAR(30) NULL,
	fk_id_rol INT NOT NULL,
	numerodoc VARCHAR(20) NOT NULL,
	fk_id_tipodoc INT NOT NULL,
	fk_id_ficha INT NOT NULL,
	PRIMARY KEY (numerodoc, fk_id_rol, fk_id_tipodoc)
);

create table usuarios_grupos 
(
	id_usuarios_grupos INT NOT NULL AUTO_INCREMENT,
	id_grupos INT NOT NULL,
	numerodoc VARCHAR(20) NOT NULL,
	PRIMARY KEY (id_usuarios_grupos, id_grupos, numerodoc)
); 

ALTER TABLE grupos 
ADD CONSTRAINT PK_FK_id_ficha 
FOREIGN KEY (id_ficha) 
REFERENCES ficha (id_ficha);

ALTER TABLE usuarios_grupos
ADD CONSTRAINT FK_PK_id_grupos
FOREIGN KEY (id_grupos)
REFERENCES grupos (id_grupos);

ALTER TABLE usuarios_grupos
ADD CONSTRAINT FK_PK_id_usuarios 
FOREIGN KEY (numerodoc)
REFERENCES usuarios (numerodoc);

ALTER TABLE usuarios
ADD CONSTRAINT FK_PK_id_rol
FOREIGN KEY (fk_id_rol)
REFERENCES roles (id_rol);

ALTER TABLE usuarios
ADD CONSTRAINT FK_PK_id_documento
FOREIGN KEY (fk_id_tipodoc)
REFERENCES tipo_documento (id_tipodoc);

ALTER TABLE usuarios
ADD CONSTRAINT FK_id_ficha
FOREIGN KEY (fk_id_ficha)
REFERENCES ficha (id_ficha);

ALTER TABLE mensaje
ADD CONSTRAINT FK_PK_id_usuario
FOREIGN KEY (numerodoc)
REFERENCES usuarios (numerodoc);

ALTER TABLE mensaje
ADD CONSTRAINT FK_PK_id_tipo
FOREIGN KEY (id_tipo)
REFERENCES tipo_mensaje (id_tipo);

ALTER TABLE mensaje
ADD CONSTRAINT FK_PK_id_grupo
FOREIGN KEY (fk_id_grupos)
REFERENCES grupos (id_grupos);

INSERT INTO ficha 
VALUES ('2558104g1','Analisis Y Desarrollo De Software'),
	   ('2558105','Arte, cultura, esparcimiento y deportes'),
	   ('2558101','Tecnologías de la información'),
	   ('2558102','Finanzas'),
       ('2558103','administración'),
	   ('2558109','Salud'),
	   ('2558106','Operación de equipo industrial'),
	   ('2558107','Ciencias sociales'),
	   ('2558108','servicios gubernamentales');

INSERT INTO roles 
VALUES ('1','INSTRUCTOR'),
	   ('2','APRENDIZ');

INSERT INTO tipo_documento 
VALUES ('1','Cédula de Ciudadanía'),
	   ('2','Tarjeta de Identidad'),
	   ('3','Cédula de Extranjería'),
	   ('4','PEP'),
	   ('5','Permiso por Protección Temporal');

INSERT INTO tipo_mensaje 
VALUES ('1','Mensaje de Texto','text'),
	   ('2','Imagen', 'img'),
	   ('3','Documento', 'docx');

INSERT INTO usuarios 
VALUES ('juan.cardenas34@misena.edu.co','juan','david','cardenas','perez',MD5('123'),'juan_cardenas',NULL,'2',1131104356,1, '2558104'),
('camilo@gmail.com','camilo',NULL,'perez',NULL,MD5('123'),'carlosperez',NULL,'2','12345678911',1,'2558104'),
('sebastian@gmail.com','sebastian',NULL,'carrillo',NULL,MD5('123'),'sebastian_123',NULL,'2','12345678912',1,'2558105'),
('isabella.mitchell@example.com','isabella',NULL,'mitchell',NULL,MD5('123'),'isabella',NULL,'2','12345678913',1,'2558102'),
('ethan.johnson@example.com','ethan',NULL,'johnson',NULL,MD5('123'),'ethan',NULL,'2','12345678914',1,'2558104'),
('sophia.anderson@example.com','sophia',NULL,'anderson',NULL,MD5('123'),'sophia',NULL,'2','12345678916',1,'2558104'),
('alexander.turner@example.com','alexander',NULL,'turner',NULL,MD5('123'),'alexander',NULL,'2','12345678917',1,'2558104'),
('olivia.brooks@example.com','olivia',NULL,'brooks',NULL,MD5('123'),'oliva',NULL,'2','12345678918',1,'2558104'),
('mia.parker@example.com','mia',NULL,'parker',NULL,MD5('123'),'mia',NULL,'2','12345678919',1,'2558104'),
('Minnick@gmail.com','nicolas',NULL,'Rincon',NULL,MD5('minnick'),'nicolas_rincon',NULL,'2','1021392807',1,'2558105');

INSERT INTO grupos 
VALUES ('1','grupo 1','grupo de Heiver, ficha 2558104','2558104'),
	   ('2','grupo 2','grupo de Leonardo, ficha 2558105','2558105'),
	   ('3','grupo 3','grupo de Javier, ficha 2558104','2558104'),
	   ('4','grupo 4','grupo de Isaura, ficha 2558104','2558104'),
	   ('5','grupo 5','grupo de Wendy, ficha 2558105','2558105'),
	   ('6','grupo 6','grupo de Alejandra, ficha 2558105','2558105'),
	   ('7','grupo 7','grupo de Manolo, fivha de 2558102','2558102');
	   
INSERT INTO mensaje 
VALUES ('1', '2020-03-20','11:30:00','HOLA','1131104356', '1','1'),
	   ('2', '2020-03-20','12:30:00','BUEN DIA, INSTRUCTOR','1021392807', '1','1'),
	   ('3', '2020-03-20','13:30:00','QUE TRANZA','12345678912','1','2'),
	   ('4', '2020-03-20','11:30:00','PERROS WOOF WOOF','12345678911', '1','1'),
	   ('5', '2020-03-20','12:30:00','ALAMBRE DE QUESO','1021392807', '1','2'),
	   ('6', '2020-03-20','13:30:00','SI :D','1021392807','1','2');

INSERT INTO usuarios_grupos 
VALUES (NULL,'1','1131104356'),
		(NULL,'3','1131104356'),
	   	(NULL,'4','1131104356'),
		(NULL,'1','12345678911'),
		(NULL,'3','12345678911'),
	   	(NULL,'4','12345678911'),
		(NULL,'1','12345678914'),
		(NULL,'3','12345678914'),
	   	(NULL,'4','12345678914'),
		(NULL,'1','12345678916'),
		(NULL,'3','12345678916'),
	   	(NULL,'4','12345678916'),
		(NULL,'1','12345678917'),
		(NULL,'3','12345678917'),
	   	(NULL,'4','12345678917'),
		(NULL,'1','12345678918'),
		(NULL,'3','12345678918'),
	   	(NULL,'4','12345678918'),
		(NULL,'1','12345678919'),
		(NULL,'3','12345678919'),
	   	(NULL,'4','12345678919'),
		(NULL,'2','12345678912'),
		(NULL,'5','12345678912'),
		(NULL,'6','12345678912'),
		(NULL,'2','1021392807'),
		(NULL,'5','1021392807'),
		(NULL,'6','1021392807');


# Traemos el nombre de usuario y el rol
SELECT numerodoc, nombre_usuario, id_rol, nombre_rol FROM usuarios a
INNER JOIN roles b ON a.fk_id_rol = b.id_rol;  

# Con esta consulta llenamos los datos de los grupos en el chat 
# (se condiciona mediante una variable con el numero de documento traida previamente)
SELECT * FROM grupos a 
INNER JOIN ficha b ON a.id_ficha = b.id_ficha  
LEFT JOIN usuarios_grupos c ON a.id_grupos = c.id_grupos 
#WHERE c.numerodoc = '1131104356';

# Con esta consulta traeremos los datos de los mensajes
# (segun el grupo al cual pertenezcan y en el que el usuario se ubica)
SELECT DISTINCT a.numerodoc, primer_nom, primer_apellido, contenido_mensaje, hora, id_tipo, id_usuarios_grupos FROM usuarios a
RIGHT JOIN usuarios_grupos b ON a.numerodoc = b.numerodoc
INNER JOIN mensaje c ON b.id_grupos = c.fk_id_grupos
WHERE b.id_usuarios_grupos = 1;