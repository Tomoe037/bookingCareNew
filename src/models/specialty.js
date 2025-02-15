import pkg from "sequelize";
const { Model, DataTypes } = pkg;

export default (sequelize) => {
  class Specialty extends Model {
    static associate(models) {
      // associate de dinh danh cac moi quan he
    }
  }

  Specialty.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      image: DataTypes.STRING,

    },
    {
      sequelize,
      modelName: "Specialty",
    }
  );

  return Specialty;
};
