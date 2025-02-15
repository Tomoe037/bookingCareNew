import pkg from "sequelize";
const { Model, DataTypes } = pkg;

export default (sequelize) => {
  class History extends Model {
    static associate(models) {
      // associate de dinh danh cac moi quan he
    }
  }

  History.init(
    {
      patientId: DataTypes.INTEGER,
      doctorId: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      files: DataTypes.TEXT,

    },
    {
      sequelize,
      modelName: "History",
    }
  );

  return History;
};
