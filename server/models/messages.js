module.exports = (sequelize, DataTypes) =>{
    const Messages = sequelize.define("Messages", {
        sender_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        receiver_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        profile_picture:{
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
        }
    });
    return Messages
}