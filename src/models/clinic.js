import pkg from "sequelize";
const { Model, DataTypes } = pkg;

export default (sequelize) => {
  class Clinic extends Model {
    static associate(models) {
      // associate de dinh danh cac moi quan he
    }
  }

  Clinic.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      description: DataTypes.TEXT,
     image: DataTypes.STRING

     
    },
    {
      sequelize,
      modelName: "Clinic",
    }
  );

  return Clinic;
};
