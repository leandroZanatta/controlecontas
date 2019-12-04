import * as React from 'react';
import { Body, Header, Left, Title, Icon, Container, Content, Footer, Button, Text } from 'native-base';


export default class CadastroContasReceita extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Icon color='#FFF' fontSize='40' name="menu" onPress={() => this.props.navigation.navigate('Contas')} />
                    </Left>
                    <Body style={{ flex: 1 }}>
                        <Title>Receita</Title>
                    </Body>
                </Header>
                <Content>
                   
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