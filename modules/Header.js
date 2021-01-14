import {Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import React from "react";
import {styles} from './styles'
import {Title} from "react-native-paper";

export function Header ({name, openDrawer}) {
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => openDrawer()}>
                <Ionicons name="ios-menu" size={32}/>
            </TouchableOpacity>
            <Title>{name}</Title>
            <Text style={{width: 50}}/>
        </View>
    )
}
