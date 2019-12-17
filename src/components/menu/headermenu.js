import React from 'react';
import { Left, Icon, Body, Title, Header } from 'native-base';

export default class HeaderMenu extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Header>
                <Left>
                    <Icon color='#FFF' fontSize='40' name="menu" onPress={() => this.props.navigation.openDrawer()} />
                </Left>
                <Body style={{ flex: 1 }}>
                    <Title>{this.props.title}</Title>
                </Body>
            </Header>
        )
    }
}
