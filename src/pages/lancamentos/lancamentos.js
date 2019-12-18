import * as React from 'react';
import { View } from 'react-native';
import { Icon, Container, Fab, Button, Text } from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import moment from 'moment';
import HeaderMenu from '../../components/menu/headermenu';
import { buscarLancamentos, excluirLancamento } from '../../services/lancamentos/lancamentos';

export default class Lancamentos extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            active: false,
            items: [],
        };
    }

    componentDidMount() {

        buscarLancamentos(this.adicionarLancamentos);
    }

    adicionarLancamentos = (lancamentos) => {

        this.setState({ items: lancamentos });
    }

    excluir = (item) => {

        excluirLancamento(item, () => { buscarLancamentos(this.adicionarLancamentos) })
    }

    formatarLancamento = (item) => {

        if (item.cd_tipoconta === 0) {
            return moment(item.dt_vencimento, 'YYYY-MM-DD HH:mm:ss').format('DD/MM');
        }
        return moment(item.dt_lancamento, 'YYYY-MM-DD HH:mm:ss').format('DD/MM');
    }

    ListViewItemSeparator = () => {
        return (
            <View style={{ height: 0.5, width: '100%', backgroundColor: '#CCC' }} />
        );
    };

    render() {
        return (
            <Container>
                <HeaderMenu title="Lançamentos" navigation={this.props.navigation} />
                <View style={{ flex: 1 }}>
                    <SwipeListView
                        useFlatList={true}
                        data={this.state.items}
                        ItemSeparatorComponent={this.ListViewItemSeparator}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View key={item.id_conta}
                                style={{
                                    backgroundColor: 'white',
                                    paddingTop: 20,
                                    paddingBottom: 20,
                                    borderLeftColor: item.cd_tipoconta == 0 ? 'red' : 'blue',
                                    borderLeftWidth: 5,
                                    flexDirection: 'row'
                                }}>
                                <Text> {this.formatarLancamento(item)}</Text>
                                <Text style={{
                                    flex: 1
                                }}> {item.tx_descricao}</Text>
                                <Text style={{
                                    marginRight: 10
                                }}> {item.vl_parcela}</Text>
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
                                <Button light
                                    onPress={() => this.excluir(data.item)}>
                                    <Icon name='trash' />
                                </Button>
                                {data.item.cd_tipoconta === 0 &&
                                    <View >
                                        <Button light
                                            onPress={() => this.props.navigation.navigate('CadastroPagamentos', data.item)}>
                                            <Icon name='thumbs-up' />
                                        </Button>
                                    </View>
                                }
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
                        rightOpenValue={-75}
                    />

                    <Fab
                        active={this.state.active}
                        direction="up"
                        containerStyle={{}}
                        style={{ backgroundColor: '#5067FF' }}
                        position="bottomRight"
                        onPress={() => this.setState({ active: !this.state.active })}>
                        <Icon name="add" />

                        <Button
                            style={{ backgroundColor: '#0081BD' }}
                            onPress={() => this.props.navigation.navigate('CadastroReceitas')}
                        >
                            <Icon name="add" />
                        </Button>
                        <Button
                            style={{ backgroundColor: 'red' }}
                            onPress={() => this.props.navigation.navigate('CadastroDespesas')}
                        >
                            <Icon name="add" />
                        </Button>
                    </Fab>
                </View>
            </Container>

        )
    }
}