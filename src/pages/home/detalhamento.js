import * as React from 'react';
import { Container, Content, Text, View } from 'native-base';
import ReturnMenu from '../../components/menu/returnmenu';
import { FlatList, StyleSheet } from 'react-native';
import { formatarMoeda } from '../../services/util';
import moment from 'moment';

export default class Detalhamento extends React.Component {

    constructor(props) {
        super(props);

        const recebimento = props.navigation.getParam('item');

        let detalhamento = [];
        let saldo = recebimento.valor;

        detalhamento.push({
            descricao: recebimento.descricao,
            valor: recebimento.valor,
            data: moment(recebimento.dataLancamento).format('DD/MM'),
            saldo: recebimento.valor
        })

        recebimento.registros.forEach(conta => {

            saldo = saldo - conta.valorParcela;

            detalhamento.push({
                descricao: conta.descricao,
                valor: conta.valorParcela,
                data: moment(conta.dataPagamento).format('DD/MM'),
                saldo: saldo
            })
        });

        this.state = {
            detalhamento
        }
    }

    render() {
        const styles = StyleSheet.create({
            item: {
                flexDirection: 'row',
                padding: 10,
                fontSize: 10,
                height: 44,
            },
            descricao: {
                flex: 1
            },
            valores: {
                width: 70
            }
        });
        
        return (
            <Container>
                <ReturnMenu title="Detalhamento" backTo='Home' navigation={this.props.navigation} />
                <Content>
                    <View style={styles.container}>
                        <View style={styles.item}>
                            <Text style={styles.descricao}>Conta</Text>
                            <Text style={styles.valores}>Valor</Text>
                            <Text style={styles.valores}>Saldo</Text>
                        </View>
                        <FlatList
                            data={this.state.detalhamento}
                            renderItem={({ item }) => {
                                return (
                                    <View style={styles.item}>
                                        <Text style={styles.descricao}>{item.data + ' - ' + item.descricao}</Text>
                                        <Text style={styles.valores}>{formatarMoeda(item.valor)}</Text>
                                        <Text style={styles.valores}>{formatarMoeda(item.saldo)}</Text>
                                    </View>
                                )
                            }}
                        />
                    </View>
                </Content>
            </Container>

        )
    }
}