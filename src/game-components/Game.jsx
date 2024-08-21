import { useState, useEffect } from "react";
import { generate } from "random-words";
import { v4 as uuidv4 } from 'uuid';
import Stats from "./Stats.jsx";
import List from "./List.jsx";
import EndGame from "./EndGame.jsx";
import StartGame from "./StartGame.jsx";
import Input from "./Input.jsx";
import { GAME_STATES } from "../constants.js";

const Game = () => {
    const [wordList, setWordList] = useState([]);
    const [lives, setLives] = useState(3);
    const [gameState, setGameState] = useState(GAME_STATES.START);
    const [wordCount, setWordCount] = useState(0);
    const [wordGeneratedSpeed, setWordGeneratedSpeed] = useState(2000);
    const [level, setLevel] = useState(1);

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

    // speeds up word generation
    useEffect(() => {
        if (wordGeneratedSpeed <= 1000) {
            if (wordCount != 0 && wordCount % 10 == 0) {
                setWordGeneratedSpeed(prevSpeed => prevSpeed - 25);
                setLevel(prevLevel => prevLevel + 1);
            }
        } else {
            if (wordCount != 0 && wordCount % 5 == 0) {
                if (wordGeneratedSpeed <= 1500) {
                    setWordGeneratedSpeed(prevSpeed => prevSpeed - 50);
                    setLevel(prevLevel => prevLevel + 1);
                } else if (wordGeneratedSpeed <= 2000) {
                    setWordGeneratedSpeed(prevSpeed => prevSpeed - 100);
                    setLevel(prevLevel => prevLevel + 1);
                }
                // } else {
                //     setWordGeneratedSpeed(prevSpeed => prevSpeed - 200);
                // }
            }
        }
    }, [wordCount]);

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

    //
    // functions passed to components
    //
    const handleStartGame = () => {

        setGameState(GAME_STATES.RUNNING);
    }

    const handleRestartGame = () => {
        setGameState(GAME_STATES.RUNNING);
        setWordList([]);
        setLives(3);
        setWordCount(0);
        setWordGeneratedSpeed(2000);
        setLevel(1);
    }

    const handleRemoveWord = (wordToRemoveObj) => {
        setWordList(prevWordList => prevWordList.filter(word => word.id !== wordToRemoveObj.id));
        setWordCount(prevWordCount => prevWordCount + 1);
    }

    return (
        <>
            <div className="block min-[960px]:hidden text-center mt-20">
                <p className="text-lg font-bold text-red-500">Game not available on screens less than 960px wide.</p>
            </div>
            <div className="hidden min-[960px]:block">
                <div className="flex flex-col items-center">
                    <Stats lives={lives} wordCount={wordCount} gameState={gameState} wordList={wordList} speed={wordGeneratedSpeed} level={level}/>
                    <div className="h-[640px] w-[960px] my-5 relative rounded-xl">
                        <StartGame gameState={gameState} onStart={handleStartGame} />
                        <div className="h-full w-full px-20 py-5 bg-white bg-opacity-5 border border-gray-600 rounded-xl shadow-2xl">
                            <List wordList={wordList} gameState={gameState} />
                        </div>
                        <EndGame gameState={gameState} onRestart={handleRestartGame} />
                    </div>
                    <Input wordList={wordList} handleRemoveWord={handleRemoveWord} gameState={gameState} />
                </div>
            </div>
            <div className="block text-center max-w-[960px] mt-20 mx-auto">
                <h1 className="font-bold mb-5">How To Play!</h1>
                <p>Chaos Type is designed as a fast-paced typing exercise aimed to improve your typing skills and reaction time. 
                    Words will randomly appear on the game screen, and your objective is to type them correctly before
                    they disappear. To play, type the word in the input box and hit either 'space' or 'enter' to remove it.
                    You start with three lives, and the game speeds up as you progress. Losing all lives results in game over.
                </p>
            </div>

        </>
    );
}

export default Game;