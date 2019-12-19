import { execute, executeSelect } from '../repository';

export function salvarCategoriaDB(categoria, callbackSucess, callbackError) {

    if (categoria.id) {
        return editarCategoria(categoria, callbackSucess, callbackError);
    }

    return salvarNovaCategoria(categoria, callbackSucess, callbackError);

}

export function buscarCategoriaDB(callbackSucess, callbackError) {
    
    sql = 'SELECT id_categoria as id, tx_descricao as descricao, dt_exclusao as exclusao FROM tb_categorias';
    params = []

    executeSelect(sql, params, callbackSucess, callbackError);
}

export function alterarExclusaoCategoriaDB(dataExclusao, idCategoria, callbackSucess, callbackError) {
    
    sql = 'update tb_categorias set dt_exclusao=? where id_categoria= ?';
    params = [dataExclusao, idCategoria]

    execute(sql, params, callbackSucess, callbackError);
}

editarCategoria = (categoria, callbackSucess, callbackError) => {
    
    sql = 'update tb_categorias set tx_descricao=? where id_categoria=?';
    params = [categoria.descricao, categoria.id]

    execute(sql, params, callbackSucess, callbackError);
}

salvarNovaCategoria = (categoria, callbackSucess, callbackError) => {
    
    let sql = 'insert into tb_categorias(id_categoria,tx_descricao) values(?,?)';
    const params = [categoria.id, categoria.descricao];

    execute(sql, params, callbackSucess, callbackError);
}