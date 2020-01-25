import React from 'react';
import { Icon, View, DatePicker, Label, Button } from 'native-base';
import { Dimensions } from 'react-native';

export default class Filtros extends React.Component {

    constructor(props) {
        super(props);

        let dataAtual = new Date();

        this.state = {
            de: new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 1),
            para: dataAtual
        }
    }

    componentDidMount() {

        this.props.funcaoFiltar(this.state)
    }

    render() {

        const widthDate = parseInt((Dimensions.get('window').width - 97) / 2);

        return (
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <DatePicker
                        style={{ width: widthDate }}
                        defaultDate={this.state.de}
                        maximumDate={this.state.para}
                        mode="date"
                        placeholder="De"
                        format="DD/MM/YYYY"
                        androidMode={"default"}
                        onDateChange={(date) => { this.setState({ de: date }) }}
                    />
                    <Label style={{ width: 37 }}>Para</Label>
                    <DatePicker
                        style={{ width: widthDate }}
                        defaultDate={this.state.para}
                        minimumDate={this.state.de}
                        mode="date"
                        placeholder="De"
                        format="DD/MM/YYYY"
                        androidMode={"default"}
                        onDateChange={(date) => { this.setState({ para: date }) }}
                    />
                </View>
                <Button style={{ width: 50 }} onPress={() => { this.props.funcaoFiltar(this.state) }} >
                    <Icon name='ios-funnel' />
                </Button>
            </View>
        )
    }
}
