module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        Email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });

    return User;
}

