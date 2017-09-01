export class DateHelper{
    
    constructor(){

        throw new Error('DateHelper não pode ser instanciada');
    }

    static criaDataDeString(data){
        if(!(/\d{4}-\d{2}-\d{2}/.test(data)))
            throw new Error('Data no padrão inválido, deve estar no padrão aaaa-mm-dd');

        return new Date(
            ...data
            .split('-')
            .map((item, i) => item - i % 2)
        );
    }

    static formataDataParaHumanos(dataIlegivel){
        return `${dataIlegivel.getDate()}/${(dataIlegivel.getMonth() + 1)}/${dataIlegivel.getFullYear()}`;        
    }
}