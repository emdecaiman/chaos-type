import { useState, useEffect } from "react";
import Timer from "./Timer";

const Stats = (props) => {
    const [time, setTime] = useState(0);
    const [startTime, setStartTime] = useState();
    const [wpm, setWpm] = useState(0);

    // game timer
    useEffect(() => {
        let interval = null;
        if (!props.isEnd) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 10)
            }, 10)
        }
        return () => clearInterval(interval)        
    }, [props.isEnd])

    // initialize when game starts
    useEffect(() => {
        if (props.lives == 3) {
            setStartTime(Date.now());
        }
    }, [props.lives])

    // update wpm
    useEffect(() => {
        if (props.wordCount > 0) {
            const currentTime = Date.now();
            const elapsedTime = (currentTime - startTime) / 60000; // convert to minutes
            const wordsPerMinute = props.wordCount / elapsedTime;
            setWpm(wordsPerMinute.toFixed(2));
        }
    }, [props.wordCount])

    return (
        <div className="w-[960px] mx-10 mt-20">
            <h1>Lives: {props.lives} Words: {props.wordCount} WPM: {wpm} Speed: {props.speed}</h1>
            <Timer time={time} />
        </div>
    );
}

export default Stats; 