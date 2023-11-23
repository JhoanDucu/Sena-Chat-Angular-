export class Mensaje {
    constructor(
        public id_mensaje: string,
        public primer_nom: string,
        public primer_apellido: string,
        public fecha: string,
        public hora: string,
        public contenido_mensaje: string,
        public numerodoc: string,
        public id_tipo: string,
        public fk_id_grupos: string
    ){}
}