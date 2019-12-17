import { salvarCategoriaDB, buscarCategoriaDB, alterarExclusaoCategoriaDB } from '../../repository/categorias/categorias';
import moment from 'moment';

export function salvarCategoria(categoria, callbackSucess, callbackError) {

    salvarCategoriaDB(categoria, callbackSucess, callbackError);
}

export function excluirCategoria(categoria, callbackSucess, callbackError) {

    let dataExclusao = moment().format('YYYY-MM-DD HH:mm:ss');

    alterarExclusaoCategoriaDB(dataExclusao, categoria.id, callbackSucess, callbackError)
}

export function reincluirCategoria(categoria, callbackSucess, callbackError) {

    alterarExclusaoCategoriaDB(null, categoria.id, callbackSucess, callbackError)
}

export function buscarCategorias(callbackSucess, callbackError) {

    buscarCategoriaDB(callbackSucess, callbackError);
}


