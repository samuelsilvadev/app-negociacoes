class NegociacaoController{

    constructor(){
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
    }

    adiciona(e){
        e.preventDefault();

        let negociacao = new Negociacao(
            this.criaDataDeString(this._inputData.value),
            this._inputQuantidade.value, 
            this._inputValor.value
        );

        console.log(negociacao);        
    }

    criaDataDeString(data){
        return new Date(
            ...data
            .split('-')
            .map((item, i) => item - i % 2)
        );
    }
}