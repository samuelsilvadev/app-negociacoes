class NegociacaoController{

    constructor(){
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
    }

    adiciona(e){
        e.preventDefault();
        let helper = new DateHelper();

        let negociacao = new Negociacao(
            helper.criaDataDeString(this._inputData.value),
            this._inputQuantidade.value, 
            this._inputValor.value
        );

        console.log(negociacao);        
        console.log(helper.formataDataParaHumanos(negociacao.data));
    }
}