import { salvarContaDB, buscarContaDB, alterarExclusaoContaDB, buscarReceitasDB, buscarDespezasDB, cadastrarDespezasDB } from '../../repository/contas/contas';
import moment from 'moment';

export function salvarConta(conta, callbackSucess, callbackError) {

    salvarContaDB(conta, callbackSucess, callbackError);
}

export function excluirConta(conta, callbackSucess, callbackError) {

    let dataExclusao = moment().format('YYYY-MM-DD HH:mm:ss');

    alterarExclusaoContaDB(dataExclusao, conta.id, callbackSucess, callbackError)
}

export function reincluirConta(conta, callbackSucess, callbackError) {

    alterarExclusaoContaDB(null, conta.id, callbackSucess, callbackError)
}

export function buscarContas(callbackSucess, callbackError) {

    buscarContaDB(callbackSucess, callbackError);
}

export function buscarReceitas(callbackSucess, callbackError) {

    buscarReceitasDB(callbackSucess, callbackError);
}

export function buscarDespezas(callbackSucess, callbackError) {

    buscarDespezasDB(callbackSucess, callbackError);
}
