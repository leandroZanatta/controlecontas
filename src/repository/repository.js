import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase({ name: 'controlecontas.db' });

export function execute(sql, params, callbackSucess, callbackError) {

    db.transaction(tx => {

        tx.executeSql(sql, params, (tx, results) => {

            callbackSucess(results);
        }, function (error) {

            callbackError(error);
        });
    });
}

export function executeSelect(sql, params, callbackSucess, callbackError) {

    db.transaction(tx => {

        tx.executeSql(sql, params, (tx, results) => {

            var temp = [];

            for (let i = 0; i < results.rows.length; ++i) {
                temp.push(results.rows.item(i));
            }

            callbackSucess(temp);
            
        }, function (error) {

            callbackError(error);
        });
    });
}