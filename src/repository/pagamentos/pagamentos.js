import { execute } from '../repository';
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