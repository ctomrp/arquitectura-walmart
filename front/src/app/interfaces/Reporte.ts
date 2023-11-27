export interface Reporte{
    id: string,
    fecha_reporte: Date,
    compra: Date,
    producto: string,
    grupo_producto: string,
    cant_comprada: number,
    sucursal: string
}

export interface ReporteVenta{
    id: string,
    fecha_reporte: Date,
    total_compra: number,
    cantidad_prod_grupo_a: number,
    total_compra_grupo_a: number,
    cantidad_prod_grupo_b: number,
    total_compra_grupo_b: number,
    cantidad_prod_grupo_c: number,
    total_compra_grupo_c: number,
    cantidad_prod_grupo_d: number,
    total_compra_grupo_d: number,
    cantidad_prod_sin_grupo: number,
    total_compra_sin_grupo: number
}

export interface ReporteDetalleProducto{
    id: string,
    fecha_reporte: Date,
    nombre_producto: string,
    grupo_producto: string,
    cantidad_total_prod: number,
    total_recaudado_prod: number
}