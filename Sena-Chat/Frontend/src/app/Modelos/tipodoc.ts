export class TipoDocumento {
    private tipos: { [codigo: string]: string } = {
        '1': 'Cédula de Ciudadanía',
        '2': 'Tarjeta de Identidad',
        '3': 'Cédula de Extranjería',
        '4': 'PEP',
        '5': 'Permiso por Protección Temporal'
    };

    nombre = (codigo: any): string => this.tipos[codigo] || 'Tipo de documento inválido';
    
}