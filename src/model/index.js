const dotenv = require('dotenv');
const { Sequelize, DataTypes } = require('sequelize');
const defineProduct = require('./Product');

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT || 3306),
        dialect: 'mysql',
        logging: false,
    }
);

const Product = defineProduct(sequelize, DataTypes);

async function initializeDatabase() {
    const requiredEnvVars = ['DB_NAME', 'DB_USER', 'DB_PASSWORD', 'DB_HOST'];
    const missingEnvVars = requiredEnvVars.filter((envVar) => process.env[envVar] === undefined);

    if (missingEnvVars.length > 0) {
        throw new Error(`Missing required database environment variables: ${missingEnvVars.join(', ')}`);
    }

    await sequelize.authenticate();
    console.log('Connected to MySQL database.');

    await sequelize.sync({ alter: true });
    console.log('MySQL models synchronized.');
}

module.exports = {
    sequelize,
    Product,
    initializeDatabase,
};
