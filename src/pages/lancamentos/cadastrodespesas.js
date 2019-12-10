import * as React from 'react';
import { Body, Header, Left, Title, Icon, Container, Content, Footer, Button, Text, Form, Item, Label, Picker, CheckBox, Input } from 'native-base';
import { openDatabase } from 'react-native-sqlite-storage';
import MoneyInput from '../../components/money/moneyinput';
import moment from 'moment';
import DatePicker from 'react-native-datepicker'

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
            valorParcelas: 1,
            diasParcela: 30,
            id: null,
            conta: 0
        }
    }

    componentDidMount() {

        db.transaction(tx => {

            tx.executeSql('SELECT * FROM tb_contas where cd_tipoconta=0', [], (tx, results) => {
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

    cadastrarDespesa = () => {
        debugger
        let navigation = this.props.navigation;

        db.transaction(tx => {

            const { id } = this.state;
            const { dataLancamento } = this.state;
            const { dataVencimento } = this.state;
            const { conta } = this.state;
            const { valor } = this.state;


            let sql = 'insert into tb_lancamentos(id_lancamento,cd_conta,dt_lancamento,dt_vencimento, vl_parcela) values(?,?,?,?,?)';
            const params = [id, conta, moment(dataLancamento).format('YYYY-MM-DD HH:mm:ss'), moment(dataVencimento).format('YYYY-MM-DD HH:mm:ss'), valor];

            if (this.state.id) {
                sql = 'update tb_lancamentos set cd_conta=?, dt_lancamento=?, dt_vencimento=?, vl_parcela=? where id_lancamento=?';
                params = [dataLancamento, moment(dataVencimento).format('YYYY-MM-DD HH:mm:ss'), conta, valor, id]
            }

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
                                onDateChange={(date) => { this.setState({ date: date }) }}

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
                                value={this.state.valorParcelas}
                                disabled={!this.state.parcelado}
                                keyboardType={'numeric'}
                                onChange={(e) => this.setState({ valorParcelas: e.nativeEvent.text })}
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