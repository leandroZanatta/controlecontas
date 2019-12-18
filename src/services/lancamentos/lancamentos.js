import { buscarLancamentosDB, excluirLancamentoDB, cadastrarDespezasDB } from '../../repository/lancamentos/lancamentos';
import { excluirPagamento } from '../pagamentos/pagamentos';

export function buscarLancamentos(callbackSucess, callbackError) {

    buscarLancamentosDB(callbackSucess, callbackError);
}

export function excluirLancamento(item, callbackSucess, callbackError) {

    excluirPagamento(item, () => { excluirLancamentoDB(item, callbackSucess, callbackError) }, callbackError);
}


export function cadastrarDespezas(parcelas, callbackSucess, callbackError) {

    cadastrarDespezasDB(parcelas, callbackSucess, callbackError);
}
