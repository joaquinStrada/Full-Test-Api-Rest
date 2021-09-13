const fs = require('fs');

const readConfig = () => {
    try {
        const data = fs.readFileSync('config.json', 'utf8');
        const jsonData = JSON.parse(data);

        if (!jsonData) {
            return {
                host: 'localhost',
                port: 3306,
                user: 'root',
                password: '',
                database: 'testApisDB'
            };   
        }

        return {
            port: jsonData.port || 3306,
            host: jsonData.host || 'localhost',
            user: jsonData.user || 'root',
            password: jsonData.password || '',
            database: jsonData.database || 'testApisDB'
        };
    } catch (err) {
        return {
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: '',
            database: 'testApisDB'
        };
    }
}

const saveConfig = (data) => {
    try {
        const stringData = JSON.stringify(data);
        fs.writeFileSync('config.json', stringData, 'utf8');
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = {
    readConfig,
    saveConfig
};