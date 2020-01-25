import { execute, executeSelect } from '../repository';
import moment from 'moment';

export function excluirPagamentoDB(lancamento, callbackSucess, callbackError) {

    const sql = 'DELETE FROM tb_pagamentos WHERE cd_contadespeza = ?';
    const params = [lancamento.id_lancamento]

    execute(sql, params, callbackSucess, callbackError);
}

export function salvarPagamentoDB(lancamento, callbackSucess, callbackError) {

    const sql = 'insert into tb_pagamentos(id_pagamento, cd_contadespeza, cd_contareceita, dt_pagamento, vl_parcela) values(?,?,?,?,?)';
    const params = [lancamento.id, lancamento.contadespeza, lancamento.contareceita, moment(lancamento.dataPagamento, 'YYYY-MM-DD').format('YYYY-MM-DD HH:mm:ss'), lancamento.valor];

    execute(sql, params, callbackSucess, callbackError);
}

export function buscarPagamentosDB(contas, callbackSucess, callbackError) {

    const sql = 'select pagamentos.id_pagamento as idPagamento , contas.tx_descricao as descricao, pagamentos.cd_contadespeza as contaDespeza, pagamentos.cd_contareceita as contaReceita, pagamentos.dt_pagamento as dataPagamento, pagamentos.vl_parcela as valorParcela '+
    'from tb_pagamentos pagamentos '+
    'inner join tb_lancamentos lancamentos on pagamentos.cd_contadespeza=lancamentos.id_lancamento '+
    'inner join tb_contas contas on lancamentos.cd_conta=contas.id_conta '+ `where cd_contareceita in(${contas.toString()}) or cd_contadespeza in(${contas.toString()})`;


    executeSelect(sql, [], callbackSucess, callbackError);
}