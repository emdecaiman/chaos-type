import { useState, useEffect } from "react";
import { generate } from "random-words";
import { v4 as uuidv4 } from "uuid";
import Stats from "./Stats.jsx";
import List from "./List.jsx";
import EndGame from "./EndGame.jsx";
import StartGame from "./StartGame.jsx";
import Input from "./Input.jsx";
import { GAME_STATES } from "..//utils/constants.js";

const Game = () => {
    const [wordList, setWordList] = useState([]);
    const [lives, setLives] = useState(3);
    const [gameState, setGameState] = useState(GAME_STATES.START);
    const [wordGeneratedSpeed, setWordGeneratedSpeed] = useState(2000);

    const [scoreSubmitted, setScoreSubmitted] = useState(false);

    // stats
    const [wordCount, setWordCount] = useState(0);
    const [level, setLevel] = useState(1);
    const [time, setTime] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const [wpm, setWpm] = useState(0);

    // add words every two second
    useEffect(() => {
        if (lives > 0 && gameState == GAME_STATES.RUNNING) {
            const id = setInterval(() => {
                addWord();
            }, wordGeneratedSpeed);
            return () => clearInterval(id);
        } else if (lives <= 0) {
            endGame();
        }

    }, [lives, wordGeneratedSpeed, gameState]);


    const addWord = () => {
        const newWord = {
            id: uuidv4(),
            text: generate(),
            y: Math.random() * 100,
            x: Math.random() * 100,
            timerId: setTimeout(() => {
                removeWordsByTimeout();
            }, 12000)
        };

        setWordList(prevWordList => [...prevWordList, newWord]);
    }

    const endGame = () => {
        setWordList(prevWordList => {
            prevWordList.forEach(word => clearTimeout(word.timerId));
            return wordList;
        })

        setGameState(GAME_STATES.END);
    }

    const removeWordsByTimeout = () => {
        setWordList(prevWordList => {
            prevWordList.forEach(word => clearTimeout(word.timerId)); // clear prev words timer
            return [];
        })
        setLives(prevLives => prevLives - 1);
    }

    // game timer
    useEffect(() => {
        let interval = null;
        if (gameState === GAME_STATES.RUNNING) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 10)
            }, 10)
        }
        return () => clearInterval(interval)
    }, [gameState])

    // update wpm
    useEffect(() => {
        if (wordCount > 0 && startTime) {
            const currentTime = Date.now();
            const elapsedTime = (currentTime - startTime) / 60000; // convert to minutes
            const wordsPerMinute = wordCount / elapsedTime;
            setWpm(wordsPerMinute.toFixed(2));
        }
    }, [wordCount])

    //
    // functions passed to components
    //
    const handleStartGame = () => {
        setWordList([]);
        setLives(3);
        setGameState(GAME_STATES.RUNNING);
        setScoreSubmitted(false);
        setWordGeneratedSpeed(2000);
        setWordCount(0);
        setLevel(1);
        setTime(0);
        setStartTime(Date.now());
        setWpm(0);
    }

    const handleRemoveWord = (wordToRemoveObj) => {
        setWordList(prevWordList => prevWordList.filter(word => word.id !== wordToRemoveObj.id));
        setWordCount(prevWordCount => prevWordCount + 1);
    }

    // speed up word generation and increase level logic
    const handleWordCountChange = (newWordCount) => {
        setWordCount(newWordCount);
    
        let newSpeed = wordGeneratedSpeed;
        let newLevel = level;
    
        if (newSpeed <= 1000) {
            if (newWordCount !== 0 && newWordCount % 10 === 0) {
                newSpeed = newSpeed - 25;
                newLevel = level + 1;
            }
        } else {
            if (newWordCount !== 0 && newWordCount % 5 === 0) {
                if (newSpeed <= 1500) {
                    newSpeed = newSpeed - 50;
                    newLevel = level + 1;
                } else if (newSpeed <= 2000) {
                    newSpeed = newSpeed - 100;
                    newLevel = level + 1;
                }
            }
        }
    
        setWordGeneratedSpeed(newSpeed);
        setLevel(newLevel);
    };

    return (
        <>
            <div className="min-[960px]:hidden text-center mt-20">
                <p className="text-lg font-bold text-red-500">Game not available on screens less than 960px wide.</p>
            </div>
            <div className="max-[960px]:hidden">
                <div className="flex flex-col items-center">
                    <Stats
                        lives={lives}
                        wordCount={wordCount}
                        gameState={gameState}
                        wordList={wordList}
                        speed={wordGeneratedSpeed}
                        level={level}
                        time={time}
                        wpm={wpm}
                    />
                    <div className="h-[640px] w-[960px] my-5 relative rounded-xl">
                        <StartGame gameState={gameState} onStart={handleStartGame} />
                        <div className="h-full w-full px-20 py-5 bg-white bg-opacity-5 rounded-xl shadow-2xl">
                            <List wordList={wordList} gameState={gameState} />
                        </div>
                        <EndGame
                            wordCount={wordCount}
                            time={time}
                            level={level}
                            gameState={gameState}
                            scoreSubmitted={scoreSubmitted}
                            setScoreSubmitted={setScoreSubmitted}
                            onRestart={handleStartGame} />
                    </div>
                    <Input 
                        wordList={wordList} 
                        handleRemoveWord={handleRemoveWord} 
                        handleWordCountChange={handleWordCountChange}
                        wordCount={wordCount}
                        gameState={gameState} 
                        />
                </div>
            </div>
        </>
    );
}

export default Game;