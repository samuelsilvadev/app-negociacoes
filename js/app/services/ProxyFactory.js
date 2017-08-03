class ProxyFactory{

    static create(object, props, acao){
        return new Proxy(new ListaNegociacoes(), {

            get(target, prop, receiver){
                if(props.includes(prop) && ProxyFactory._ehFUncao(target[prop])){
                    return function(){
                        Reflect.apply(target[prop], target, arguments);
                        return acao(target);
                    }
                }
                return Reflect.get(target, prop, receiver);
            },

            set(target, prop, value, receiver){
                if(props.includes(prop)){
                    target[prop] = value;
                    acao(target);                    
                }
                    
                return Reflect.set(target, prop, value, receiver);                
            }

        })
    }

    static _ehFUncao(funcao){
        return typeof(funcao == typeof(Function));
    }
}