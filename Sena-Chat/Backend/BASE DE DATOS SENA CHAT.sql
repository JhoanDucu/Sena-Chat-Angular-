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
	fk_destino INT NOT NULL,
   # numerodoc VARCHAR(20) NOT NULL,  		CAMBIAR RELACIONES
   # fk_id_grupos INT NOT NULL,
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
('2558103','Tecnologías de la información'),
('2558104','Finanzas'),
('2558105','administración'),
('2558106','Salud'),
('2558107','Operación de equipo industrial'),
('2558108','Ciencias sociales'),
('2558109','servicios gubernamentales'),
('25581010', 'Desarrollo de Software'),
('2558111', 'Gestión de Recursos Humanos'),
('2558112', 'Mecatrónica Industrial'),
('2558113', 'Gastronomía'),
('2558114', 'Tecnología en Redes de Computadores');

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
('juan.cardenas34@misena.edu.co','juan','david','cardenas','perez',MD5('123'),'juan_cardenas',NULL,'2',1131104356,1, '2558104'),
('camilo@gmail.com','camilo',NULL,'perez',NULL,MD5('123'),'carlosperez',NULL,'2','1234567911',1,'2558104'),
('sebastian@gmail.com','sebastian',NULL,'carrillo',NULL,MD5('123'),'sebastian_123',NULL,'2','12345678912',1,'2558105'),
('isabella.mitchell@example.com','isabella',NULL,'mitchell',NULL,MD5('123'),'isabella',NULL,'2','12345678913',1,'2558102'),
('ethan.johnson@example.com','ethan',NULL,'johnson',NULL,MD5('123'),'ethan',NULL,'2','12345678914',1,'2558104'),
('sophia.anderson@example.com','sophia',NULL,'anderson',NULL,MD5('123'),'sophia',NULL,'2','12345678916',1,'2558104'),
('alexander.turner@example.com','alexander',NULL,'turner',NULL,MD5('123'),'alexander',NULL,'2','12345678917',1,'2558104'),
('olivia.brooks@example.com','olivia',NULL,'brooks',NULL,MD5('123'),'oliva',NULL,'2','12345678918',1,'2558104'),
('mia.parker@example.com','mia',NULL,'parker',NULL,MD5('123'),'mia',NULL,'2','12345678919',1,'2558104'),
('Minnick@gmail.com','nicolas',NULL,'Rincon',NULL,MD5('minnick'),'nicolas_rincon',NULL,'2','1021392807',1,'2558105'),
('johndoe@example.com', 'John', 'David', 'Doe', NULL, MD5('password123'), 'johndoe', 'john.jpg', '2', '12345678001', 1, '2558104'),
('alicejane@example.com', 'Alice', 'Jane', 'Johnson', NULL, MD5('password456'), 'alicej', 'alice.jpg', '2', '12345678002', 2, '2558104'),
('bobsmith@example.com', 'Bob', NULL, 'Smith', NULL, MD5('password789'), 'bobsmith', 'bob.jpg', '2', '12345678003', 1, '2558105'),
('emilybrown@example.com', 'Emily', NULL, 'Brown', NULL, MD5('passwordabc'), 'emilyb', 'emily.jpg', '2', '12345678004', 2, '2558105'),
('michaelscott@example.com', 'Michael', NULL, 'Scott', NULL, MD5('passwordxyz'), 'michaels', 'michael.jpg', '2', '12345678005', 1, '2558104'),
('oliviawilliams@example.com', 'Olivia', NULL, 'Williams', NULL, MD5('password123'), 'oliviaw', 'olivia.jpg', '2', '12345678006', 2, '2558104'),
('liamgarcia@example.com', 'Liam', NULL, 'Garcia', NULL, MD5('password456'), 'liamg', 'liam.jpg', '2', '12345678007', 1, '2558105'),
('sophiamartinez@example.com', 'Sophia', NULL, 'Martinez', NULL, MD5('password789'), 'sophiam', 'sophia.jpg', '2', '12345678008', 2, '2558105'),
('noahhernandez@example.com', 'Noah', NULL, 'Hernandez', NULL, MD5('passwordabc'), 'noahh', 'noah.jpg', '2', '12345678009', 1, '2558104'),
('avagarcia@example.com', 'Ava', NULL, 'Garcia', NULL, MD5('passwordxyz'), 'avag', 'ava.jpg', '2', '12345678010', 2, '2558107'),
('ethanjones@example.com', 'Ethan', NULL, 'Jones', NULL, MD5('password123'), 'ethanj', 'ethan.jpg', '2', '12345678011', 1, '2558112'),
('mialopez@example.com', 'Mia', NULL, 'Lopez', NULL, MD5('password456'), 'mial', 'mia.jpg', '2', '12345678012', 2, '2558106'),
('oliviamiller@example.com', 'Olivia', NULL, 'Miller', NULL, MD5('password789'), 'oliviam', 'olivia.jpg', '2', '12345678013', 1, '2558102'),
('liamwilson@example.com', 'Liam', NULL, 'Wilson', NULL, MD5('passwordabc'), 'liamw', 'liam.jpg', '2', '12345678014', 2, '2558113'),
('sophiamartinez2@example.com', 'Sophia', NULL, 'Martinez', NULL, MD5('passwordxyz'), 'sophiam2', 'sophia.jpg', '2', '12345678015', 1, '2558102'),
('noahanderson@example.com', 'Noah', NULL, 'Anderson', NULL, MD5('password123'), 'noaha', 'noah.jpg', '2', '12345678016', 2, '2558102'),
('avamartinez@example.com', 'Ava', NULL, 'Martinez', NULL, MD5('password456'), 'avam', 'ava.jpg', '2', '12345678017', 1, '2558103'),
('ethanturner@example.com', 'Ethan', NULL, 'Turner', NULL, MD5('password789'), 'ethant', 'ethan.jpg', '2', '12345678018', 2, '2558103'),
('miaparker@example.com', 'Mia', NULL, 'Parker', NULL, MD5('passwordabc'), 'miap', 'mia.jpg', '2', '12345678019', 1, '2558103'),
('lucasbrown@example.com', 'Lucas', NULL, 'Brown', NULL, MD5('passwordxyz'), 'lucasb', 'lucas.jpg', '2', '12345678020', 2, '2558103');

INSERT INTO grupos VALUES
('1','grupo 1','grupo de Heiver, ficha 2558104','2558104',2),
('2','grupo 2','grupo de Leonardo, ficha 2558105','2558105',2),
('3','grupo 3','grupo de Javier, ficha 2558104','2558104',2),
('4','grupo 4','grupo de Isaura, ficha 2558104','2558104',2),
('5','grupo 5','grupo de Wendy, ficha 2558105','2558105',2),
('6','grupo 6','grupo de Alejandra, ficha 2558105','2558105',2),
('7','grupo 7','grupo de Manolo, ficha de 2558102','2558102',2),
('8', 'Grupo 8', 'Sofia', '2558104',1),
('9', 'Grupo 9', 'Sebas', '2558112',1),
('10', 'Grupo 10', 'Lorenso', '2558112',1),
('11', 'Grupo 11', 'Camilo', '2558103',1),
('12', 'Grupo 12', 'Tulia', '2558105',1),
('13', 'Grupo 13', 'Nicolas', '2558106',1),
('14', 'Grupo 14', 'Esteban', '2558107',1),
('15', 'Grupo 15', 'Maria', '2558105',1),
('16', 'Grupo 16', 'Camila', '2558102',1),
('17', 'Grupo 17', 'Lorena', '2558112',1),
('18', 'Grupo 18', 'Laura', '2558113',1),
('19', 'Grupo 19', 'Jhoan', '2558112',1),
('20', 'Grupo 20', 'Carlos', '2558113',1);

INSERT INTO usuarios_grupos VALUES 
(NULL,'1','1131104356'),   #1
(NULL,'8','1131104356'),   #2
(NULL,'4','1131104356'),   #3
(NULL,'1','1234567911'),   #4
(NULL,'3','1234567911'),    #5
(NULL,'4','1234567911'),    #6
(NULL,'1','12345678914'),    #7
(NULL,'3','12345678914'),    #8
(NULL,'4','12345678914'),    #9
(NULL,'1','12345678916'),    #10
(NULL,'3','12345678916'),    #11
(NULL,'4','12345678916'),    #12
(NULL,'1','12345678917'),    #13
(NULL,'3','12345678917'),    #14
(NULL,'4','12345678917'),    #15
(NULL,'1','12345678918'),    #16
(NULL,'3','12345678918'),    #17
(NULL,'4','12345678918'),    #18
(NULL,'1','12345678919'),    #19
(NULL,'3','12345678919'),    #20
(NULL,'4','12345678919'),    #21
(NULL,'1','12345678912'),    #22
(NULL,'5','12345678912'),    #23
(NULL,'6','12345678912'),    #24
(NULL,'1','1021392807'),    #25
(NULL,'5','1021392807'),    #26
(NULL,'6','1021392807'),    #27
(NULL,'1','12345678012');    #28

INSERT INTO mensaje VALUES
('1', '2020-03-20','11:30:00','HOLA','1','1'),
('2', '2020-03-20','12:30:00','BUEN DIA, INSTRUCTOR','26','1'),
('3', '2020-03-20','13:30:00','QUE TRANZA','1','2'),
('4', '2020-03-20','11:30:00','PERROS WOOF WOOF','28','1'),
('5', '2020-03-20','12:30:00','ALAMBRE DE QUESO','25','2'),
('6', '2020-03-20','13:30:00','SI :D','25','2'),
('7', '2023-09-19', '14:45:00', 'ya', '1', '1'),
('8', '2023-09-19', '15:00:00', 'no se', '22', '1'),
('9', '2023-09-19', '15:15:00', 'jijija', '1', '3'),
('10', '2023-09-19', '15:30:00', 'buenos dias profe', '10', '3'),
('11', '2023-09-19', '15:45:00', 'ta to bien', '13', '2'),
('12', '2023-09-19', '16:00:00', 'ola', '16', '1'),
('13', '2023-09-19', '16:15:00', 'ya yo ya', '1', '3'),
('14', '2023-09-19', '16:30:00', 'jaijsiajsijijsi', '22', '2'),
('15', '2023-09-19', '16:45:00', 'no', '25', '2'),
('16', '2023-09-19', '17:00:00', 'ayer me tome clorox', '1', '1'),
('17', '2023-09-19', '17:15:00', 'no es excusas ', '22', '1'),
('18', '2023-09-19', '17:30:00', 'es problema del indio', '7', '1'),
('19', '2023-09-19', '17:45:00', 'la defeco', '10', '1'),
('20', '2023-09-19', '18:00:00', 'no se chino', '13', '1'),
('21', '2023-09-19', '18:15:00', 'colombia es gooood', '2', '1'),
('22', '2023-09-19', '18:30:00', 'viva cristo rey', '19', '1'),
('23', '2023-09-19', '18:45:00', 'nico lindo', '1', '2'),
('24', '2023-09-19', '19:00:00', 'jhoan mi rey', '25', '3'),
('25', '2023-09-19', '19:15:00', 'jhuan mi x100pre', '1', '3'),
('26', '2023-09-19', '19:30:00', 'ilovemi', '22', '1');


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
# (segun el grupo al cual pertenezcan y en el que el usuario se ubica)   # SELECT DISTINCT a.numerodoc, primer_nom, primer_apellido, contenido_mensaje, hora, id_tipo, id_usuarios_grupos FROM usuarios a   # RIGHT JOIN usuarios_grupos b ON a.numerodoc = b.numerodoc   # INNER JOIN mensaje c ON b.id_grupos = c.fk_id_grupos   # WHERE b.id_usuarios_grupos = 1;
