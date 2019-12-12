import * as React from 'react';
import { Input } from 'native-base';

export default class MoneyInput extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            valor: props.value ? props.value : 0
        };
    }



    formatarValor = () => {

        let valor = this.state.valor.toString().split('.');

        if (valor.length < 2) {
            valor.push('00');
        }

        while (valor[1].length < 2) {
            valor[1] += '0';
        }

        return 'R$ ' + parseInt(valor[0]) + ',' + valor[1];
    }

    changeValue = (e) => {

        let valor = e.nativeEvent.text;

        let semPontuacao = valor.replace(/[^0-9]+/g, '');

        while (semPontuacao.length < 3) {
            semPontuacao = '0' + semPontuacao;
        }

        let decimais = semPontuacao.substring(semPontuacao.length - 2, semPontuacao.length);

        let inteiros = parseInt(semPontuacao.substring(0, semPontuacao.length - 2));

        let newValue = parseFloat(inteiros + '.' + decimais);

        this.setState({ valor: newValue });

        this.props.onMoneyChange(newValue)

    }

    render() {
        return (
            <Input
                numeric
                keyboardType={'numeric'}
                value={this.formatarValor()}
                onChange={(e) => this.changeValue(e)}
            />
        )
    }
}