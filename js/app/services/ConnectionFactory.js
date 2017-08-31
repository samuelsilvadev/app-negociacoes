'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConnectionFactory = function () {

    var dbName = 'app-negociacoes';
    var dbVersion = 5;
    var stores = ['negociacoes'];
    var connectionF = null;
    var closeF = null;

    return function () {
        function ConnectionFactory() {
            _classCallCheck(this, ConnectionFactory);

            throw new Error('Classe ConnectionFactory não pode ser instanciada');
        }

        _createClass(ConnectionFactory, null, [{
            key: 'getConnection',
            value: function getConnection() {
                return new Promise(function (resolve, reject) {
                    var openDb = window.indexedDB.open(dbName, dbVersion);

                    openDb.onupgradeneeded = function (e) {
                        console.log('Criando ou atualizando banco!');
                        ConnectionFactory._createStores(e.target.result);
                    };

                    openDb.onsuccess = function (e) {
                        console.log('Conexão obtida com sucesso!');
                        if (!connectionF) {
                            connectionF = e.target.result;
                            closeF = connectionF.close.bind(connectionF);
                            connectionF.close = function () {
                                throw new Error('Você não pode fechar a conexão');
                            };
                        }
                        resolve(connectionF);
                    };

                    openDb.onerror = function (e) {
                        reject(e.target.error.name);
                    };
                });
            }
        }, {
            key: 'closeConnection',
            value: function closeConnection() {
                if (connectionF) {
                    closeF();
                    connectionF = null;
                }
            }
        }, {
            key: '_createStores',
            value: function _createStores(connection) {
                stores.forEach(function (store) {

                    if (connection.objectStoreNames.contains(store)) {
                        connection.deleteObjectStore(store);
                    }

                    connection.createObjectStore(store, { autoIncrement: true });
                });
            }
        }]);

        return ConnectionFactory;
    }();
}();
//# sourceMappingURL=ConnectionFactory.js.map