export interface Compra{
    id: string,
    fecha_hora_compra: Date,
    producto: string,
    precio: number,
    grupo_producto: string,
    cantidad_comprada: number,
    sucursal: string
}