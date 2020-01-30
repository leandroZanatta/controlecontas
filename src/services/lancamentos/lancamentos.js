import { buscarLancamentosDB, excluirLancamentoDB, cadastrarDespezaDB, cadastrarReceitaDB, buscarLancamentosParaPagamentoDB } from '../../repository/lancamentos/lancamentos';
import { excluirPagamento } from '../pagamentos/pagamentos';
import moment from 'moment';

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

export function cadastrarDespezas(dados, callbackSucess, callbackError) {

    const despeza = [
        dados.id,
        dados.conta,
        moment(dados.dataLancamento).format('YYYY-MM-DD HH:mm:ss'),
        moment(dados.dataVencimento, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss'),
        dados.valor
    ];

    cadastrarDespezaDB(despeza, callbackSucess, callbackError);
}
