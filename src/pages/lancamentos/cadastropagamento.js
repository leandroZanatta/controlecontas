import * as React from 'react';
import { Body, Header, Left, Title, Icon, Container, Content, Footer, Button, Text, Form, Item, Label, Picker, CheckBox, Input } from 'native-base';
import { openDatabase } from 'react-native-sqlite-storage';
import MoneyInput from '../../components/money/moneyinput';
import moment from 'moment';
import DatePicker from 'react-native-datepicker'

const db = openDatabase({ name: 'controlecontas.db' });


export default class CadastroPagamentos extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            contas: [],
            dataPagamento: new Date()
        }
    }

    componentDidMount() {


    }

    cadastrarPagamento = () => {

        let navigation = this.props.navigation;

        let parcelas = this.cadastrarValorDespesa();

        db.transaction(tx => {

            parcelas.forEach(function (parcela) {

                let sql = 'insert into tb_lancamentos(id_lancamento,cd_conta,dt_lancamento,dt_vencimento, vl_parcela) values(?,?,?,?,?)';

                tx.executeSql(sql, parcela, (tx, results) => {
                    console.log('Lançamento Cadastrado')
                }, function (error) {
                    alert(error);
                });
            });

            navigation.navigate('Lancamentos');
        });
    }



    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Icon color='#FFF' fontSize='40' name="arrow-back" onPress={() => this.props.navigation.navigate('Lancamentos')} />
                    </Left>
                    <Body style={{ flex: 1 }}>
                        <Title>Lançar Pagamento</Title>
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