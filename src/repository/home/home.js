import { executeSelect } from '../repository';
import moment from 'moment';

export function filtrarResultadosDB(dataInicio, dataFim, callbackSucess, callbackError) {

    sql = 'select ' +
        'sum(case when contas.cd_tipoconta = 1 then vl_parcela else 0 end ) as receitas,' +
        'sum(case when contas.cd_tipoconta = 0 then vl_parcela else 0 end) as pagamentosAgendados,' +
        'sum(COALESCE((select sum(vl_parcela) from tb_pagamentos pagamentos where contas.cd_tipoconta = 0 and lancamentos.id_lancamento = pagamentos.cd_contadespeza), 0)) as despezas ' +
        'from ' +
        'tb_lancamentos lancamentos ' +
        'inner join tb_contas contas on ' +
        'lancamentos.cd_conta = contas.id_conta ' +
        'WHERE ' +
        '(lancamentos.dt_lancamento BETWEEN ? and ? ' +
        'and contas.cd_tipoconta = 1)' +
        'or (lancamentos.dt_vencimento BETWEEN ? and ? ' +
        'and contas.cd_tipoconta = 0)';

    let strDtInicio = moment(dataInicio).format('YYYY-MM-DD');
    let strDtFim = moment(dataFim).format('YYYY-MM-DD');

    params = [strDtInicio, strDtFim, strDtInicio, strDtFim]

    executeSelect(sql, params, callbackSucess, callbackError);
}