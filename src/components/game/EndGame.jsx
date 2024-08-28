import { useState } from "react";
import { GAME_STATES } from "../utils/constants.js";
import Timer from "../common/Timer.jsx";
import Button from "../common/Button.jsx"


const EndGame = (props) => {
    const [user, setUser] = useState("");
    const highScores = JSON.parse(localStorage.getItem("highScores")) || []; // if null return []

    const handleInputChange = (e) => {
        setUser(e.target.value);
    }

    const submitScore = () => {
        const score = {
            user: user,
            level: props.level,
            time: props.time,
            words: props.wordCount
        };

        highScores.push(score);
        highScores.sort((a, b) => b.words - a.words);
        highScores.splice(10);
        localStorage.setItem("highScores", JSON.stringify(highScores));
        props.setScoreSubmitted(true);
        setUser("");
    }

    if (props.gameState === GAME_STATES.END) {
        if (props.scoreSubmitted) {
            return (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-5 p-6 bg-gray-600 rounded-xl w-80">
                        <h1 className="text-xl">Score Submitted</h1>
                        <Button 
                            label={"Restart"}
                            onClick={props.onRestart}
                        />
                    </div>
                </div>

            )
        } else {
            return (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2 p-6 bg-gray-600 rounded-xl w-80">
                        <h1 className="text-xl font-bold">Game Over</h1>
                        <h1>Level: {props.level}</h1>
                        <Timer time={props.time} />
                        <h1>Words: {props.wordCount}</h1>
                        <input
                            className="input input-bordered input-sm rounded-xl bg-white text-black mx-10 mb-1 w-60"
                            type="text"
                            value={user}
                            onChange={handleInputChange}
                            placeholder="Enter your name"
                        />
                        <Button
                            className={"mb-5"}
                            label={"Submit Score"}
                            onClick={submitScore}
                        />
                        <Button
                            onClick={props.onRestart}
                            label={"Restart"}
                        />
                    </div>
                </div>
            );
        }
    }
};

export default EndGame;
