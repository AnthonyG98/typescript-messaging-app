module.exports = (sequelize, DataTypes) =>{
    const Users = sequelize.define("Users", {
        fullName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        profile_picture:{
            type: DataTypes.STRING,
            allowNull: true
        }
    })
    return Users
}