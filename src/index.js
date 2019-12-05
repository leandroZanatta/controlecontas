import React from 'react';
import Routes from './routes';
import { openDatabase } from 'react-native-sqlite-storage';

export default class App extends React.Component {

    componentDidMount() {

        var db = openDatabase({ name: 'controlegastos.db' });

        var tables = [{
            name: 'tb_categorias',
            sql: ['CREATE TABLE IF NOT EXISTS tb_categorias(id_categoria INTEGER PRIMARY KEY AUTOINCREMENT, tx_descricao VARCHAR(255))']
        },{
            name: 'tb_contas',
            sql: ['CREATE TABLE IF NOT EXISTS tb_contas(id_conta INTEGER PRIMARY KEY AUTOINCREMENT, cd_categoria integer not null, cd_tipoconta integer not null, tx_descricao VARCHAR(255))']
        }];


        db.transaction(function (txn) {
            txn.executeSql("SELECT name FROM sqlite_master WHERE type='table'", [],
                function (tx, res) {

                    let rowsInDatabase = [];

                    for (let i = 0; i < res.rows.length; i++) {
                        rowsInDatabase.push(res.rows.item(i).name)
                    }

                    tables.forEach(function (table) {

                        if (rowsInDatabase.findIndex(function (row) { return row === table.name }) < 0) {

                            table.sql.forEach(query=>{ txn.executeSql(query, [])})
                           
                        }

                    });
                }
            );
        });
    }

    render() {
        return <Routes />
    }
}