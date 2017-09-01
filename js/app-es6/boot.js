import {currentInstance} from './controllers/NegociacaoController';

let negociacaoController = currentInstance();

document.querySelector('.form').onsubmit 
    = negociacaoController.adiciona.bind(negociacaoController);

document.querySelector('.btn-importa-negociacoes').onclick 
    = negociacaoController.importaNegociacoes.bind(negociacaoController);

document.querySelector('.btn-apaga-negociacoes').onclick 
    = negociacaoController.apagarNegociacoes.bind(negociacaoController);