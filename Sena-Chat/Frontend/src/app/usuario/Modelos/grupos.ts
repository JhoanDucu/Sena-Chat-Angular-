import { MensajeMostrar } from "./mensaje";

export class Grupo {
  constructor(
    public id_usuarios_grupos: string,
    public id_grupos: string,
    public nom_grupos: string,
    public descripcion_grupos: string,
    public id_ficha: string,
    public mensajes: Array<MensajeMostrar>,
    public sin_leer: number
  ) { }
}

export interface GrupoComponentData {
  grupos: Array<Grupo>,
  privados: Array<Grupo>,
}

export interface Tab {
  class: string;
}

export interface Tabs {
  grupos: Tab;
  privados: Tab;
  ajustes: Tab;
  [key: string]: any,
}