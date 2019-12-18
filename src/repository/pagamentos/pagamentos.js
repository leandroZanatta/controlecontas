import { execute } from '../repository';

export function excluirPagamentoDB(lancamento, callbackSucess, callbackError) {

    sql = 'DELETE FROM tb_pagamentos WHERE cd_contadespeza = ?';
    params = [lancamento.id_lancamento]

    execute(sql, params, callbackSucess, callbackError);
}
