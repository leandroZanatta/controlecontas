import { execute, executeSelect } from '../repository';

export function salvarContaDB(conta, callbackSucess, callbackError) {

    if (conta.id) {
        return editarConta(conta, callbackSucess, callbackError);
    }

    return salvarNovaConta(conta, callbackSucess, callbackError);
}

export function buscarContaDB(callbackSucess, callbackError) {

    sql = 'SELECT id_conta as id, cd_categoria as categoria, cd_tipoconta as tipoConta, tx_descricao as descricao, dt_exclusao as exclusao FROM tb_contas order by cd_tipoconta desc, tx_descricao asc';
    params = []

    executeSelect(sql, params, callbackSucess, callbackError);
}

export function buscarReceitasDB(callbackSucess, callbackError) {

    sql = 'SELECT * FROM tb_contas where cd_tipoconta=?';
    params = [1]

    executeSelect(sql, params, callbackSucess, callbackError);
}

export function buscarDespezasDB(callbackSucess, callbackError) {

    sql = 'SELECT * FROM tb_contas where cd_tipoconta=?';
    params = [0]

    executeSelect(sql, params, callbackSucess, callbackError);
}


export function alterarExclusaoContaDB(dataExclusao, idConta, callbackSucess, callbackError) {

    sql = 'update tb_contas set dt_exclusao=? where id_conta= ?';
    params = [dataExclusao, idConta]

    execute(sql, params, callbackSucess, callbackError);
}

editarConta = (conta, callbackSucess, callbackError) => {

    sql = 'update tb_contas set cd_categoria=?, cd_tipoconta=?, tx_descricao=? where id_conta=?';
    params = [conta.categoria, conta.tipoConta, conta.descricao, conta.id]

    execute(sql, params, callbackSucess, callbackError);
}

salvarNovaConta = (conta, callbackSucess, callbackError) => {

    let sql = 'insert into tb_contas(id_conta, cd_categoria, cd_tipoconta, tx_descricao) values(?,?,?,?)';
    const params = [conta.id, conta.categoria, conta.tipoConta, conta.descricao];

    execute(sql, params, callbackSucess, callbackError);
}