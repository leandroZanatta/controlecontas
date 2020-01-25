export function formatarMoeda(value, moneyFormat = '') {

    let valor = value.toString().split('.');

    if (valor.length < 2) {
        valor.push('00');
    }

    while (valor[1].length < 2) {
        valor[1] += '0';
    }

    if (valor[0].length > 3) {

        let inteiro = valor[0].split('').reverse();

        let inicio = 3;

        while (inicio < inteiro.length) {

            inteiro.splice(inicio, 0, '.');
            //Como foi adicionado separador de minhar o proximo passaria para a 4 casa
            inicio = inicio + 4;
        }

        valor[0] = inteiro.reverse().join('');
    }
    return moneyFormat + ' ' + valor[0] + ',' + valor[1];
}
