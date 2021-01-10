import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {createAppContainer} from "react-navigation";
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from "react-navigation-stack"
import {
    DefaultTheme,
    Provider as PaperProvider,
} from "react-native-paper";
import * as SplashScreen from "expo-splash-screen";

import Results from "./modules/Results";
import Home from "./modules/Home";
import Sidebar from "./modules/Sidebar"
import Test from "./modules/Test";

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
                <AppContainer/>
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
