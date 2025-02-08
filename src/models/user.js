import pkg from "sequelize";
const { Model, DataTypes } = pkg;

export default (sequelize) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }

  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
