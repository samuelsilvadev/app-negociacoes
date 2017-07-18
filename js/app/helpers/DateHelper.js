class DateHelper{
    
    criaDataDeString(data){
        return new Date(
            ...data
            .split('-')
            .map((item, i) => item - i % 2)
        );
    }

    formataDataParaHumanos(dataIlegivel){
        return `${dataIlegivel.getDate()}/${(dataIlegivel.getMonth() + 1)}/${dataIlegivel.getFullYear()}`
    }
}