'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoService = function () {
    function NegociacaoService() {
        _classCallCheck(this, NegociacaoService);

        this._urls = {
            semana: 'negociacoes/semana',
            anterior: 'negociacoes/anterior',
            retrasada: 'negociacoes/retrasada'
        };
        this._http = new HttpService();
    }

    _createClass(NegociacaoService, [{
        key: 'obterNegociacoes',
        value: function obterNegociacoes() {
            return Promise.all([this.obterNegociacaoDaSemana(), this.obterNegociacaoDaSemanaAnterior(), this.obterNegociacaoDaSemanaRetrasada()]).then(function (negociacoes) {
                return negociacoes.reduce(function (arraymenor, array) {
                    return arraymenor.concat(array);
                }, []);
            }).catch(function (err) {
                throw new Error(err);
            });
        }
    }, {
        key: 'obterNegociacaoDaSemana',
        value: function obterNegociacaoDaSemana() {

            return this._http.get(this._urls.semana).then(function (objeto) {
                return objeto.map(function (objeto) {
                    return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                });
            }).catch(function (err) {
                throw new Error(err);
            });
        }
    }, {
        key: 'obterNegociacaoDaSemanaAnterior',
        value: function obterNegociacaoDaSemanaAnterior() {
            return this._http.get(this._urls.anterior).then(function (objeto) {
                return objeto.map(function (objeto) {
                    return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                });
            }).catch(function (err) {
                throw new Error(err);
            });
        }
    }, {
        key: 'obterNegociacaoDaSemanaRetrasada',
        value: function obterNegociacaoDaSemanaRetrasada() {
            return this._http.get(this._urls.retrasada).then(function (objeto) {
                return objeto.map(function (objeto) {
                    return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                });
            }).catch(function (err) {
                throw new Error(err);
            });
        }
    }, {
        key: 'cadastrar',
        value: function cadastrar(negociacao) {

            return ConnectionFactory.getConnection().then(function (conn) {
                return new NegociacaoDao(conn);
            }).then(function (dao) {
                return dao.adiciona(negociacao);
            }).then(function (mensagem) {
                return mensagem;
            }).catch(function (e) {
                throw new Error('Não foi possível adicionar' + e.target.name);
            });
        }
    }, {
        key: 'lista',
        value: function lista() {
            return ConnectionFactory.getConnection().then(function (conn) {
                return new NegociacaoDao(conn);
            }).then(function (dao) {
                return dao.listaTodos();
            }).catch(function (e) {
                throw new Error('Não foi possível listar as negociações' + e.target.name);
            });
        }
    }, {
        key: 'apagar',
        value: function apagar() {
            return ConnectionFactory.getConnection().then(function (conn) {
                return new NegociacaoDao(conn);
            }).then(function (dao) {
                return dao.apagarTodos();
            }).then(function (mensagem) {
                return mensagem;
            }).catch(function (e) {
                throw new Error('Não foi possível listar as negociações' + e.target.name);
            });
        }
    }, {
        key: 'importa',
        value: function importa(listaNegociacoes) {
            var _this = this;

            return this.obterNegociacoes().then(function (negociacoes) {
                return negociacoes.filter(function (negociacao) {
                    return !listaNegociacoes.some(function (negociacaoExistente) {
                        return negociacao.isEquals(negociacaoExistente);
                    });
                });
            }).catch(function (e) {
                return _this._exibeUmaMensagem(e);
            });
        }
    }]);

    return NegociacaoService;
}();
//# sourceMappingURL=NegociacaoService.js.map