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

export function executeBatch(sql, params, callbackSucess, callbackError) {

    if (params.length > 0) {

        db.transaction(tx => {

            executeNext(sql, params, 0, tx, callbackSucess, callbackError);
        });
    }
}

executeNext = (sql, params, atualParam, tx, callbackSucess, callbackError) => {

    tx.executeSql(sql, params[atualParam], (tx, results) => {
       
        if (params.length > atualParam + 1) {

            atualParam = atualParam + 1;

            executeNext(sql, params, atualParam, tx, callbackSucess, callbackError);
        } else {

            callbackSucess(results);
        }
    }, function (error) {

        callbackError(error);
    });
}