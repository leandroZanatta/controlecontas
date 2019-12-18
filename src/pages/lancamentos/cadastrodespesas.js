import * as React from 'react';
import { Body, Header, Left, Title, Icon, Container, Content, Footer, Button, Text, Form, Item, Label, Picker, CheckBox, Input } from 'native-base';
import { openDatabase } from 'react-native-sqlite-storage';
import MoneyInput from '../../components/money/moneyinput';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';
import { buscarDespezas } from '../../services/contas/contas';
import { cadastrarDespezas } from '../../services/lancamentos/lancamentos';
const db = openDatabase({ name: 'controlecontas.db' });


export default class CadastroDespesas extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            contas: [],
            dataLancamento: new Date(),
            dataVencimento: new Date(),
            valor: 0,
            parcelado: false,
            numeroParcelas: '1',
            diasParcela: '30',
            id: null,
            conta: 0
        }
    }

    componentDidMount() {

        buscarDespezas(this.adicionarContasDespeza);
    }

    adicionarContasDespeza = (contas) => {

        this.setState({ contas: contas });
    }

    cadastrarDespesa = () => {

        let parcelas = this.cadastrarValorDespesa();

        cadastrarDespezas(parcelas, () => this.props.navigation.navigate('Lancamentos'));
    }

    cadastrarValorDespesa = () => {

        const { dataVencimento } = this.state;
        const { parcelado } = this.state;
        const { numeroParcelas } = this.state;
        const { diasParcela } = this.state;

        let parcelas = [];

        if (parcelado) {

            let dataVencimentoParcela = dataVencimento;

            for (let i = 0; i < numeroParcelas; i++) {

                parcelas.push(this.createParcelas(dataVencimentoParcela));

                dataVencimentoParcela.setDate(dataVencimentoParcela.getDate() + parseInt(diasParcela));
            }

            return parcelas;
        }

        parcelas.push(this.createParcelas(dataVencimento));

        return parcelas;
    }

    createParcelas = (dataVencimentoParcela) => {

        return [
            this.state.id,
            this.state.conta,
            moment(this.state.dataLancamento).format('YYYY-MM-DD HH:mm:ss'),
            moment(dataVencimentoParcela, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss'),
            this.state.valor
        ]
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Icon color='#FFF' fontSize='40' name="arrow-back" onPress={() => this.props.navigation.navigate('Lancamentos')} />
                    </Left>
                    <Body style={{ flex: 1 }}>
                        <Title>Lançar Despesa</Title>
                    </Body>
                </Header>
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
                        <Item stackedLabel>
                            <Label>Parcelado?</Label>
                            <CheckBox
                                checked={this.state.parcelado}
                                color="gray"
                                onPress={() => this.setState({ parcelado: !this.state.parcelado })}
                            />
                        </Item>

                        <Item stackedLabel>
                            <Label>Parcelas</Label>
                            <Input
                                numeric
                                value={this.state.numeroParcelas}
                                disabled={!this.state.parcelado}
                                keyboardType={'numeric'}
                                onChange={(e) => this.setState({ numeroParcelas: e.nativeEvent.text })}
                            />

                        </Item>

                        <Item stackedLabel>
                            <Label>Dias</Label>
                            <Input
                                numeric
                                value={this.state.diasParcela}
                                disabled={!this.state.parcelado}
                                keyboardType={'numeric'}
                                onChange={(e) => this.setState({ diasParcela: e.nativeEvent.text })}
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