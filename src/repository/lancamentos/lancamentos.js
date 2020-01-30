import { execute, executeSelect, executeBatch } from '../repository';
import moment from 'moment';

export function buscarLancamentosDB(callbackSucess, callbackError) {

    const sql = 'SELECT lancamentos.id_lancamento,lancamentos.dt_vencimento,lancamentos.dt_lancamento,' +
        'lancamentos.cd_conta,contas.cd_tipoconta,contas.tx_descricao,lancamentos.vl_parcela as valorParcela,' +
        'coalesce(case when contas.cd_tipoconta = 1 then sum(recebimentos.vl_parcela) else ' +
        'sum(pagamentos.vl_parcela) END,0) as valorPago FROM tb_lancamentos lancamentos ' +
        'left join tb_contas contas on lancamentos.cd_conta = contas.id_conta	' +
        'left join tb_pagamentos pagamentos on lancamentos.id_lancamento = pagamentos.cd_contadespeza and contas.cd_tipoconta = 0 ' +
        'left join tb_pagamentos recebimentos on lancamentos.id_lancamento = recebimentos.cd_contareceita and contas.cd_tipoconta = 1	' +
        'group by lancamentos.dt_vencimento,lancamentos.dt_lancamento,contas.cd_tipoconta,contas.tx_descricao,lancamentos.cd_conta,lancamentos.vl_parcela ' +
        'HAVING valorParcela - valorPago > 0';
    const params = []

    executeSelect(sql, params, callbackSucess, callbackError);
}

export function buscarLancamentosParaPagamentoDB(callbackSucess, callbackError) {

    const sql = 'SELECT lancamentos.id_lancamento as id, contas.tx_descricao as descricao, ' +
        'lancamentos.vl_parcela- coalesce(sum(pagamento.vl_parcela),0) as saldo ' +
        'FROM tb_lancamentos lancamentos ' +
        'inner join tb_contas contas on lancamentos.cd_conta = contas.id_conta ' +
        'left join tb_pagamentos pagamento on pagamento.cd_contareceita = contas.id_conta ' +
        'where cd_tipoconta = 1 group by lancamentos.id_lancamento,	contas.tx_descricao	' +
        'HAVING saldo > 0';

    const params = []

    executeSelect(sql, params, callbackSucess, callbackError);
}


export function excluirLancamentoDB(lancamento, callbackSucess, callbackError) {

    const sql = 'DELETE FROM tb_lancamentos WHERE id_lancamento = ?';
    const params = [lancamento.id_lancamento]

    execute(sql, params, callbackSucess, callbackError);
}


export function cadastrarReceitaDB(receita, callbackSucess, callbackError) {

    if (receita.id_lancamento) {
        return editarReceita(receita, callbackSucess, callbackError);
    }

    return salvarNovaReceita(receita, callbackSucess, callbackError);
}

export function cadastrarDespezaDB(parcelas, callbackSucess, callbackError) {

    if (parcelas.id_lancamento) {
        return editarDespeza(parcelas, callbackSucess, callbackError);
    }

    return salvarNovasDespezas(parcelas, callbackSucess, callbackError);
}

salvarNovaReceita = (receita, callbackSucess, callbackError) => {
    debugger
    const sql = 'insert into tb_lancamentos(id_lancamento,cd_conta,dt_lancamento,vl_parcela) values(?,?,?,?)';
    const params = [receita.id_lancamento, receita.conta, moment(receita.dataLancamento, 'DD-MM-YYYY').format('YYYY-MM-DD HH:mm:ss'), receita.valor];

    execute(sql, params, callbackSucess, callbackError);
}

editarReceita = (receita, callbackSucess, callbackError) => {

    const sql = 'update tb_lancamentos set cd_conta=?, dt_lancamento=?, vl_parcela=? where  id_lancamento=?';
    const params = [receita.conta, moment(receita.dataLancamento, 'DD-MM-YYYY').format('YYYY-MM-DD HH:mm:ss', 'YYYY-MM-DD'), receita.valor, receita.id_lancamento];

    execute(sql, params, callbackSucess, callbackError);
}

salvarNovasDespezas = (parcelas, callbackSucess, callbackError) => {

    const sql = 'insert into tb_lancamentos(id_lancamento,cd_conta,dt_lancamento,dt_vencimento, vl_parcela) ' +
        'values(?,?,?,?,?)';

    execute(sql, parcelas, callbackSucess, callbackError);
}

editarDespeza = (parcelas, callbackSucess, callbackError) => {

    const sql = 'update tb_lancamentos set cd_conta=?, dt_lancamento=?, dt_vencimento=?, vl_parcela=? ' +
        'where  id_lancamento=?';

    execute(sql, parcelas, callbackSucess, callbackError);
}

export function buscarTransacoesPorData(dataInicio, dataFim, callbackSucess, callbackError) {

    const sql = 'select lancamentos.id_lancamento as idLancamento,' +
        'categorias.tx_descricao as descricaoCategoria,	' +
        'contas.cd_categoria as categoria, ' +
        'contas.cd_tipoconta as tipoConta, ' +
        'contas.tx_descricao as descricaoConta, ' +
        'lancamentos.cd_conta as conta,	' +
        'lancamentos.dt_vencimento as dataVencimento, ' +
        'lancamentos.dt_lancamento as dataLancamento, ' +
        'lancamentos.dt_lancamento as dataLancamento,	' +
        'lancamentos.dt_vencimento as dataVencimento, ' +
        'lancamentos.vl_parcela as valorParcela ' +
        'from	tb_lancamentos lancamentos ' +
        'inner join tb_contas contas on	lancamentos.cd_conta = contas.id_conta ' +
        'inner join tb_categorias categorias on	contas.cd_categoria = categorias.id_categoria ' +
        'WHERE ' +
        '(lancamentos.dt_lancamento BETWEEN ? and ? ' +
        'and contas.cd_tipoconta = 1)' +
        'or (lancamentos.dt_vencimento BETWEEN ? and ? ' +
        'and contas.cd_tipoconta = 0)';

    let strDtInicio = moment(dataInicio).format('YYYY-MM-DD') + ' 00:00:00';
    let strDtFim = moment(dataFim).format('YYYY-MM-DD') + ' 23:59:59';

    const params = [strDtInicio, strDtFim, strDtInicio, strDtFim]

    executeSelect(sql, params, callbackSucess, callbackError);
}
