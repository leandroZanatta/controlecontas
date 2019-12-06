import * as React from 'react';
import { Body, Header, Left, Title, Icon, Container, Content, Footer, Button, Text, Form, Item, Label, Picker, Input } from 'native-base';
import { openDatabase } from 'react-native-sqlite-storage';
import MoneyInput from '../../components/money/moneyinput';
import DatePicker from 'react-native-datepicker';

const db = openDatabase({ name: 'controlegastos.db' });

export default class CadastroReceitas extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            contas: [],
            dataLancamento: { date: "2019-12-05" },
            valor: 0,
            id: null,
            conta: 0
        }
    }

    componentDidMount() {

        db.transaction(tx => {

            tx.executeSql('SELECT * FROM tb_contas where cd_tipoconta=1', [], (tx, results) => {
                var temp = [];

                for (let i = 0; i < results.rows.length; ++i) {
                    temp.push(results.rows.item(i));
                }

                this.setState({
                    contas: temp,
                });
            });
        });
    }

    cadastrarReceita = () => {

        debugger
    }
    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Icon color='#FFF' fontSize='40' name="arrow-back" onPress={() => this.props.navigation.navigate('Contas')} />
                    </Left>
                    <Body style={{ flex: 1 }}>
                        <Title>Lançar Receita</Title>
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

                        <Item stackedLabel>
                            <Label>Data Lançamento</Label>
                            <DatePicker
                                style={{ width: 200 }}
                                date={this.state.dataLancamento}
                                mode="date"
                                format="YYYY-MM-DD"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
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