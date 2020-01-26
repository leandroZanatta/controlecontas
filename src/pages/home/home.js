import * as React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Button, Text, Icon, Separator } from 'native-base';
import HeaderMenu from '../../components/menu/headermenu';
import { filtrarResultados } from '../../services/home/home';
import { formatarMoeda } from '../../services/util';
import { Dimensions } from "react-native";
import { SwipeListView } from 'react-native-swipe-list-view';
import { PieChart } from "react-native-chart-kit";
import Filtros from './componentes/Filtros';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';

export default class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {
                receitas: 0,
                despezas: 0,
                totalReceitas: 0,
                totalPagamentos: 0,
                saldo: 0,
                totalSaldo: 0,
                contasReceita: [],
                gastosCategorias: []
            }
        }
    }


    filtrarResultados = (data) => {

        filtrarResultados(data.de, data.para, (resultados) => this.setState({ data: resultados }));
    }

    render() {

        const styles = StyleSheet.create({
            collapseSeparator: {
                padding: 10,
                height: 40,
                backgroundColor: '#E6E6E6'
            },
            collapseTitle: {
                fontSize: 15,
            },
            ListReceitas: {
                backgroundColor: '#FFF',
                height: 50,
                borderBottomWidth: 0.5,
                borderBottomColor: '#FAFAFA'
            }
        })

        return (

            <View>
                <HeaderMenu title="Home" navigation={this.props.navigation} />
                <View>
                    <Filtros funcaoFiltar={this.filtrarResultados} />
                    <ScrollView scrollEnabled={true}>
                        <Collapse isCollapsed={true}>
                            <CollapseHeader >
                                <Separator style={styles.collapseSeparator} bordered>
                                    <Text style={styles.collapseTitle}>Lançamentos</Text>
                                </Separator>
                            </CollapseHeader>
                            <CollapseBody>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ borderWidth: 1, padding: 5, flex: 1 }}>
                                        <Text>Receitas</Text>
                                        <Text>{formatarMoeda(this.state.data.receitas)}</Text>
                                    </View>
                                    <View style={{ borderWidth: 1, padding: 5, flex: 1 }}>
                                        <Text>Despezas</Text>
                                        <Text>{formatarMoeda(this.state.data.despezas)}</Text>
                                    </View>

                                    <View style={{ borderWidth: 1, padding: 5, flex: 1 }}>
                                        <Text>Saldo</Text>
                                        <Text>{formatarMoeda(this.state.data.saldo)}</Text>
                                    </View>

                                </View>

                                <Text style={styles.collapseTitle}>Pagamentos</Text>

                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ borderWidth: 1, padding: 5, flex: 1 }}>
                                        <Text>Despezas</Text>
                                        <Text>{formatarMoeda(this.state.data.totalPagamentos)}</Text>
                                    </View>

                                    <View style={{ borderWidth: 1, padding: 5, flex: 1 }}>
                                        <Text>Saldo</Text>
                                        <Text>{formatarMoeda(this.state.data.totalSaldo)}</Text>
                                    </View>

                                </View>
                            </CollapseBody>
                        </Collapse>

                        {this.state.data.contasReceita.length > 0 &&

                            <Collapse>
                                <CollapseHeader>
                                    <Separator style={styles.collapseSeparator} bordered>
                                        <Text style={styles.collapseTitle}>Detalhamento de Recebimentos</Text>
                                    </Separator>
                                </CollapseHeader>
                                <CollapseBody>
                                    <SwipeListView
                                        useFlatList={true}
                                        data={this.state.data.contasReceita}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({ item }) => (
                                            <View
                                                key={item.id}
                                                style={styles.ListReceitas}>
                                                <Button
                                                    style={{ backgroundColor: '#FFF' }}
                                                    onPress={() => this.props.navigation.navigate('Detalhamento', item)}>
                                                    <Text
                                                        style={{ color: '#000' }}
                                                    > {item.descricao}</Text>
                                                </Button>
                                            </View>
                                        )}
                                        renderHiddenItem={(data, rowMap) => (
                                            <View style={{
                                                alignItems: 'center',
                                                backgroundColor: '#FFF',
                                                flex: 1,
                                                flexDirection: 'row',
                                                justifyContent: 'space-between'
                                            }}>
                                                <View >
                                                    <Button
                                                        onPress={() => this.props.navigation.navigate('Detalhamento', data)}>
                                                        <Icon name='ios-eye' />
                                                    </Button>
                                                </View>
                                            </View>
                                        )}
                                        onRowOpen={(rowKey, rowMap) => {
                                            setTimeout(() => {
                                                if (rowMap[rowKey]) {
                                                    rowMap[rowKey].closeRow()
                                                }
                                            }, 5000)
                                        }}
                                        leftOpenValue={75}
                                        rightOpenValue={0}
                                    />
                                </CollapseBody>
                            </Collapse>

                        }
                        {this.state.data.gastosCategorias.length > 0 &&

                            <Collapse>
                                <CollapseHeader>
                                    <Separator style={styles.collapseSeparator} bordered>
                                        <Text style={styles.collapseTitle}>Gastos por Categoria</Text>
                                    </Separator>
                                </CollapseHeader>
                                <CollapseBody>
                                    <PieChart
                                        data={this.state.data.gastosCategorias}
                                        width={Dimensions.get('window').width}
                                        height={Dimensions.get('window').width / 2}
                                        accessor="valor"
                                        backgroundColor="transparent"
                                        paddingLeft="15"
                                        chartConfig={{
                                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                            propsForDots: {
                                                r: "6",
                                                strokeWidth: "2",
                                                stroke: "#ffa726"
                                            }
                                        }}
                                    />
                                </CollapseBody>
                            </Collapse>

                        }
                    </ScrollView>
                </View>

            </View >
        )
    }
}