import pkg from "sequelize";
const { Model, DataTypes } = pkg;

export default (sequelize) => {
  class Schedule extends Model {
    static associate(models) {
      // associate de dinh danh cac moi quan he
    }
  }

  Schedule.init(
    {
      currentNumber: DataTypes.INTEGER,
      maxNumber: DataTypes.INTEGER,
      date: DataTypes.DATE,
      timeType: DataTypes.STRING,
      doctorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Schedule",
    }
  );

  return Schedule;
};
