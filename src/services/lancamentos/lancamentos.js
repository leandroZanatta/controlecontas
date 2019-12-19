import { buscarLancamentosDB, excluirLancamentoDB, cadastrarDespezaDB, cadastrarReceitaDB, buscarLancamentosParaPagamentoDB } from '../../repository/lancamentos/lancamentos';
import { excluirPagamento } from '../pagamentos/pagamentos';

export function buscarLancamentos(callbackSucess, callbackError) {

    buscarLancamentosDB(callbackSucess, callbackError);
}

export function buscarLancamentosParaPagamento(callbackSucess, callbackError) {

    buscarLancamentosParaPagamentoDB(callbackSucess, callbackError);
}

export function excluirLancamento(item, callbackSucess, callbackError) {

    excluirPagamento(item, () => { excluirLancamentoDB(item, callbackSucess, callbackError) }, callbackError);
}

export function cadastrarReceita(receita, callbackSucess, callbackError) {

    cadastrarReceitaDB(receita, callbackSucess, callbackError);
}

export function cadastrarDespezas(despeza, callbackSucess, callbackError) {

    cadastrarDespezaDB(despeza, callbackSucess, callbackError);
}
