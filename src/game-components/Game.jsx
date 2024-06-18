import { useState, useEffect } from "react";
import { generate } from "random-words";
import { v4 as uuidv4 } from 'uuid';
import Stats from "./Stats.jsx";
import List from "./List.jsx";
import EndGame from "./EndGame.jsx";
import StartGame from "./StartGame.jsx";
import Input from "./Input.jsx";

const Game = () => {
    const [wordList, setWordList] = useState([]);
    const [lives, setLives] = useState(3);
    const [gameState, setGameState] = useState("start");
    const [wordCount, setWordCount] = useState(0);
    const [wordGeneratedSpeed, setWordGeneratedSpeed] = useState(1100);

    // add words every second
    useEffect(() => {
        if (lives > 0 && gameState == "running") {
            const id = setInterval(() => {
                addWord();
            }, wordGeneratedSpeed);
            return () => clearInterval(id);
        } else if (lives <= 0) {
            endGame();
        }

    }, [lives, wordGeneratedSpeed, gameState]); // interval resets everytime wordList changes

    // speeds up word generation
    useEffect(() => {
        if (wordGeneratedSpeed <= 1000) {
            if (wordCount != 0 && wordCount % 10 == 0) {
                setWordGeneratedSpeed(prevSpeed => prevSpeed - 25);
            } 
        } else {
            if (wordCount != 0 && wordCount % 5 == 0) {
                if (wordGeneratedSpeed <= 1500) {
                    setWordGeneratedSpeed(prevSpeed => prevSpeed - 50);
                } else if (wordGeneratedSpeed <= 2000) {
                    setWordGeneratedSpeed(prevSpeed => prevSpeed - 100);
                } else {
                    setWordGeneratedSpeed(prevSpeed => prevSpeed - 200);
                }
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
                removeWordByTimeout(newWord);
            }, 10000)
        };

        setWordList(prevWordList => [...prevWordList, newWord]);
    }

    const endGame = () => {
        setWordList(prevWordList => {
            prevWordList.forEach(word => clearTimeout(word.timerId));
            return wordList;
        })

        setGameState("end");
    }

    const removeWordByTimeout = (wordToRemove) => {
        clearTimeout(wordToRemove.timerId);

        // functional updates ensure we are working with latest state values
        setWordList(prevWordList => prevWordList.filter(word => word.id !== wordToRemove.id));
        setLives(prevLives => prevLives - 1);

    }

    //
    // functions passed to components
    //
    const handleStartGame = () => {

        setGameState("running");
    }

    const handleRestartGame = () => {
        setGameState("running");
        setWordList([]);
        setLives(3);
        setWordCount(0);
        setWordGeneratedSpeed(1000);
    }

    const handleRemoveWord = (wordToRemoveObj) => {
        setWordList(prevWordList => prevWordList.filter(word => word.id !== wordToRemoveObj.id));
        setWordCount(prevWordCount => prevWordCount + 1);
    }

    return (
        <>
            <div className="flex flex-col items-center">
                <Stats lives={lives} wordCount={wordCount} gameState={gameState} wordList={wordList} speed={wordGeneratedSpeed} />
                <div className="h-[640px] w-[960px] my-5 relative rounded-xl">
                    <StartGame gameState={gameState} onStart={handleStartGame} />
                    <div className="h-full w-full px-20 py-5 bg-white bg-opacity-5 shadow-2xl">
                        <List wordList={wordList} gameState={gameState} />
                    </div>
                    <EndGame gameState={gameState} onRestart={handleRestartGame} />
                </div>
                <Input wordList={wordList} handleRemoveWord={handleRemoveWord} gameState={gameState} />
            </div>
        </>
    );
}

export default Game;