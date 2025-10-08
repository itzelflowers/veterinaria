const { Sequelize } = require('../node_modules/sequelize');


const sequelize = new Sequelize(
  process.env.DB_NAME || 'pawhospital',
  process.env.DB_USER || 'app',
  process.env.DB_PASSWORD || 'apppwd',
  {
    host: process.env.DB_HOST || 'localhost', // nombre del servicio en docker-compose
    dialect: 'mysql',
    logging: false
  }
);

// Validar la conexión
sequelize.authenticate()
  .then(() => {
    console.log('Conexión exitosa a MySQL (Sequelize)');
  })
  .catch((err) => {
    console.error('No se pudo conectar a MySQL:', err);
  });

module.exports = sequelize;
