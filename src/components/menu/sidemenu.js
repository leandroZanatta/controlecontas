import React from 'react';
import {  SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';

export default class SideMenu extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SafeAreaView style={styles.flex}>
                <ScrollView>
                    <DrawerItems {...this.props} />
                </ScrollView>

            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({

    flex: {
        flex: 1
    }

});