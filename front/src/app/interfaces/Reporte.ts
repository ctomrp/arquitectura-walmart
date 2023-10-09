export interface Reporte{
    id: string,
    fecha_reporte: Date,
    compra: Date,
    producto: string,
    grupo_producto: string,
    cant_comprada: number,
    sucursal: string
}