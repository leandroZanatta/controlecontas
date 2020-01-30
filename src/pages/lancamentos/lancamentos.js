import * as React from 'react';
import { View } from 'react-native';
import { Icon, Container, Fab, Button, Text } from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import moment from 'moment';
import HeaderMenu from '../../components/menu/headermenu';
import { buscarLancamentos, excluirLancamento } from '../../services/lancamentos/lancamentos';
import { formatarMoeda } from '../../services/util';

export default class Lancamentos extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            active: false,
            items: [],
        };
    }

    componentDidMount() {

        buscarLancamentos((lancamentos) => this.setState({ items: lancamentos }));
    }

    formatarLancamento = (item) => {

        if (item.cd_tipoconta === 0) {
            return moment(item.dt_vencimento, 'YYYY-MM-DD HH:mm:ss').format('DD/MM');
        }
        return moment(item.dt_lancamento, 'YYYY-MM-DD HH:mm:ss').format('DD/MM');
    }

    render() {
        return (
            <Container>
                <HeaderMenu title="Lançamentos" navigation={this.props.navigation} />
                <View style={{ flex: 1 }}>
                    <SwipeListView
                        useFlatList={true}
                        data={this.state.items}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View key={item.id_conta}
                                style={{
                                    backgroundColor: 'white',
                                    borderLeftColor: item.cd_tipoconta == 0 ? 'red' : 'blue',
                                    borderLeftWidth: 5,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    height: 50,
                                    borderBottomWidth: 0.5,
                                    borderBottomColor: '#FAFAFA'
                                }}>
                                <Text> {this.formatarLancamento(item)}</Text>
                                <Text style={{
                                    flex: 1
                                }}> {item.tx_descricao}</Text>
                                <Text style={{
                                    marginRight: 10
                                }}> {formatarMoeda(item.valorParcela)}</Text>

                                <Text style={{
                                    marginRight: 10
                                }}> {formatarMoeda(item.valorPago)}
                                </Text>
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
                                    onPress={() => excluirLancamento(data.item, () => { buscarLancamentos((lancamentos) => this.setState({ items: lancamentos })) })}>
                                    <Icon name='trash' />
                                </Button>
                                {data.item.cd_tipoconta === 0 && data.item.valorParcela > data.item.valorPago &&
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