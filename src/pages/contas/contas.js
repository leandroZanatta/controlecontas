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

        buscarContas((contas) => this.setState({ items: contas }));
    }

    onEditConta(data, rowMap) {

        buscarContas((contas) => this.setState({ items: contas }))

        if (rowMap[data.index]) {
            rowMap[data.index].closeRow()
        }
    }

    montarOpcoesEsquerda = (data, rowMap) => {

        if (!data.item.exclusao) {
            return (
                <View >
                    <Button light
                        onPress={() => excluirConta(data.item, () => { this.onEditConta(data, rowMap) })}>
                        <Icon name='trash' />
                    </Button>
                </View>
            )
        }

        return (<View >
            <Button light
                onPress={() => reincluirConta(data.item, (result) => { this.onEditConta(data, rowMap) })}>
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
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View
                                key={item.id}
                                style={{
                                    backgroundColor: '#FFF',
                                    borderLeftColor: item.tipoConta == 0 ? 'red' : 'blue',
                                    borderLeftWidth: 5,
                                    height: 50,
                                    borderBottomWidth: 0.5,
                                    borderBottomColor: '#FAFAFA'
                                }}>
                                <Button
                                    style={{ backgroundColor: '#FFF' }}
                                    onPress={() => this.props.navigation.navigate('CadastroContas', item)}>
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