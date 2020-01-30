import * as React from 'react';
import { Icon, Container, Content, Footer, Button, Text, Form, Item, Label, Picker, CheckBox, Input } from 'native-base';
import MoneyInput from '../../components/money/moneyinput';
import DatePicker from 'react-native-datepicker';
import { buscarDespezas } from '../../services/contas/contas';
import { cadastrarDespezas } from '../../services/lancamentos/lancamentos';
import ReturnMenu from '../../components/menu/returnmenu';

export default class CadastroDespesas extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            contas: [],
            dataLancamento: new Date(),
            dataVencimento: new Date(),
            valor: 0,
            id: null,
            conta: 0
        }
    }

    componentDidMount() {

        buscarDespezas((contas) => this.setState({ contas: contas }));
    }


    cadastrarDespesa = () => {

        cadastrarDespezas(this.state, () => this.props.navigation.navigate('Lancamentos'));
    }

    render() {
        return (
            <Container>
                <ReturnMenu title='Lançar Despesa' backTo='Lancamentos' navigation={this.props.navigation} />
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
                        <Item>
                            <Label>Vencimento</Label>
                            <DatePicker
                                style={{ width: 200 }}
                                date={this.state.dataVencimento}
                                mode="date"
                                placeholder="Selecione uma data"
                                format="DD/MM/YYYY"
                                customStyles={{
                                    dateIcon: {
                                        position: 'relative',
                                        marginLeft: 4
                                    },
                                }}
                                onDateChange={(date) => { this.setState({ dataVencimento: date }) }}
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
                    <Button onPress={() => this.cadastrarDespesa()}>
                        <Text>Salvar</Text>
                    </Button>
                </Footer>
            </Container>

        )
    }
}