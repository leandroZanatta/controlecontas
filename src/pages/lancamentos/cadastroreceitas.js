import * as React from 'react';
import { Icon, Container, Content, Footer, Button, Text, Form, Item, Label, Picker } from 'native-base';
import MoneyInput from '../../components/money/moneyinput';
import ReturnMenu from '../../components/menu/returnmenu';
import { buscarReceitas } from '../../services/contas/contas';
import { cadastrarReceita } from '../../services/lancamentos/lancamentos';
import DatePicker from 'react-native-datepicker';
import { formatarMoeda } from '../../services/util';
import { Dimensions } from 'react-native';

export default class CadastroReceitas extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            contas: [],
            dataLancamento: new Date(),
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
        const widthDate = parseInt((Dimensions.get('window').width - 120));

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
                                style={{ width: widthDate }}
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
                        <Item>
                            <Label>Lancamento</Label>
                            <DatePicker
                                style={{ width: widthDate }}
                                date={this.state.dataLancamento}
                                mode="date"
                                placeholder="Selecione uma data"
                                format="DD/MM/YYYY"
                                customStyles={{
                                    dateIcon: {
                                        position: 'relative',
                                        marginLeft: 4
                                    },
                                }}
                                onDateChange={(date) => { this.setState({ dataLancamento: date }) }}
                            />
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