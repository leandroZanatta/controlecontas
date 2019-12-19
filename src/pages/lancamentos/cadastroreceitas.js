import * as React from 'react';
import { Icon, Container, Content, Footer, Button, Text, Form, Item, Label, Picker } from 'native-base';
import { openDatabase } from 'react-native-sqlite-storage';
import MoneyInput from '../../components/money/moneyinput';
import moment from 'moment';
import ReturnMenu from '../../components/menu/returnmenu';
import { buscarReceitas } from '../../services/contas/contas';
import { cadastrarReceita } from '../../services/lancamentos/lancamentos';

const db = openDatabase({ name: 'controlecontas.db' });


export default class CadastroReceitas extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            contas: [],
            dataLancamento: { date: new Date() },
            valor: 0,
            id: null,
            conta: 0
        }
    }

    adicionarContas = (lancamentos) => {

        this.setState({ contas: lancamentos });
    }

    componentDidMount() {

        buscarReceitas(this.adicionarContas);
    }

    cadastrarReceita = () => {

        let callbacSucess = () => {
            this.props.navigation.navigate('Lancamentos');
        }

        cadastrarReceita(this.state, callbacSucess);
    }

    render() {
        return (
            <Container>
                <ReturnMenu title='Lançar Receita' backTo='Lancamentos' navigation={this.props.navigation} />
                <Content>
                    <Form>

                        <Item picker>
                            <Label>Conta</Label>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                selectedValue={this.state.conta}
                                onValueChange={(e) => this.setState({ conta: e })}
                            >
                                {
                                    this.state.contas.map(conta => {
                                        return (<Picker.Item label={conta.tx_descricao} value={conta.id_conta} key={conta.id_conta} />)
                                    })
                                }

                            </Picker>
                        </Item>
                        <Item stackedLabel>
                            <Label>Valor</Label>
                            <MoneyInput
                                onMoneyChange={(valor) => this.setState({ valor })}
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