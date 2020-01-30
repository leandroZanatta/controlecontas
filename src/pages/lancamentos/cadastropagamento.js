import * as React from 'react';
import { Container, Content, Footer, Button, Text, Form, Item, Label, Picker } from 'native-base';
import MoneyInput from '../../components/money/moneyinput';
import DatePicker from 'react-native-datepicker'
import { buscarLancamentosParaPagamento } from '../../services/lancamentos/lancamentos';
import { salvarPagamento } from '../../services/pagamentos/pagamentos';
import ReturnMenu from '../../components/menu/returnmenu';
import { formatarMoeda } from '../../services/util';


export default class CadastroPagamentos extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            contas: [],
            id: null,
            contareceita: undefined,
            contadespeza: props.navigation.getParam('id_lancamento'),
            valor: props.navigation.getParam('valorParcela') - props.navigation.getParam('valorPago'),
            valorPago: props.navigation.getParam('valorParcela') - props.navigation.getParam('valorPago'),
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

        const callbackError = (error) => alert(error);

        const callbackSucess = () => this.props.navigation.navigate('Lancamentos');

        salvarPagamento(this.state, callbackSucess, callbackError);
    }

    changeReceita = (contareceita) => {

        this.setState({ contareceita })
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
                                selectedValue={this.state.contareceita}
                                onValueChange={this.changeReceita.bind(this)}
                            >
                                {
                                    this.state.contas.map(conta => {
                                        return (<Picker.Item label={conta.descricao + ' - ' + formatarMoeda(conta.saldo, 'R$')} value={conta.id} key={conta.id} />)
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
                                value={this.state.valorPago}
                                onMoneyChange={(valorPago) => this.setState({ valorPago })}
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