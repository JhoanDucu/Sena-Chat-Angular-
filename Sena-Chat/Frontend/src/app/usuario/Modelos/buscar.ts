import { Grupo } from "./grupos";
import { MensajeMostrar } from "./mensaje";

export interface Buscar {
    resultados: boolean;
    Grupos: Grupo[];
    Privados: Grupo[];
    Mensajes: MensajeMostrar[];
    [key: string]: any;
}