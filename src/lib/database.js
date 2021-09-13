const mysql = require('mysql2/promise');
const { readConfig } = require('./config.js');

let db = {
    error: true
};

const createConnection = async () => {
    try {
        const config = readConfig();
        const conn = await mysql.createConnection(config);

        db = {
            error: false,
            conn
        };

        console.log('DB conectada al host ', config.host);
    } catch (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Se cerró la conexión a la base de datos');
            db = {
                error: true,
                message: 'Se cerró la conexión a la base de datos'
            };
        } else if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('La base de datos tiene muchas conexiones');
            db = {
                error: true,
                message: 'La base de datos tiene muchas conexiones'
            };
        } else if (err.code === 'ECONNREFUSED') {
            console.error('Se rechazó la conexión a la base de datos');
            db = {
                error: true,
                message: 'Se rechazó la conexión a la base de datos'
            };
        } else if (err.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error('Acceso denegado a la base de datos');
            db = {
                error: true,
                message: 'Acceso denegado a la BD'
            };
        } else {
            console.error(err.message || 'No nos pudimos conectar a la BD');
            db = {
                error: true,
                message: 'No nos pudimos conectar a la BD'
            };
        }
    }
}

const getConnection = () => {
    return db;
}

module.exports = {
    createConnection,
    getConnection
};