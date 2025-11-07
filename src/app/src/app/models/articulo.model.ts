export interface Articulo {
    id: number;
    codigo: string;
    descripcion: string;
    precio: number;
    imagen: string;
    stock: number;
}

export interface ArticuloCreate {
    codigo: string;
    descripcion: string;
    precio: number;
    imagen: string;
    stock: number;
}
