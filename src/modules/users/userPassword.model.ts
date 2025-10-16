import {
  Table,
  Column,
  Model,
  DataType,
  Unique,
  AllowNull,
} from "sequelize-typescript";

@Table({
  tableName: "userpasswordsave",
})
class UserSave extends Model {
  @AllowNull(false)
  @Unique(true)
  @Column({
    type: DataType.STRING(50),
    set(value: string) {
      // Asegúrate de que el valor existe y es una cadena antes de llamar a toUpperCase()
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
    type: DataType.STRING(60),
  })
  declare password: string;
}

export default UserSave;
