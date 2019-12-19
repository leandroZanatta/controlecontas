import * as React from 'react';
import { Container, Form, Item, Label, Input, Content, Button, Text, Footer } from 'native-base';
import { salvarCategoria } from '../../services/categorias/categorias';
import ReturnMenu from '../../components/menu/returnmenu';

export default class CadastroCategorias extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: props.navigation.getParam('id'),
            descricao: props.navigation.getParam('descricao')
        };
    }

    render() {
        return (
            <Container>
                <ReturnMenu title='Cadastro de Categoria' backTo='Categorias' navigation={this.props.navigation} />
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
                    <Button onPress={() => salvarCategoria(this.state, () => this.props.navigation.navigate('Categorias'))}>
                        <Text>Salvar</Text>
                    </Button>
                </Footer>
            </Container>

        )
    }
}