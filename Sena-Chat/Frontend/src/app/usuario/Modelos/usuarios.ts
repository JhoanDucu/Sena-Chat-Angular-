<<<<<<< Updated upstream
export interface Usuario {
=======
interface DatosUsuario {
>>>>>>> Stashed changes
    correo: string;
    primer_nom: string;
    segundo_nom: string;
    primer_apellido: string;
    segundo_apellido: string;
    contrasena: string;
    nombre_usuario: string;
    numerodoc: string;
    fk_id_tipodoc: string;
    fk_id_ficha: string;
    foto: string;
    fk_id_rol: string;
<<<<<<< Updated upstream
}
=======
}

export type Usuario = Partial<DatosUsuario>;
>>>>>>> Stashed changes
