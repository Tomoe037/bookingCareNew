import pkg from "sequelize";
const { Model, DataTypes } = pkg;

export default (sequelize) => {
  class Booking extends Model {
    static associate(models) {
      // associate de dinh danh cac moi quan he
    }
  }

  Booking.init(
    {
      statusId: DataTypes.STRING,
      doctorId: DataTypes.INTEGER,
      patientId: DataTypes.INTEGER,
      date: DataTypes.DATE,
      timeType: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );

  return Booking;
};
