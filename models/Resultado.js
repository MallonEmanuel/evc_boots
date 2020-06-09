module.exports = (sequelize, DataTypes) => {
    const Resultado = sequelize.define('resultado', {
      id_str       : { type: DataTypes.STRING }
     ,url          : { type: DataTypes.STRING }
     ,busqueda     : { type: DataTypes.STRING }
     ,text         : { type: DataTypes.STRING }
     ,user_id      : { type: DataTypes.STRING }
     ,user_id_str  : { type: DataTypes.STRING }
     ,user_name    : { type: DataTypes.STRING }
     ,geo          : { type: DataTypes.STRING }
     ,coordinates  : { type: DataTypes.STRING }
     ,place        : { type: DataTypes.STRING }
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

    return Resultado;
  }
