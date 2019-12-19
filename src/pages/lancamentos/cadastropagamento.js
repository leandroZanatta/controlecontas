import * as React from 'react';
import { Icon, Container, Content, Footer, Button, Text, Form, Item, Label, Picker, CheckBox, Input } from 'native-base';
import MoneyInput from '../../components/money/moneyinput';
import DatePicker from 'react-native-datepicker'
import { buscarLancamentosParaPagamento } from '../../services/lancamentos/lancamentos';
import { salvarPagamento } from '../../services/pagamentos/pagamentos';
import ReturnMenu from '../../components/menu/returnmenu';


export default class CadastroPagamentos extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            contas: [],
            id: null,
            contareceita: null,
            contadespeza: props.navigation.getParam('id_lancamento'),
            valor: props.navigation.getParam('vl_parcela') - props.navigation.getParam('vl_pago'),
            dataPagamento: new Date()
        }
    }

    componentDidMount() {

        buscarLancamentosParaPagamento(this.adicionarLancamentos);
    }

    adicionarLancamentos = (lancamentos) => {

        this.setState({ contas: lancamentos });
    }

    cadastrarPagamento = () => {

        const callbackSucess = () => { this.props.navigation.navigate('Lancamentos') };

        salvarPagamento(this.state, callbackSucess)
    }

    render() {
        return (
            <Container>
                <ReturnMenu title="Lançar Pagamento" backTo='Lancamentos' navigation={this.props.navigation} />
                <Content>
                    <Form>

                        <Item picker>
                            <Label>Conta</Label>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                selectedValue={this.state.contareceita}
                                onValueChange={(e) => this.setState({ contareceita: e })}
                            >
                                {
                                    this.state.contas.map(conta => {
                                        return (<Picker.Item label={conta.descricao} value={conta.id} key={conta.id} />)
                                    })

                                }

                            </Picker>
                        </Item>
                        <Item>
                            <Label>Data Pagamento:</Label>
                            <DatePicker
                                style={{ width: 200 }}
                                date={this.state.dataPagamento}
                                mode="date"
                                placeholder="Selecione uma data"
                                format="DD/MM/YYYY"
                                customStyles={{
                                    dateIcon: {
                                        position: 'relative',
                                        marginLeft: 4
                                    },
                                }}
                                onDateChange={(date) => { this.setState({ dataPagamento: date }) }}
                            />
                        </Item>

                        <Item stackedLabel>
                            <Label>Valor</Label>
                            <MoneyInput
                                value={this.state.valor}
                                onMoneyChange={(valor) => this.setState({ valor })}
                            />
                        </Item>
                    </Form>
                </Content>
                <Footer>
                    <Button onPress={() => this.cadastrarPagamento()}>
                        <Text>Salvar</Text>
                    </Button>
                </Footer>
            </Container>

        )
    }
}