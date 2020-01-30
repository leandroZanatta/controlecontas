import { excluirPagamentoDB, salvarPagamentoDB } from '../../repository/pagamentos/pagamentos';
import { formatarMoeda } from '../util';

export function excluirPagamento(lancamento, callbackSucess, callbackError) {

    excluirPagamentoDB(lancamento, callbackSucess, callbackError);
}

export function salvarPagamento(pagamento, callbackSucess, callbackError) {

    const conta = pagamento.contas.find(element => element.id === pagamento.contareceita);

    if (pagamento.valor < pagamento.valorPago) {

        callbackError(`O valor á pagar pela conta é menor que o informado: ${formatarMoeda(pagamento.valor, 'R$')}`);

        return;
    }

    if (conta.saldo < pagamento.valor) {

        callbackError(`O saldo da conta é isuficiente: ${formatarMoeda(conta.saldo, 'R$')}`);

        return;
    }

    salvarPagamentoDB(pagamento, callbackSucess, callbackError);
}