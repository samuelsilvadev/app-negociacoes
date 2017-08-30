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

    cadastrar(negociacao){
        
        return ConnectionFactory.getConnection()
            .then(conn => new NegociacaoDao(conn))
            .then(dao => dao.adiciona(negociacao))
            .then(mensagem => mensagem)
            .catch(e => {
                throw new Error('Não foi possível adicionar' + e.target.name)
            });
    }


    lista(){
         return ConnectionFactory.getConnection()
            .then(conn => new NegociacaoDao(conn))
            .then(dao => dao.listaTodos())
            .catch(e => {
                throw new Error('Não foi possível listar as negociações' + e.target.name)
            });
    }


    apagar(){
        return ConnectionFactory.getConnection()
            .then(conn => new NegociacaoDao(conn))
            .then(dao => dao.apagarTodos())
            .then(mensagem => mensagem)
            .catch(e => {
                throw new Error('Não foi possível listar as negociações' + e.target.name)
            });
    }

    importa(listaNegociacoes){
        return this.obterNegociacoes()
                .then(negociacoes => {
                    return negociacoes.filter(negociacao => 
                        !listaNegociacoes.some(negociacaoExistente => 
                            JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente)
                        )
                    );
                })
                .catch(e => this._exibeUmaMensagem(e));
    }
}