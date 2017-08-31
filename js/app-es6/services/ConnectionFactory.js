
let ConnectionFactory = (function () {

    const dbName        = 'app-negociacoes';
    const dbVersion     = 5;
    const stores        = ['negociacoes'];
    let connectionF     = null;
    let closeF          = null;

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
                    if(!connectionF){
                        connectionF = e.target.result;
                        closeF = connectionF.close.bind(connectionF);
                        connectionF.close = function(){
                            throw new Error('Você não pode fechar a conexão');
                        }
                    }
                    resolve(connectionF);
                };

                openDb.onerror = e => {
                    reject(e.target.error.name);
                };
            });
        }

        static closeConnection(){
            if(connectionF){
                closeF();
                connectionF = null;
            }
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