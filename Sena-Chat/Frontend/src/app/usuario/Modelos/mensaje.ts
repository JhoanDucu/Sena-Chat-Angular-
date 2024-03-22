export interface MensajeEnviar {
    id_mensaje: undefined,
    fecha_hora: any,
    contenido_mensaje: string | undefined,
    archivo?: string,
    fk_destino: string,
    id_tipo: number,
}

export interface MensajeMostrar {
    id_mensaje: undefined,
    primer_nom: string,
    primer_apellido: string,
    fecha_hora: any,
    contenido_mensaje: string | undefined,
    numerodoc: any,
    id_tipo: number,
    [key: string]: any;
}

interface extras {
    variasFichas?: string,
    mensajeFichas?: string
}

export interface MensajeEmitir extends MensajeEnviar, MensajeMostrar, extras {}