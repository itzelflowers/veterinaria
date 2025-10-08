const express = require('express');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const sequelize = require('./config/sequelize');
const publicClientesRoutes = require('./routes/public/clientes');
const privateTrabajadoresRoutes = require('./routes/private/trabajadores');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Configuración de Swagger
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API Hospital Veterinario',
        version: '1.0.0',
        description: 'Documentación de la API del hospital veterinario',
    },
    servers: [
        {
            url: 'http://localhost:' + port,
        },
    ],
};

const swaggerOptions = {
    swaggerDefinition,
    apis: ['./routes/**/*.js'], // Documenta los endpoints en las rutas
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from your API Hospital! Visita /api-docs para la documentación Swagger.');
});

// Rutas públicas
app.use('/api/public', publicClientesRoutes);
// Rutas privadas
app.use('/api/private', privateTrabajadoresRoutes);

// Conexión a la base de datos y arranque del servidor
sequelize.authenticate()
    .then(() => {
        console.log('Conexión a MySQL establecida');
        return sequelize.sync();
    })
    .then(() => {
        app.listen(port, () => {
            console.log(`Servidor corriendo en puerto ${port}`);
        });
    })
    .catch(err => {
        console.error('No se pudo conectar a la base de datos:', err);
    });