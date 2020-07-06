import FilterError from '../errors/FilterError.js';


const OPERACIONESVALIDAS = ['MAYOR','MENOR','IGUAL','DISTINTO','CONTIENE'];
const OPERACIONESSEQUELIZE = {
    'MAYOR': '$gt',
    'MENOR': '$lt',
    'IGUAL': '$eq',
    'DISTINTO': '$ne',
    'CONTIENE': '$like'
};

export const convertirAFiltroSequelize = function ({ operacion, campo, valor }) {
    
    if(!OPERACIONESVALIDAS.some(v => operacion === v)) 
        throw new FilterError('Operación en filtro no válida.')
    let val = valor;
    if(operacion === 'CONTIENE') val = '%'+valor+'%'
    const filtro = {};
    filtro[campo] = {};
    filtro[campo][OPERACIONESSEQUELIZE[operacion]] = "";
    filtro[campo][OPERACIONESSEQUELIZE[operacion]] = val;
    return filtro;
}
export const unirFiltrosSequelize = function (filtros) {
    filtros = filtros.reduce((acc, fil) => Object.assign(acc,fil),{})
    return filtros;
}

export const aplicarFiltros = function (opciones,filtro){
    if(filtro.length > 0){
        for(let index in filtro){
            filtro[index] = convertirAFiltroSequelize(filtro[index])
        }
        const filtros = unirFiltrosSequelize(filtro)
        opciones.where = filtros;
    }
}
export const aplicarOrdenarPor = function(opciones, ordenarPor){
    if(ordenarPor.length > 0){
        opciones.order = ordenarPor;
    }
}

export const aplicarPaginacion = function(opciones,paginacion){
    if(paginacion)
        if('indice' in paginacion && 'tamanoPagina' in paginacion){
            opciones.offset = paginacion.tamanoPagina * (paginacion.indice - 1);
            opciones.limit =  paginacion.tamanoPagina
        }
}

export const aplicarOpciones = function({filtro = [], ordenarPor = [], paginacion}){
    const opciones = {};
    aplicarFiltros(opciones,filtro)
    aplicarOrdenarPor(opciones,ordenarPor)
    aplicarPaginacion(opciones,paginacion)
    return opciones
}