class NegociacaoDao{

    constructor(connection){
        this._connection = connection;
        this._store = 'negociacoes';
    }

     _getObjectStore(){
        return this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store);
    }

    adiciona(negociacao){
        return new Promise((resolve, reject) =>{

            let request = this._getObjectStore().add(negociacao);

            request.onsuccess = e => {
                console.log('Inserido com sucesso');                
                resolve();
            };

            request.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível criar a negociação');
            };
        })
    }

    listaTodos(){
            
        return new Promise((resolve, reject) => {

            let cursor = this._getObjectStore().openCursor();
            
            let negociacoes = [];

            cursor.onsuccess = e => {
                let ponteiroAtual = e.target.result;

                if(ponteiroAtual){
                    let dado = ponteiroAtual.value;
                    negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));
                    ponteiroAtual.continue();
                }else{                
                    resolve(negociacoes);
                }
            };

            cursor.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível criar a negociação');
            };                      
        });
    }
}