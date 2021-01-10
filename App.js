import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity , ScrollView } from 'react-native';
import {createAppContainer, NavigationActions as navigation, SafeAreaView} from "react-navigation";
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from "react-navigation-stack"
import { Ionicons } from '@expo/vector-icons';
import {
    DefaultTheme,
    Provider as PaperProvider,
    Avatar,
    Title,
    Card,
    Paragraph,
    Button,
    Caption,
    ProgressBar,
    Subheading,
    Colors,
    Headline,
    DataTable
} from "react-native-paper";
import {Linking} from "react-native-web";
import * as SplashScreen from "expo-splash-screen";


const theme = {
    ...DefaultTheme,
    roundness: 10,
    colors: {
        ...DefaultTheme.colors,
        primary: '#005d98',
        accent: '#f1c40f',
        background: '#f6f6f6',
        surface: '#f5f5fa',
        error: '#B00020',
        text: '#000000',
        onBackground: '#000000',
        onSurface: '#000000',
    },
};

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />


function Header ({name, openDrawer}) {
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
function Home({navigation}){
    return(
        <View style={styles.container}>
            <Header name="Home Page" openDrawer={navigation.openDrawer}/>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <View style={styles.view}>
                    <Image source ={require("./assets/banner.png")} style={{width:"100%", height:"30%"}} resizeMode="contain"/>
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
                                        <Text style={styles.link} onPress={()=> navigation.navigate('Test')}>Tag#1</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Text style={styles.link} onPress={()=> navigation.navigate('Test')}>Tag#1</Text>
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


function Test({navigation}){
    return(
        <View style={styles.container}>
            <Header name="Test" openDrawer={navigation.openDrawer}/>
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

function Results({navigation}) {
    return(
        <View style={styles.container}>
            <Header name="Results" openDrawer={navigation.openDrawer}/>
            <Image source ={require("./assets/banner.png")} style={{width:"80%", height:"30%"}} resizeMode="contain"/>
            <Text style={{padding:20}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet dictum sapien, nec viverra orci. Morbi sed maximus purus. Phasellus quis justo mi. Nunc ut tellus lectus.
            </Text>
            <DataTable style={{padding:20}}>
                <DataTable.Header>
                    <DataTable.Title>Dessert</DataTable.Title>
                    <DataTable.Title numeric>Calories</DataTable.Title>
                    <DataTable.Title numeric>Fat</DataTable.Title>
                </DataTable.Header>

                <DataTable.Row>
                    <DataTable.Cell>Frozen yogurt</DataTable.Cell>
                    <DataTable.Cell numeric>159</DataTable.Cell>
                    <DataTable.Cell numeric>6.0</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                    <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
                    <DataTable.Cell numeric>237</DataTable.Cell>
                    <DataTable.Cell numeric>8.0</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Pagination
                    page={1}
                    numberOfPages={3}
                    onPageChange={page => {
                        console.log(page);
                    }}
                    label="1-2 of 6"
                />
            </DataTable>
        </View>
    )
}

function Item({ item, navigate }) {
    return (
        <TouchableOpacity style={styles.listItem} onPress={()=>navigate(item.name)}>
            <Ionicons name={item.icon} size={32} />
            <Text style={styles.title}>{item.name}</Text>
        </TouchableOpacity>
    );
}

class Sidebar extends React.Component {
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
        return (
            <View style={styles.container}>
                <Title>Quiz App</Title>
                <Image source={require("./assets/profile.jpg")} style={styles.profileImg}/>
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

                <View style={styles.sidebarDivider}></View>
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

const Drawer = createDrawerNavigator(
    {
        Home:{ screen: Home},
        Test:{ screen: Test},
        Results:{ screen: Results}

    },
    {
        initialRouteName: "Home",
        unmountInactiveRoutes: true,
        headerMode: "none",
        contentComponent: props => <Sidebar {...props} />
    }
)

const AppNavigator = createStackNavigator(
    {
        Drawer : {screen: Drawer},
    },
    {
        initialRouteName: "Drawer",
        headerMode: "none",
        unmountInactiveRoutes: true
    }
)

const AppContainer = createAppContainer(AppNavigator);

async function performAPICalls() {}
async function downloadAssets() {}

export default class App extends React.Component {
    state = {
        appIsReady: false,
    };

    async componentDidMount() {
        // Prevent native splash screen from autohiding
        try {
            await SplashScreen.preventAutoHideAsync();
        } catch (e) {
            console.warn(e);
        }
        await this.prepareResources();
    }

    /**
     * Method that serves to load resources and make API calls
     */
    prepareResources = async () => {
        try {
            await performAPICalls();
            await downloadAssets();
        } catch (e) {
            console.warn(e);
        } finally {
            this.setState({ appIsReady: true }, async () => {
                await SplashScreen.hideAsync();
            });
        }
    };


    render(){
        if (!this.state.appIsReady) {
            return (
                <View style={styles.container}>
                    <Text style={styles.text}>SplashScreen Demo! 👋</Text>
                </View>
            );
        }

        return (
            <PaperProvider theme={theme}>
                <AppContainer />
            </PaperProvider>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        paddingTop:40,
        alignItems:"center",
        flex:1

    },
    view: {
        paddingHorizontal: 20,
        paddingBottom : 400
    },
    listItem:{
        height:60,
        alignItems:"center",
        flexDirection:"row",
    },
    title:{
        fontSize:18,
        marginLeft:20
    },
    link:{
        color: 'blue',
        textDecorationLine: 'underline',
        marginRight: 3
    },
    header:{
        width:"100%",
        height:60,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingHorizontal:20
    },
    profileImg:{
        width:80,
        height:80,
        borderRadius:40,
        marginTop:20
    },
    sidebarDivider:{
        height:1,
        width:"100%",
        backgroundColor:"lightgray",
        marginVertical:10
    }
});
