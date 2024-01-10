import { MensajeMostrar } from "./mensaje";

export class Grupo {
  constructor(
    public id_grupos: string,
    public nom_grupos: string,
    public descripcion_grupos: string,
    public id_ficha: string,
    public mensajes: Array<MensajeMostrar>
  ) { }
}

export interface GrupoComponentData {
  grupos: Array<Grupo>,
  privados: Array<Grupo>,
}