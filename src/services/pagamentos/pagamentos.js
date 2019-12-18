import { excluirPagamentoDB } from '../../repository/pagamentos/pagamentos';

export function excluirPagamento(lancamento, callbackSucess, callbackError) {

    excluirPagamentoDB(lancamento, callbackSucess, callbackError);
}
