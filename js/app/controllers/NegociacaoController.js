'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoController = function () {
    function NegociacaoController() {
        _classCallCheck(this, NegociacaoController);

        var $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._ordemAtual = '';

        this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($('#viewNegociacoes')), 'adiciona', 'apagarNegociacoes', 'ordena', 'inverteOrdena');

        this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');

        this._service = new NegociacaoService();
        this._init();
    }

    _createClass(NegociacaoController, [{
        key: '_init',
        value: function _init() {
            var _this = this;

            this._service.lista().then(function (negociacoes) {
                return negociacoes.forEach(function (negociacao) {
                    return _this._listaNegociacoes.adiciona(negociacao);
                });
            }).catch(function (e) {
                return console.log(e);
            });

            setInterval(function () {
                return _this.importaNegociacoes();
            }, 3000);
        }
    }, {
        key: 'adiciona',
        value: function adiciona(e) {
            var _this2 = this;

            e.preventDefault();

            var negociacao = this._criaNegociacao();
            this._service.cadastrar(negociacao).then(function (mensagem) {
                _this2._listaNegociacoes.adiciona(negociacao);
                _this2._exibeUmaMensagem(mensagem);
                _this2._limpaFormulario();
            }).catch(function (e) {
                return _this2._exibeUmaMensagem(e);
            });
        }
    }, {
        key: 'importaNegociacoes',
        value: function importaNegociacoes() {
            var _this3 = this;

            this._service.importa(this._listaNegociacoes.negociacoes).then(function (negociacoes) {
                negociacoes.forEach(function (negociacao) {
                    _this3._listaNegociacoes.adiciona(negociacao);
                });
                _this3._exibeUmaMensagem('Negociações importadas com sucesso');
            }).catch(function (err) {
                return _this3._exibeUmaMensagem(err);
            });
        }
    }, {
        key: 'apagarNegociacoes',
        value: function apagarNegociacoes() {
            var _this4 = this;

            if (confirm('Deseja realmente apagar a lista de negociações?')) {

                this._service.apagar().then(function (mens) {
                    _this4._exibeUmaMensagem(mens);
                    _this4._listaNegociacoes.apagarNegociacoes();
                }).catch(function (err) {
                    return _this4._exibeUmaMensagem(err);
                });
            }
        }
    }, {
        key: 'ordena',
        value: function ordena(coluna) {

            if (this._ordemAtual == coluna) this._listaNegociacoes.inverteOrdena();else this._listaNegociacoes.ordena(function (a, b) {
                return a[coluna] - b[coluna];
            });

            this._ordemAtual = coluna;
        }
    }, {
        key: '_criaNegociacao',
        value: function _criaNegociacao() {
            return new Negociacao(DateHelper.criaDataDeString(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
        }
    }, {
        key: '_limpaFormulario',
        value: function _limpaFormulario() {
            this._inputData.value = '';
            this._inputQuantidade.value = 1;
            this._inputValor.value = 0.0;

            this._inputData.focus();
        }
    }, {
        key: '_exibeUmaMensagem',
        value: function _exibeUmaMensagem(mensagem) {
            this._mensagem.texto = mensagem;
        }
    }]);

    return NegociacaoController;
}();
//# sourceMappingURL=NegociacaoController.js.map