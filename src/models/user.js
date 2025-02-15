import pkg from "sequelize";
const { Model, DataTypes } = pkg;

export default (sequelize) => {
  class User extends Model {
    static associate(models) {
      // associate de dinh danh cac moi quan he
    }
  }

  User.init(
    {
      email: DataTypes.STRING,
     password: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      address: DataTypes.STRING,
      gender: DataTypes.BOOLEAN,
      typeRole: DataTypes.STRING,
      keyRole: DataTypes.STRING,

     
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
