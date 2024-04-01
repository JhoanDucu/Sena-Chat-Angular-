export class Rol {
    private roles: { [codigo: string]: string } = {
        1: "Instructor",
        2: "Aprendiz",
        3: "Administrador"
    };

    nombre = (codigo: any): string => this.roles[codigo] || "Rol invalido";
};