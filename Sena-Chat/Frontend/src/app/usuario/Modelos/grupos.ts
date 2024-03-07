import { MensajeMostrar } from "./mensaje";

interface DatosGrupo {
   id_usuarios_grupos: string,
   id_grupos: string,
   nom_grupos: string,
   descripcion_grupos: string,
   id_ficha: string,
   foto_grupo: string,
   fk_tipo_grupo: number,
   mensajes: Array<MensajeMostrar>,
   sin_leer: number,
   doc?: string
}

export type Grupo = Partial<DatosGrupo>;

export interface GrupoComponentData {
  grupos: Array<Grupo>,
  privados: Array<Grupo>,
}

export interface Tab {
  class: boolean;
  new: boolean;
}

export interface Tabs {
  grupos: Tab;
  privados: Tab;
  ajustes: Tab;
  perfil: Tab;
  [key: string]: any,
}