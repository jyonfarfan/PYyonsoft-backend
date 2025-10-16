import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  HasMany,
} from "sequelize-typescript";
import User from "../users/user.model";

@Table({
  tableName: "companies",
})
class Company extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.STRING(50),
  })
  declare rut: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(50),
    // 🛑 Implementación del Setter para convertir a MAYUSCULAS
    set(value: string) {
      // Asegúrate de que el valor existe y es una cadena antes de llamar a toUpperCase()
      if (value) {
        this.setDataValue("company_name", value.toUpperCase());
      } else {
        this.setDataValue("company_name", value);
      }
    },
  })
  declare company_name: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(50),
    set(value: string) {
      // Asegúrate de que el valor existe y es una cadena antes de llamar a toUpperCase()
      if (value) {
        this.setDataValue("alias", value.toUpperCase());
      } else {
        this.setDataValue("alias", value);
      }
    },
  })
  declare alias: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(50),
    set(value: string) {
      // Asegúrate de que el valor existe y es una cadena antes de llamar a toUpperCase()
      if (value) {
        this.setDataValue("business_line", value.toUpperCase());
      } else {
        this.setDataValue("business_line", value);
      }
    },
  })
  declare business_line: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(50),
    set(value: string) {
      // Asegúrate de que el valor existe y es una cadena antes de llamar a toUpperCase()
      if (value) {
        this.setDataValue("address", value.toUpperCase());
      } else {
        this.setDataValue("address", value);
      }
    },
  })
  declare address: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(50),
  })
  declare phone: string;

  @AllowNull(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  declare active: boolean;

  @HasMany(() => User, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  declare user: User[];
}
export default Company;
