
let ConnectionFactory = (function () {

    let dbName      = 'app-negociacoes';
    let dbVersion   = 5;
    let stores      = ['negociacoes'];
    let connectionF = null;

    return class ConnectionFactory{

        constructor(){
            throw new Error('Classe ConnectionFactory não pode ser instanciada');
        }

        static getConnection(){
            return new Promise((resolve, reject) => {
                let openDb = window.indexedDB.open(dbName, dbVersion);

                openDb.onupgradeneeded = e => {
                    console.log('Criando ou atualizando banco!');
                    ConnectionFactory._createStores(e.target.result);               
                };

                openDb.onsuccess = e => {
                    console.log('Conexão obtida com sucesso!');
                    if(!connectionF)
                        connectionF = e.target.result;
                    resolve(connectionF);
                };

                openDb.onerror = e => {
                    reject(e.target.error.name);
                };
            });
        }

        static _createStores(connection){
            stores.forEach(store => {
                
                if(connection.objectStoreNames.contains(store)) {
                    connection.deleteObjectStore(store);
                }

                connection.createObjectStore(store, { autoIncrement: true });
            });
        }
    }

})();