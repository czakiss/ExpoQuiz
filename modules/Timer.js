import {Colors, ProgressBar, Subheading} from "react-native-paper";
import React from "react";
import {View} from 'react-native';

export default class Timer extends React.Component {
    constructor(props: Object) {
        super(props);
        this.state = {
            start: props.duration,
            timer: props.duration,
            nextQuestion: props.nextQuestion
        }
    }

    componentDidMount(){
        this.interval = setInterval(
            () => {
                if (this.state.timer === 0) {
                    this.state.nextQuestion();
                } else {
                    this.setState({
                        timer: this.state.timer - 1
                    });
                }
            },
            1000
        );
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }


    UNSAFE_componentWillReceiveProps (newProps) {
        if( newProps.duration !== this.state.timer){
            clearInterval(this.interval);
            this.setState({
                timer: newProps.duration,
                nextQuestion: newProps.nextQuestion
            });

            this.interval = setInterval(
                () => {
                    if (this.state.timer === 0) {
                        this.state.nextQuestion();
                    } else {
                        this.setState({
                            timer: this.state.timer - 1
                        });
                    }
                }, 1000);
        }
    }

    render() {
        return (
            <View>
                <Subheading style={{padding:20,textAlign:"center"}}>Time: {this.state.timer}sec</Subheading>
                <ProgressBar style={{width:320,height:10}} progress={this.state.timer / this.state.start} color={Colors.blue700} />
            </View>
        )
    }
}
