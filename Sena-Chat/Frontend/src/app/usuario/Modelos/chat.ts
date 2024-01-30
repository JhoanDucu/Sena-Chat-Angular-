import { GrupoComponentData } from "./grupos";
import { Usuario } from "./usuarios";

export class ChatComponentData {
    constructor(
        public gruposComponent: any | GrupoComponentData,
        public datosUsuario: Usuario,
        public other: {
            changes: any,
            loading: boolean
        }
    ) { }
}