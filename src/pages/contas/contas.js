import * as React from 'react';
import { View } from 'react-native';
import { Body, Header, Left, Title, Icon, Container, Fab, Button, Text } from 'native-base';


export default class Contas extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            active: false,
            items: [],
        };

    }


    abrirCadastroConta = () => {
        
    }


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


                    <Fab
                        active={this.state.active}
                        direction="up"
                        containerStyle={{}}
                        style={{ backgroundColor: '#5067FF' }}
                        position="bottomRight"
                        onPress={() => this.setState({ active: !this.state.active })}>
                        <Icon name="add" />
                    
                        <Button
                         style={{ backgroundColor: '#0081BD' }}
                         onPress={() => this.props.navigation.navigate('CadastroContasReceita')}
                         >
                            <Icon name="add" />
                        </Button>
                        <Button
                            style={{ backgroundColor: 'red' }}
                            onPress={() => this.props.navigation.navigate('CadastroContasDespesa')}>
                                <Icon name="add" />
                        </Button>
                    </Fab>
                </View>
            </Container>

        )
    }
}