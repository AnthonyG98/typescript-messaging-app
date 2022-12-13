module.exports = (sequelize, DataTypes) =>{
    const Messages = sequelize.define("Messages", {
        receiver_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        sender_profile_picture:{
            type: DataTypes.STRING,
            allowNull: true
        },
        receiver_profile_picture:{
            type: DataTypes.STRING,
            allowNull: true
        },
        username:{
            type: DataTypes.STRING,
            allowNull: true
        },
        message:{
            type: DataTypes.STRING,
            allowNull: true
        },
        chatId:{
            type: DataTypes.STRING,
            allowNull: false
        },
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    });
    return Messages
}