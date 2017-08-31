'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoDao = function () {
    function NegociacaoDao(connection) {
        _classCallCheck(this, NegociacaoDao);

        this._connection = connection;
        this._store = 'negociacoes';
    }

    _createClass(NegociacaoDao, [{
        key: '_getObjectStore',
        value: function _getObjectStore() {
            return this._connection.transaction([this._store], 'readwrite').objectStore(this._store);
        }
    }, {
        key: 'adiciona',
        value: function adiciona(negociacao) {
            var _this = this;

            return new Promise(function (resolve, reject) {

                var request = _this._getObjectStore().add(negociacao);

                request.onsuccess = function (e) {
                    console.log('Inserido com sucesso');
                    resolve();
                };

                request.onerror = function (e) {
                    console.log(e.target.error);
                    reject('Não foi possível criar a negociação');
                };
            });
        }
    }, {
        key: 'listaTodos',
        value: function listaTodos() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {

                var cursor = _this2._getObjectStore().openCursor();

                var negociacoes = [];

                cursor.onsuccess = function (e) {
                    var ponteiroAtual = e.target.result;

                    if (ponteiroAtual) {
                        var dado = ponteiroAtual.value;
                        negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));
                        ponteiroAtual.continue();
                    } else {
                        resolve(negociacoes);
                    }
                };

                cursor.onerror = function (e) {
                    console.log(e.target.error);
                    reject('Não foi possível criar a negociação');
                };
            });
        }
    }, {
        key: 'apagarTodos',
        value: function apagarTodos() {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                var request = _this3._getObjectStore().clear();

                request.onsuccess = function (e) {
                    return resolve('Negociações removidas com sucesso');
                };

                request.onerror = function (e) {
                    console.log(e.target.error);
                    reject('Não foi possível remover as negociações');
                };
            });
        }
    }]);

    return NegociacaoDao;
}();
//# sourceMappingURL=NegociacaoDao.js.map