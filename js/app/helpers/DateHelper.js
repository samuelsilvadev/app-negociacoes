'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DateHelper = function () {
    function DateHelper() {
        _classCallCheck(this, DateHelper);

        throw new Error('DateHelper não pode ser instanciada');
    }

    _createClass(DateHelper, null, [{
        key: 'criaDataDeString',
        value: function criaDataDeString(data) {
            if (!/\d{4}-\d{2}-\d{2}/.test(data)) throw new Error('Data no padrão inválido, deve estar no padrão aaaa-mm-dd');

            return new (Function.prototype.bind.apply(Date, [null].concat(_toConsumableArray(data.split('-').map(function (item, i) {
                return item - i % 2;
            })))))();
        }
    }, {
        key: 'formataDataParaHumanos',
        value: function formataDataParaHumanos(dataIlegivel) {
            return dataIlegivel.getDate() + '/' + (dataIlegivel.getMonth() + 1) + '/' + dataIlegivel.getFullYear();
        }
    }]);

    return DateHelper;
}();
//# sourceMappingURL=DateHelper.js.map