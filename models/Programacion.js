module.exports = (sequelize, DataTypes) => {
    const Programacion = sequelize.define('programacion', {
      timer        : { type: DataTypes.STRING }
     ,usr_id          : { type: DataTypes.STRING }
        // content: {
        //   type: DataTypes.TEXT,
        //   allowNull: true
        // },
      },
      {
        freezeTableName: true,
      }
    );

    // Tweet.associate = (models) => {
    //     Tuit.belongsTo(models.author);
    // };

    return Programacion;
  }
