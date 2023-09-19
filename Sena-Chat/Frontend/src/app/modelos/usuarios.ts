export class Usuario {
    constructor (
        public correo: string,
        public primer_nom: string,
        public segundo_nom: string,
        public primer_apellido: string,
        public segundo_apellido: string,
        public contrasena: string,
        public nombre_usuario: string,
        public numerodoc: string,
        public fk_id_tipodoc: string,
        public fk_id_ficha: string,
        public foto: string,
        public fk_id_rol: string
    ) {}
}