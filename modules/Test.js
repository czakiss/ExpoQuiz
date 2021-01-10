import React from "react";
import {Text, View} from "react-native";
import {Button, Colors, Headline, ProgressBar, Subheading, Title} from "react-native-paper";
import {Header} from "./Header";
import {styles} from './styles'

export default class Test extends React.Component {
    render() {
        return(
            <View style={styles.container}>
                <Header name="Test" openDrawer={this.props.navigation.openDrawer}/>
                <View style={{paddingHorizontal:20,alignItems:"center"}}>

                    <Title style={{padding:20}}>
                        Question 3 of 10
                    </Title>

                    <Subheading style={{padding:20}}>Time: 28sec</Subheading>

                    <ProgressBar style={{width:320,height:10}} progress={0.1} color={Colors.blue700} />

                    <Headline style={{ textAlign:"center"}}>This is some example of a long question to fill the content?</Headline>

                    <Text style={{padding:20}}>
                        In eleifend, turpis sit amet suscipit tincidunt, felis ex tempor tellus, at commodo nunc massa rhoncus dui. Vestibulum at malesuada elit.
                    </Text>

                    <Button style={{marginVertical: 10}} icon="alpha-a-circle" mode="contained" onPress={() => console.log('Pressed')}>
                        Answer A
                    </Button>
                    <Button style={{marginVertical: 10}} icon="alpha-b-circle" mode="contained" onPress={() => console.log('Pressed')}>
                        Answer B
                    </Button>
                    <Button style={{marginVertical: 10}} icon="alpha-c-circle" mode="contained" onPress={() => console.log('Pressed')}>
                        Answer C
                    </Button>
                    <Button style={{marginVertical: 10}} icon="alpha-d-circle" mode="contained" onPress={() => console.log('Pressed')}>
                        Answer D
                    </Button>

                </View>
            </View>
        )
    }
}
