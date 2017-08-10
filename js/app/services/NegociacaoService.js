class NegociacaoService{

    constructor(){
        this._urls = {
            semana: 'negociacoes/semana',
            anterior: 'negociacoes/anterior',
            retrasada: 'negociacoes/retrasada'
        };
        this._http = new HttpService();
    }

    obterNegociacoes(){
         return Promise.all([
            this.obterNegociacaoDaSemana(),
            this.obterNegociacaoDaSemanaAnterior(),
            this.obterNegociacaoDaSemanaRetrasada()            
        ])
        .then(negociacoes => negociacoes.reduce((arraymenor, array) => arraymenor.concat(array), []))
        .catch(err => { throw new Error(err)});
    }

    obterNegociacaoDaSemana(){
       
        return this._http.get(this._urls.semana)
                .then(objeto => {
                    return objeto.map(objeto => 
                        new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)) 
                }).catch(err => { throw new Error(err)});
    }

    obterNegociacaoDaSemanaAnterior(){
       return this._http.get(this._urls.anterior)
                .then(objeto => {
                    return objeto.map(objeto => 
                        new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
                })
                .catch(err => { throw new Error(err)});
    }

    obterNegociacaoDaSemanaRetrasada(){
       return this._http.get(this._urls.retrasada)
                .then(objeto => {
                    return objeto.map(objeto => 
                        new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
                })
                .catch(err => { throw new Error(err)});
    }
}