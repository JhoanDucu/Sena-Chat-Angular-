-- drop database sena_chat;   PA BORRAR POR SI ES EXISTENTE
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
	fecha_hora DATETIME NOT NULL,
	contenido_mensaje VARCHAR(10000) NOT NULL,
	fk_destino INT NOT NULL,
	id_tipo INT NOT NULL,
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
	id_grupos INT NOT NULL AUTO_INCREMENT,
	nom_grupos VARCHAR(20) NOT NULL,
	descripcion_grupos VARCHAR(50) NOT NULL,
	id_ficha INT NOT NULL,
	fk_tipo_grupo INT NOT NULL,
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

create table tipo_grupo
(
	id_tipo_grupo INT NOT NULL,
	descripcion_tipo_grupos VARCHAR(20) NOT NULL,
	PRIMARY KEY(id_tipo_grupo)
);

ALTER TABLE grupos 
ADD CONSTRAINT PK_FK_id_ficha 
FOREIGN KEY (id_ficha) 
REFERENCES ficha (id_ficha);

ALTER TABLE grupos 
ADD CONSTRAINT tipoGrupo 
FOREIGN KEY (fk_tipo_grupo) 
REFERENCES tipo_grupo(id_tipo_grupo);

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
ADD CONSTRAINT FK_Destino
FOREIGN KEY (fk_destino)
REFERENCES usuarios_grupos(id_usuarios_grupos);

ALTER TABLE mensaje
ADD CONSTRAINT FK_PK_id_tipo
FOREIGN KEY (id_tipo)
REFERENCES tipo_mensaje (id_tipo);

INSERT INTO ficha VALUES 
('2558101','Analisis Y Desarrollo De Software'),
('2558102','Arte, cultura, esparcimiento y deportes'),
('2558103','Tecnologías de la Información'),
('2558104','Finanzas'),
('2558105','Administración');

INSERT INTO roles VALUES 
('1','INSTRUCTOR'),
('2','APRENDIZ');

INSERT INTO tipo_documento VALUES 
('1','Cédula de Ciudadanía'),
('2','Tarjeta de Identidad'),
('3','Cédula de Extranjería'),
('4','PEP'),
('5','Permiso por Protección Temporal');

INSERT INTO tipo_mensaje VALUES 
('1','Mensaje de Texto','text'),
('2','Imagen', 'img'),
('3','Documento', 'docx');

INSERT INTO tipo_grupo VALUES
(1, 'Privado'),
(2, 'Grupal');

INSERT INTO usuarios VALUES 
('juan.cardenas34@misena.edu.co','Juan','David','Cardenas','Perez',MD5('123'),'juan_cardenas',NULL,'2',1131104356,1, '2558101'),
('camilo@gmail.com','Camilo',NULL,'Perez',NULL,MD5('123'),'carlosperez',NULL,'2','1234567911',1,'2558101'),
('sebastian@gmail.com','Sebastian',NULL,'Carrillo',NULL,MD5('123'),'sebastian_123',NULL,'2','12345678912',1,'2558102'),
('isabella.mitchell@example.com','Isabella',NULL,'Mitchell',NULL,MD5('123'),'isabella',NULL,'2','12345678913',1,'2558102'),
('ethan.johnson@example.com','Ethan',NULL,'Johnson',NULL,MD5('123'),'ethan',NULL,'2','12345678914',1,'2558102'),
('sophia.anderson@example.com','Sophia',NULL,'Anderson',NULL,MD5('123'),'sophia',NULL,'2','12345678916',1,'2558102'),
('alexander.turner@example.com','Alexander',NULL,'Turner',NULL,MD5('123'),'alexander',NULL,'2','12345678917',1,'2558102'),
('olivia.brooks@example.com','Olivia',NULL,'Brooks',NULL,MD5('123'),'oliva',NULL,'2','12345678918',1,'2558102'),
('mia.parker@example.com','Mia',NULL,'Parker',NULL,MD5('123'),'mia',NULL,'2','12345678919',1,'2558102'),
('Minnick@gmail.com','Nicolas',NULL,'Rincon',NULL,MD5('minnick'),'nicolas_rincon',NULL,'2','1021392807',1,'2558101'),
('johndoe@example.com', 'John', 'David', 'Doe', NULL, MD5('password123'), 'johndoe', 'john.jpg', '2', '12345678001', 1, '2558102'),
('isaura@example.com', 'Isaura', 'Maria', 'Suarez', 'Novoa', MD5('789'), 'Isaura', NULL, '1', '12345678018', 2, '2558101'),
('heivercuesta@misena.edu.co', 'Heiver', NULL, 'Cuesta', 'Davila', MD5('abc'), 'Heiver', NULL, '1', '12345678019', 2, '2558101'),
('leonardo@example.com', 'Leonardo', NULL, 'Pineda', NULL, MD5('xyz'), 'Leonardo', NULL, '1', '12345678020', 2, '2558101'),
('Manolo@example.com', 'Manolo', 'Esteban', 'Olivo', 'Rodrigez', MD5('789'), 'Manolo', NULL, '1', '12345678021', 2, '2558102'),
('wendybohorquez1987@gmail.com', 'Wendy', NULL, 'Bohorquez', NULL, MD5('abc'), 'Wendy', NULL, '1', '12345678022', 2, '2558102'),
('javier@example.com', 'Javier', NULL, 'Almanza', 'Vela', MD5('xyz'), 'Javier', NULL, '1', '12345678023', 2, '2558102'),
('Alejandro@example.com', 'Maria', 'Alejandra', 'Garcia', 'Romero', MD5('789'), 'Alejandra', NULL, '1', '12345678024', 2, '2558103');

INSERT INTO grupos VALUES
('1','grupo 1','grupo de Heiver, ficha 2558101','2558101',2),
('2','grupo 2','grupo de Leonardo, ficha 2558101','2558101',2),
('3','grupo 3','grupo de Isaura, ficha 2558101','2558101',2),
('4','grupo 4','grupo de Manolo, ficha de 2558102','2558102',2),
('5','grupo 5','grupo de Wendy, ficha 2558102','2558102',2),
('6','grupo 6','grupo de Javier, ficha 2558102','2558102',2),
('7','grupo 7','grupo de Alejandra, ficha 2558103','2558103',2),
('8', 'nicolas_rincon', 'Privado', '2558101',1),
('9', 'carlosperez', 'Privado', '2558101',1),
('10', 'Isaura-Juan', 'Privado', '2558101',1),
('11', 'Isaura-Nicolas', 'Privado', '2558101',1),
('12', 'Sebastian', 'Privado', '2558102',1),
('13', 'Isabella', 'Privado', '2558102',1),
('14', 'Ethan', 'Privado', '2558102',1),
('15', 'Sophia', 'Privado', '2558102',1),
('16', 'Alexander', 'Privado', '2558102',1),
('17', 'Olivia', 'Privado', '2558102',1),
('18', 'Mia Parker', 'Privado', '2558102',1),
('19', 'Javier', 'Privado', '2558102',1),
('20', 'Wendy', 'Privado', '2558102',1);

INSERT INTO usuarios_grupos VALUES
('1', '1', '12345678019'),	 	# Heiver - Grupo 1
('2', '1', '1131104356'), 		# Juan - Grupo 1
('3', '1', '1021392807'),  		# Nicolas - Grupo 1
('4', '1', '1234567911'),  		# Camilo - Grupo 1
('5', '2', '12345678020'), 		# Leonardo - Grupo 2
('6', '2', '1131104356'),  		# Juan - Grupo 2
('7', '2', '1021392807'),  		# Nicolas - Grupo 2
('8', '2', '1234567911'),  		# Camilo - Grupo 2
('9', '3', '12345678018'), 		# Isaura - Grupo 3
('10', '3', '1131104356'),  	# Juan - Grupo 3
('11', '3', '1021392807'),  	# Nicolas - Grupo 3
('12', '4', '12345678021'), 	# Manolo - Grupo 4
('13', '4', '12345678912'), 	# Sebastian -  Grupo 4
('14', '4', '12345678913'), 	# Isabella - Grupo 4
('15', '4', '12345678914'),		# Ethan - Grupo 4
('16', '4', '12345678916'), 	# Sophia - Grupo 4
('17', '4', '12345678917'),		# Alexander - Grupo 4
('18', '4', '12345678918'),		# Olivia - Grupo 4
('19', '4', '12345678919'), 	# Mia - Grupo 4
('20', '4', '12345678001'),		# John - Grupo 4
('21', '5', '12345678022'), 	# Wendy - Grupo 5
('22', '5', '12345678912'), 	# Sebastian -  Grupo 5
('23', '5', '12345678913'), 	# Isabella - Grupo 5
('24', '5', '12345678914'),		# Ethan - Grupo 5
('25', '5', '12345678916'), 	# Sophia - Grupo 5
('26', '5', '12345678917'),		# Alexander - Grupo 5
('27', '5', '12345678918'),		# Olivia - Grupo 5
('28', '5', '12345678919'), 	# Mia - Grupo 5
('29', '5', '12345678001'),		# John - Grupo 5
('30', '6', '12345678023'), 	# Javier - Grupo 6
('31', '6', '12345678912'), 	# Sebastian -  Grupo 6
('32', '6', '12345678913'), 	# Isabella - Grupo 6
('33', '6', '12345678914'),		# Ethan - Grupo 6
('34', '6', '12345678916'), 	# Sophia - Grupo 6
('35', '6', '12345678917'),		# Alexander - Grupo 6
('36', '6', '12345678918'),		# Olivia - Grupo 6
('37', '6', '12345678919'), 	# Mia - Grupo 6
('38', '6', '12345678001'),		# John - Grupo 6
('39', '8', '1131104356'),		# Juan - Privado 8
('40', '8', '1021392807'),		# Nicolas - Privado 8
('41', '9', '1131104356'),		# Juan - Privado 9
('42', '9', '1234567911'),		# Camilo - Privado 9
('43', '10', '1131104356'),		# Juan - Privado 10
('44', '10', '12345678018'),	# Isaura - Privado 10
('45', '11', '1021392807'),		# Nicolas - Privado 11
('46', '11', '12345678018'),	# Isaura - Privado 11
('47', '12', '12345678001'),	# John - Privado 12
('48', '12', '12345678912'),	# Sebastian - Privado 12
('49', '13', '12345678001'),	# John - Privado 13
('50', '13', '12345678913'),	# Isabella - Privado 13
('51', '14', '12345678001'),	# John - Privado 14
('52', '14', '12345678914'),	# Ethan - Privado 14
('53', '15', '12345678001'),	# John - Privado 15
('54', '15', '12345678916'),	# Sophia - Privado 15
('55', '16', '12345678001'),	# John - Privado 16
('56', '16', '12345678917'),	# Alexander - Priavdo 16
('57', '17', '12345678001'),	# John - Privado 17
('58', '17', '12345678918'),	# Olivia - Privado 17
('59', '18', '12345678001'),	# John - Privado 18
('60', '18', '12345678919'),	# Mia - Privado 18
('61', '19', '12345678001'),	# John - Privado 19
('62', '19', '12345678023'),	# Javier - Privado 19
('63', '20', '12345678001'),	# John - Privado 20
('64', '20', '12345678022');	# Wendy - Privado 20

INSERT INTO mensaje VALUES
('1', '2023-11-25 10:30:00','HOLA','1','1'),
('2', '2023-11-25 10:34:00','BUEN DIA, INSTRUCTOR','4','1'),
('3', '2023-11-25 11:30:00','Buenos dias','3','1'),
('4', '2023-11-25 11:31:00','Hoy no tenemos formacion, agradezco le informen a sus compañeros','1','1'),
('5', '2023-11-25 13:30:00','Si Señor','2','1'),
('6', '2023-11-25 13:45:00','No olvidar la evidencia pendiente para el dia de hoy','5','1'),
('7', '2023-11-25 14:45:00', 'Ok, Vale', '6', '1'),
('8', '2023-11-25 15:00:00', 'Ok', '7', '1'),
('9', '2023-11-25 15:15:00', 'Entendido', '8', '1'),
('10', '2023-11-26 15:30:00', 'buenos dias profe', '10', '1'),
('11', '2023-11-26 15:45:00', 'tengo una duda', '10', '1'),
('12', '2023-11-26 16:00:00', '¿Cual es su duda?', '9', '1'),
('13', '2023-11-26 16:15:00', 'Usted añadio a camilo al grupo?', '10', '1'),
('14', '2023-11-26 16:30:00', 'Ouh, lo he olvidado', '9', '1'),
('15', '2023-11-26 16:45:00', 'Ahora lo hago', '9', '1'),
('16', '2023-11-26 17:00:00', ':O', '11', '1'),
('17', '2023-11-26 17:15:00', 'No presentar trabajos es desercion, no hay excusa', '12', '1'),
('18', '2023-11-26 17:30:00', 'es problema del indio', '15', '1'),
('19', '2023-11-26 17:45:00', 'Disculpe instructor a quien se refiere?', '17', '1'),
('20', '2023-11-26 18:00:00', 'A usted', '12', '1'),
('21', '2023-11-26 18:15:00', 'JAJAJA', '16', '1'),
('22', '2023-11-26 18:30:00', 'ala, jaja', '15', '1'),
('23', '2023-11-26 18:45:00', 'comooooo', '17', '1'),
('24', '2023-11-26 19:00:00', 'Clase de Ingles para mañana', '21', '1'),
('25', '2023-11-26 19:15:00', 'Puedo hacerle una pregunta al privado?', '29', '1'),
('26', '2023-11-26 19:30:00', 'Bueno, si señora', '22', '1'),
('27', '2023-11-26 19:32:00', 'Bueno', '23', '1'),
('28', '2023-11-26 19:34:00', 'Bueno', '24', '1'),
('29', '2023-11-26 19:37:00', 'Bueno', '25', '1'),
('30', '2023-11-26 19:39:00', 'Ok', '26', '1'),
('31', '2023-11-26 19:40:00', 'Bueno', '27', '1'),
('32', '2023-11-26 19:41:00', 'Bueno', '28', '1'),
('33', '2023-11-26 19:45:00', 'Bueno', '29', '1'),
('34', '2023-11-26 19:47:00', 'Aprendices Mia Parker y John Doe', '30', '1'),
('35', '2023-11-26 19:52:00', 'si', '38', '1'),
('36', '2023-11-26 19:54:00', 'Si?', '37', '1'),
('37', '2023-11-26 19:55:00', 'Cual es su grupo de proyecto?', '30', '1'),
('38', '2023-10-02 09:15:00', 'Nicolassssssss', '39', '1'),
('39', '2023-10-02 22:40:00', 'Ke', '40', '1'),
('40', '2023-10-02 22:41:00', '._.', '39', '1'),
('41', '2023-10-02 22:41:00', 'Se desaparecia', '39', '1'),
('42', '2023-10-02 09:19:00', 'Mano', '41' ,'1'),
('43', '2023-10-02 09:19:00', 'Ayudame', '41', '1'),
('44', '2023-10-02 09:19:00', 'No me sirve el programaaa', '41', '1'),
('45', '2023-10-02 09:19:00', 'Aiuda', '41', '1'),
('46', '2023-10-02 10:25:00', 'Ya te llamo 👌', '42', '1');

# Traemos el nombre de usuario y el rol
SELECT numerodoc, nombre_usuario, id_rol, nombre_rol FROM usuarios a
INNER JOIN roles b ON a.fk_id_rol = b.id_rol;  

# Con esta consulta llenamos los datos de los grupos en el chat 
# (se condiciona mediante una variable con el numero de documento traida previamente)
SELECT * FROM grupos a 
INNER JOIN ficha b ON a.id_ficha = b.id_ficha  
LEFT JOIN usuarios_grupos c ON a.id_grupos = c.id_grupos 
WHERE c.numerodoc = '1131104356' AND fk_tipo_grupo = '2';

# Con esta consulta traeremos los datos de los mensajes
# (segun el grupo al cual pertenezcan y en el que el usuario se ubica)   # SELECT DISTINCT a.numerodoc, primer_nom, primer_apellido, contenido_mensaje, hora, id_tipo, id_usuarios_grupos FROM usuarios a   # RIGHT JOIN usuarios_grupos b ON a.numerodoc = b.numerodoc   # INNER JOIN mensaje c ON b.id_grupos = c.fk_id_grupos   # WHERE b.id_usuarios_grupos = 1;
