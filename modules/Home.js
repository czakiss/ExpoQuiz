import React, {useState} from "react";
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {Header} from "./Header";
import {Button, Card, Paragraph, Title} from "react-native-paper";
import {styles} from './styles'
import {AsyncStorage} from "react-native";
import shuffle from "./Global"
import NetInfo from "@react-native-community/netinfo";
import {Vibration} from "react-native-web";

export default function Home({ navigation }) {
    getIsAccepted(navigation);
    const [getList, setGetList] = useState(true);
    const [quizList, setQuizList] = useState([]);

    function getDataFromServer() {
        if (getList) {
            setGetList(false);
            fetch('http://tgryl.pl/quiz/tests', {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json'
                },
            }).then((res) => {
                res.json().then((json) => {
                    const shuffledList = shuffle(json);
                    quizLists = shuffledList;
                    setQuizList(shuffledList);

                    const objectToSave = {
                        quiz: shuffledList,
                        date: new Date()
                    };

                    saveQuizListToAsync(JSON.stringify(objectToSave));
                })
            }).catch((err) => {
                console.error(JSON.stringify(err))
            });
        }
    }
    let isDownloadedDataToday = true;
    async function check(isNetwork) {
        if (getList) {
            setGetList(false);
            try {
                const value = await AsyncStorage.getItem(ACCESS_TOKEN);
                if (value !== null) {
                    const responsed = JSON.parse(value);
                    const dataDate = new Date(responsed.date);
                    const currDate = new Date();

                    if (
                        dataDate.getMonth() !== currDate.getMonth()
                        || dataDate.getDay() !== currDate.getDay()
                        || dataDate.getFullYear !== currDate.getFullYear()
                        || !isNetwork
                    ) {
                        const shuffledList = shuffle(responsed.quiz);
                        quizLists = shuffledList;
                        setQuizList(shuffledList);
                    } else {
                        getDataFromServer();
                    }
                } else {
                    getDataFromServer();
                }
            } catch (error) {
                getDataFromServer();
            }
        }
    }

    NetInfo.fetch().then(state => {
        let isNetworkConnection = true;
        if (!state.isConnected) {
            isNetworkConnection = false;
        }
        check(isNetworkConnection);
    });

    return (
        <View style={styles.container}>
            <Header name="Home Page" openDrawer={navigation.openDrawer}/>


            <ScrollView>

                <View style={styles.view}>
                    <Image source ={require("../assets/banner.png")} style={{width:"100%", height:"10%"}} resizeMode="contain"/>

                    <View>
                        <Text >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet dictum sapien, nec viverra orci. Morbi sed maximus purus. Phasellus quis justo mi. Nunc ut tellus lectus.
                        </Text>
                        <Text style={{paddingVertical:20}}>
                            In eleifend, turpis sit amet suscipit tincidunt, felis ex tempor tellus, at commodo nunc massa rhoncus dui. Vestibulum at malesuada elit.
                        </Text>
                    </View>
                    {
                        quizList.map((element, index) => {
                            return <ListElement
                                quizId = {element.id}
                                key={index + 100}
                                header={element.name}
                                body={element.description}
                                tags={element.tags}
                                navigation={navigation}
                            />;
                        })
                    }
                </View>


            </ScrollView>
            <View style={{marginBottom:20, marginTop:10}}>
                <Card.Content>
                    <Title style={{textAlign:"center"}}>Get to know your ranking result</Title>
                    <Button icon="check-bold" mode="contained "
                            onPress={() => navigation.navigate('Results')}
                    >
                        Check!
                    </Button>
                </Card.Content>
            </View>
        </View>

    );
}

const getIsAccepted = (navigation) => {
    AsyncStorage.getItem('privacy_accepted').then((isAcc) => {
        if(!(!!isAcc)) {
            navigation.navigate('Privacy');
        }
    });
};
const ACCESS_TOKEN = 'List_Of_Quiz';
const saveQuizListToAsync = (responseData) => {
    AsyncStorage.setItem(ACCESS_TOKEN, responseData, (err)=> {
        if(err){
            console.log("error");
            throw err;
        }
        console.log("Saved");
    }).catch((err)=> {
        console.log("error is: " + err);
    });
}

export let quizLists = false;

function ListElement(props) {
    const startQuiz = (quizId) => {
        fetch('http://tgryl.pl/quiz/test/' + quizId, {
            method: 'GET',
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json'
            },
        }).then((res) => {
            res.json().then((json) => {
                props.navigation.navigate('Test',
                    {
                        params: {quiz: json}
                     }
                );
            })
        }).catch((err) => {
            console.error(JSON.stringify(err))
        });
    };


    return (

        <View style={{paddingHorizontal:20}}>
            <Card style={{marginVertical:10}}>
                <Card.Content>
                    <Title>{props.header}</Title>
                    <View>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            {
                                props.tags.map((tag, index) => {
                                    return (
                                        <TouchableOpacity key={index}>
                                            <Text style={styles.link}>{tag}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                        <Paragraph>{props.body}</Paragraph>
                        <Button style={{marginTop: 10}} icon="" mode="contained"
                                onPress={() => {startQuiz(props.quizId);}}>
                            Do it
                        </Button>
                    </View>
                </Card.Content>
            </Card>
        </View>
    );
}
