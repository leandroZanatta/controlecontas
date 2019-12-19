import React from 'react';
import { Left, Icon, Body, Title, Header } from 'native-base';

export default class ReturnMenu extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Header>
                <Left>
                    <Icon color='#FFF' fontSize='40' name="arrow-back" onPress={() => this.props.navigation.navigate(this.props.backTo)} />
                </Left>
                <Body style={{ flex: 1 }}>
                    <Title>{this.props.title}</Title>
                </Body>
            </Header>
        )
    }
}
