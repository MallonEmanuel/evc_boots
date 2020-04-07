const Sequelize = require('sequelize');

// Servidor de prueba de conexion a base de datos
// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: 'evc.sqlite'
// });

// Option 1: Passing parameters separately
const sequelize = new Sequelize('evc-db', 'evc-user', '12345678', {
  host: 'localhost',
  dialect: 'postgres' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});


const User = sequelize.model('usuario');

console.log(User.findAll());
