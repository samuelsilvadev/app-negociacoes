class NegociacaoController{

    constructor(){
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        
        this._listaNegociacoes = ProxyFactory.create(
            new ListaNegociacoes(),
            ['adiciona', 'apagarNegociacoes'],
            model => this._viewNegociacoes.update(model)
        )

        this._viewNegociacoes = new NegociacoesView($('#viewNegociacoes'));
        this._viewNegociacoes.update(this._listaNegociacoes);

        this._mensagem = ProxyFactory.create(
            new Mensagem(),
            ['texto'],
            model => this._mensagemView.update(model)
        )

        this._mensagemView = new MensagemView($('#mensagemView'));
      
    }

    adiciona(e){
        e.preventDefault();
        let negociacao = this._criaNegociacao();
        this._listaNegociacoes.adiciona(negociacao);
        
        this._exibeUmaMensagem('Negociação adicionada com sucesso');
        this._limpaFormulario();
    }

    apagarNegociacoes(){
        if(confirm('Deseja realmente apagar a lista de negociações?')){        
            this._listaNegociacoes.apagarNegociacoes();
            this._exibeUmaMensagem('Negociações apagadas com sucesso');
        }
    }

    _criaNegociacao(){
        return new Negociacao(
            DateHelper.criaDataDeString(this._inputData.value),
            this._inputQuantidade.value, 
            this._inputValor.value
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