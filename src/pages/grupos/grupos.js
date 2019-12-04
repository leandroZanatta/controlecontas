import * as React from 'react';
import { Text, View, FlatList } from 'react-native';
import { Body, Header, Left, Title, Icon, Footer, Fab, Button, Container } from 'native-base';
import { openDatabase } from 'react-native-sqlite-storage';
import { SwipeListView } from 'react-native-swipe-list-view';
import { TouchableOpacity } from 'react-native-gesture-handler';

const db = openDatabase({ name: 'controlegastos.db' });

export default class Grupos extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            items: [],
        };

        db.transaction(tx => {
            tx.executeSql('SELECT * FROM tb_grupos', [], (tx, results) => {
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

    abrirCadastroGrupo = () => {
        this.props.navigation.navigate('CadastroGrupos');
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Icon color='#FFF' fontSize='40' name="menu" onPress={() => this.props.navigation.openDrawer()} />
                    </Left>
                    <Body style={{ flex: 1 }}>
                        <Title>Grupos</Title>
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
                        leftOpenValue={75}
                        rightOpenValue={-75}
                    />
                    <Fab
                        active={this.state.active}
                        direction="up"
                        containerStyle={{}}
                        style={{ backgroundColor: '#5067FF' }}
                        position="bottomRight"
                        onPress={() => this.abrirCadastroGrupo()}>
                        <Icon name="add" />

                    </Fab>
                </View>
            </Container>

        )
    }
}