const Sequelize = require('sequelize');

// Servidor de prueba de conexion a base de datos
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'evc.sqlite'
});


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// sequelize.close()
