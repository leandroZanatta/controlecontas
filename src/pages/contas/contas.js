import * as React from 'react';
import { View } from 'react-native';
import { Body, Header, Left, Title, Icon, Container, Fab, Button, Text } from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase({ name: 'controlecontas.db' });


export default class Contas extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            active: false,
            items: [],
        };

        db.transaction(tx => {
            tx.executeSql('SELECT * FROM tb_contas order by cd_tipoconta desc,tx_descricao asc', [], (tx, results) => {
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
                        <Title>Contas</Title>
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
                                    backgroundColor: '#FFF',
                                    padding: 20,
                                    borderLeftColor: item.cd_tipoconta == 0 ? 'red' : 'blue',
                                    borderLeftWidth: 5
                                }}>
                                <Text style={{
                                    fontSize: 14
                                }}> {item.tx_descricao}</Text>
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
                                    <Icon name='edit' />
                                </Button>
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