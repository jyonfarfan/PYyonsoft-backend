// src/models/Modelo.ts
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import Marca from "../marca/marca.model";
import ProductoCategoria from "../productoCategoria/productoCategoria.model";

@Table({
  tableName: "modelos",
  timestamps: false,
  indexes: [
    {
      name: "uq_modelos_desc_marca",
      unique: true,
      fields: ["desc_modelo", "id_marca"],
    },
    { name: "idx_modelos_marca", fields: ["id_marca"] },
  ],
})
class Modelo extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id_modelo: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare desc_modelo: string;

  @Column(DataType.DECIMAL(4, 0))
  declare fecha1: number;

  @Column(DataType.DECIMAL(4, 0))
  declare fecha2: number;

  @Column(DataType.STRING(6))
  declare cilindrada1: string;

  @Column(DataType.STRING(6))
  declare cilindrada2: string;

  @Column(DataType.STRING(6))
  declare tipo: string;

  @ForeignKey(() => Marca)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare id_marca: number;

  // Relación: Un modelo pertenece a una marca
  @BelongsTo(() => Marca)
  declare marca: Marca;

  // Relación: Un modelo puede estar en muchas categorías de producto
  @HasMany(() => ProductoCategoria)
  declare productosCategoria: ProductoCategoria[];
}

export default Modelo;
