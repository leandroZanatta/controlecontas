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

        runSelect(sql, params, tx, callbackSucess, callbackError)
    });
}

export function executeBatch(sql, params, callbackSucess, callbackError) {

    if (params.length > 0) {

        db.transaction(tx => {

            executeNext(sql, params, 0, tx, callbackSucess, callbackError);
        });
    }
}

export function executeBatchSelect(sql, params, resultNames, callbackSucess, callbackError) {

    if (sql.length > 0) {

        let returnData = [];

        db.transaction(tx => {

            executeNextSelect(sql, params, 0, tx, resultNames, returnData, callbackSucess, callbackError);
        });
    }
}

runSelect = (sql, params, tx, callbackSucess, callbackError) => {

    tx.executeSql(sql, params, (tx, results) => {

        var temp = [];

        for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
        }

        callbackSucess(temp);

    }, function (error) {

        callbackError(error);
    });
}

executeNextSelect = (sql, params, atualParam, tx, resultNames, returnData, callbackSucess, callbackError) => {

    const callbackBatch = (data) => {

        returnData[resultNames[atualParam]] = data

        if (sql.length > atualParam + 1) {

            atualParam = atualParam + 1;

            executeNextSelect(sql, params, atualParam, tx, resultNames, returnData, callbackSucess, callbackError);
        } else {

            callbackSucess(returnData);
        }
    }

    runSelect(sql[atualParam], params[atualParam], tx, callbackBatch, callbackError)
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