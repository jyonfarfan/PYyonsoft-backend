import {
  Table,
  Column,
  Model,
  DataType,
  Unique,
  BelongsTo,
  ForeignKey,
  AllowNull,
} from "sequelize-typescript";
import Company from "../company/company.model";
import Role from "../role/role.model";

@Table({
  tableName: "users",
})
class User extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.STRING(50),
    set(value: string) {
      if (value) {
        this.setDataValue("name", value.toUpperCase());
      } else {
        this.setDataValue("name", value);
      }
    },
  })
  declare name: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(60),
  })
  declare password: string;

  @AllowNull(false)
  @Unique(true)
  @Column({
    type: DataType.STRING(50),
    set(value: string) {
      if (value) {
        this.setDataValue("email", value.toLowerCase());
      } else {
        this.setDataValue("email", value);
      }
    },
  })
  declare email: string;

  @AllowNull(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  declare active: boolean;

  // Relación con Company
  @ForeignKey(() => Company)
  @Column({
    type: DataType.INTEGER, // 🔧 Mejor especificar el tipo
  })
  declare company_Id: number; // 🔧 Cambiado de string a number

  @BelongsTo(() => Company)
  declare company: Company; // ✅ Nombre correcto

  // Relación con Role
  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER, // 🔧 Mejor especificar el tipo
  })
  declare role_Id: number; // 🔧 Cambiado de string a number

  @BelongsTo(() => Role)
  declare role: Role; // ✅ CORREGIDO: Era "roleid", ahora es "role"
}
export default User;
