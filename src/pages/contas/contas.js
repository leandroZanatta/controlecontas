import * as React from 'react';
import { View } from 'react-native';
import { Icon, Container, Fab, Button, Text } from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import HeaderMenu from '../../components/menu/headermenu';
import { buscarContas, excluirConta, reincluirConta } from '../../services/contas/contas';

export default class Contas extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            active: false,
            items: [],
        };
    }

    componentDidMount() {

        buscarContas(this.adicionarContas);
    }

    adicionarContas = (contas) => {

        this.setState({
            items: contas,
        });
    }

    editarConta = (item) => {

        this.props.navigation.navigate('CadastroContas', item)
    }

    onEditConta(data, rowMap) {

        buscarContas(this.adicionarContas)

        if (rowMap[data.index]) {
            rowMap[data.index].closeRow()
        }
    }

    excluir = (data, rowMap) => {

        let me = this;

        const onEdit = function (result) { me.onEditConta(data, rowMap) };

        excluirConta(data.item, onEdit);
    }

    reincluir = (data, rowMap) => {

        let me = this;

        const onEdit = function (result) { me.onEditConta(data, rowMap) };

        reincluirConta(data.item, onEdit);
    }

    ListViewItemSeparator = () => {
        return (
            <View style={{ height: 0.5, width: '100%', backgroundColor: '#CCC' }} />
        );
    };

    montarOpcoesEsquerda = (data, rowMap) => {

        if (!data.item.exclusao) {
            return (
                <View >
                    <Button light
                        onPress={() => this.excluir(data, rowMap)}>
                        <Icon name='trash' />
                    </Button>
                </View>
            )
        }

        return (<View >
            <Button light
                onPress={() => this.reincluir(data, rowMap)}>
                <Icon name='done-all' />
            </Button>
        </View>
        );
    }

    render() {
        return (
            <Container>
                <HeaderMenu title="Contas" navigation={this.props.navigation} />
                <View style={{ flex: 1 }}>
                    <SwipeListView
                        useFlatList={true}
                        data={this.state.items}
                        ItemSeparatorComponent={this.ListViewItemSeparator}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View
                                key={item.id}
                                style={{
                                    backgroundColor: '#FFF',
                                    borderLeftColor: item.tipoConta == 0 ? 'red' : 'blue',
                                    borderLeftWidth: 5
                                }}>
                                <Button
                                    style={{ backgroundColor: '#FFF' }}
                                    onPress={() => this.editarConta(item)}>
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
                                {
                                    this.montarOpcoesEsquerda(data, rowMap)
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
                        onPress={() => this.props.navigation.navigate('CadastroContas')}>
                        <Icon name="add" />
                    </Fab>
                </View>
            </Container>

        )
    }
}