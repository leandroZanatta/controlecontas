import * as React from 'react';
import { Text, View } from 'react-native';
import { Icon, Fab, Button, Container } from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import { buscarCategorias, excluirCategoria, reincluirCategoria } from '../../services/categorias/categorias';
import HeaderMenu from '../../components/menu/headermenu';

export default class Categorias extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            items: [],
        };
    }

    adicionarCategorias = (categorias) => {

        this.setState({
            items: categorias,
        });

    }

    componentDidMount() {

        buscarCategorias(this.adicionarCategorias);
    }

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

        return (
            <View >
                <Button light
                    onPress={() => this.reincluir(data, rowMap)}>
                    <Icon name='done-all' />
                </Button>
            </View>
        );
    }

    onEditCategoria(data, rowMap) {

        buscarCategorias(this.adicionarCategorias)

        if (rowMap[data.index]) {
            rowMap[data.index].closeRow()
        }
    }


    excluir = (data, rowMap) => {

        let me = this;

        const onEdit = function (result) { me.onEditCategoria(data, rowMap) };

        excluirCategoria(data.item, onEdit);
    }

    reincluir = (data, rowMap) => {

        let me = this;

        const onEdit = function (result) { me.onEditCategoria(data, rowMap) };

        reincluirCategoria(data.item, onEdit);
    }

    editarCategoria = (item) => {

        this.props.navigation.navigate('CadastroCategorias', item)
    }

    ListViewItemSeparator = () => {
        return (
            <View style={{ height: 0.5, width: '100%', backgroundColor: '#CCC' }} />
        );
    };

    render() {
        return (
            <Container>
                <HeaderMenu title="Categorias" navigation={this.props.navigation} />
                <View style={{ flex: 1 }}>
                    <SwipeListView
                        data={this.state.items}
                        ItemSeparatorComponent={this.ListViewItemSeparator}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View>
                                <Button
                                    key={item.id}
                                    style={{ backgroundColor: '#FFF', padding: 20 }}
                                    onPress={() => this.editarCategoria(item)}>
                                    <Text> {item.descricao}</Text>
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
                        leftOpenValue={75}
                        rightOpenValue={-75}
                        onRowOpen={(rowKey, rowMap) => {
                            setTimeout(() => {
                                if (rowMap[rowKey]) {
                                    rowMap[rowKey].closeRow()
                                }
                            }, 5000)
                        }}
                    />
                    <Fab
                        active={this.state.active}
                        direction="up"
                        containerStyle={{}}
                        style={{ backgroundColor: '#5067FF' }}
                        position="bottomRight"
                        onPress={() => this.props.navigation.navigate('CadastroCategorias')}>
                        <Icon name="add" />
                    </Fab>
                </View>
            </Container>

        )
    }
}