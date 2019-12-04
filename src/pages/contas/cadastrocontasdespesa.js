import * as React from 'react';
import { Body, Header, Left, Title, Icon, Container, Content, Footer, Button, Text, Form, Item, Picker, Label, Input } from 'native-base';


export default class CadastroContasDespesa extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            descricao: ''
        }
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Icon color='#FFF' fontSize='40' name="menu" onPress={() => this.props.navigation.navigate('Contas')} />
                    </Left>
                    <Body style={{ flex: 1 }}>
                        <Title>Despesas</Title>
                    </Body>
                </Header>
                <Content>
                    <Form>
                        <Item picker>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="Select your SIM"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                            //    selectedValue={this.state.selected2}
                            //    onValueChange={this.onValueChange2.bind(this)}
                            >
                                <Picker.Item label="Wallet" value="key0" />
                               </Picker>
                        </Item>
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
                    <Button >
                        <Text>Salvar</Text>
                    </Button>
                </Footer>
            </Container>

        )
    }
}