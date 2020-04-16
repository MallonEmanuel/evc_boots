module.exports = (sequelize, DataTypes) => {
    const Tweet = sequelize.define('tweet', {
        text: DataTypes.STRING,
        publish_date: DataTypes.DATE,
        timer: DataTypes.STRING,
        user: DataTypes.STRING,    
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
  
    return Tweet;
  } 