class ListaNegociacoes{

    constructor(){
        this._listaNegociacoes = [];
    }

    adiciona(negociacao){
        this._listaNegociacoes.push(negociacao);
    }

    get negociacoes(){
        return this._listaNegociacoes;
    }
}