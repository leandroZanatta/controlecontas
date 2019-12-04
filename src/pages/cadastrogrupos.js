import * as React from 'react';
import { View } from 'react-native';
import { Body, Header, Left, Title, Icon, Container, Form, Item, Label, Input, Content, Button, Text, Footer } from 'native-base';
import { openDatabase } from 'react-native-sqlite-storage';


const db = openDatabase({ name: 'controlegastos.db' });

export default class CadastroGrupos extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: null,
            descricao: ''
        };

    }

    cadastrarGrupo = () => {

        let navigation = this.props.navigation;

        db.transaction(tx => {

            const { id } = this.state;
            const { descricao } = this.state;

            let sql = 'insert into tb_grupos(id_grupo,tx_descricao) values(?,?)';
            const params = [id, descricao];

            if (this.state.id) {
                sql = 'update tb_grupos set tx_descricao=? where id_grupo=?';
                params = [descricao, id]
            }
           
            tx.executeSql(sql, params, (tx, results) => {
                navigation.navigate('Grupos');
            });
        });
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Icon color='#FFF' fontSize='40' name="menu" onPress={() => this.props.navigation.navigate('Grupos')} />
                    </Left>
                    <Body style={{ flex: 1 }}>
                        <Title>Cadastrar Grupo</Title>
                    </Body>
                </Header>
                <Content >
                    <Form>
                        <Item stackedLabel>
                            <Label>Grupo</Label>
                            <Input
                                value={this.state.descricao}
                                onChange={(e) => this.setState({ descricao: e.nativeEvent.text })}
                            />
                        </Item>
                    </Form>

                </Content>
                <Footer>
                    <Button onPress={() => this.cadastrarGrupo()}>
                        <Text>Salvar</Text>
                    </Button>
                </Footer>
            </Container>

        )
    }
}