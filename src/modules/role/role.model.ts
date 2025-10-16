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
  tableName: "roles",
})
class Role extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.STRING(50),
    // 🛑 Implementación del Setter para convertir a minúsculas
    set(value: string) {
      // Asegúrate de que el valor existe y es una cadena antes de llamar a toLowerCase()
      if (value) {
        this.setDataValue("role_name", value.toLowerCase());
      } else {
        this.setDataValue("role_name", value);
      }
    },
  })
  declare role_name: string;

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
export default Role;
