import {Text, TouchableOpacity} from "react-native";
import {styles} from "./styles";
import {quizLists} from "./Home";
import React from "react";

export default function DrawerButton(props) {
    return (
        <TouchableOpacity style={styles.listItem} onPress={() => {
            if (props.target !== 'Test') {
                props.navigation.reset(
                    {routes: [{
                            name: props.target
                        }
                        ]}
                );
            } else {
                const startQuiz = (index) => {
                    fetch('http://tgryl.pl/quiz/test/' + index, {
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
                        });

                    }).catch((err) => {
                        console.error(JSON.stringify(err))
                    });
                };

                let testRandom = props.random === 'true';
                let index = 0;
                if (testRandom === true) {
                    index = Math.floor(Math.random() * (quizLists.length));
                    testRandom = false;
                    startQuiz(quizLists[index].id);
                } else if (!!props.quizID) {
                    startQuiz(props.quizID);
                }
            }
        }}>
            <Text style={styles.title}>{props.name}</Text>
        </TouchableOpacity>

    );
}
