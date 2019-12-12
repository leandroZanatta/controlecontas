import * as React from 'react';
import { Text, View } from 'react-native';
import { Body, Header, Left, Title, Icon, Fab, Button, Container } from 'native-base';
import { openDatabase } from 'react-native-sqlite-storage';
import { SwipeListView } from 'react-native-swipe-list-view';
import moment from 'moment';

const db = openDatabase({ name: 'controlecontas.db' });

export default class Categorias extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            items: [],
        };
    }

    componentDidMount() {

        this.buscarCategorias();
    }

    montarOpcoesEsquerda = (data, rowMap) => {

        if (!data.item.dt_exclusao) {
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

    buscarCategorias = () => {

        db.transaction(tx => {
            
            tx.executeSql('SELECT * FROM tb_categorias', [], (tx, results) => {
                var temp = [];

                for (let i = 0; i < results.rows.length; ++i) {
                    temp.push(results.rows.item(i));
                }

                this.setState({
                    items: temp,
                });
            });
        });
    }

    excluir = (data, rowMap) => {

        var me = this;

        db.transaction(tx => {

            tx.executeSql('update tb_categorias set dt_exclusao=? where id_categoria= ?', [moment().format('YYYY-MM-DD HH:mm:ss'), data.item.id_categoria], (tx, results) => {

                me.buscarCategorias();

                if (rowMap[data.index]) {
                    rowMap[data.index].closeRow()
                }
            });
        });
    }

    reincluir = (data, rowMap) => {

        var me = this;

        db.transaction(tx => {

            tx.executeSql('update tb_categorias set dt_exclusao=? where id_categoria= ?', [null, data.item.id_categoria], (tx, results) => {

                me.buscarCategorias();

                if (rowMap[data.index]) {
                    rowMap[data.index].closeRow()
                }
            });
        });
    }

    ListViewItemSeparator = () => {
        return (
            <View style={{ height: 0.5, width: '100%', backgroundColor: '#CCC' }} />
        );
    };

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Icon color='#FFF' fontSize='40' name="menu" onPress={() => this.props.navigation.openDrawer()} />
                    </Left>
                    <Body style={{ flex: 1 }}>
                        <Title>Categorias</Title>
                    </Body>
                </Header>
                <View style={{ flex: 1 }}>
                    <SwipeListView
                        data={this.state.items}
                        ItemSeparatorComponent={this.ListViewItemSeparator}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View key={item.id_grupo} style={{ backgroundColor: 'white', padding: 20 }}>
                                <Text> {item.tx_descricao}</Text>
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
                                <Button light
                                    onPress={() => alert('teste')}>
                                    <Icon name='edit' />
                                </Button>
                            </View>
                        )}
                        leftOpenValue={75}
                        rightOpenValue={-75}
                        onRowOpen={(rowKey, rowMap) => {
                            setTimeout(() => {
                                if (rowMap[rowKey]) {
                                    rowMap[rowKey].closeRow()
                                }
                            }, 2000)
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