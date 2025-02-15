import pkg from "sequelize";
const { Model, DataTypes } = pkg;

export default (sequelize) => {
  class Doctor_Clinic_Specialty extends Model {
    static associate(models) {
      // associate de dinh danh cac moi quan he
    }
  }

  Doctor_Clinic_Specialty.init(
    {
     
     doctorId: DataTypes.INTEGER,
      clinicId: DataTypes.INTEGER,
     specialtyId: DataTypes.INTEGER

     
    },
    {
      sequelize,
      modelName: "Doctor_Clinic_Specialty",
    }
  );

  return Doctor_Clinic_Specialty;
};
