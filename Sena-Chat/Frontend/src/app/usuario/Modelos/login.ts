import { GrupoComponentData } from "./grupos";
import { Usuario } from "./usuarios";

export class ChatComponentData {
    constructor (
        public gruposComponent: GrupoComponentData,
        public datosUsuario: Usuario | undefined,
    ) {}
}