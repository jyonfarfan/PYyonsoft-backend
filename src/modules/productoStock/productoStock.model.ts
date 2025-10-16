// src/models/ProductoStock.ts
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import Producto from "../producto/producto.model";

@Table({
  tableName: "producto_stock",
  timestamps: false,
  indexes: [
    {
      name: "uq_stock_prod_sucursal",
      unique: true,
      fields: ["codigo_int_prod", "id_sucursal"],
    },
  ],
})
class ProductoStock extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id_prod_stock: number;

  @ForeignKey(() => Producto)
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare codigo_int_prod: string;

  @Column({
    type: DataType.DECIMAL(9, 0),
    defaultValue: 0,
  })
  declare stock: number;

  @Column({
    type: DataType.DECIMAL(9, 0),
    defaultValue: 0,
  })
  declare stock_critico: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare id_sucursal: string;

  @Column(DataType.STRING(100))
  declare ubicacion: string;

  @BelongsTo(() => Producto)
  declare producto: Producto;
}

export default ProductoStock;
