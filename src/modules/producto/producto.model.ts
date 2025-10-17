// src/models/Producto.ts
import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  HasOne,
} from "sequelize-typescript";
import ProductoCategoria from "../productoCategoria/productoCategoria.model";
import RelacionCodProveedor from "../relacionCodProveedor/relacionCodProveedor.model";
import EspecificacionTec from "../especificacionTec/especificacionTec.model";
import ProductoCatPrecio from "../productoCatPrecio/productoCatPrecio.model";
import ProductoStock from "../productoStock/productoStock.model";
import ProductoPack from "../productoPack/productoPack.model";

@Table({
  tableName: "productos",
  timestamps: false,
  // NOTA: Los constraints CHECK son a nivel de BBDD,
  // Sequelize los respeta pero no los define con decoradores.
  // Deben ser creados en una migración.
})
class Producto extends Model {
  // 1. AÑADE UN ID NUMÉRICO COMO LLAVE PRIMARIA
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  // 2. MANTIENE TU CÓDIGO, PERO AHORA ES ÚNICO, NO PRIMARIO
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true, // <-- ¡Importante!
  })
  declare codigo_int_prod: string;

  // ... el resto de tus columnas permanecen igual ...
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare codigo_original: string;

  @Column(DataType.STRING(50))
  declare descripcion: string;

  @Column(DataType.BOOLEAN)
  declare caract_tec: boolean;

  @Column(DataType.STRING(100))
  declare origen: string;

  @Column(DataType.STRING(50))
  declare familia: string;

  @Column({
    type: DataType.DECIMAL(12, 2),
    defaultValue: 0,
  })
  declare costo_neto: number;

  @Column(DataType.STRING(3))
  declare u_medida: string;

  @Column(DataType.BOOLEAN)
  declare active: boolean;

  @Column({
    type: DataType.DECIMAL(9, 0),
    defaultValue: 0,
  })
  declare stock_max: number;

  @Column(DataType.STRING(20))
  declare id_pack_oferta: string;

  @Column(DataType.STRING(9))
  declare unidades_caja: string;

  @Column({
    type: DataType.DECIMAL(3, 2),
    defaultValue: 0,
  })
  declare impuesto_adi: number;

  @Column({
    type: DataType.DECIMAL(6, 2),
    defaultValue: 0,
  })
  declare transporte: number;

  @Column(DataType.STRING(100))
  declare imagen_ref: string;

  // --- RELACIONES ---
  @HasMany(() => ProductoCategoria)
  declare categorias: ProductoCategoria[];

  @HasMany(() => RelacionCodProveedor)
  declare codigos_proveedor: RelacionCodProveedor[];

  @HasMany(() => EspecificacionTec)
  declare especificaciones: EspecificacionTec[];

  @HasMany(() => ProductoStock)
  declare stocks: ProductoStock[];

  @HasMany(() => ProductoPack)
  declare packs: ProductoPack[];

  @HasOne(() => ProductoCatPrecio)
  declare precios: ProductoCatPrecio;
}

export default Producto;
