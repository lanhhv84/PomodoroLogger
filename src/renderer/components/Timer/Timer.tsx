import * as React from 'react';
import { Component, useEffect, useState } from 'react';
import { Button } from 'antd';
import { ActionCreatorTypes } from '../TODO/action';
import { RootState } from '../../reducers';
import { FocusSelector } from './FocusSelector';


interface BasicProps {
    startTimer: () => any;
    stopTimer: () => any;
    clearTimer: () => any;
    timerFinished: () => any;
    continueTimer: () => any;
    setFocusDuration: (duration: number) => any,
    setRestDuration: (duration: number) => any
}

export interface Props extends BasicProps, ActionCreatorTypes, RootState {
}


function to2digits(num: number) {
    if (num < 10) {
        return `0${num.toString()}`;
    }

    return num;
}


class Timer extends Component<Props> {
    state: { leftTime: string };
    interval?: any;

    constructor(props: Props) {
        super(props);
        this.state = {
            leftTime: '00:00'
        };
    }

    componentDidMount(): void {
        this.interval = setInterval(this.updateLeftTime, 300);
        this.updateLeftTime();
    }

    componentWillUnmount(): void {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    updateLeftTime = () => {
        const { targetTime, isRunning } = this.props.timer;
        if (!targetTime) {
            this.setState({ leftTime: '00:00' });
            return;
        }

        if (!isRunning) {
            return;
        }

        const now = new Date().getTime();
        const timeSpan = (targetTime - now);
        const sec = Math.floor(timeSpan / 1000 + 0.5);
        if (sec < 0) {
            this.setState({ leftTime: '00:00' });
            this.onDone();
            return;
        }

        const leftTime = (`${to2digits(Math.floor(sec / 60))}:${to2digits(sec % 60)}`);
        this.setState({ leftTime });
    };

    onStop = () => {
        if (this.props.timer.isRunning) {
            this.props.stopTimer();
        } else {
            this.props.continueTimer();
        }
    };

    onStart = () => {
        this.props.startTimer();
    };


    onClear = () => {
        this.props.clearTimer();
    };

    onDone = () => {
        this.props.timerFinished();
    };

    render() {
        const { leftTime } = this.state;

        return (
            <div>
                <span id="left-time-text">{leftTime}</span>
                <Button onClick={this.onStop} id="stop-timer-button">
                    {this.props.timer.isRunning ? 'Stop' : 'Continue'}
                </Button>
                <Button onClick={this.onStart} id="start-timer-button">Start</Button>
                <Button onClick={this.onClear}>Clear</Button>
                <FocusSelector {...this.props}/>
            </div>
        );
    }
}


export default Timer;
