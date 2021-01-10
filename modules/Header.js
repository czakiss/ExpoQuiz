import {Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import React from "react";
import {styles} from './styles'

export function Header ({name, openDrawer}) {
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => openDrawer()}>
                <Ionicons name="ios-menu" size={32}/>
            </TouchableOpacity>
            <Text>{name}</Text>
            <Text style={{width: 50}}/>
        </View>
    )
}
