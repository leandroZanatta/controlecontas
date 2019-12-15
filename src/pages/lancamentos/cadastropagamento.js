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
            id: null,
            contareceita: null,
            contadespeza: props.navigation.getParam('cd_conta'),
            valor: props.navigation.getParam('vl_parcela'),
            dataPagamento: new Date()
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

    cadastrarPagamento = () => {

        let navigation = this.props.navigation;

        const { id } = this.state;
        const { contadespeza } = this.state;
        const { contareceita } = this.state;
        const { dataPagamento } = this.state;
        const { valor } = this.state;

        db.transaction(tx => {

            let sql = 'insert into tb_pagamentos(id_pagamento, cd_contadespeza, cd_contareceita, dt_pagamento, vl_parcela) values(?,?,?,?,?)';
            const params = [id, contadespeza, contareceita, moment(dataPagamento, 'YYYY-MM-DD').format('YYYY-MM-DD HH:mm:ss'), valor];

            tx.executeSql(sql, params, (tx, results) => {
                navigation.navigate('Lancamentos');
            }, function (error) {
                alert(error);
            });
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
                                selectedValue={this.state.contareceita}
                                onValueChange={(e) => this.setState({ contareceita: e })}
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