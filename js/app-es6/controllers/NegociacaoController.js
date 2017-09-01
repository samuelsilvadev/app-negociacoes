import {ListaNegociacoes} from '../models/ListaNegociacoes';
import {Negociacao} from '../models/Negociacao';
import {Mensagem} from '../models/Mensagem';
import {Bind} from '../helpers/Bind';
import {NegociacoesView} from '../views/NegociacoesView';
import {MensagemView} from '../views/MensagemView';
import {NegociacaoService} from '../services/NegociacaoService';
import {DateHelper} from '../helpers/DateHelper';

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

        this._service = new NegociacaoService();
        this._init();
    }

    _init(){
        
       this._service
            .lista()
            .then(negociacoes =>
                negociacoes.forEach(negociacao => 
                    this._listaNegociacoes.adiciona(negociacao)))
             .catch(e => console.log(e));
        
        setInterval(() => this.importaNegociacoes(), 3000);
    }

    adiciona(e){
        e.preventDefault();   
                
        let negociacao = this._criaNegociacao();
        this._service
            .cadastrar(negociacao)
            .then(mensagem => {
                this._listaNegociacoes.adiciona(negociacao);
                this._exibeUmaMensagem(mensagem);
                this._limpaFormulario();
            })
            .catch(e => this._exibeUmaMensagem(e))   
    }

    importaNegociacoes(){
      
        this._service
            .importa(this._listaNegociacoes.negociacoes)
            .then(negociacoes => {
                negociacoes.forEach(negociacao => {
                    this._listaNegociacoes.adiciona(negociacao);
                });
                this._exibeUmaMensagem('Negociações importadas com sucesso');      
            }).catch(err => this._exibeUmaMensagem(err));            
    }

    apagarNegociacoes(){
        if(confirm('Deseja realmente apagar a lista de negociações?')){  
                
            this._service
                .apagar()
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

let negociacaoController = new NegociacaoController();
export function currentInstance(){
    return negociacaoController;
}