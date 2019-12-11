import * as React from 'react';
import { View } from 'react-native';
import { Body, Header, Left, Title, Icon, Container, Fab, Button, Text } from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import { openDatabase } from 'react-native-sqlite-storage';
import moment from 'moment';

const db = openDatabase({ name: 'controlecontas.db' });


export default class Lancamentos extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            active: false,
            items: [],
        };
    }

    componentDidMount() {

        db.transaction(tx => {

            tx.executeSql('SELECT * FROM tb_lancamentos lancamentos left join tb_contas contas on lancamentos.cd_conta=contas.id_conta', [], (tx, results) => {
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

    formatarLancamento = (item) => {

        if (item.cd_tipoconta === 0) {
            return moment(item.dt_vencimento, 'YYYY-MM-DD HH:mm:ss').format('DD/MM');
        }
        return moment(item.dt_lancamento, 'YYYY-MM-DD HH:mm:ss').format('DD/MM');
    }


    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Icon color='#FFF' fontSize='40' name="menu" onPress={() => this.props.navigation.openDrawer()} />
                    </Left>
                    <Body style={{ flex: 1 }}>
                        <Title>Lançamentos</Title>
                    </Body>
                </Header>
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
                                <Text> {item.tx_descricao}</Text>
                                <Text> {item.vl_parcela}</Text>
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
                                    onPress={() => alert('teste')}>
                                    <Icon name='trash' />
                                </Button>

                                <Button light
                                    onPress={() => alert('teste')}>
                                    <Icon name='trash' />
                                </Button>
                            </View>
                        )}
                        onRowOpen={(rowKey, rowMap) => {
                            setTimeout(() => {
                                rowMap[rowKey].closeRow()
                            }, 2000)
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