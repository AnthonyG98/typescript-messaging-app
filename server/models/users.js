module.exports = (sequelize, DataTypes) =>{
    const Users = sequelize.define("Users", {
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