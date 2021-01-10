import React from 'react';
import {
    Text,
    View,
    Image,
    FlatList,
    ScrollView,
    RefreshControl
} from 'react-native';
import {
    DataTable
} from "react-native-paper";

import {Header} from './Header'
import {styles} from './styles'

export default class Results extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        const results = [
            {
                "nick": "Marek",
                "score": 18,
                "total": 20,
                "type": "historia",
                "date": "2018-11-22"
            }
        ];

        const wait = (timeout) => {
            return new Promise(resolve => {
                setTimeout(resolve, timeout);
            });
        }


        const Item = ({ item }) => (
            <DataTable.Row>
                <DataTable.Cell>{item.nick}</DataTable.Cell>
                <DataTable.Cell>{item.score}/{item.total}</DataTable.Cell>
                <DataTable.Cell>{item.type}</DataTable.Cell>
                <DataTable.Cell>{item.date}</DataTable.Cell>
            </DataTable.Row>
        );

        const renderItem = ({ item }) => (
            <Item item={item} />
        );

        return(
            <View style={styles.container}>
                <Header name="Results" openDrawer={this.props.navigation.openDrawer}/>
                <ScrollView contentContainerStyle={{
                    flexGrow: 1,
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                >

                    <Image source ={require("../assets/banner.png")} style={{width:"80%", height:"30%"}} resizeMode="contain"/>
                    <Text style={{padding:20}}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet dictum sapien, nec viverra orci. Morbi sed maximus purus. Phasellus quis justo mi. Nunc ut tellus lectus.
                    </Text>
                    <DataTable style={{padding:20}}>
                        <DataTable.Header>
                            <DataTable.Title>Nick</DataTable.Title>
                            <DataTable.Title>Point</DataTable.Title>
                            <DataTable.Title>Type</DataTable.Title>
                            <DataTable.Title>Date</DataTable.Title>
                        </DataTable.Header>

                        <FlatList
                            data={results}
                            renderItem={renderItem}
                            keyExtractor={item => item}
                            updateCellsBatchingPeriod={4000}
                        />

                    </DataTable>
                </ScrollView>
            </View>
        )
    }
}
