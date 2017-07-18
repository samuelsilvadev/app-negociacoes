class DateHelper{
    
    constructor(){

        throw new Error('DateHelper não pode ser instanciada');
    }

    static criaDataDeString(data){
        return new Date(
            ...data
            .split('-')
            .map((item, i) => item - i % 2)
        );
    }

    static formataDataParaHumanos(dataIlegivel){
        return `${dataIlegivel.getDate()}/${(dataIlegivel.getMonth() + 1)}/${dataIlegivel.getFullYear()}`
    }
}