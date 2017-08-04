class NegociacaoController{

    constructor(){
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        
        this._listaNegociacoes = new Bind (
                new ListaNegociacoes(),
                new NegociacoesView($('#viewNegociacoes')),
                'adiciona', 'apagarNegociacoes');
   
        this._mensagem = new Bind (
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto');
   
    }

    adiciona(e){
        e.preventDefault();
        let negociacao = this._criaNegociacao();
        this._listaNegociacoes.adiciona(negociacao);
        
        this._exibeUmaMensagem('Negociação adicionada com sucesso');
        this._limpaFormulario();
    }

    importaNegociacoes(){
        let service = new NegociacaoService();
        service.obterNegociacaoDaSemana((err, negociacoes) => {
            if(err){
                this._exibeUmaMensagem(err);
                return;
            }

            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
            this._exibeUmaMensagem('Negociações importadas com sucesso');
        });
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