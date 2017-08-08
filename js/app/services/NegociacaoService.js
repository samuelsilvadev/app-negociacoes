class NegociacaoService{


    constructor(){
        this._urls = {
            semana: 'negociacoes/semana',
            anterior: 'negociacoes/anterior',
            retrasada: 'negociacoes/retrasada'
        };
        this._http = new HttpService();
    }

    obterNegociacaoDaSemana(){
       
        return new Promise((resolve, reject) => {

            this._http.get(this._urls.semana)
                .then(objeto => 
                    resolve(objeto.map(objeto => 
                        new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))))
                .catch(err => reject(err));

        });
    }

    obterNegociacaoDaSemanaAnterior(){
       return new Promise((resolve, reject) => {

            this._http.get(this._urls.anterior)
                .then(objeto => 
                    resolve(objeto.map(objeto => 
                        new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))))
                .catch(err => reject(err));

        });
    }

    obterNegociacaoDaSemanaRetrasada(){
       return new Promise((resolve, reject) => {

            this._http.get(this._urls.retrasada)
                .then(objeto => 
                    resolve(objeto.map(objeto => 
                        new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))))
                .catch(err => reject(err));

        });
    }
}