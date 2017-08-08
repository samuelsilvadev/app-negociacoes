class NegociacaoService{


    constructor(){
        this._urls = {
            semana: 'negociacoes/semana',
            anterior: 'negociacoes/anterior',
            retrasada: 'negociacoes/retrasada'
        }
    }

    obterNegociacaoDaSemana(){
       
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', this._urls.semana);
            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4) {
                    if(xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText)
                            .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));

                    } else {
                        console.log(xhr.responseText);
                        reject('Não foi possível obter as negociações da semana anterior');
                    }  
                }
            }
            xhr.send();
        });
    }

    obterNegociacaoDaSemanaAnterior(){
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', this._urls.anterior);
            xhr.onreadystatechange = () => {

                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                       
                        resolve(JSON.parse(xhr.responseText)
                            .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                    
                    }else{
                        reject('Erro ao importar Negociações da semana anterior');                
                    }
                }
            }
            xhr.send();
        });
    }

    obterNegociacaoDaSemanaRetrasada(){
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', this._urls.retrasada);
            xhr.onreadystatechange = () => {

                if(xhr.readyState == 4){
                    if(xhr.status == 200){
        
                        resolve(JSON.parse(xhr.responseText)
                            .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));
                    }else{
                        reject('Erro ao importar Negociações da semana retrasada');                
                    }
                }
            }
            xhr.send();
        });
    }
}