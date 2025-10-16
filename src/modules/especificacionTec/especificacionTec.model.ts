// src/models/EspecificacionTec.ts
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
  tableName: "especificaciones_tec",
  timestamps: false,
})
class EspecificacionTec extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id_especf_tec: number;

  @ForeignKey(() => Producto)
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare codigo_int_prod: string;

  @Column(DataType.STRING(100))
  declare descripcion: string;

  @BelongsTo(() => Producto)
  declare producto: Producto;
}

export default EspecificacionTec;
