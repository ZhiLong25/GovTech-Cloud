module.exports = (sequelize, DataTypes) => {
    const Record = sequelize.define("Record", {
        Name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Temperature: {
            type: DataTypes.DECIMAL(3, 1),
            allowNull: false
        },
        Symptoms: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Contact: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    });

    Record.associate = models => {
        Record.belongsTo(models.User, { foreignKey: 'Name', targetKey: 'Name' });
    }

    return Record;
}