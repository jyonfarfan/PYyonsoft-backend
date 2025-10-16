import {
  Table,
  Column,
  Model,
  DataType,
  Unique,
  HasMany,
} from "sequelize-typescript";
import Modelo from "../modelo/modelo.model";
import ProductoCategoria from "../productoCategoria/productoCategoria.model";

@Table({
  tableName: "marcas",
  timestamps: false, // No createdAt/updatedAt
})
class Marca extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id_marca: number;

  @Unique("uq_marcas_desc")
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare desc_marca: string;

  // Relación: Una marca tiene muchos modelos
  @HasMany(() => Modelo)
  declare modelos: Modelo[];

  // Relación: Una marca puede estar en muchas categorías de producto
  @HasMany(() => ProductoCategoria)
  declare productosCategoria: ProductoCategoria[];
}

export default Marca;
