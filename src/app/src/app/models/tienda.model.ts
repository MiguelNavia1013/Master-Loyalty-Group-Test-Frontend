export interface Tienda {
    id: number;
    sucursal: string;
    direccion: string;
}

export interface TiendaCreate {
    sucursal: string;
    direccion: string;
}
