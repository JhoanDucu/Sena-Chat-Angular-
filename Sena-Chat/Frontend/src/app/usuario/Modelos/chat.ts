import { GrupoComponentData } from "./grupos";
import { Usuario } from "./usuarios";

export class ChatComponentData {
    constructor(
        public gruposComponent: any | GrupoComponentData,
<<<<<<< Updated upstream
        public datosUsuario: Usuario | undefined,
=======
        public datosUsuario: Usuario,
>>>>>>> Stashed changes
        public other: {
            changes: any,
            loading: boolean
        }
    ) { }
}