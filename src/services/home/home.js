import { buscarTransacoesPorData } from "../../repository/lancamentos/lancamentos";
import { buscarPagamentosDB } from "../../repository/pagamentos/pagamentos";
export function filtrarResultados(dataInicio, dataFim, callbackSucess, callbackError) {

    const callbackTransacoes = (data) => {

        if (data.length === 0) {
            return callbackSucess(criarCallback(data));
        }

        const idsLancamento = data.map((conta) => conta.idLancamento);

        const callbackDespeza = (despezas) => {

            return callbackSucess(criarCallback(data, despezas));
        }

        buscarPagamentosDB(idsLancamento, callbackDespeza, callbackError);
    }

    buscarTransacoesPorData(dataInicio, dataFim, callbackTransacoes, callbackError);
}

criarCallback = (lancamentos, pagamentos) => {

    let totalReceitas = 0;
    let totalDespezas = 0;

    const funcaoSoma = (prevVal, elem) => prevVal + elem.valorParcela;

    lancamentos.forEach((lancamento) => {

        if (lancamento.tipoConta === 0) {
            totalDespezas += lancamento.valorParcela;
        } else {
            totalReceitas += lancamento.valorParcela;
        }
    });

    const contasReceita = lancamentos.filter(lancamento => lancamento.tipoConta === 1).map(lancamento => {

        const registrosDespeza = pagamentos.filter(value => value.contaReceita == lancamento.idLancamento);

        const valorDebitos = registrosDespeza.reduce(funcaoSoma, 0);

        return {
            id: lancamento.idLancamento,
            descricao: lancamento.descricaoConta,
            valor: lancamento.valorParcela,
            dataLancamento: lancamento.dataLancamento,
            debitos: valorDebitos,
            saldo: lancamento.valorParcela - valorDebitos,
            registros: registrosDespeza
        }

    });

    const totalPagamentos = pagamentos.reduce(funcaoSoma, 0);

    const gastosCategorias = groupBy(lancamentos.filter(lancamento => lancamento.tipoConta === 0), (c) => c.descricaoCategoria, (prevVal, elem) => prevVal + elem.valorParcela);

    return {
        receitas: totalReceitas,
        despezas: totalDespezas,
        saldo: totalReceitas - totalDespezas,
        totalPagamentos,
        totalSaldo: totalReceitas - totalPagamentos,
        gastosCategorias,
        contasReceita
    }
}

function groupBy(xs, fGroup, fReduce) {

    const colors = ["#4682B4", "#6495ED", "#6A5ACD", "#778899", "#B0E0E6", "#008B8B", "#FFA07A", "#2F4F4F", "#006400", "#556B2F", "#B8860B", "#CD853F", "#DB7093", "#B22222", "#00BFFF", "#4169E1", "#0000CD", "#FF4500", "#191970"];

    return Object.entries(xs.reduce((r, v, i, a, k = fGroup(v)) => ((r[k] || (r[k] = [])).push(v), r), {})).map((entrie, index) => {

        return {
            name: entrie[0],
            valor: entrie[1].reduce(fReduce, 0),
            color: colors[colors.length > index + 1 ? index : '#CCC'],
            legendFontColor: "#7F7F7F",
            legendFontSize: 10
        }
    });
}


