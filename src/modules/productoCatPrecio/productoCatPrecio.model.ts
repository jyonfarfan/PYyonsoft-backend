// src/models/ProductoCatPrecio.ts
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  Unique,
} from "sequelize-typescript";
import Producto from "../producto/producto.model";

@Table({
  tableName: "producto_cat_precio",
  timestamps: false,
})
class ProductoCatPrecio extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id_producto_cat_precio: number;

  @Unique("uq_precio_producto")
  @ForeignKey(() => Producto)
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  codigo_int_prod!: string;

  @Column(DataType.DECIMAL(5, 2))
  declare margen_porce1: number;
  @Column(DataType.DECIMAL(10, 2))
  declare margen_peso1: number;
  @Column(DataType.DECIMAL(10, 2))
  declare venta_neto1: number;

  // ... (Repetir para los niveles 2 al 6)
  @Column(DataType.DECIMAL(5, 2))
  declare margen_porce2: number;
  @Column(DataType.DECIMAL(10, 2))
  declare margen_peso2: number;
  @Column(DataType.DECIMAL(10, 2))
  declare venta_neto2: number;

  @Column(DataType.DECIMAL(5, 2))
  declare margen_porce3: number;
  @Column(DataType.DECIMAL(10, 2))
  declare margen_peso3: number;
  @Column(DataType.DECIMAL(10, 2))
  declare venta_neto3: number;

  @Column(DataType.DECIMAL(5, 2))
  declare margen_porce4: number;
  @Column(DataType.DECIMAL(10, 2))
  declare margen_peso4: number;
  @Column(DataType.DECIMAL(10, 2))
  declare venta_neto4: number;

  @Column(DataType.DECIMAL(5, 2))
  declare margen_porce5: number;
  @Column(DataType.DECIMAL(10, 2))
  declare margen_peso5: number;
  @Column(DataType.DECIMAL(10, 2))
  declare venta_neto5: number;

  @Column(DataType.DECIMAL(5, 2))
  declare margen_porce6: number;
  @Column(DataType.DECIMAL(10, 2))
  declare margen_peso6: number;
  @Column(DataType.DECIMAL(10, 2))
  declare venta_neto6: number;

  @Column(DataType.DECIMAL(5, 2))
  declare comision: number;

  @BelongsTo(() => Producto)
  declare producto: Producto;
}

export default ProductoCatPrecio;
