export interface Cliente {
    id: number;
    nombre: string;
    apellidos: string;
    direccion?: string | null;
}

export interface ClienteCreate {
    nombre: string;
    apellidos: string;
    direccion?: string | null;
}

export interface ClienteUpdate {
    nombre: string;
    apellidos: string;
    direccion?: string | null;
}
