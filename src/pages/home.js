import * as React from 'react';
import { Text, View } from 'react-native';
import { Body, Header, Left, Title, Icon } from 'native-base';
export default class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (

            <View>
                <Header>
                    <Left>
                        <Icon color='#FFF' fontSize='40' name="menu" onPress={() => this.props.navigation.openDrawer()} />
                    </Left>
                    <Body style={{ flex: 1 }}>
                        <Title>Home</Title>
                    </Body>
                </Header>
                <Text>Home</Text>
            </View>
        )
    }
}