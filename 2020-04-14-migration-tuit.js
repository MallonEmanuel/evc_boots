const Sequelize = require('sequelize');

const sequelize = new Sequelize('evc-db', 'evc-user', '12345678', {
    host: 'localhost',
    dialect: 'postgres' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
  });

  
const Model = Sequelize.Model;

class Tuit extends Model {}

Tuit.init({ 
  // attributes
   text             : { type: Sequelize.STRING }
  ,publish_date     : { type: Sequelize.DATE }
  ,timer            : { type: Sequelize.STRING } 
  ,user             : { type: Sequelize.STRING } 
}, {
  sequelize,
  modelName: 'tuits'
  // options
});


Tuit.sync({ force: true }).then(() => {
  // Now the `users` table in the database corresponds to the model definition
  // return User.create({
  //   nombre: 'John',
  //   apellido: 'Hancock'
  // });
  console.log('Tabla Tuit creada');
  process.exit(0);
});

