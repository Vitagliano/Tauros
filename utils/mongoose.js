const mongoose = require('mongoose');

module.exports = {
    init: () => {
        const dbOptions = {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            autoIndex: false,
            poolSize: 5,
            connectTimeoutMS: 10000,
            family: 4
        };
        
        mongoose.connect(process.env.MONGO_URI, dbOptions);
        mongoose.set('useFindAndModify', false);
        mongoose.Promise = global.Promise;
        
        mongoose.connection.on('connected', () => {
            console.log('Conexão com a database feita com sucesso!');
        });
        
        mongoose.connection.on('err', err => {
            console.error(`Erro ao conectar a database: \n ${err.stack}`);
        });
        
        mongoose.connection.on('disconnected', () => {
            console.log('Conexão com a database foi finalizada');
        });
    }
};