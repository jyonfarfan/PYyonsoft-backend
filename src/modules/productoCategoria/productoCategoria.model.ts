// src/models/ProductoCategoria.ts
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import Producto from "../producto/producto.model";
import Marca from "../marca/marca.model";
import Modelo from "../modelo/modelo.model";

@Table({
  tableName: "producto_categoria",
  timestamps: false,
  indexes: [
    {
      name: "uq_prod_cat_completo",
      unique: true,
      fields: ["codigo_int_prod", "id_marca", "id_modelo"],
    },
  ],
})
class ProductoCategoria extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id_prod_categoria: number;

  @ForeignKey(() => Producto)
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare codigo_int_prod: string;

  @ForeignKey(() => Marca)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare id_marca: number;

  @ForeignKey(() => Modelo)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare id_modelo: number;

  // Relaciones
  @BelongsTo(() => Producto)
  declare producto: Producto;

  @BelongsTo(() => Marca)
  declare marca: Marca;

  @BelongsTo(() => Modelo)
  declare modelo: Modelo;
}

export default ProductoCategoria;
