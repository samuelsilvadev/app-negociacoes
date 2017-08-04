class NegociacaoService{


    constructor(){
        this._urls = {
            semana: 'negociacoes/semana',
            anterior: 'negociacoes/anterior',
            retrasada: 'negociacoes/retrasada'
        }
    }

    obterNegociacaoDaSemana(callback){
        let xhr = new XMLHttpRequest();
        xhr.open('GET', this._urls.semana);
        xhr.onreadystatechange = () => {

            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    callback(null, JSON.parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
                }
            }else{
                callback('Erro ao importar Negociações', null);                
            }
        };
        xhr.send();
    }

    obterNegociacaoDaSemanaAnterior(callback){
        let xhr = new XMLHttpRequest();
        xhr.open('GET', this._urls.anterior);
        xhr.onreadystatechange = () => {

            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    callback(null, JSON.parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
                }
            }else{
                callback('Erro ao importar Negociações', null);                
            }
        };
        xhr.send();
    }

    obterNegociacaoDaSemanaRetrasada(callback){
        let xhr = new XMLHttpRequest();
        xhr.open('GET', this._urls.retrasada);
        xhr.onreadystatechange = () => {

            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    callback(null, JSON.parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
                }
            }else{
                callback('Erro ao importar Negociações', null);                
            }
        };
        xhr.send();
    }
}