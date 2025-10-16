// src/models/ProductoPack.ts
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
  tableName: "productos_pack",
  timestamps: false,
})
class ProductoPack extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id_prod_pack: number;

  @ForeignKey(() => Producto)
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare codigo_int_prod: string;

  @Column({
    type: DataType.DECIMAL(9, 0),
    allowNull: false,
    defaultValue: 1,
  })
  declare cantidad: number;

  @BelongsTo(() => Producto)
  declare producto: Producto;
}

export default ProductoPack;
