class ListaNegociacoes{

    constructor(atualizacao){
        this._listaNegociacoes = [];
        this._atualizacao = atualizacao;
    }

    adiciona(negociacao){
        this._listaNegociacoes.push(negociacao);
        this._atualizacao(this);
    }

    apagarNegociacoes(){
        this._listaNegociacoes = [];
        this._atualizacao(this);
    }

    get negociacoes(){
        return [].concat(this._listaNegociacoes);
    }
}