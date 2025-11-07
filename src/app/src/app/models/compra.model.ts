export interface Compra {
    id: number;
    clienteId: number;
    articuloId: number;
    fecha: string;
    cliente?: { id: number; nombre: string; apellidos: string; };
    articulo?: { id: number; codigo: string; descripcion: string; };
}

export interface CompraCreate {
    clienteId: number;
    articuloId: number;
    fecha: string;
    descontarStock: boolean;
}

export interface CompraList {
    id: number;
    clienteId: number;
    clienteNombre: string;
    articuloId: number;
    articuloCodigo: string;
    articuloDescripcion: string;
    fecha: string;
}