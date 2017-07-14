class NegociacaoController{

    constructor(){
        let $ = document.querySelector.bind(document);

        this.inputData = $('#data');
        this.inputQtde = $('#quantidade');
        this.inputValr = $('#valor');
    }

    adiciona(e){
        e.preventDefault();
        console.log(this.inputData.value, this.inputQtde.value, this.inputValr.value)
    }
}