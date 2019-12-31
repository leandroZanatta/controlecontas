import * as React from 'react';
import { View } from 'react-native';
import { Form, Item, Label, DatePicker, Button, Text } from 'native-base';
import moment from 'moment';
import HeaderMenu from '../../components/menu/headermenu';
import { filtrarResultados } from '../../services/home/home';

export default class Home extends React.Component {

    constructor(props) {
        super(props);

        let dataAtual = new Date();
        this.state = {
            de: new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 1),
            para: dataAtual,
            data: {
                receitas: 0,
                despezas: 0,
                saldo: 0
            }
        }
    }

    componentDidMount() {

        this.filtrarResultados();
    }

    filtrarResultados = () => {

        const callback = (data) => {

            let temp = data[0];

            temp.saldo = temp.receitas - temp.despezas;
            temp.saldoAgendado = temp.receitas - temp.pagamentosAgendados;

            this.setState({ data: temp });
        }

        filtrarResultados(this.state.de, this.state.para, callback);
    }

    render() {
        return (

            <View>
                <HeaderMenu title="Home" navigation={this.props.navigation} />
                <View>
                    <Item>
                        <DatePicker
                            style={{ width: 120 }}
                            defaultDate={this.state.de}
                            maximumDate={this.state.para}
                            mode="date"
                            placeholder="De"
                            format="DD/MM/YYYY"
                            androidMode={"default"}
                            onDateChange={(date) => { this.setState({ de: date }) }}
                        />
                        <Label>Para</Label>
                        <DatePicker
                            style={{ width: 120 }}
                            defaultDate={this.state.para}
                            minimumDate={this.state.de}
                            mode="date"
                            placeholder="De"
                            format="DD/MM/YYYY"
                            androidMode={"default"}
                            onDateChange={(date) => { this.setState({ para: date }) }}
                        />
                        <Button onPress={() => this.filtrarResultados()} >
                            <Text>...</Text>
                        </Button>
                    </Item>

                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ borderWidth: 1, padding: 15, flex: 1 }}>
                            <Text>Receitas</Text>
                            <Text>{this.state.data.receitas}</Text>
                        </View>
                        <View style={{ borderWidth: 1, padding: 15, flex: 1 }}>
                            <Text>Despezas</Text>
                            <Text>{this.state.data.pagamentosAgendados}</Text>
                            <Text>{this.state.data.despezas}</Text>
                        </View>

                        <View style={{ borderWidth: 1, padding: 15, flex: 1 }}>
                            <Text>Saldo</Text>
                            <Text>{this.state.data.saldoAgendado}</Text>
                            <Text>{this.state.data.saldo}</Text>
                        </View>

                    </View>

                </View>
            </View>
        )
    }
}