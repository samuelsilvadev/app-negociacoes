class ListaNegociacoes{

    constructor(contexto, atualizacao){
        this._listaNegociacoes = [];
        this._contexto = contexto;
        this._atualizacao = atualizacao;
    }

    adiciona(negociacao){
        this._listaNegociacoes.push(negociacao);
        Reflect.apply(this._atualizacao, this._contexto, [this]);
    }

    apagarNegociacoes(){
        this._listaNegociacoes = [];
        Reflect.apply(this._atualizacao, this._contexto, [this]);
    }

    get negociacoes(){
        return [].concat(this._listaNegociacoes);
    }
}