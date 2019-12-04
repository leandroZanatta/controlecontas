import * as React from 'react';
import { Body, Header, Left, Title, Icon, Container, Form, Item, Label, Input, Content, Button, Text, Footer } from 'native-base';
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase({ name: 'controlegastos.db' });

export default class CadastroCategorias extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: null,
            descricao: ''
        };

    }

    cadastrarCategoria = () => {

        let navigation = this.props.navigation;

        db.transaction(tx => {

            const { id } = this.state;
            const { descricao } = this.state;

            let sql = 'insert into tb_categorias(id_categoria,tx_descricao) values(?,?)';
            const params = [id, descricao];

            if (this.state.id) {
                sql = 'update tb_categorias set tx_descricao=? where id_categoria=?';
                params = [descricao, id]
            }
           
            tx.executeSql(sql, params, (tx, results) => {
                navigation.navigate('Categorias');
            });
        });
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Icon color='#FFF' fontSize='40' name="menu" onPress={() => this.props.navigation.navigate('Categorias')} />
                    </Left>
                    <Body style={{ flex: 1 }}>
                        <Title>Cadastrar Categoria</Title>
                    </Body>
                </Header>
                <Content >
                    <Form>
                        <Item stackedLabel>
                            <Label>Categoria</Label>
                            <Input
                                value={this.state.descricao}
                                onChange={(e) => this.setState({ descricao: e.nativeEvent.text })}
                            />
                        </Item>
                    </Form>

                </Content>
                <Footer>
                    <Button onPress={() => this.cadastrarCategoria()}>
                        <Text>Salvar</Text>
                    </Button>
                </Footer>
            </Container>

        )
    }
}