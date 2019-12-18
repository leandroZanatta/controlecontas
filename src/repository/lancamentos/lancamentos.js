import { execute, executeSelect,executeBatch } from '../repository';

export function buscarLancamentosDB(callbackSucess, callbackError) {

    sql = 'SELECT * FROM tb_lancamentos lancamentos left join tb_contas contas on lancamentos.cd_conta=contas.id_conta';
    params = []

    executeSelect(sql, params, callbackSucess, callbackError);
}

export function excluirLancamentoDB(lancamento, callbackSucess, callbackError) {

    sql = 'DELETE FROM tb_lancamentos WHERE id_lancamento = ?';
    params = [lancamento.id_lancamento]

    execute(sql, params, callbackSucess, callbackError);
}

export function cadastrarDespezasDB(parcelas, callbackSucess, callbackError) {

    sql = 'insert into tb_lancamentos(id_lancamento,cd_conta,dt_lancamento,dt_vencimento, vl_parcela) values(?,?,?,?,?)';

    executeBatch(sql, parcelas, callbackSucess, callbackError);
}