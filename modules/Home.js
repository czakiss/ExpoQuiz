import React from "react";
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {Header} from "./Header";
import {Button, Card, Paragraph, Title} from "react-native-paper";
import {styles} from './styles'


export default class Results extends React.Component{
    constructor(props) {
        super(props);

    }
    render() {
        return(
            <View style={styles.container}>
                <Header name="Home Page" openDrawer={this.props.navigation.openDrawer}/>
                <ScrollView contentContainerStyle={{flexGrow: 1}}>
                    <View style={styles.view}>
                        <Image source ={require("../assets/banner.png")} style={{width:"100%", height:"30%"}} resizeMode="contain"/>
                        <View>
                            <Text >
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet dictum sapien, nec viverra orci. Morbi sed maximus purus. Phasellus quis justo mi. Nunc ut tellus lectus.
                            </Text>
                            <Text style={{paddingVertical:20}}>
                                In eleifend, turpis sit amet suscipit tincidunt, felis ex tempor tellus, at commodo nunc massa rhoncus dui. Vestibulum at malesuada elit.
                            </Text>
                        </View>
                        <View style={{paddingHorizontal:20}}>
                            <Card style={{paddingVertical:20}}>
                                <Card.Content>
                                    <Title>Title</Title>
                                    <View style={{flexDirection:'row', alignItems:'center'}}>
                                        <TouchableOpacity>
                                            <Text style={styles.link} onPress={()=> this.props.navigation.navigate('Test')}>Tag#1</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <Text style={styles.link} onPress={()=> this.props.navigation.navigate('Test')}>Tag#1</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet dictum sapien, nec viverra orci.</Paragraph>
                                </Card.Content>
                            </Card>
                        </View>


                    </View>

                </ScrollView>
                <View style={{marginVertical:20}}>
                    <Card.Content>
                        <Title>Get to know your ranking result</Title>
                        <Button icon="check-bold" mode="contained " onPress={() => console.log('Pressed')}>
                            Check!
                        </Button>
                    </Card.Content>
                </View>
            </View>

        )
    }
}
