import * as React from 'react';
import { Body, Header, Left, Title, Icon, Container, Content, Footer, Button, Text, Form, Item, Label, Picker } from 'native-base';
import { openDatabase } from 'react-native-sqlite-storage';
import MoneyInput from '../../components/money/moneyinput';
import moment from 'moment';


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

        let navigation = this.props.navigation;

        db.transaction(tx => {
       
            const { id } = this.state;
            const { dataLancamento } = this.state;
            const { conta } = this.state;
            const { valor } = this.state;


            let sql = 'insert into tb_lancamentos(id_lancamento,cd_conta,dt_lancamento,vl_parcela) values(?,?,?,?)';
            const params = [id, conta, moment().format('YYYY-MM-DD HH:mm:ss'), valor];

            if (this.state.id) {
                sql = 'update tb_lancamentos set cd_conta=?, dt_lancamento=?,  vl_parcela=? where id_lancamento=?';
                params = [dataLancamento, conta, valor, id]
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