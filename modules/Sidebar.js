import React from "react";
import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {Title} from "react-native-paper";
import {Ionicons} from "@expo/vector-icons";

import {styles} from './styles'

export default class Sidebar extends React.Component {
    state = {
        routes:[
            {
                name:"Home",
                icon:"ios-home"
            },
            {
                name:"Test",
                icon:"ios-contact"
            },
            {
                name:"Results",
                icon:"ios-settings"
            },
        ]
    }


    render(){

        function Item({ item, navigate }) {
            return (
                <TouchableOpacity style={styles.listItem} onPress={()=>navigate(item.name)}>
                    <Ionicons name={item.icon} size={32} />
                    <Text style={styles.title}>{item.name}</Text>
                </TouchableOpacity>
            );
        }

        return (
            <View style={styles.container}>
                <Title>Quiz App</Title>
                <Image source={require("../assets/profile.jpg")} style={styles.profileImg}/>
                <View  style={{width:"100%",marginLeft:30}}>
                    <TouchableOpacity style={styles.listItem} onPress={()=> this.props.navigation.navigate('Home')}>
                        <Ionicons name="ios-home" size={32} />
                        <Text style={styles.title}>Home Page</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.listItem} onPress={()=> this.props.navigation.navigate('Results')}>
                        <Ionicons name="ios-contact" size={32} />
                        <Text style={styles.title}>Results</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.sidebarDivider}/>

                <FlatList
                    style={{width:"100%",marginLeft:30}}
                    data={this.state.routes}
                    renderItem={({ item }) => <Item  item={item} navigate={this.props.navigation.navigate}/>}
                    keyExtractor={item => item.name}
                />
            </View>
        )
    }

}
