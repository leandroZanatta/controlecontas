import * as React from 'react';
import { Body, Header, Left, Title, Icon, Container, Form, Item, Label, Input, Content, Button, Text, Footer } from 'native-base';
import { salvarCategoria } from '../../services/categorias/categorias';

export default class CadastroCategorias extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: props.navigation.getParam('id'),
            descricao: props.navigation.getParam('descricao')
        };
    }

    goBack = () => {
        this.props.navigation.navigate('Categorias');
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Icon color='#FFF' fontSize='40' name="arrow-back" onPress={this.goBack} />
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
                    <Button onPress={() => salvarCategoria(this.state, this.goBack)}>
                        <Text>Salvar</Text>
                    </Button>
                </Footer>
            </Container>

        )
    }
}