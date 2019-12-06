import * as React from 'react';
import { Body, Header, Left, Title, Icon, Container, Content, Footer, Button, Text, Form, Item, Label, Picker, Input } from 'native-base';
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase({ name: 'controlegastos.db' });

export default class CadastroContas extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            categorias: [],
            id: null,
            categoria: 0,
            descricao: '',
            tipoConta: 0
        }
    }

    componentDidMount() {

        db.transaction(tx => {
            tx.executeSql('SELECT * FROM tb_categorias', [], (tx, results) => {
                var temp = [];

                for (let i = 0; i < results.rows.length; ++i) {
                    temp.push(results.rows.item(i));
                }

                this.setState({
                    categorias: temp,
                });
            });
        });
    }

    cadastrarReceita = () => {

        let navigation = this.props.navigation;

        db.transaction(tx => {

            const { id } = this.state;
            const { descricao } = this.state;
            const { categoria } = this.state;
            const { tipoConta } = this.state;

            let sql = 'insert into tb_contas(id_conta, cd_tipoconta, cd_categoria, tx_descricao) values(?,?,?,?)';
            const params = [id, tipoConta, categoria, descricao];

            if (this.state.id) {
                sql = 'update tb_categorias set tx_descricao=?,cd_tipoconta,cd_categoria where id_conta=?';
                params = [descricao, tipoConta, categoria, id]
            }

            tx.executeSql(sql, params, (tx, results) => {
                navigation.navigate('Contas');
            });
        });
    }
    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Icon color='#FFF' fontSize='40' name="arrow-back" onPress={() => this.props.navigation.navigate('Contas')} />
                    </Left>
                    <Body style={{ flex: 1 }}>
                        <Title>Receita</Title>
                    </Body>
                </Header>
                <Content>
                    <Form>
                        <Item picker>
                            <Label>Tipo de Conta</Label>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                selectedValue={this.state.tipoConta}
                                onValueChange={(e) => this.setState({ tipoConta: e })}
                            >
                                <Picker.Item label='Despesa' value={0} key={0} />
                                <Picker.Item label='Receita' value={1} key={1} />

                            </Picker>
                        </Item>
                        <Item picker>
                            <Label>Categoria</Label>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                selectedValue={this.state.categoria}
                                onValueChange={(e) => this.setState({ categoria: e })}
                            >
                                {
                                    this.state.categorias.map(categoria => {
                                        return (<Picker.Item label={categoria.tx_descricao} value={categoria.id_categoria} key={categoria.id_categoria} />)
                                    })

                                }

                            </Picker>
                        </Item>
                        <Item stackedLabel>
                            <Label>Descrição</Label>
                            <Input
                                value={this.state.descricao}
                                onChange={(e) => this.setState({ descricao: e.nativeEvent.text })}
                            />
                        </Item>

                    </Form>
                </Content>
                <Footer>
                    <Button onPress={() => this.cadastrarReceita()}>
                        <Text>Salvar</Text>
                    </Button>
                </Footer>
            </Container>

        )
    }
}