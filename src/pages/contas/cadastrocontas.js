import * as React from 'react';
import { Icon, Container, Content, Footer, Button, Text, Form, Item, Label, Picker, Input } from 'native-base';
import { salvarConta } from '../../services/contas/contas';
import { buscarCategorias } from '../../services/categorias/categorias';
import ReturnMenu from '../../components/menu/returnmenu';

export default class CadastroContas extends React.Component {

    constructor(props) {

        super(props);

        let tipoConta = props.navigation.getParam('tipoConta');

        this.state = {
            categorias: [],
            id: props.navigation.getParam('id'),
            categoria: props.navigation.getParam('categoria'),
            descricao: props.navigation.getParam('descricao'),
            tipoConta: tipoConta ? tipoConta : 0
        }
    }

    componentDidMount() {

        buscarCategorias((categorias) => this.setState({ categorias: categorias }));
    }

    render() {
        return (
            <Container>
                <ReturnMenu title='Cadastro de Conta' backTo='Contas' navigation={this.props.navigation} />
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
                                        return (<Picker.Item label={categoria.descricao} value={categoria.id} key={categoria.id} />)
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
                    <Button onPress={() => salvarConta(this.state, () => this.props.navigation.navigate('Contas'))}>
                        <Text>Salvar</Text>
                    </Button>
                </Footer>
            </Container>

        )
    }
}