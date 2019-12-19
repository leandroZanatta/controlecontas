import { excluirPagamentoDB, salvarPagamentoDB } from '../../repository/pagamentos/pagamentos';

export function excluirPagamento(lancamento, callbackSucess, callbackError) {

    excluirPagamentoDB(lancamento, callbackSucess, callbackError);
}

export function salvarPagamento(pagamento, callbackSucess, callbackError) {

    salvarPagamentoDB(pagamento, callbackSucess, callbackError);
}