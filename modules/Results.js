import React, {useState} from 'react';
import {
    Text,
    View,
    Image,
    FlatList,
    ScrollView,
    RefreshControl,
    ToastAndroid
} from 'react-native';
import {
    DataTable,
    Paragraph
} from "react-native-paper";

import {Header} from './Header'
import {styles} from './styles'
import ListItem from "@material-ui/core/ListItem";
import SafeAreaView from "react-native-web/dist/exports/SafeAreaView";

export default function Result({ navigation }) {
    const [getResults, setGetResults] = useState(true);
    if (getResults) {
        setGetResults(false);
        fetch('http://tgryl.pl/quiz/results', {
            method: 'GET',
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json'
            },
        }).then((res) => {
            res.json().then((json) => {
                setResultsData(json);
            })
        }).catch((err) => {
            console.error(JSON.stringify(err));
        });
    }

    const renderItem = ({item}) => (
        <RenderResult results={resultsData} item={item}/>
    );

    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    const [refreshing, setRefreshing] = React.useState(false);

    const [resultsData, setResultsData] = React.useState([]);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        // RETRIEVE DATA
        wait(2000).then(() => setRefreshing(false));
    }, []);



    return (
        <View style={styles.container} >
            <Header name="Results" openDrawer={navigation.openDrawer}/>
            <Paragraph style={{padding:20}}>
                List of results
            </Paragraph>
            <DataTable style={{padding:20}}>
                <DataTable.Header>
                    <DataTable.Title>Nick</DataTable.Title>
                    <DataTable.Title>Point</DataTable.Title>
                    <DataTable.Title>Type</DataTable.Title>
                    <DataTable.Title>Date</DataTable.Title>
                </DataTable.Header>
                <FlatList
                    data={resultsData}
                    renderItem={renderItem}
                    keyExtractor={item => resultsData.indexOf(item).toString()}
                    updateCellsBatchingPeriod={4000}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                />
            </DataTable>
        </View>
    );
}
const RenderResult = (props) => {
    return (
        <DataTable.Row>
            <DataTable.Cell>{props.item.nick}</DataTable.Cell>
            <DataTable.Cell>{props.item.score}/{props.item.total}</DataTable.Cell>
            <DataTable.Cell>{props.item.type}</DataTable.Cell>
            <DataTable.Cell>{props.item.createdOn}</DataTable.Cell>
        </DataTable.Row>
    );
};
