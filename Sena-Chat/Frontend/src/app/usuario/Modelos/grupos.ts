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

export class GrupoComponentData {
   constructor(
      public grupos: Array<Grupo>,
      public privados: Array<Grupo>,
   ) { }
}