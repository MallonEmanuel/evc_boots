const Sequelize = require('sequelize');

const sequelize = new Sequelize('evc-db', 'evc-user', '12345678', {
    host: 'localhost',
    dialect: 'postgres' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
  });

  
const Model = Sequelize.Model;

class Tweet extends Model {}

Tweet.init({
  // attributes
   text             : { type: Sequelize.STRING }
  ,publish_date     : { type: Sequelize.STRING }
}, {
  sequelize,
  modelName: 'tweets'
  // options
});


Tweet.sync({ force: true }).then(() => {
  // Now the `users` table in the database corresponds to the model definition
  // return User.create({
  //   nombre: 'John',
  //   apellido: 'Hancock'
  // });
  console.log('Tabla Resultado creada');
});

