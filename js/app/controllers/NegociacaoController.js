class NegociacaoController{

    constructor(){
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._ordemAtual = '';
        
        this._listaNegociacoes = new Bind (
                new ListaNegociacoes(),
                new NegociacoesView($('#viewNegociacoes')),
                'adiciona', 'apagarNegociacoes', 'ordena', 'inverteOrdena');
   
        this._mensagem = new Bind (
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto');
        
        this._init();
    }

    _init(){

        ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodos())
            .then(negociacoes =>
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao)))
            .catch(e => console.log(e));

        setInterval(() => this.importaNegociacoes(), 3000);
    }

    adiciona(e){
        e.preventDefault();        
        ConnectionFactory.getConnection()
            .then(conn => {
                let negociacao = this._criaNegociacao();                
                new NegociacaoDao(conn)
                    .adiciona(negociacao)
                    .then(() => {
                        this._listaNegociacoes.adiciona(negociacao);
                        this._exibeUmaMensagem('Negociação adicionada com sucesso');
                        this._limpaFormulario();
                    });        
            }).catch(e => this._exibeUmaMensagem(e));
    }

    importaNegociacoes(){
        let service = new NegociacaoService();
        ConnectionFactory.getConnection()
            .then(conn =>  new NegociacaoDao(conn))
            .then(dao => {
                service.obterNegociacoes()
                .then(negociacoes => {
                    return negociacoes.filter(negociacao => 
                        !this._listaNegociacoes.negociacoes.some(negociacaoExistente => 
                            JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente)
                        )
                    );
                })
                .then(negociacoes => {
                    negociacoes.forEach(negociacao => {
                        dao.adiciona(negociacao);
                        this._listaNegociacoes.adiciona(negociacao)
                    });
                    this._exibeUmaMensagem('Negociações importadas com sucesso');      
                }).catch(err => this._exibeUmaMensagem(err));  
            })
            .catch(e => this._exibeUmaMensagem(e));
    }

    apagarNegociacoes(){
        if(confirm('Deseja realmente apagar a lista de negociações?')){  
                        
            ConnectionFactory
            .getConnection()
                .then(conn => new NegociacaoDao(conn))
                .then(dao => dao.apagarTodos())
                .then(mens => {
                    this._exibeUmaMensagem(mens);
                    this._listaNegociacoes.apagarNegociacoes();
                })
                .catch(err => this._exibeUmaMensagem(err));
            
        }
    }

    ordena(coluna){
        
        if(this._ordemAtual == coluna)
            this._listaNegociacoes.inverteOrdena();
        else
            this._listaNegociacoes.ordena((a,b) => a[coluna] - b[coluna]);

        this._ordemAtual = coluna;
    }

    _criaNegociacao(){
        return new Negociacao(
            DateHelper.criaDataDeString(this._inputData.value),
            parseInt(this._inputQuantidade.value), 
            parseFloat(this._inputValor.value)
        );
    }

    _limpaFormulario(){
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }

    _exibeUmaMensagem(mensagem){
        this._mensagem.texto = mensagem;        
    }
}