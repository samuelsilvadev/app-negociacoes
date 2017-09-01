export class ListaNegociacoes{

    constructor(){
        this._listaNegociacoes = [];        
    }

    adiciona(negociacao){
        this._listaNegociacoes.push(negociacao);        
    }

    apagarNegociacoes(){
        this._listaNegociacoes = [];        
    }
    
    ordena(criterio){
        this._listaNegociacoes.sort(criterio);
    }

    inverteOrdena(){
        this._listaNegociacoes.reverse();
    }

    get negociacoes(){
        return [].concat(this._listaNegociacoes);
    }

    get volumeTotal(){
        return this._listaNegociacoes.reduce((total, n) => total + n.volume, 0.0);
    }
}