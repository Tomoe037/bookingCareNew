import pkg from "sequelize";
const { Model, DataTypes } = pkg;

export default (sequelize) => {
    class Allcode extends Model {
        static associate(models) {
            // associate de dinh danh cac moi quan he
        }
    }

    Allcode.init(
        {
            key: DataTypes.STRING,
            type: DataTypes.STRING,
            valueEn: DataTypes.STRING,
            valueVi: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Allcode",
        }
    );

    return Allcode;
};
