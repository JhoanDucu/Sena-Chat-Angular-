export class MensajeEnviar {
    constructor (
        public id_mensaje: undefined,
        public fecha_hora: any,
        public contenido_mensaje: string,
        public fk_destino: string,
        public id_tipo: string,
    ){}
}

export class MensajeMostrar {
    constructor (
        public id_mensaje: undefined,
        public primer_nom: string,
        public primer_apellido: string,
        public fecha_hora: any,
        public contenido_mensaje: string,
        public numerodoc: any,
        public id_tipo: string,
    ){}
}