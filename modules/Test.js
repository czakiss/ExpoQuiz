import {styles} from "./styles";
import {Text, View,TouchableOpacity,ScrollView} from "react-native";
import React from "react";
import {Header} from "./Header";
import {Button, Colors, Headline, ProgressBar, Subheading, Title} from "react-native-paper";
import Timer from "./Timer";
import shuffle from "./Global"

export default function Test({ navigation }) {

    const quizInfo = navigation.getParam("params").quiz
    const tasks = quizInfo.tasks;
    console.log(JSON.stringify(tasks))
    const [points, setPoints] = React.useState(0);
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const countOfQuestions = tasks.length;
    const [quiz, setQuiz] = React.useState(tasks[0]);

    const [duration, setDuration] = React.useState(quiz.duration);
    const [sendResult, setSendResult] = React.useState(false);

    if (sendResult) {
        setSendResult(false);
        let tags = quizInfo.tags;
        let stringTags = "";
        tags.map((tag, index) => {
            if (index > 0) {
                stringTags += ", "
            }
            stringTags += tag.toString();
        });
        let obj = JSON.stringify({
            "nick": "Malgorzata Rozenek",
            "score": points,
            "total": countOfQuestions,
            "type": stringTags
        });
        fetch('http://tgryl.pl/quiz/result', {
            method: 'POST',
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json'
            },
            body: obj,
        }).then((res) => {
            res.json().then((json) => {
                console.log('sent', obj);
            })
        }).catch((err) => {
            console.error(JSON.stringify(err))
        });
    }

    const checkIsFinished = (answerOption) => {
        if (currentQuestion < countOfQuestions) {
            setCurrentQuestion(currentQuestion + 1);
            setQuiz(tasks[currentQuestion]);
            setDuration(tasks[currentQuestion + 1] ? tasks[currentQuestion + 1].duration: 0);

            if (currentQuestion === countOfQuestions - 1) {
                setSendResult(true);
            }
        }
    }

    const handleAnswerButtonClick = (answerOption) => {
        if (answerOption.isCorrect) {
            setPoints(parseInt(points) + 1);
        }

        checkIsFinished(answerOption);
    };

    const RESULT_VIEW = (
        <View style={styles.container}>
            <Header name="Your Results" openDrawer={navigation.openDrawer}/>
            <View >
                <Title style={{padding:20}}>
                    Congratulation
                </Title>
                <Title style={{padding:20}}>
                    Your score is
                </Title>
                <Subheading >{points} / {countOfQuestions} pt</Subheading>
                <Button style={{marginTop: 10}} icon="" mode="contained"
                        onPress={() => {navigation.navigate("Home")}
                        }>
                    Go Home
                </Button>
            </View>
        </View>
    );

    const nextQuestion = () => {
        checkIsFinished();
    };

    const shuffledAnswers = shuffle(quiz.answers);
    const TEST_VIEW = (
        <View style={styles.container}>
            <Header name="Test" openDrawer={navigation.openDrawer}/>
            <View style={{paddingHorizontal:20,alignItems:"center"}}>
                <Title style={{padding:20}}>
                    Question {currentQuestion + 1} of {countOfQuestions}
                </Title>
                <Timer nextQuestion={nextQuestion} duration={duration}/>
                <ProgressBar duration={duration}/>
                <Headline style={{ textAlign:"center"}}>
                    {quiz.question}
                </Headline>
                <Text style={{padding:20}}>
                    Choose answer correct
                </Text>
                <View>
                    {

                        shuffledAnswers.map((answer, key) => {
                                return <Answer
                                    answerOption={answer}
                                    callback={handleAnswerButtonClick}
                                    content={answer.content}
                                    key={key}
                                />
                            }
                        )
                    }
                </View>
            </View>
        </View>
    );

    return(
        <ScrollView>
            {
                (currentQuestion >= countOfQuestions) ? RESULT_VIEW : TEST_VIEW
            }
        </ScrollView>
    );
}

function Answer(props) {
    return (
        <Button style={{marginVertical: 10}} mode="contained"
                onPress={() => { props.callback(props.answerOption)} }>
            {props.content}
        </Button>
    );
}


