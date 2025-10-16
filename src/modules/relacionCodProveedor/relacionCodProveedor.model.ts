// src/models/RelacionCodProveedor.ts
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
  tableName: "relacion_cod_proveedor",
  timestamps: false,
  indexes: [
    {
      name: "uq_rel_cod_prov",
      unique: true,
      fields: ["codigo_int_prod", "codigo_proveedor", "rut_proveedor"],
    },
  ],
})
class RelacionCodProveedor extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id_rel_cod_prod: number;

  @ForeignKey(() => Producto)
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare codigo_int_prod: string;

  @Column(DataType.STRING(100))
  declare codigo_proveedor: string;

  @Column(DataType.STRING(100))
  declare descripcion: string;

  @Column(DataType.STRING(12))
  declare rut_proveedor: string;

  @BelongsTo(() => Producto)
  declare producto: Producto;
}

export default RelacionCodProveedor;
